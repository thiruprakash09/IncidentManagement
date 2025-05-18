# Azure DevOps CI/CD Pipeline for ServiceNow - Deployment Guide

This guide will help you set up and deploy the Azure DevOps CI/CD pipeline for your ServiceNow Incident Management implementation.

## Prerequisites

- Azure DevOps account with permissions to create pipelines
- ServiceNow instance(s) for development, testing, and production
- Administrator access to ServiceNow instances for creating service accounts
- ServiceNow DevOps Integration extension installed in Azure DevOps

## Step 1: Prepare Your ServiceNow Instances

For each environment (dev, test, prod):

1. Create a dedicated service account for CI/CD deployment
2. Assign the appropriate roles to this account:
   - admin
   - rest_api_explorer
   - cicd_user

## Step 2: Set Up Azure DevOps Project

1. Create a new project in Azure DevOps or use an existing one
2. Push your code to the Azure DevOps repository
3. Install ServiceNow DevOps Integration extension from the marketplace

## Step 3: Create ServiceNow Service Connection

Follow the instructions in `.azuredevops/service-connection-setup.md` to:

1. Create a service connection named `ServiceNow-Connection`
2. Verify the connection works correctly

## Step 4: Create Variable Groups

Create a variable group named `servicenow-credentials` with the following variables:

- servicenow.dev.instance
- servicenow.dev.username
- servicenow.dev.password (mark as secret)
- servicenow.test.instance
- servicenow.test.username
- servicenow.test.password (mark as secret)
- servicenow.prod.instance
- servicenow.prod.username
- servicenow.prod.password (mark as secret)

## Step 5: Set Up Environments and Approvals

1. In Azure DevOps, go to Pipelines > Environments
2. Create three environments: Development, Test, Production
3. For the Test environment, add an approval check:
   - Go to the Test environment > Approvals and checks
   - Add an "Approvals" check
   - Add required approvers from your team
4. For the Production environment, add a stricter approval check with multiple approvers

## Step 6: Create and Run the Pipeline

1. In Azure DevOps, go to Pipelines > New Pipeline
2. Select "Azure Repos Git" as the source
3. Select your repository
4. Choose "Existing Azure Pipelines YAML file"
5. Select `/azure-pipelines.yml`
6. Review the pipeline definition and click "Run"

## Step 7: Monitor and Troubleshoot

1. Monitor the pipeline runs
2. Check pipeline logs for any issues
3. Verify deployments in ServiceNow
4. Review test results

## Pipeline Workflow

The pipeline follows this workflow:

1. **Build Stage**: 
   - Install dependencies
   - Lint JavaScript files
   - Validate ServiceNow configuration files

2. **Test Stage**:
   - Run Automated Test Framework (ATF) tests

3. **Deploy to Development**:
   - Triggered for the development branch
   - Deploys to Development ServiceNow instance

4. **Deploy to Test**:
   - Triggered for the main branch
   - Requires approval
   - Deploys to Test ServiceNow instance

5. **Deploy to Production**:
   - Triggered after successful Test deployment
   - Requires approval
   - Deploys to Production ServiceNow instance

## Troubleshooting

- **Service Connection Issues**: Verify credentials and URL
- **Variable Group Access**: Ensure the pipeline has access to variable groups
- **Deployment Failures**: Check ServiceNow logs for detailed errors
- **Test Failures**: Review ATF test results for failures

For more detailed troubleshooting, consult the ServiceNow DevOps documentation.
