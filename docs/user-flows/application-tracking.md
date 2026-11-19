# Application Tracking Flow

## Save an application

```text
Open a Fit Report or Applications
  → Select Save to Applications
  → Confirm job and Fit Report details
  → Create application with status Saved
  → Show the application in the Applications list
```

The saved application should retain the related job, Fit Report, selected CV, score, recommendation, and source URL.

## Applications list

```text
Open Applications
  → View summary counts
  → Search or filter applications
  → Sort by newest or another supported order
  → Open details or row actions
```

Supported first-version statuses:

```text
Saved
Ready to Apply
Applied
Assessment
Interview
Offer
Rejected
Archived
```

Status changes should be explicit and should create a timeline event.

## Application details

```text
Open an application
  → Review job details and current status
  → Review linked Fit Report
  → Review application timeline
  → Review next actions history
  → Add or edit notes
  → Update status or add a follow-up
```

## Add a follow-up

```text
Select Add Follow-up
  → Select action
  → Select due date
  → Optionally add a note
  → Save follow-up
  → Show it in the application and Follow-ups page
```

Supported actions include:

- Check application status.
- Prepare for assessment.
- Prepare for interview.
- Send thank-you message.
- Other.

## Follow-ups page

```text
Open Follow-ups
  → View Open or Completed items
  → Review items grouped by overdue, today, this week, and later
  → Select View Application when more context is needed
  → Select Mark done
  → Move the item to Completed
```

Overdue items should be visually distinct. Completing a follow-up should preserve its completion date and history.

## Delete or archive

- Deleting an application must require an explicit user action.
- The UI should explain whether related Fit Reports and follow-ups are also removed or retained.
- Archived applications remain available for history but are excluded from active counts by default.
