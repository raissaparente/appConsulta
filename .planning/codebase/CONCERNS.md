# Concerns & Technical Debt

- **Lack of Automated Testing**: There are no unit or integration tests currently configured. This could lead to regressions as the app grows.
- **Mock Data Integration**: Services currently seem to have access to both Firebase and mock data. It's crucial to ensure a clean separation or an environment variable toggle to prevent mock data from being used in a production environment.
- **Error Handling Validation**: The error handling mechanisms across services and hooks should be reviewed to ensure robust fallback behaviors and appropriate user feedback when Firebase requests fail or network issues occur.
