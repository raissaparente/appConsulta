# appConsulta

## What This Is

A medical appointment management application for hospital employees. It allows employees to manage daily appointments, search for patients, register new patients, schedule new or return appointments, and manage their own profile.

## Core Value

Empower hospital employees to quickly and efficiently manage patient appointments and records without complex navigation.

## Requirements

### Validated

- ✓ Basic project structure (Expo Router, Firebase integration) - existing

### Active

- [ ] [Authentication] Login with employee ID and password
- [ ] [Appointments] View today's schedule and appointment details
- [ ] [Appointments] Mark appointments as completed or schedule returns
- [ ] [Search] Search patient by CPF and view history
- [ ] [Registration] Register new patients
- [ ] [Flows] Multi-step flows for new and return appointments
- [ ] [Profile] View employee data and change password

### Out of Scope

- Real-time chat (Not requested, out of scope for MVP)
- Patient-facing app (This is an employee-facing management app)
- Mock Data (We are hooking directly into Firebase from Phase 1)

## Context

- **Technical Environment**: React Native with Expo (v54), Expo Router for navigation, Firebase for backend.
- **Team**: 2 beginner dev students. Work is split between Logic/Navigation (User) and Styling (Colleague).

## Constraints

- **Tech stack**: Must use React Native, Expo Router, and Firebase.
- **Task Division**: Work must be distinctly separated into logic/navigation vs. styling tasks to accommodate the 2 beginner students.
- **Data Source**: The application must connect directly to Firebase from the beginning, bypassing any mock data integration.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Separation of Concerns | Split phases explicitly into Logic vs Styling to match team skills. | — Pending |
| Direct Firebase Integration | Avoid throwaway work by hooking directly into the existing Firebase services from Phase 1 instead of using mock data. | — Pending |

---
*Last updated: 2026-05-14 after roadmap revision*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
