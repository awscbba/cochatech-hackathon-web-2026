import * as cdk from "aws-cdk-lib";
import * as amplify from "aws-cdk-lib/aws-amplify";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

interface CochaTechStackProps extends cdk.StackProps {
  domainName: string;
  githubOrg: string;
  githubRepo: string;
}

export class CochaTechStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CochaTechStackProps) {
    super(scope, id, props);

    // --- Amplify App (connected to GitHub) ---
    const amplifyApp = new amplify.CfnApp(this, "AmplifyApp", {
      name: "cochatech",
      platform: "WEB",
      repository: `https://github.com/${props.githubOrg}/${props.githubRepo}`,
      accessToken: cdk.SecretValue.secretsManager("github/cochatech-amplify-token").unsafeUnwrap(),
      buildSpec: JSON.stringify({
        version: 1,
        frontend: {
          phases: {
            preBuild: {
              commands: [
                "npm install -g pnpm",
                "pnpm install --frozen-lockfile",
              ],
            },
            build: { commands: ["pnpm build"] },
          },
          artifacts: {
            baseDirectory: "dist",
            files: ["**/*"],
          },
          cache: { paths: ["node_modules/**/*"] },
        },
      }),
      enableBranchAutoDeletion: true,
      customRules: [
        {
          source: "/<*>",
          target: "/index.html",
          status: "404-200",
        },
      ],
    });

    // --- Production branch (main) ---
    const mainBranch = new amplify.CfnBranch(this, "MainBranch", {
      appId: amplifyApp.attrAppId,
      branchName: "main",
      enableAutoBuild: true,
      stage: "PRODUCTION",
    });

    // --- Preview branches (feature/*) ---
    new amplify.CfnBranch(this, "PreviewBranches", {
      appId: amplifyApp.attrAppId,
      branchName: "feature",
      enableAutoBuild: true,
      stage: "DEVELOPMENT",
      enablePullRequestPreview: true,
    });

    // --- Custom Domain ---
    const domain = new amplify.CfnDomain(this, "CustomDomain", {
      appId: amplifyApp.attrAppId,
      domainName: props.domainName,
      subDomainSettings: [
        {
          branchName: mainBranch.branchName,
          prefix: "",
        },
        {
          branchName: mainBranch.branchName,
          prefix: "www",
        },
      ],
    });
    domain.addDependency(mainBranch);

    // --- GitHub Actions OIDC (import existing provider) ---
    const ghProviderArn = `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`;
    const ghProvider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      this,
      "GitHubOidc",
      ghProviderArn
    );

    const deployRole = new iam.Role(this, "GitHubActionsDeployRole", {
      roleName: "cochatech-github-actions-deploy",
      assumedBy: new iam.FederatedPrincipal(
        ghProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          },
          StringLike: {
            "token.actions.githubusercontent.com:sub": `repo:${props.githubOrg}/${props.githubRepo}:*`,
          },
        },
        "sts:AssumeRoleWithWebIdentity"
      ),
      maxSessionDuration: cdk.Duration.hours(1),
    });

    // Only CDK deploy permissions needed now (Amplify builds itself)
    deployRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "CDKDeploy",
        effect: iam.Effect.ALLOW,
        actions: ["sts:AssumeRole"],
        resources: [`arn:aws:iam::${this.account}:role/cdk-*`],
      })
    );

    // --- Outputs ---
    new cdk.CfnOutput(this, "AmplifyAppId", {
      value: amplifyApp.attrAppId,
    });

    new cdk.CfnOutput(this, "DeployRoleArn", {
      value: deployRole.roleArn,
    });

    new cdk.CfnOutput(this, "DomainUrl", {
      value: `https://${props.domainName}`,
    });
  }
}
