# Setting Up ServiceNow Service Connection in Azure DevOps

This guide walks you through setting up a service connection to ServiceNow in Azure DevOps.

## Prerequisites

1. Azure DevOps account with admin permissions
2. ServiceNow account with admin permissions
3. ServiceNow DevOps Integration Extension installed in Azure DevOps

## Steps to Configure ServiceNow Service Connection

1. **Install ServiceNow DevOps Extension**:
   - Go to the [Azure DevOps Marketplace](https://marketplace.visualstudio.com/items?itemName=ServiceNow.now-azure-devops)
   - Click "Get it free"
   - Select your organization and install

2. **Create ServiceNow Service Connection**:
   - In Azure DevOps, go to Project Settings > Service Connections
   - Click "New service connection"
   - Select "ServiceNow" from the list
   - Fill in the details:
     - Connection name: `ServiceNow-Connection`
     - ServiceNow URL: Your ServiceNow instance URL (e.g., `https://dev12345.service-now.com`)
     - Username: ServiceNow admin username
     - Password: ServiceNow admin password
   - Click "Save"

3. **Verify Connection**:
   - After creating the connection, it should appear in your Service Connections list
   - You can verify it by running a simple pipeline task that uses the connection

## Security Considerations

- Create a dedicated service account in ServiceNow for the connection
- Assign only the necessary roles to this account
- Store credentials in Azure DevOps secure variable groups
- Regularly rotate the service account password

## Troubleshooting

If the connection fails, check these common issues:
- Incorrect ServiceNow URL (ensure it includes https://)
- Invalid credentials
- Insufficient permissions for the ServiceNow account
- Network restrictions between Azure DevOps and ServiceNow

For more details, consult the [ServiceNow DevOps Documentation](https://docs.servicenow.com/bundle/utah-servicenow-platform/page/administer/devops/concept/servicenow-devops.html).
