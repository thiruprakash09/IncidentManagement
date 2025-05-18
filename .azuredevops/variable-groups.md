# ServiceNow Variable Groups for Azure DevOps
# This file defines the variable groups that need to be created in Azure DevOps

# Variable Group Name: servicenow-credentials
# Description: Credentials for ServiceNow instances
# Variables:
# - servicenow.dev.instance: [Your Dev Instance URL]
# - servicenow.dev.username: [Your Dev Username]
# - servicenow.dev.password: [Your Dev Password] (Set as Secret)
# - servicenow.test.instance: [Your Test Instance URL]
# - servicenow.test.username: [Your Test Username]
# - servicenow.test.password: [Your Test Password] (Set as Secret)
# - servicenow.prod.instance: [Your Prod Instance URL]
# - servicenow.prod.username: [Your Prod Username]
# - servicenow.prod.password: [Your Prod Password] (Set as Secret)

# Instructions:
# 1. In Azure DevOps, go to Pipelines > Library
# 2. Click "+ Variable group"
# 3. Name it "servicenow-credentials"
# 4. Add the variables listed above
# 5. Mark the password variables as secret
# 6. Click "Save"

# Example Values (Replace with your actual values):
# servicenow.dev.instance: dev12345.service-now.com
# servicenow.test.instance: test12345.service-now.com
# servicenow.prod.instance: prod12345.service-now.com
