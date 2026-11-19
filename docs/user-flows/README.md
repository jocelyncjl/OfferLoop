# User Flows

This directory describes how a user moves through the GradFit Ireland MVP. Each flow connects the UI states to the backend behavior that will be defined in the API contracts.

## Core flows

- [Authentication](./auth.md): register, log in, log out, and access protected pages.
- [Fit analysis](./fit-analysis.md): add a CV and project evidence, analyze a JD, and generate a Fit Report.
- [Application tracking](./application-tracking.md): save a job, manage its status, add follow-ups, and review history.

## MVP user journey

```text
Register
  → Log in
  → Add CV
  → Add project evidence
  → Paste and analyze a JD
  → Generate Fit Report
  → Save job to Applications
  → Add follow-up
  → Update application status
```

## Shared rules

- A user must be authenticated to access Dashboard, CV Manager, Projects / Evidence, JD Analyzer, Fit Reports, Applications, and Follow-ups.
- A user can only read or change their own CVs, projects, analyses, reports, applications, and follow-ups.
- AI suggestions must use evidence supplied by the user. The system must not invent skills, experience, or project details.
- Work authorisation and sponsorship information is for organisation and reminders only; it is not legal or visa advice.
