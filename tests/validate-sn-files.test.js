// Test file for validate-sn-files.js
const fs = require('fs');
const path = require('path');
const validateModule = path.resolve(__dirname, '../scripts/validate-sn-files');

// Mock fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  readdirSync: jest.fn(),
  existsSync: jest.fn(),
  statSync: jest.fn()
}));

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

beforeEach(() => {
  jest.resetModules();
  consoleOutput = [];
  jest.clearAllMocks();
});

describe('ServiceNow File Validation Script', () => {
  test('validates a valid business rule file', () => {
    // Mock file system
    const mockBusinessRule = {
      sys_id: 'abcd1234',
      name: 'Test Business Rule',
      collection: 'incident',
      when: 'before',
      operation: 'update',
      script: 'function onBefore(current, previous) { // Implementation }'
    };
    
    fs.existsSync.mockReturnValue(true);
    fs.statSync.mockReturnValue({ isDirectory: () => true });
    fs.readdirSync.mockReturnValueOnce(['BusinessRules']) // Root directories
                  .mockReturnValueOnce(['test_rule.json']); // BusinessRules directory contents
    fs.readFileSync.mockReturnValueOnce(JSON.stringify(mockBusinessRule));
    
    // Run the validation
    require(validateModule);
    
    // Check if validation passed without errors
    expect(consoleOutput).toContain('Validation completed successfully');
    expect(consoleOutput).not.toContain('Error:');
  });

  test('detects an invalid business rule file', () => {
    // Mock file system with invalid business rule (missing required properties)
    const mockInvalidBusinessRule = {
      sys_id: 'abcd1234',
      name: 'Test Business Rule',
      // Missing collection, when, operation, script
    };
    
    fs.existsSync.mockReturnValue(true);
    fs.statSync.mockReturnValue({ isDirectory: () => true });
    fs.readdirSync.mockReturnValueOnce(['BusinessRules']) // Root directories
                  .mockReturnValueOnce(['invalid_rule.json']); // BusinessRules directory contents
    fs.readFileSync.mockReturnValueOnce(JSON.stringify(mockInvalidBusinessRule));
    
    // Run the validation
    require(validateModule);
    
    // Check if validation detected errors
    expect(consoleOutput.some(line => line.includes('Error:'))).toBe(true);
    expect(consoleOutput.some(line => line.includes('Missing required property'))).toBe(true);
  });
});
