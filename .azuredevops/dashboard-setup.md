# Azure DevOps Dashboard Configuration

This document provides instructions for setting up a dashboard in Azure DevOps to monitor your ServiceNow Incident Management CI/CD pipeline.

## Creating the Dashboard

1. In Azure DevOps, go to **Dashboards** under **Overview**
2. Click **+ New Dashboard**
3. Name it "ServiceNow Incident Management CI/CD"
4. Select "Team Dashboard" and choose your team
5. Click **Create**

## Recommended Widgets

Add the following widgets to your dashboard:

### Pipeline Monitoring

- **Build History**: Shows recent builds and their status
  - Configure it to show your CI/CD pipeline

- **Deployment Status**: Shows deployment status across environments
  - Configure it to monitor your Release Pipeline

- **Test Results Trend**: Shows test pass rate over time
  - Configure it to show your Jest and ATF test results

### Code Quality

- **Code Coverage**: Shows test coverage metrics
  - Configure it to show coverage from Jest tests

- **Pull Request Status**: Shows open PRs and their status

### Work Items

- **Sprint Burndown**: Shows progress toward sprint goals
- **Work Item Query**: Shows open bugs related to the pipeline or deployments

## Sample Dashboard Layout

```
┌───────────────────┬───────────────────┬───────────────────┐
│                   │                   │                   │
│  Build History    │  Deployment       │  Test Results     │
│                   │  Status           │  Trend            │
│                   │                   │                   │
├───────────────────┼───────────────────┼───────────────────┤
│                   │                   │                   │
│  Code Coverage    │  Pull Request     │  Sprint           │
│                   │  Status           │  Burndown         │
│                   │                   │                   │
├───────────────────┴───────────────────┼───────────────────┤
│                                       │                   │
│  Work Item Query                      │  Deployment       │
│  (Open Bugs)                          │  Frequency        │
│                                       │                   │
└───────────────────────────────────────┴───────────────────┘
```

## Adding Query Widgets

For the Work Item Query widget, create a query that shows:

```sql
SELECT [System.Id], [System.WorkItemType], [System.Title], [System.AssignedTo], [System.State], [System.Tags]
FROM WorkItems
WHERE [System.TeamProject] = @project
AND [System.WorkItemType] = 'Bug'
AND [System.State] <> 'Closed'
AND [System.Tags] CONTAINS 'Pipeline' OR [System.Tags] CONTAINS 'Deployment'
ORDER BY [System.ChangedDate] DESC
```

## Setting Up Email Alerts

To get notified when builds fail:

1. Go to **Project Settings**
2. Select **Notifications**
3. Create a new subscription
4. Choose "A build completes" event
5. Set condition to "Build quality equals Failed"
6. Set your email as the recipient
