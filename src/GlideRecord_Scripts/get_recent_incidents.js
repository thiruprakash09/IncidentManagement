/**
 * GlideRecord script to fetch all incidents created in the last 24 hours
 * 
 * @description This script retrieves all incidents created within the past 24 hours
 * @author Incident Management Team
 * @created 2025-05-18
 */
var incidents24Hours = [];
var incGr = new GlideRecord('incident');
incGr.addQuery('sys_created_on', '>', gs.hoursAgoStart(24));
incGr.orderByDesc('sys_created_on');
incGr.query();

while (incGr.next()) {
    incidents24Hours.push({
        number: incGr.number.toString(),
        short_description: incGr.short_description.toString(),
        priority: incGr.priority.toString(),
        created_on: incGr.sys_created_on.getDisplayValue(),
        caller: incGr.caller_id.getDisplayValue()
    });
}

gs.info('Found ' + incidents24Hours.length + ' incidents created in the last 24 hours');
return incidents24Hours;
