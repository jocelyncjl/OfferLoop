# Fit Analysis Flow

This is the main MVP value flow. It connects the user's CV and project evidence with a real job description and produces an application decision.

## Preparation flow

```text
Open Dashboard
  → Add or paste a CV
  → Save Base CV
  → Open Projects / Evidence
  → Add one or more projects
  → Add technologies and skills proved
  → Add project evidence and personal contribution
```

The first version may support pasted CV text before PDF or DOCX parsing is implemented.

## JD analysis flow

```text
Open JD Analyzer
  → Paste job description
  → Optionally enter job URL and job details
  → Select Analyze JD
  → Show loading state
  → Backend sends the JD for structured analysis
  → Show JD Summary
  → Save analyzed job for later Fit Reports
```

The analysis should extract:

- Required skills.
- Preferred skills.
- Role level and experience range.
- Responsibilities.
- Location and work mode.
- Graduate / junior signals.
- Sponsorship clues.

If analysis fails, keep the pasted JD available and allow the user to retry. Do not display a partial report as complete.

## Create Fit Report flow

```text
Open Fit Reports
  → Select Create Fit Report
  → Select an analyzed job
  → Select a CV
  → Review automatically matched projects and skills
  → Adjust evidence if needed
  → Select Generate Fit Report
  → Confirm AI credit usage
  → Show loading state
  → Generate and save report
  → Open Fit Report result
```

The review step must show:

- Selected job.
- Selected CV.
- Relevant projects and evidence.
- What the report will analyze.
- AI usage or credit cost.

## Fit Report result

The report should show:

```text
Application Quality Score
  → Recommendation
  → Strong evidence
  → Weak evidence
  → Missing skills
  → Role fit
  → Before-you-apply actions
  → Evidence-based CV suggestions
```

Recommendations are:

```text
Apply Now
Tailor First
Low Priority
Not a Fit
```

The user can then:

- Save the job to Applications.
- Download or share the report.
- Re-analyze the JD.
- Create another report using a different CV.
- Copy or mark a CV suggestion as applied.

## Evidence and AI rules

- Every matched skill should identify its evidence source where possible.
- Missing evidence must remain marked as missing; the AI must not fill the gap with invented experience.
- CV suggestions may improve wording but must remain supported by the original CV or project evidence.
- AI output must be validated against a structured response schema before it is stored or shown as a completed report.
