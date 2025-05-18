# ServiceNow Event Management Integration

This document outlines the integration between the Incident Management module and ServiceNow Event Management.

## Overview

The Event Management integration allows for automatic incident creation from monitored events in your infrastructure. This creates a streamlined workflow from infrastructure monitoring to incident resolution.

## Key Components

### 1. Event Rules

Event rules determine when and how events are converted to incidents. The following rules are included in this implementation:

- High-priority events automatically create P1 incidents
- Similar events are correlated to avoid duplicate incidents
- Events from critical services bypass correlation and create direct incidents

### 2. Alert Mapping

The project includes mapping between monitoring alerts and ServiceNow fields:

| Alert Field | ServiceNow Field | Notes |
|-------------|------------------|-------|
| Source | CMDB CI | Mapped to Configuration Item |
| Severity | Impact | Mapped with transformation |
| Message | Short Description | Prefixed with source system name |
| Details | Description | Full alert details |
| Priority | Urgency | Mapped with transformation |

### 3. Integration Components

The following components facilitate the Event Management integration:

- MID Server configuration for secure communication
- REST API endpoints for event ingestion
- Transform maps for field mapping
- Event correlation rules to prevent duplicate incidents

## Implementation Steps

1. Configure the MID Server on a server with access to monitoring systems
2. Set up integration user with appropriate roles
3. Import the event transformation maps
4. Configure alert forwarding from monitoring systems
5. Test the integration with sample events

## Sample Integration Code

### Event to Incident Transformation Script

```javascript
(function transformEvent(source, target, map, log, isUpdate) {
    // Copy the short description from the event
    if (source.u_short_description) {
        target.short_description = "[" + source.u_source + "] " + source.u_short_description;
    }
    
    // Map the severity to impact
    if (source.u_severity) {
        switch(source.u_severity.toString()) {
            case "critical":
                target.impact = 1; // High
                break;
            case "warning":
                target.impact = 2; // Medium
                break;
            default:
                target.impact = 3; // Low
        }
    }
    
    // Look up the CI based on source information
    if (source.u_ci_identifier) {
        var grCI = new GlideRecord('cmdb_ci');
        grCI.addQuery('name', source.u_ci_identifier);
        // Fall back to IP address if not found by name
        grCI.addOrCondition('ip_address', source.u_ci_identifier);
        grCI.query();
        if (grCI.next()) {
            target.cmdb_ci = grCI.sys_id;
        }
    }
    
    // Set default assignment based on the type of CI affected
    if (target.cmdb_ci) {
        var grCI = new GlideRecord('cmdb_ci');
        if (grCI.get(target.cmdb_ci)) {
            var ciType = grCI.getValue('sys_class_name');
            
            // Assign to the appropriate team based on CI type
            if (ciType == 'cmdb_ci_server') {
                // Set to Server team
                target.assignment_group = getGroupSysID('Server Support');
            } else if (ciType == 'cmdb_ci_appl') {
                // Set to Application team
                target.assignment_group = getGroupSysID('Application Support');
            } else if (ciType == 'cmdb_ci_netgear') {
                // Set to Network team
                target.assignment_group = getGroupSysID('Network Support');
            }
        }
    }
    
    // Helper function to look up group sys_id by name
    function getGroupSysID(groupName) {
        var grp = new GlideRecord('sys_user_group');
        grp.addQuery('name', groupName);
        grp.query();
        if (grp.next()) {
            return grp.sys_id;
        }
        return '';
    }
})(source, target, map, log, isUpdate);
```

## Testing Events

To test the event to incident flow, use the following REST API call:

```
POST /api/now/table/em_event
Content-Type: application/json

{
  "source": "Monitoring System",
  "u_source": "Nagios",
  "u_short_description": "CPU Utilization above 90%",
  "u_severity": "critical",
  "u_ci_identifier": "prod-app-server-01",
  "u_message_key": "cpu_util",
  "u_event_class": "Performance",
  "u_resource": "CPU"
}
```

This will create a high-priority incident assigned to the appropriate support team based on the CI type.
