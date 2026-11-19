# CV Manager UI Design

CV Manager has two main states, based on whether the user has saved any CVs.

## New user state

![CV Manager for a new user](./images/cv-manager-new-user-dashboard-sidebar.png)

The empty state allows the user to:

- Upload a CV file.
- Paste CV text.
- See supported formats: PDF, DOCX, and TXT.
- See the 10MB upload limit.
- Learn why a CV is needed for fit analysis.

## Existing user state

![CV Manager for an existing user](./images/cv-manager-existing-user-dashboard-sidebar.png)

The existing state shows:

- Base CV marked as the default for new analyses.
- Tailored CV versions for specific roles.
- CV type, description, and last-updated date.
- View and overflow actions for each CV.
- Add CV primary action.
- Guidance for selecting the right CV during job analysis.

## Shared layout

Both states use the shared application shell with sidebar navigation, notification action, AI usage card, upgrade card, and user profile area.
