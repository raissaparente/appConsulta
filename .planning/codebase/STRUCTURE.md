# Codebase Structure

- `/app`: File-based routing handled by Expo Router.
  - `/(abas)`: Tab navigation group (e.g., home, pesquisa).
  - `/agendamento`: Appointment scheduling screens.
  - `/consulta`: Appointment details and management screens.
  - `/paciente`: Patient-related screens.
- `/assets`: Static assets like images and fonts.
- `/constants`: Application-wide constants (e.g., colors, theme configurations).
- `/src/components`: Reusable UI components (e.g., `Card.tsx`, `CardConsulta.tsx`).
- `/src/data`: Mock data for development, testing, and fallback (`consultasMock.ts`, etc.).
- `/src/hooks`: Custom React hooks for state management and data fetching.
- `/src/models`: TypeScript interfaces for the domain entities.
- `/src/services`: Service classes or functions for interacting with Firebase and APIs.
