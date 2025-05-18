# ServiceNow SLA Management for Incidents

This document provides an overview of SLA management for the Incident Management module in ServiceNow.

## Overview

Service Level Agreements (SLAs) define the expected time frames for responding to and resolving incidents based on their priority, impact, and other characteristics. This project includes a comprehensive SLA framework for incident management.

## SLA Definitions

The following SLAs are defined in the system:

### Response Time SLAs

| Priority | Response Time | Business Hours |
|----------|---------------|----------------|
| 1 - Critical | 15 minutes | 24/7 |
| 2 - High | 30 minutes | 24/7 |
| 3 - Moderate | 2 hours | Business hours |
| 4 - Low | 8 hours | Business hours |
| 5 - Planning | 24 hours | Business hours |

### Resolution Time SLAs

| Priority | Resolution Time | Business Hours |
|----------|-----------------|----------------|
| 1 - Critical | 2 hours | 24/7 |
| 2 - High | 8 hours | 24/7 |
| 3 - Moderate | 24 hours | Business hours |
| 4 - Low | 5 business days | Business hours |
| 5 - Planning | 10 business days | Business hours |

## SLA Implementation

The SLAs are implemented using the following components:

### 1. SLA Definitions

JSON configuration for the Response Time SLA (Priority 1):

```json
{
    "name": "P1 Response",
    "duration": "15 minutes",
    "start_condition": "priority=1^state=1",
    "stop_condition": "priority!=1^ORstate!=1^ORassigned_to!=NULL",
    "reset_condition": "priority=1^state=1^assigned_to=NULL",
    "timezone": "UTC",
    "schedule": "24x7",
    "workflow": {
        "start": {
            "notification": "sla_about_to_breach",
            "percentage": 75
        },
        "breach": {
            "notification": "sla_breach",
            "script": "handleSLABreach"
        }
    }
}
```

### 2. SLA Scripts

Script to handle SLA breaches:

```javascript
/**
 * Script to handle SLA breaches for incidents
 * 
 * This script is triggered when an SLA is breached. It notifies management,
 * escalates the incident, and logs the breach.
 */
function handleSLABreach(current, sla) {
    // Get SLA details
    var slaName = sla.name;
    var incidentNumber = current.number;
    var incidentShortDesc = current.short_description;
    
    // Log the breach
    gs.log('SLA Breach: ' + slaName + ' for incident ' + incidentNumber, 'SLA Breach');
    
    // Add work note to the incident
    current.work_notes = 'SLA "' + slaName + '" has been breached. This incident requires immediate attention.';
    current.update();
    
    // Notify management
    var notifyMgr = notifyManagement(current, sla);
    
    // Escalate the incident if not assigned
    if (current.assigned_to.nil()) {
        escalateIncident(current);
    }
    
    return 'SLA breach handled for ' + incidentNumber;
}

/**
 * Notify management about an SLA breach
 */
function notifyManagement(incident, sla) {
    // Get the assignment group manager
    var manager = '';
    if (!incident.assignment_group.nil()) {
        var grp = new GlideRecord('sys_user_group');
        if (grp.get(incident.assignment_group)) {
            manager = grp.manager;
        }
    }
    
    // If no group manager, get the IT director
    if (!manager) {
        var role = new GlideRecord('sys_user_has_role');
        role.addQuery('role.name', 'it_director');
        role.query();
        if (role.next()) {
            manager = role.user;
        }
    }
    
    // Send the notification
    if (manager) {
        var notification = new GlideRecord('sysevent_email_action');
        notification.addQuery('name', 'SLA Breach Notification');
        notification.query();
        if (notification.next()) {
            gs.eventQueue('sla.breach', incident, manager, sla.sys_id);
            return true;
        }
    }
    
    return false;
}

/**
 * Escalate an incident when SLA is breached
 */
function escalateIncident(incident) {
    // Set a higher priority if not already at highest
    if (incident.priority > 1) {
        incident.priority--;
    }
    
    // Find the escalation group
    var escGroup = getEscalationGroup(incident.assignment_group);
    if (escGroup) {
        incident.assignment_group = escGroup;
    } else {
        // Default to IT Service Desk
        var grp = new GlideRecord('sys_user_group');
        grp.addQuery('name', 'IT Service Desk');
        grp.query();
        if (grp.next()) {
            incident.assignment_group = grp.sys_id;
        }
    }
    
    // Add escalation note
    incident.work_notes = 'Incident escalated due to SLA breach. Priority upgraded and reassigned to appropriate group.';
    incident.update();
    
    return true;
}

/**
 * Get the appropriate escalation group for an assignment group
 */
function getEscalationGroup(groupSysId) {
    if (!groupSysId) {
        return '';
    }
    
    // Could be replaced with a configuration table lookup
    var escalationMap = {
        'service_desk_group_id': 'tier2_group_id',
        'network_group_id': 'network_escalation_id',
        'database_group_id': 'dba_manager_group_id'
    };
    
    if (escalationMap.hasOwnProperty(groupSysId)) {
        return escalationMap[groupSysId];
    }
    
    // Look for Incident Management group
    var grp = new GlideRecord('sys_user_group');
    grp.addQuery('name', 'Incident Management');
    grp.query();
    if (grp.next()) {
        return grp.sys_id;
    }
    
    return '';
}
```

## SLA Monitoring

The system includes several ways to monitor SLAs:

1. **SLA Timeline Widget**: Shows upcoming SLA targets on the incident form
2. **SLA Reporting Dashboard**: Shows SLA compliance rates by priority and group
3. **SLA Status Indicators**: Visual indicators on incident lists and forms
4. **SLA Breach Notifications**: Automated emails when SLAs are breached

## Reporting

SLA reporting is provided through the following reports:

1. **SLA Compliance Report**: Overall compliance rates by assignment group
2. **Mean Time to Response**: Average time to respond by priority
3. **Mean Time to Resolution**: Average time to resolve by priority
4. **SLA Breach Analysis**: Analysis of common causes for SLA breaches

## Best Practices

1. Review SLA definitions periodically to ensure they align with business needs
2. Monitor SLA compliance trends to identify service delivery issues
3. Automate escalation paths for consistent handling of breaches
4. Include SLA information in incident notifications to set expectations
5. Create reports to track SLA performance by group and service
