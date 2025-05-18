/**
 * GlideRecord script to close all incidents older than 30 days with state "Resolved"
 * 
 * @description This script finds all incidents in "Resolved" state that have not been 
 *              updated in the last 30 days and closes them automatically
 * @author Incident Management Team
 * @created 2025-05-18
 */
var closedCount = 0;
var incGr = new GlideRecord('incident');

// Find all resolved incidents not updated in 30 days
incGr.addQuery('state', '6'); // 6 = Resolved
incGr.addQuery('sys_updated_on', '<', gs.daysAgoStart(30));
incGr.query();

gs.info('Found ' + incGr.getRowCount() + ' incidents to auto-close');

while (incGr.next()) {
    // Log the incident we're about to close
    gs.info('Auto-closing incident: ' + incGr.number + ' - ' + incGr.short_description);
    
    // Update the incident to closed state
    incGr.state = 7; // 7 = Closed
    incGr.close_notes = 'Automatically closed after 30 days in Resolved state';
    incGr.closed_by = gs.getUserID();
    incGr.closed_at = new GlideDateTime();
    
    // Update the record
    if (incGr.update()) {
        closedCount++;
    } else {
        gs.error('Failed to close incident: ' + incGr.number);
    }
}

gs.info('Successfully closed ' + closedCount + ' incidents');
return 'Closed ' + closedCount + ' incidents';
