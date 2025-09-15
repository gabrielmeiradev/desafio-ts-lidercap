# About the project

A robust Node.js application built with TypeScript, following clean architecture principles and layered design patterns.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Overview

This application implements a clean, maintainable architecture with clear separation of concerns across multiple layers. It's designed to be scalable, testable, and easy to maintain.

### Key Features

- **Clean Architecture**: Layered design with clear boundaries
- **TypeScript**: Full type safety and modern JavaScript features
- **Error Handling**: Comprehensive error management system
- **Modular Design**: Organized code structure for easy maintenance
- **Scalable**: Built to handle growth in features and complexity

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- TypeScript

### Installation

```bash
# Clone the repository
git clone https://github.com/gabrielmeiradev/desafio-ts-lidercap
cd desafio-ts-lidercap

# Install dependencies
npm install

# Install TypeScript globally (if not already installed)
npm install -g typescript
```

### Environment Setup

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=3000
ALLOWED_ORIGINS=http://localhost:3000
```

### Running the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build
```

### Best Practices

- Write tests for new features and bug fixes.
- Use mocks and fixtures to isolate test cases.
- Ensure high code coverage for critical modules.
- Run tests before every commit and pull request.

## API Documentation

### Base URL

```

http://localhost:3000/api

```

### Error Response Format

```json
{
  "statusCode": 400,
  "message": "User ID should be a number"
}
```

## Endpoints

### Users

- `GET /api/users/:userId` - Get user data
- `GET /api/users/:userId/full` - Get full user data, including posts and comments on the first post
- `GET /api/users/:userId/posts` - Get all posts for a user

### Posts

- `GET /api/posts/:postId/comments` - Get comments for a post

### Health Check

- `GET /health` - Get the health status of the server

## Development

### Code Style

This project uses:

- ESLint for code linting
- Prettier for code formatting

```bash
# Lint code
npm run lint
```

### Adding New Features

1. **Define Entity** - Create data models in `entities/`
2. **Create Repository** - Implement data access in `repositories/`
3. **Build Service** - Add business logic in `services/`
4. **Setup Controller** - Handle HTTP logic in `controllers/`
5. **Define Routes** - Add endpoints in `routes/`
6. **Add Error Handling** - Create custom errors if needed

### Development Workflow

```bash
# Create feature branch
git checkout -b feat/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Run tests
npm test

# Push and create PR
git push origin feat/new-feature
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
tests/
├── controllers/  # Controllers tests
├── services/     # Services tests
```

## Deployment

### Production Build

```bash
# Build the application
npm run build

# The compiled JavaScript will be in the dist/ directory
```

### Environment Variables

Ensure these environment variables are set in production:

```env
NODE_ENV=production
PORT=3000

# Add other production-specific variables
```

## Contributing

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Create a feature branch
5. Make your changes
6. Run tests and linting
7. Submit a pull request

### Commit Convention

This project follows conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Pull Request Guidelines

- Include a clear description of changes
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass
- Follow the existing code style
