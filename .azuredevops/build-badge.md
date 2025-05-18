# Azure DevOps Build Status Badge Configuration

To add a build status badge to your README.md, follow these steps:

1. In Azure DevOps, go to your pipeline
2. Click on the "..." menu and select "Status badge"
3. Copy the Markdown code
4. Paste it into your README.md

Alternatively, you can use this template and replace the placeholders:

```markdown
[![Build Status](https://dev.azure.com/{organization}/{project}/_apis/build/status/{repository}?branchName=main)](https://dev.azure.com/{organization}/{project}/_build/latest?definitionId={definitionId}&branchName=main)
```

Where:
- {organization} is your Azure DevOps organization name
- {project} is your Azure DevOps project name
- {repository} is your repository name
- {definitionId} is your pipeline definition ID (you can find this in the URL when viewing your pipeline)

Example:
```markdown
[![Build Status](https://dev.azure.com/myorg/ServiceNow-Projects/_apis/build/status/ServiceNow-IncidentManagement?branchName=main)](https://dev.azure.com/myorg/ServiceNow-Projects/_build/latest?definitionId=12&branchName=main)
```
