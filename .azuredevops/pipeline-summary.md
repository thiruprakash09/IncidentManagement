# Azure DevOps CI/CD Pipeline for ServiceNow Incident Management

This document provides an overview of the CI/CD pipeline implementation for the ServiceNow Incident Management project.

## Pipeline Architecture

The pipeline is designed with a multi-stage approach to ensure quality and reliability when deploying ServiceNow customizations:

```
Build & Validate → Test → Deploy to Dev → Deploy to Test → Deploy to Production
```

### Key Features

- **Continuous Integration**: Automatically builds and validates configuration files on every commit
- **Automated Testing**: Runs Jest tests and ServiceNow ATF tests
- **Staged Deployment**: Progressive deployment through development, test, and production environments
- **Approval Gates**: Required approvals before deploying to test and production environments
- **Environment Isolation**: Separate configurations for each environment

## Pipeline Files

- `azure-pipelines.yml` - Main pipeline definition
- `.azuredevops/pipelines/ci-pipeline.yml` - CI pipeline template
- `.azuredevops/pipelines/cd-pipeline.yml` - CD pipeline template

## Workflow

1. **Trigger**: Pipeline triggers on commits to main and development branches
2. **Build Stage**: 
   - Installs dependencies
   - Lints JavaScript files
   - Validates ServiceNow configuration files

3. **Test Stage**:
   - Runs Jest tests for server-side scripts
   - Runs ServiceNow ATF tests through the ServiceNow API

4. **Deployment Stages**:
   - **Development**: Automatic deployment for changes to the development branch
   - **Test**: Requires approval before deploying to test environment (main branch only)
   - **Production**: Requires approval before deploying to production environment (main branch only)

## Security Considerations

- Credentials stored in Azure DevOps variable groups
- Service account with minimal permissions used for deployments
- Approvals required for critical environments
- Secrets never exposed in logs

## Prerequisites

To use this pipeline, you need:

1. Azure DevOps project
2. ServiceNow instances for development, test, and production
3. ServiceNow DevOps Integration extension installed
4. Variable groups configured with credentials
5. Service connection established to ServiceNow

## Deployment Notifications

The pipeline sends deployment notifications to:

1. ServiceNow change management
2. Team members through Azure DevOps notifications
3. Optional integration with Microsoft Teams or Slack

## Related Documentation

- [ServiceNow DevOps Integration Documentation](https://docs.servicenow.com/bundle/utah-servicenow-platform/page/administer/devops/concept/servicenow-devops.html)
- [Azure DevOps Pipelines Documentation](https://docs.microsoft.com/en-us/azure/devops/pipelines/?view=azure-devops)
- [ServiceNow ATF Documentation](https://docs.servicenow.com/bundle/utah-application-development/page/administer/automated-test-framework/concept/automated-test-framework.html)
