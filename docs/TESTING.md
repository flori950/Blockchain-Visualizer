# Testing Documentation

## Overview

This project includes a comprehensive testing framework built with Vitest, @testing-library/react, and related tools.

## Test Coverage

Current test coverage: **62.56%** (24 tests passing)

### Test Files

- `src/test/blockchain.test.ts` - Core blockchain utilities (9 tests)
- `src/test/App.test.tsx` - Main App component (5 tests)
- `src/test/components/Block.test.tsx` - Block component (4 tests)
- `src/test/components/ControlPanel.test.tsx` - Control panel component (6 tests)

## Running Tests

### Basic Test Commands

```bash
# Run tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Configuration

- **Test Runner**: Vitest
- **Environment**: jsdom (for DOM testing)
- **Testing Library**: @testing-library/react
- **Globals**: Available (describe, it, expect, vi)
- **Coverage**: V8 provider with HTML and text reports

## Pre-commit Hooks

The project includes automated quality checks before commits:

### Husky Configuration

- **Pre-commit**: Runs lint-staged and tests
- **Commit-msg**: Validates commit message format with commitlint

### Lint-staged Rules

- TypeScript/React files: ESLint fix + Prettier format
- CSS/Markdown files: Prettier format

### Commit Message Format

Uses conventional commits:

```
feat: add new blockchain feature
fix: resolve mining validation issue
docs: update README with new information
test: add comprehensive component tests
```

## Code Quality Tools

- **ESLint**: Code quality and style checking
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Commitlint**: Commit message validation

## Test Structure

Tests follow the Arrange-Act-Assert pattern and include:

- Component rendering tests
- User interaction tests
- Blockchain logic tests
- Integration tests with React context

## Coverage Goals

Future improvements should focus on:

- Increasing context/reducer test coverage
- Adding more blockchain utility edge cases
- Testing error handling scenarios
- Improving component interaction tests
