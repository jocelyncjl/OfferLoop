# Authentication Flow

## Registration

### User goal

Create a GradFit Ireland account so the user can save CVs, projects, Fit Reports, and applications.

### Flow

```text
Open /register
  → Enter full name, email, and password
  → Frontend validates the fields
  → Submit registration form
  → Backend validates and creates the account
  → Show success result
  → Redirect to /login
```

### Frontend behavior

- Trim the full name before submitting.
- Trim and lowercase the email before submitting.
- Keep the password unchanged when submitting.
- Validate minimum password length, number, uppercase letter, and maximum bcrypt byte length.
- Disable repeated submission while the request is in progress.
- Show field-level errors for invalid input.
- Show an email-specific error when the email is already registered.

### Backend behavior

- Validate all rules independently of the frontend.
- Normalize the email consistently.
- Check the unique email constraint.
- Hash the password with bcrypt.
- Never return the password or password hash.
- Return `201 Created` on success.

### Outcomes

| Condition | User-visible behavior |
|---|---|
| Valid registration | Account is created and user is redirected to `/login`. |
| Invalid input | The form remains open and displays validation guidance. |
| Email already exists | Email field displays that the address is already registered. |
| Server or network error | Form displays a retry message and remains usable. |

## Login

```text
Open /login
  → Enter email and password
  → Submit login form
  → Backend verifies credentials
  → Create authenticated session
  → Redirect to /dashboard
```

- Invalid credentials use a safe generic message.
- A successful login must not expose password or internal authentication details.
- If an authenticated user opens `/login` or `/register`, redirect them to `/dashboard`.

## Logout

```text
Open account menu
  → Select Log out
  → Invalidate the session
  → Redirect to /login
```

After logout, protected pages must redirect to `/login` and must not display cached private data.

## Protected route behavior

```text
Request protected page
  → Check authenticated session
  → Authenticated: render page
  → Not authenticated: redirect to /login
```
