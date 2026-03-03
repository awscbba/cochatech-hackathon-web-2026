#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CochaTechStack } from "../lib/cochatech-stack";

const app = new cdk.App();

new CochaTechStack(app, "CochaTechStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  domainName: "cocha.tech",
  githubOrg: app.node.tryGetContext("githubOrg"),
  githubRepo: app.node.tryGetContext("githubRepo"),
});
