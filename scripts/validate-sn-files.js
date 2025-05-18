/**
 * ServiceNow File Validation Script
 * 
 * This script validates the structure and content of ServiceNow configuration files.
 * It ensures that required properties are present and that the file structure is correct.
 */

const fs = require('fs');
const path = require('path');

// Source directory
const sourceDir = path.resolve(__dirname, '../src');

// Validation schemas for different file types
const schemas = {
  businessRule: {
    required: ['sys_id', 'name', 'collection', 'when', 'operation', 'script'],
    scriptRequired: true
  },
  clientScript: {
    required: ['sys_id', 'name', 'table', 'script_type', 'script'],
    scriptRequired: true
  },
  uiAction: {
    required: ['sys_id', 'name', 'table', 'action_name', 'script'],
    scriptRequired: true
  },
  scriptInclude: {
    required: ['sys_id', 'name', 'script'],
    scriptRequired: true
  },
  notification: {
    required: ['sys_id', 'name', 'table', 'condition', 'subject', 'body'],
    scriptRequired: false
  },
  scheduledJob: {
    required: ['sys_id', 'name', 'script', 'schedule'],
    scriptRequired: true
  }
};

// Function to validate a JSON file against a schema
function validateFile(file, schema) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    // Check required fields
    for (const field of schema.required) {
      if (!data[field]) {
        return { valid: false, error: `Missing required field: ${field}` };
      }
    }
    
    // Check script content if required
    if (schema.scriptRequired && (!data.script || !data.script.trim())) {
      return { valid: false, error: 'Script content is empty' };
    }
    
    return { valid: true };
  } catch (error) {
    return { valid: false, error: `Error parsing file: ${error.message}` };
  }
}

// Function to validate all files in a directory
function validateDirectory(dir, schema) {
  console.log(`Validating files in ${dir}...`);
  
  if (!fs.existsSync(dir)) {
    console.log(`  Directory does not exist: ${dir}`);
    return { total: 0, valid: 0, invalid: 0, errors: [] };
  }
  
  const files = fs.readdirSync(dir).filter(file => file.endsWith('.json'));
  let valid = 0;
  let invalid = 0;
  const errors = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const result = validateFile(filePath, schema);
    
    if (result.valid) {
      valid++;
      console.log(`  ✅ ${file}`);
    } else {
      invalid++;
      console.log(`  ❌ ${file}: ${result.error}`);
      errors.push({ file, error: result.error });
    }
  }
  
  return { total: files.length, valid, invalid, errors };
}

// Main validation function
function validateAll() {
  const results = {};
  let totalFiles = 0;
  let totalValid = 0;
  let totalInvalid = 0;
  const allErrors = [];
  
  // Validate business rules
  const businessRulesDir = path.join(sourceDir, 'BusinessRules');
  results.businessRules = validateDirectory(businessRulesDir, schemas.businessRule);
  
  // Validate client scripts
  const clientScriptsDir = path.join(sourceDir, 'ClientScripts');
  results.clientScripts = validateDirectory(clientScriptsDir, schemas.clientScript);
  
  // Validate UI actions
  const uiActionsDir = path.join(sourceDir, 'UIActions');
  results.uiActions = validateDirectory(uiActionsDir, schemas.uiAction);
  
  // Validate script includes
  const scriptIncludesDir = path.join(sourceDir, 'ScriptIncludes');
  results.scriptIncludes = validateDirectory(scriptIncludesDir, schemas.scriptInclude);
  
  // Validate notifications
  const notificationsDir = path.join(sourceDir, 'Notifications');
  results.notifications = validateDirectory(notificationsDir, schemas.notification);
  
  // Validate scheduled jobs
  const scheduledJobsDir = path.join(sourceDir, 'ScheduledJobs');
  results.scheduledJobs = validateDirectory(scheduledJobsDir, schemas.scheduledJob);
  
  // Calculate totals
  for (const category in results) {
    totalFiles += results[category].total;
    totalValid += results[category].valid;
    totalInvalid += results[category].invalid;
    allErrors.push(...results[category].errors);
  }
  
  // Print summary
  console.log('\nValidation Summary:');
  console.log('------------------');
  console.log(`Total files: ${totalFiles}`);
  console.log(`Valid files: ${totalValid}`);
  console.log(`Invalid files: ${totalInvalid}`);
  
  if (allErrors.length > 0) {
    console.log('\nErrors:');
    for (const error of allErrors) {
      console.log(`- ${error.file}: ${error.error}`);
    }
    
    // Exit with error code if any invalid files
    process.exit(1);
  }
  
  console.log('\nAll files are valid ✅');
}

// Run the validation
validateAll();
