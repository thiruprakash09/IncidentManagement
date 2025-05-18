# Contributing to ServiceNow Incident Management

Thank you for your interest in contributing to our ServiceNow Incident Management implementation! This document provides guidelines and instructions for contributing to this project.

<!-- ## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an open and welcoming environment. -->

## How to Contribute

### Reporting Bugs

1. Ensure the bug hasn't already been reported by searching our [Issues](https://github.com/your-org/servicenow-incident-management/issues)
2. If you're unable to find an open issue addressing the problem, open a new one with:
   - A clear title
   - A detailed description of the issue
   - Steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable
   - Environment information (ServiceNow instance, browser, etc.)

### Suggesting Enhancements

1. Open a new issue with:
   - A clear title
   - Detailed description of the enhancement
   - Examples of how the enhancement would be used
   - Any relevant documentation or links

### Code Contributions

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the validation tests (`npm run validate`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Workflow

1. Clone the repository
2. Create a `.env` file based on `.env.template` with your ServiceNow credentials
3. Install dependencies with `npm install`
4. Make your changes
5. Validate your changes with `npm run validate`
6. Test your changes locally with `npm run deploy:dev`

## Pull Request Process

1. Update the README.md or documentation with details of changes if necessary
2. Update examples if applicable
3. The PR should work with the CI/CD pipeline
4. PRs require review from at least one maintainer
5. Once approved, a maintainer will merge your PR

## ServiceNow File Standards

When adding new ServiceNow files, ensure:

1. Each file is properly formatted as JSON
2. Required fields are included (see `scripts/validate-sn-files.js` for details)
3. Files are placed in the correct directory based on type
4. Files include appropriate documentation comments

## Style Guidelines

### JavaScript

- Follow ESLint rules defined in the project
- Use camelCase for variable and function names
- Include JSDoc comments for functions
- Log meaningful messages with appropriate log levels

### ServiceNow Scripts

- Include header comments with purpose, table, and when/operation info
- Use meaningful variable names
- Add comments for complex logic
- Add work notes when making automated changes to records

## CI/CD Pipeline

All contributions will go through our CI/CD pipeline which:

1. Validates file structure and content
2. Runs linting and tests
3. Deploys to development environment for verification
4. Requires approvals for test and production deployments

## Questions?

If you have questions about contributing, please contact the project maintainers or open an issue marked as a question.
