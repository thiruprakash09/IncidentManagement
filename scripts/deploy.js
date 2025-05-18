/**
 * ServiceNow Deployment Script
 * 
 * This script deploys ServiceNow components to the specified environment
 * using the ServiceNow API.
 * 
 * Usage: node deploy.js [environment]
 * Where environment is one of: dev, test, prod
 */

require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Get the environment from command line args
const environment = process.argv[2] || 'dev';
console.log(`Deploying to ${environment} environment`);

// Configuration for different environments
const config = {
  dev: {
    instance: process.env.SN_DEV_INSTANCE || 'dev12345.service-now.com',
    username: process.env.SN_DEV_USERNAME,
    password: process.env.SN_DEV_PASSWORD,
  },
  test: {
    instance: process.env.SN_TEST_INSTANCE || 'test12345.service-now.com',
    username: process.env.SN_TEST_USERNAME,
    password: process.env.SN_TEST_PASSWORD,
  },
  prod: {
    instance: process.env.SN_PROD_INSTANCE || 'prod12345.service-now.com',
    username: process.env.SN_PROD_USERNAME,
    password: process.env.SN_PROD_PASSWORD,
  }
};

// Check if we have configuration for the selected environment
if (!config[environment]) {
  console.error(`Unknown environment: ${environment}`);
  process.exit(1);
}

// Check if we have credentials
if (!config[environment].username || !config[environment].password) {
  console.error(`Missing credentials for ${environment} environment`);
  console.error('Please set the appropriate environment variables in .env file');
  process.exit(1);
}

// ServiceNow API client
const snClient = axios.create({
  baseURL: `https://${config[environment].instance}/api/now`,
  auth: {
    username: config[environment].username,
    password: config[environment].password
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Source directory
const sourceDir = path.resolve(__dirname, '../src');

// Function to create a new update set
async function createUpdateSet() {
  try {
    const response = await snClient.post('/table/sys_update_set', {
      name: `Incident Management Update ${new Date().toISOString()}`,
      description: 'Deployed via CI/CD pipeline',
      state: 'in progress'
    });
    
    console.log('Created update set:', response.data.result.sys_id);
    return response.data.result.sys_id;
  } catch (error) {
    console.error('Error creating update set:', error.response?.data || error.message);
    throw error;
  }
}

// Function to set the current update set
async function setCurrentUpdateSet(updateSetId) {
  try {
    const response = await snClient.put(`/table/sys_update_set/${updateSetId}`, {
      state: 'in progress',
      current: true
    });
    
    console.log('Set current update set to:', updateSetId);
    return true;
  } catch (error) {
    console.error('Error setting current update set:', error.response?.data || error.message);
    throw error;
  }
}

// Function to deploy a business rule
async function deployBusinessRule(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    console.log(`Deploying business rule: ${data.name}`);
    
    const response = await snClient.post('/table/sys_script', {
      name: data.name,
      collection: data.collection,
      description: data.description,
      active: true,
      when: data.when,
      script: data.script,
      operation: data.operation
    });
    
    console.log(`Deployed business rule: ${data.name} with sys_id: ${response.data.result.sys_id}`);
    return response.data.result.sys_id;
  } catch (error) {
    console.error(`Error deploying business rule from ${file}:`, error.response?.data || error.message);
    throw error;
  }
}

// Function to deploy a client script
async function deployClientScript(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    
    console.log(`Deploying client script: ${data.name}`);
    
    const response = await snClient.post('/table/sys_script_client', {
      name: data.name,
      table: data.table,
      field_name: data.field_name,
      script: data.script,
      type: data.script_type,
      description: data.description,
      active: true
    });
    
    console.log(`Deployed client script: ${data.name} with sys_id: ${response.data.result.sys_id}`);
    return response.data.result.sys_id;
  } catch (error) {
    console.error(`Error deploying client script from ${file}:`, error.response?.data || error.message);
    throw error;
  }
}

// Main deployment function
async function deploy() {
  try {
    // Create an update set
    const updateSetId = await createUpdateSet();
    await setCurrentUpdateSet(updateSetId);
    
    // Deploy business rules
    const businessRulesDir = path.join(sourceDir, 'BusinessRules');
    if (fs.existsSync(businessRulesDir)) {
      const files = fs.readdirSync(businessRulesDir).filter(file => file.endsWith('.json'));
      
      for (const file of files) {
        await deployBusinessRule(path.join(businessRulesDir, file));
      }
      
      console.log(`Deployed ${files.length} business rules`);
    }
    
    // Deploy client scripts
    const clientScriptsDir = path.join(sourceDir, 'ClientScripts');
    if (fs.existsSync(clientScriptsDir)) {
      const files = fs.readdirSync(clientScriptsDir).filter(file => file.endsWith('.json'));
      
      for (const file of files) {
        await deployClientScript(path.join(clientScriptsDir, file));
      }
      
      console.log(`Deployed ${files.length} client scripts`);
    }
    
    // Add more deployment functions for other components
    
    // Complete the update set
    await snClient.put(`/table/sys_update_set/${updateSetId}`, {
      state: 'complete',
      current: false
    });
    
    console.log('Deployment completed successfully!');
    
  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
}

// Run the deployment
deploy();
