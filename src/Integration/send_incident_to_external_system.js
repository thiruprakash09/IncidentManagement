/**
 * RESTMessageV2 script to send incident information to an external ITSM system
 * 
 * @param {string} incidentSysId - The sys_id of the incident to send
 * @return {object} Result of the REST call
 */
function sendIncidentToExternalSystem(incidentSysId) {
    if (!incidentSysId) {
        gs.error('No incident sys_id provided for external system integration');
        return {
            success: false,
            message: 'No incident sys_id provided'
        };
    }
    
    // Look up the incident
    var incident = new GlideRecord('incident');
    if (!incident.get(incidentSysId)) {
        gs.error('Could not find incident with sys_id: ' + incidentSysId);
        return {
            success: false,
            message: 'Incident not found'
        };
    }
    
    try {
        // Create a new REST message
        var restMessage = new sn_ws.RESTMessageV2('External ITSM System', 'Post Incident');
        
        // Set the endpoint and authentication profile (usually configured on the REST message record)
        // restMessage.setEndpoint('https://api.external-itsm.example.com/incidents');
        // restMessage.setAuthenticationProfile('basic', 'ExternalITSMCredentials');
        
        // Prepare the JSON payload
        var payload = {
            externalId: incident.number.toString(),
            title: incident.short_description.toString(),
            description: incident.description.toString(),
            priority: incident.priority.toString(),
            caller: {
                id: incident.caller_id.toString(),
                name: incident.caller_id.getDisplayValue()
            },
            status: incident.state.getDisplayValue(),
            created: incident.sys_created_on.getDisplayValue(),
            category: incident.category.toString(),
            subcategory: incident.subcategory.toString()
        };
        
        // Set query parameters
        restMessage.setQueryParameter('source', 'servicenow');
        
        // Set the request body
        restMessage.setRequestBody(JSON.stringify(payload));
        
        // Execute the REST call
        var response = restMessage.execute();
        
        // Process the response
        var responseBody = response.getBody();
        var statusCode = response.getStatusCode();
        
        if (statusCode == 200 || statusCode == 201) {
            // Parse the response
            var responseJson = JSON.parse(responseBody);
            
            // Log the successful integration
            gs.info('Successfully sent incident ' + incident.number + ' to external system. External ID: ' + 
                   (responseJson.id || 'Not returned'));
            
            // You might want to store the external system's ID in a custom field
            incident.u_external_reference = responseJson.id || 'Sent successfully';
            incident.update();
            
            return {
                success: true,
                statusCode: statusCode,
                externalId: responseJson.id,
                message: 'Incident successfully sent to external system'
            };
        } else {
            gs.error('Failed to send incident to external system. Status: ' + statusCode + ', Response: ' + responseBody);
            
            return {
                success: false,
                statusCode: statusCode,
                response: responseBody,
                message: 'Failed to send incident to external system'
            };
        }
    } catch (ex) {
        var errorMsg = 'Exception occurred while sending incident to external system: ' + ex.message;
        gs.error(errorMsg);
        
        return {
            success: false,
            message: errorMsg
        };
    }
}

// Example usage:
// var incidentId = 'your-incident-sys-id';
// var result = sendIncidentToExternalSystem(incidentId);
// gs.info('Integration result: ' + JSON.stringify(result));
