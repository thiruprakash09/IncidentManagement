# ServiceNow Incident Management Project

This project contains a ServiceNow Incident Management implementation using Config-as-Code approach.

[![Build Status](https://dev.azure.com/YourOrg/YourProject/_apis/build/status/IncidentManagement?branchName=main)](https://dev.azure.com/YourOrg/YourProject/_build/latest?definitionId=1&branchName=main)

## 📋 Project Structure

- **src/** - Source code and configuration files
  - **BusinessRules/** - Business rules for incident automation
  - **ClientScripts/** - Client-side scripts for form behavior
  - **ScriptIncludes/** - Reusable server-side script functions
  - **UIActions/** - Custom UI actions (buttons) for the incident form
  - **UIPolicy/** - UI policies for form field behavior
  - **Notifications/** - Email notification templates and scripts
  - **ScheduledJobs/** - Background scheduled jobs
  - **Integration/** - REST and SOAP integration scripts
  - **FlowDesigner/** - Flow Designer scripts and configurations
  - **ATF/** - Automated Test Framework tests
  - **TableConfig/** - Table and field definitions

## 🚀 Getting Started

### Setting Up Local Development

1. Clone this repository
2. Create a `.env` file based on `.env.template` with your ServiceNow credentials
3. Run `npm install` to install dependencies
4. Use `npm run validate` to validate configuration files
5. Use `npm run deploy:dev` to deploy to development environment

### Setting Up CI/CD Pipeline

1. Create a new Azure DevOps project or use an existing one
2. Push this repository to Azure DevOps
3. Follow the guide in `.azuredevops/service-connection-setup.md` to set up ServiceNow connection
4. Create variable groups as defined in `.azuredevops/variable-groups.md`
5. In Azure DevOps, go to Pipelines and create a new pipeline
6. Select "Azure Repos Git" as source and select your repository
7. Choose "Existing Azure Pipelines YAML file" and select `azure-pipelines.yml`
8. Run the pipeline

## 🔄 CI/CD Pipeline

This project includes a complete CI/CD pipeline implementation for Azure DevOps:

### Pipeline Features

- **Automated Validation**: Validates all ServiceNow configuration files
- **Automated Testing**: Runs Jest tests and ServiceNow ATF tests
- **Multi-Environment Deployment**: Deploys to dev, test, and production environments
- **Approval Gates**: Requires approvals before deploying to test and production

### Pipeline Documentation

- `.azuredevops/pipeline-summary.md`: Overview of the pipeline architecture
- `.azuredevops/deployment-guide.md`: Step-by-step deployment guide
- `.azuredevops/service-connection-setup.md`: How to set up ServiceNow connection
- `.azuredevops/variable-groups.md`: Required variable groups configuration

### Pipeline Workflow

1. Code is committed to the repository
2. Pipeline validates configuration files and runs tests
3. If tests pass, code is deployed to development environment
4. After approval, code is deployed to test environment
5. After final approval, code is deployed to production environment

## 🔧 Key Features

- Auto-assignment of incidents based on category
- Advanced incident state management
- SLA calculation and breach notification
- Integration with external systems
- Comprehensive testing suite

## 📚 Documentation

Each component includes inline documentation. See the `docs/` folder for comprehensive guides.
