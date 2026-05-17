# Roadmap: appConsulta

## Phase 1: Core Screens & Firebase Hookup (Logic Focus)
**Owner**: You (Logic/Navigation)
**Goal**: Build the routing structure and connect screens directly to Firebase to prove data flows.
- Setup Expo Router tabs (`/(abas)`) and stack navigation.
- Connect `consultaService.ts` to the Appointments tab and render raw Firebase data to the screen.
- Connect the Login screen to Firebase Auth (or bypass logic if Auth isn't strictly required yet).
- Wire up navigation between the raw unstyled screens (e.g., tapping an appointment opens Details).

## Phase 2: Base Layouts & Components (Style Focus)
**Owner**: Colleague (Styling)
**Goal**: Apply foundational styles to the raw data using basic Flexbox and colors.
**Specific Tasks**:
- **App Layout**: Add `SafeAreaView` and a consistent background color (e.g., light gray) to all screens.
- **Tab Bar**: Add icons to the bottom tabs using `@expo/vector-icons`.
- **Login Screen**: Style the text inputs (borders, padding, rounded corners) and the main login button (background color, white text, centered).
- **Appointment Cards**: Style the `CardConsulta` component. Give it a white background, rounded corners, a subtle shadow, and arrange the text using flexbox (row vs column).

## Phase 3: Forms, Search & Complex State (Logic Focus)
**Owner**: You (Logic/Navigation)
**Goal**: Build the interactive logic and complex multi-step forms.
- Connect `pacienteService.ts` to the Search screen (handle CPF queries).
- Implement the "Register Patient" form submission to Firestore.
- Build the multi-step "New Appointment" and "Return Appointment" flows (managing the state between screens).
- Implement the "Mark as Completed" button logic to update the Firestore document.

## Phase 4: Polish, Colors & Empty States (Style Focus)
**Owner**: Colleague (Styling)
**Goal**: Add visual polish, handle missing data states, and finalize the UI.
**Specific Tasks**:
- **Status Tags**: Add colored pill-shaped badges to the Appointment cards based on status (e.g., Green background for 'Completed', Orange for 'Waiting').
- **Empty States**: Style the "No patient found" screen. Add a large centered icon, a friendly text message, and style the "Register New Patient" button.
- **Flow Summary Cards**: In the multi-step forms, style the top summary card so it visually stands out from the rest of the form.
- **Profile Screen**: Style the "My Data" and "Change Password" cards to look like clickable menu items.
