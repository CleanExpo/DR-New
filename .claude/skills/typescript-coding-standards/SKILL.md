---
name: typescript-coding-standards
description: "TypeScript coding standards for the DR-NRPG platform. Loaded automatically when working on .ts/.tsx files. Covers types, async patterns, error handling, naming, and best practices."
paths:
  - "**/*.ts"
  - "**/*.tsx"
---

# TypeScript Coding Standards

## Core Rules
- TS strict mode. Zero `any`. Zero untyped exports.
- Explicit return types on all exported functions.
- Interfaces for object shapes. Type aliases for unions/intersections.
- Async/await over raw promises. Always try/catch with typed errors.
- Optional chaining (?.) and nullish coalescing (??) over manual null checks.
- Never use non-null assertion (!) unless justified with a comment.
- const by default. let only when value changes. Never var.
- Destructuring for cleaner code. Template literals for string interpolation.

## File Limits
- Functions: <40 lines. Extract if exceeding.
- Files: <300 lines. Split if exceeding.
- No dead code. No unused imports. No commented-out blocks.

## Naming
- Components: PascalCase (UserDashboard.tsx)
- Utilities: kebab-case (date-formatter.ts)
- Services: kebab-case (booking.service.ts)
- Types: kebab-case (user.types.ts)
- Tests: .test.ts or .spec.ts
- Constants: SCREAMING_SNAKE_CASE
- Enums: PascalCase with SCREAMING_SNAKE_CASE values

## Exports
- Named exports preferred over default exports.
- Barrel exports (index.ts) for module directories.
- JSDoc on every exported function.

## Error Handling
- Custom error classes: ValidationError, NotFoundError, UnauthorizedError, ConflictError
- Always log with context (userId, bookingId, etc.)
- Never expose internal errors to clients
- Consistent API response format: `{ success: boolean, data?: T, error?: { code, message } }`
