---
paths:
  - "prisma/**"
  - "**/prisma/**"
---

# Prisma & Database Standards

## Schema changes:
- Every schema change must be accompanied by a migration (`npx prisma migrate dev`)
- Consider rollback strategy before applying
- Never delete columns with production data without a data migration plan
- Add `@default` values where appropriate to avoid breaking existing records
- Use `@@map` and `@map` for snake_case table/column names in Postgres

## Query patterns:
- Always use Prisma client — never raw SQL unless absolutely necessary
- If raw SQL is needed: use `$queryRaw` with tagged template literals (parameterised)
- Include `select` or `include` to avoid fetching unnecessary data
- Use transactions for multi-step operations
- Add appropriate indexes for frequently queried fields

## Naming:
- Models: PascalCase singular (User, Contractor, ServiceRequest)
- Fields: camelCase (firstName, createdAt)
- Relations: descriptive names (assignedContractor, not contractor2)
- Enums: SCREAMING_SNAKE_CASE values

## After schema changes:
1. `npx prisma generate` — regenerate client types
2. `npx tsc` — verify no type errors
3. Update any affected API routes and components
