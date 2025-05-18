# Integrating with ServiceNow Change Management

This guide explains how to integrate the Azure DevOps CI/CD pipeline with ServiceNow Change Management process.

## Overview

ServiceNow Change Management provides governance for making changes to your ServiceNow instance. By integrating your Azure DevOps pipeline with ServiceNow Change Management, you can:

1. Automatically create change requests for deployments
2. Track deployments in ServiceNow
3. Enforce change management policies
4. Provide audit trail for compliance

## Prerequisites

- ServiceNow instance with Change Management enabled
- Azure DevOps project with pipeline configured
- ServiceNow DevOps Integration extension installed in Azure DevOps
- Service account with appropriate permissions in ServiceNow

## Integration Steps

### 1. Configure Change Management in ServiceNow

1. Log in to your ServiceNow instance as an administrator
2. Navigate to **Change Management > Change Templates**
3. Create a template for Incident Management deployments:
   - Set template name to "Incident Management Deployment"
   - Set risk assessment to "Low/Medium"
   - Configure standard approval workflow
   - Add appropriate CAB (Change Advisory Board) members

### 2. Configure Azure DevOps ServiceNow Integration

1. In Azure DevOps, go to **Project Settings > Service Connections**
2. Select your ServiceNow connection
3. Click **Edit** and enable **Change Management Integration**
4. Set the following parameters:
   - Change Template: "Incident Management Deployment"
   - Change Type: "Standard Change"
   - Assignment Group: "ServiceNow Administrators" (or your team)
   - CI (Configuration Item): "Incident Management Application"

### 3. Update Pipeline YAML

Ensure your CD pipeline YAML includes the change management parameters:

```yaml
# Example CD pipeline task with change management integration
- task: ServiceNowDevOpsDeploy@1
  inputs:
    connectedServiceName: 'ServiceNow-Connection'
    instanceName: '$(servicenow.test.instance)'
    applicationName: 'IncidentManagement'
    deploymentType: 'Standard Change'
    changeSetName: 'IncidentManagement-$(Build.BuildNumber)'
    changeTemplateId: '$(change.template.id)'
    changeRequestDescription: 'Deployment of Incident Management updates. Build: $(Build.BuildNumber)'
```

### 4. Set Up Change Request Status Monitoring

Add a task to monitor the change request status:

```yaml
- task: ServiceNowDevOpsChangeStatus@1
  inputs:
    connectedServiceName: 'ServiceNow-Connection'
    instanceName: '$(servicenow.test.instance)'
    changeRequestNumber: '$(changeRequestNumber)'
    statusCheckRetryCount: '10'
    statusCheckInterval: '60'
```

### 5. Configure Notifications

1. In ServiceNow, navigate to **System Notifications > Email Notifications**
2. Create a notification for "Deployment Change Request Created"
3. Set the recipients to include your deployment team
4. Configure the email template to include deployment details

## Testing the Integration

1. Make a change to your repository
2. Push the change to trigger the pipeline
3. Monitor the pipeline execution
4. Verify that a change request is created in ServiceNow
5. Check that the deployment only proceeds after the change is approved

## Troubleshooting

If the integration fails, check these common issues:

- **Connection Issues**: Verify the service connection in Azure DevOps
- **Permission Issues**: Ensure the service account has appropriate roles
- **Template Issues**: Verify the change template ID is correct
- **Workflow Issues**: Check that the change approval workflow is configured correctly

## Additional Configuration

### Emergency Changes

For emergency deployments, create a separate pipeline that uses an emergency change template:

```yaml
- task: ServiceNowDevOpsDeploy@1
  inputs:
    connectedServiceName: 'ServiceNow-Connection'
    instanceName: '$(servicenow.prod.instance)'
    applicationName: 'IncidentManagement'
    deploymentType: 'Emergency Change'
    changeRequestDescription: 'EMERGENCY: Incident Management hotfix deployment. Build: $(Build.BuildNumber)'
```

### Compliance Reporting

Create a Power BI or ServiceNow dashboard to track:
- Number of changes by type
- Change success rate
- Average approval time
- Deployment frequency
