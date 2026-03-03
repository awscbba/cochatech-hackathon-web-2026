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

    // --- Amplify App ---
    const amplifyApp = new amplify.CfnApp(this, "AmplifyApp", {
      name: "cochatech",
      platform: "WEB",
      buildSpec: cdk.Fn.sub(
        JSON.stringify({
          version: 1,
          frontend: {
            phases: {
              preBuild: { commands: ["npm ci"] },
              build: { commands: ["npm run build"] },
            },
            artifacts: {
              baseDirectory: "dist",
              files: ["**/*"],
            },
            cache: { paths: ["node_modules/**/*"] },
          },
        })
      ),
      customRules: [
        {
          source: "/<*>",
          target: "/index.html",
          status: "404-200",
        },
      ],
    });

    const mainBranch = new amplify.CfnBranch(this, "MainBranch", {
      appId: amplifyApp.attrAppId,
      branchName: "main",
      enableAutoBuild: false, // We deploy via GitHub Actions
      stage: "PRODUCTION",
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

    deployRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "AmplifyDeploy",
        effect: iam.Effect.ALLOW,
        actions: [
          "amplify:CreateDeployment",
          "amplify:StartDeployment",
          "amplify:GetApp",
          "amplify:GetBranch",
        ],
        resources: [
          `arn:aws:amplify:${this.region}:${this.account}:apps/${amplifyApp.attrAppId}/*`,
          `arn:aws:amplify:${this.region}:${this.account}:apps/${amplifyApp.attrAppId}`,
        ],
      })
    );

    deployRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "CDKDeploy",
        effect: iam.Effect.ALLOW,
        actions: [
          "sts:AssumeRole",
        ],
        resources: [
          `arn:aws:iam::${this.account}:role/cdk-*`,
        ],
      })
    );

    // --- Outputs ---
    new cdk.CfnOutput(this, "AmplifyAppId", {
      value: amplifyApp.attrAppId,
      description: "Amplify App ID — add as AMPLIFY_APP_ID secret in GitHub",
    });

    new cdk.CfnOutput(this, "DeployRoleArn", {
      value: deployRole.roleArn,
      description: "IAM Role ARN — add as AWS_ROLE_ARN secret in GitHub",
    });

    new cdk.CfnOutput(this, "DomainUrl", {
      value: `https://${props.domainName}`,
    });
  }
}
