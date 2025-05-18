/**
 * GlideRecord script to fetch all incidents where the caller is inactive and assigned to a specific group
 * 
 * @description This script identifies incidents that may need reassignment because
 *              they belong to inactive users but are still assigned to a specific group
 * @author Incident Management Team
 * @created 2025-05-18
 * @params {string} groupID - The sys_id of the group to filter incidents by
 */
function getInactiveCallerIncidents(groupID) {
    var results = [];
    
    if (!groupID) {
        gs.error('Group ID is required');
        return results;
    }
    
    var incGr = new GlideRecord('incident');
    incGr.addQuery('assignment_group', groupID);
    
    // Join to the user table to check active status
    var userJoin = incGr.addJoinQuery('sys_user', 'caller_id', 'sys_id');
    userJoin.addCondition('active', '=', 'false');
    
    incGr.orderBy('number');
    incGr.query();
    
    while (incGr.next()) {
        results.push({
            number: incGr.number.toString(),
            short_description: incGr.short_description.toString(),
            caller: incGr.caller_id.getDisplayValue(),
            assigned_to: incGr.assigned_to.getDisplayValue(),
            state: incGr.state.getDisplayValue()
        });
    }
    
    gs.info('Found ' + results.length + ' incidents with inactive callers in the specified group');
    return results;
}

// Example usage:
// var helpDeskGroup = '7cd32a3dc0a8010991a3edf9263ef150'; // Example sys_id
// var incidents = getInactiveCallerIncidents(helpDeskGroup);
