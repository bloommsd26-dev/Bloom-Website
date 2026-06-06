# Bloom Security Policy & Operations

## Security Features

### 🔐 Authentication

- **JWT-based Admin Access**: Secure stateless authentication using JSON Web Tokens.
- **Bcrypt Hashing**: All administrative passwords are salted and hashed using `bcryptjs`.
- **Server-Side Validation**: All admin pages and API routes verify sessions on the server to prevent data leaks.

### 🛡️ Protections

- **API Rate Limiting**: Public endpoints (`/api/contact`, `/api/volunteers`) are rate-limited (5 requests per minute per IP) to prevent spam and automated abuse.
- **Security Headers**: The application uses strict security headers, including `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection`.
- **Input Validation**: All data is validated using `Zod` and `Mongoose` schemas before database persistence.

### 🕵️ Monitoring

- **Error Tracking**: Integrated with **Sentry** for real-time error reporting and performance monitoring across the stack.
- **CodeQL**: Automated static analysis is enabled on the repository to catch vulnerabilities like tainted format strings and XSS.

## Operations & Maintenance

### 💾 Database Backups

**Critical Action**: Database backups must be managed via **MongoDB Atlas**.

1. Log in to the MongoDB Atlas Dashboard.
2. Navigate to **Deployment > Clusters**.
3. Select the **Backup** tab for your production cluster.
4. Ensure **Continuous Backup** or **Cloud Backup** is enabled.
5. Set the policy to **Daily** snapshots with at least a 7-day retention period.

### 🔑 Secret Management

- Never commit `.env` or `.env.local` files to source control.
- Rotate the `JWT_SECRET` immediately if an administrative account is compromised.
- Store production secrets securely in the Vercel Dashboard or your chosen hosting provider's environment settings.

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an e-mail to **bloom.msd26@gmail.com**. We will respond as soon as possible to investigate and remediate the issue.
