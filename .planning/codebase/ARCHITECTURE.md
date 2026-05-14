# Architecture

The application follows a modular architecture utilizing Expo Router for navigation and a structured data access layer.

## Layers
- **UI Layer (`app/` & `src/components/`)**: Handles rendering and user interaction. Employs Expo Router for file-based routing and navigation flow.
- **Business Logic / State (`src/hooks/`)**: Custom hooks (e.g., `useConsulta`, `usePaciente`, `useBuscaPaciente`) manage local state and business rules, effectively decoupling logic from the UI components.
- **Service Layer (`src/services/`)**: Abstracts data fetching and manipulation. Interfaces directly with Firebase and handles integration with mock data.
- **Data Models (`src/models/`)**: Defines the shape of the domain entities using TypeScript interfaces (`Consulta`, `Paciente`, `Medico`, `HorarioDisponivel`).
