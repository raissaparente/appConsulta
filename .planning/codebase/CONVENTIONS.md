# Coding Conventions

- **Language**: TypeScript is strictly used for all logic, components, and models to ensure type safety.
- **Linting**: ESLint is configured to enforce code quality (`eslint.config.js`, `eslint-config-expo`).
- **File Naming**:
  - Components and Pages use `PascalCase` (e.g., `Card.tsx`).
  - Hooks use `camelCase` with a `use` prefix (e.g., `useConsulta.ts`).
  - Services use `camelCase` with a `Service` suffix (e.g., `consultaService.ts`).
  - Models use `PascalCase` for files containing interfaces/types (e.g., `Consulta.ts`).
- **Routing**: Follows Expo Router's file-based routing conventions (directories represent routes, `_layout.tsx` for shared UI, `index.tsx` for default route).
