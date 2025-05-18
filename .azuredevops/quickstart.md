# CI/CD Quick Start Guide

This quick start guide helps you set up the CI/CD pipeline for ServiceNow Incident Management in Azure DevOps.

## Prerequisites

- Azure DevOps account and organization
- ServiceNow instances (dev, test, prod)
- ServiceNow admin credentials for each environment
- Git installed on your local machine

## Step 1: Set Up Local Repository

```powershell
# Clone the repository
git clone <your-repo-url>
cd IncidentManagement

# Install dependencies
npm install

# Create .env file for local development
cp .env.template .env
# Edit .env with your ServiceNow credentials
```

## Step 2: Set Up Azure DevOps Project

1. Log in to [Azure DevOps](https://dev.azure.com)
2. Create a new project named "ServiceNow-IncidentManagement"
3. Initialize a repository with the same name
4. Push your local repository to Azure DevOps:

```powershell
git remote add azure https://dev.azure.com/your-org/ServiceNow-IncidentManagement/_git/ServiceNow-IncidentManagement
git push -u azure main
```

## Step 3: Install Required Extensions

1. In Azure DevOps, go to the [Marketplace](https://marketplace.visualstudio.com)
2. Search for "ServiceNow DevOps"
3. Install the "ServiceNow DevOps Integration" extension to your organization

## Step 4: Configure ServiceNow Connection

1. In Azure DevOps, go to Project Settings > Service Connections
2. Click "New service connection" > ServiceNow
3. Configure the connection:
   - Name: ServiceNow-Connection
   - URL: Your ServiceNow instance URL
   - Username and Password: ServiceNow admin credentials
4. Click "Save"

## Step 5: Create Variable Groups

1. In Azure DevOps, go to Pipelines > Library
2. Click "Variable groups" > "+ Variable group"
3. Create a variable group named "servicenow-credentials"
4. Add the following variables:
   - servicenow.dev.instance
   - servicenow.dev.username
   - servicenow.dev.password (mark as secret)
   - servicenow.test.instance
   - servicenow.test.username
   - servicenow.test.password (mark as secret)
   - servicenow.prod.instance
   - servicenow.prod.username
   - servicenow.prod.password (mark as secret)
5. Click "Save"

## Step 6: Create Environments

1. In Azure DevOps, go to Pipelines > Environments
2. Create three environments: Development, Test, Production
3. For Test and Production, add approval checks:
   - Click on the environment > Approvals and checks
   - Add an "Approvals" check
   - Add required approvers

## Step 7: Set Up Pipeline

1. In Azure DevOps, go to Pipelines > Pipelines
2. Click "New pipeline"
3. Select "Azure Repos Git" > Your repository
4. Select "Existing Azure Pipelines YAML file"
5. Select "/azure-pipelines.yml"
6. Click "Run"

## Step 8: Configure ServiceNow Change Management Integration

1. Follow the instructions in `.azuredevops/change-management-integration.md`
2. Create the necessary change templates in ServiceNow
3. Update the pipeline configuration if needed

## Step 9: Set Up Dashboard

1. Follow the instructions in `.azuredevops/dashboard-setup.md`
2. Create a dashboard to monitor the pipeline

## Step 10: Run Your First Deployment

1. Make a small change to a file in the repository
2. Commit and push the change
3. Monitor the pipeline execution
4. Verify the deployment in your ServiceNow instance

## Troubleshooting

If you encounter issues, check:
- Pipeline logs for detailed error messages
- ServiceNow system logs for integration issues
- Variable group access permissions
- Service connection configuration

## Next Steps

- Set up branch policies to enforce code reviews
- Configure automated testing for your ServiceNow customizations
- Set up email notifications for pipeline status
- Create documentation for your team on using the pipeline
