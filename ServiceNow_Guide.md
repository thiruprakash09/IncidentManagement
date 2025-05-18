
## 🔧 Key Activities in ServiceNow

| Category | Activities |
|---------|------------|
| **Scripting** | Business Rules, Script Includes, Client Scripts, UI Policies, UI Actions, Scheduled Jobs |
| **Configuration** | Tables, Fields, ACLs, Dictionary Overrides, Form Layout |
| **Integration** | Scripted REST APIs, RESTMessageV2, Import Sets, MID Server Scripts |
| **Custom Apps** | Scoped Apps, App Engine Studio |
| **Database** | GlideRecord Queries, CMDB Management |
| **System Admin** | Update Sets, CI/CD, ATF, Monitoring |

---

## 🤖 Please follow these instructions, guidelines to create the proof of concept

### ✅ Scripting Help
- Generate GlideRecord queries
- Create Business Rules, Client Scripts, UI Actions
- Prompt Example:  
  `Write a before insert Business Rule on Incident table to auto-assign based on category`

### ✅ Table & Config Definitions
- Define table and field structure via prompt
- Role and ACL definitions
- Prompt Example:  
  `Create table with fields: incident_id (string), status (choice: open, in_progress, closed)`

### ✅ API Integration
- Create Scripted REST APIs and RESTMessageV2 scripts
- Prompt Example:  
  `ServiceNow Script to send incident data via RESTMessageV2`

### ✅ Workflow Automation
- Script logic for Flow Designer
- Input/Output transformation
- Prompt Example:  
  `Script step to log incident short description in uppercase`

### ✅ GlideRecord for DB Operations
- Query, update, delete operations
- Prompt Example:  
  `Delete all inactive users from sys_user table not logged in for 6 months`

### ✅ Admin/CI/CD Tasks
- GitHub Actions for deployment
- XML or JSON config handling
- Prompt Example:  
  `Create GitHub Actions workflow to deploy update set via REST API`

---


## 🏗 Recommended Setup

- Use **ServiceNow documentation as context**
- Use **Config-as-Code** with GitHub for tables/rules/scripts

---

