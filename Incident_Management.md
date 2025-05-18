
# Prompt Library for ServiceNow: Incident Management Module

A curated list of prompts to use development in the Incident Management module of ServiceNow.

---

## ✅ 1. GlideRecord Operations

```
Write a GlideRecord script to fetch all incidents created in the last 24 hours.
```

```
Create a GlideRecord loop that closes all incidents older than 30 days with state "Resolved".
```

```
Fetch all incidents where the caller is inactive and assigned to a specific group.
```

---

## ✅ 2. Business Rules

```
Create a 'before insert' business rule to auto-assign incident based on the category.
```

```
Write a business rule that prevents updating an incident if it is already in 'Closed' state.
```

```
Add a business rule to set urgency to 'High' when priority is 1.
```

---

## ✅ 3. Client Scripts

```
Write an onChange client script to make the "impact" field mandatory when "priority" is 1.
```

```
Create a client script to auto-fill caller's location when caller is selected.
```

```
Show a warning message if the short description contains the word "urgent".
```

---

## ✅ 4. UI Policies / UI Actions

```
Create a UI Policy to make the "Assigned to" field read-only if the state is 'Closed'.
```

```
Add a UI Action (button) to escalate the incident and update state to "In Progress".
```

```
Create a UI Action to reassign the incident to the caller's manager.
```

---

## ✅ 5. Script Includes

```
Write a Script Include with a reusable function to fetch the number of open incidents for a given caller.
```

```
Create a Script Include to get the incident age in days.
```

---

## ✅ 6. Notifications / Emails

```
Create an email notification when an incident is reassigned.
```

```
Write a script to include custom message body in incident resolution email with resolution notes.
```

---

## ✅ 7. Scheduled Jobs

```
Create a scheduled job to auto-close incidents in 'Resolved' state for more than 7 days.
```

```
Scheduled job script to notify assigned users of all incidents older than 15 days.
```

---

## ✅ 8. Integration (REST/SOAP)

```
Write a RESTMessageV2 script to send incident number and priority to an external ITSM system.
```

```
Create a Scripted REST API to expose incident details for external systems.
```

```
Handle inbound REST API to create new incidents with short description and caller ID.
```

---

## ✅ 9. Flow Designer / Automation

```
Create a Flow Designer step to auto-assign incident based on the user's location.
```

```
Script to pause incident workflow until the 'Impact' field is filled.
```

---

## ✅ 10. Testing / ATF (Automated Test Framework)

```
Create an ATF test to verify that an incident is auto-assigned correctly.
```

```
Test that closed incidents cannot be reopened via form UI.
```

---

## 🏁 Bonus: Documentation & Commenting

```
Add inline comments to a Script Include used for calculating SLA breach time.
```

```
Generate documentation for all incident-related business rules and their trigger conditions.
```
