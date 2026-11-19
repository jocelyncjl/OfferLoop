# MVP Data Model

This document defines the main data objects and relationships for the GradFit Ireland MVP. It describes logical business relationships; the database will store each object in its own table and connect records with IDs and foreign keys.

## Core relationship diagram

```text
User
├── CV
├── Project
├── Job
│   └── JobAnalysis
├── FitReport
│   ├── Job
│   ├── JobAnalysis
│   ├── CV
│   ├── Project Evidence
│   └── CVSuggestion
└── Application
    ├── Job
    ├── FitReport (optional)
    ├── CV (optional)
    └── FollowUp
```

## Main relationships

```text
User 1 ──── N CV
User 1 ──── N Project
User 1 ──── N Job
Job 1 ──── N JobAnalysis
JobAnalysis 1 ──── N FitReport
CV 1 ──── N FitReport
FitReport N ──── N Project
FitReport 1 ──── N CVSuggestion
Job 1 ──── N Application
FitReport 1 ──── N Application
Application 1 ──── N FollowUp
```

## Object responsibilities

### User

The registered account and owner of private data. The MVP does not include a separate Profile / Settings module.

### CV

A CV saved by the user. A user can have a Base CV and multiple tailored CV versions.

### Project

A project and its evidence, including technologies used, skills proved, personal contribution, and outcomes.

### Job

The original job and job description saved or analyzed by the user.

### JobAnalysis

One structured analysis of a Job Description. It contains required skills, preferred skills, role level, responsibilities, location, work mode, graduate / junior signals, and sponsorship clues.

One Job may have multiple analyses if the user re-analyzes it or the analysis format changes. A Fit Report must identify the specific JobAnalysis used to generate it.

### FitReport

A matching result generated from a specific Job, JobAnalysis, CV, and project evidence. It contains the Application Quality Score, recommendation, matched evidence, weak evidence, missing skills, role fit, and CV suggestions.

### CVSuggestion

An evidence-based suggestion belonging to a FitReport. It may contain the current CV text, suggested text, related job requirement, evidence source, reason, and whether the user marked it as applied.

### Application

The user's job application tracking record. It references a Job and may reference the FitReport and CV used when the application was created.

`fit_report_id` is optional because the user may create an application directly from the Applications page before generating a Fit Report.

### FollowUp

A future action belonging to an Application, such as checking application status, preparing for an interview, or sending a thank-you message.

## Suggested table structure

```text
users
├── cvs
├── projects
├── jobs
│   └── job_analyses
├── fit_reports
│   ├── fit_report_projects
│   └── cv_suggestions
└── applications
    └── follow_ups
```

## Important foreign keys

```text
cvs.user_id → users.id
projects.user_id → users.id
jobs.user_id → users.id
job_analyses.job_id → jobs.id
fit_reports.user_id → users.id
fit_reports.job_id → jobs.id
fit_reports.job_analysis_id → job_analyses.id
fit_reports.cv_id → cvs.id
fit_report_projects.fit_report_id → fit_reports.id
fit_report_projects.project_id → projects.id
cv_suggestions.fit_report_id → fit_reports.id
applications.user_id → users.id
applications.job_id → jobs.id
applications.fit_report_id → fit_reports.id
applications.cv_id → cvs.id
follow_ups.application_id → applications.id
```

## Core business chain

```text
User
  → CV / Project
  → Job
  → JobAnalysis
  → FitReport
  → Application
  → FollowUp
```

The important distinction is:

```text
Job = the original job and JD content
JobAnalysis = one analysis version of that job
FitReport = a matching report based on that analysis version
Application = the user's tracking record for the job
```

The diagram represents business associations, not nested database documents. Each object should remain an independent table with explicit foreign-key constraints and user-ownership checks.
