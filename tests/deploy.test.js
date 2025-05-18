// Test file for deploy.js
const path = require('path');
const deployModule = path.resolve(__dirname, '../scripts/deploy');

// Mock required modules
jest.mock('axios');
jest.mock('fs');
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

// Mock process.env and process.argv
const originalEnv = process.env;
const originalArgv = process.argv;

beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    SN_DEV_INSTANCE: 'dev-mock.service-now.com',
    SN_DEV_USERNAME: 'dev-user',
    SN_DEV_PASSWORD: 'dev-pass',
    SN_TEST_INSTANCE: 'test-mock.service-now.com',
    SN_TEST_USERNAME: 'test-user',
    SN_TEST_PASSWORD: 'test-pass',
    SN_PROD_INSTANCE: 'prod-mock.service-now.com',
    SN_PROD_USERNAME: 'prod-user',
    SN_PROD_PASSWORD: 'prod-pass'
  };
  process.argv = ['/node', '/scripts/deploy.js'];
});

afterEach(() => {
  process.env = originalEnv;
  process.argv = originalArgv;
  jest.clearAllMocks();
});

// Mock console.log and console.error
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
let consoleOutput = [];

beforeAll(() => {
  console.log = jest.fn((...args) => {
    consoleOutput.push(args.join(' '));
  });
  console.error = jest.fn((...args) => {
    consoleOutput.push(args.join(' '));
  });
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
});

const axios = require('axios');

describe('ServiceNow Deployment Script', () => {
  test('deploys to dev environment by default', () => {
    // Set up mocks
    axios.post = jest.fn().mockResolvedValue({ data: { result: 'success' } });
    
    // Load the module to execute the script
    require(deployModule);
    
    // Check if the dev environment was selected
    expect(consoleOutput).toContain('Deploying to dev environment');
  });
  
  test('deploys to specified environment', () => {
    // Set up mocks
    axios.post = jest.fn().mockResolvedValue({ data: { result: 'success' } });
    process.argv = ['/node', '/scripts/deploy.js', 'test'];
    
    // Load the module to execute the script
    require(deployModule);
    
    // Check if the test environment was selected
    expect(consoleOutput).toContain('Deploying to test environment');
  });
  
  test('handles unknown environment', () => {
    process.argv = ['/node', '/scripts/deploy.js', 'unknown'];
    
    // Load the module to execute the script
    require(deployModule);
    
    // Check if error was logged
    expect(consoleOutput).toContain('Unknown environment: unknown');
  });
});
