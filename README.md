# CivicSeva Engineering Standards (README.md)
civicseva is an intelligent assistant that makes the election process, time frame, and procedures simple and comprehensible for all to be able to actively engage in the elections process and remain well-informed
## Code Hygiene

- **TypeScript strict mode enforced** — `strict: true` in `tsconfig.json`
- **No `any` without justification** — use `unknown` and narrow with type guards
- **Explicit return types** for all exported functions
- **Modular architecture enforced** — components, hooks, services, utils, types separated
- **Separation of concerns** — no business logic inside JSX/UI components
- **Single Responsibility Principle** — each function does one thing only
- **Max function length: 40 lines** — break up larger functions into helpers
- **ESLint + Prettier with zero lint errors** — CI/CD blocks merges with errors
- **JSDoc required** for all exported functions and types
- **Proper error handling** — all async functions have try/catch; no silent failures
- **DRY principle** — no duplicate logic; extract shared utilities

## Code Security

- **Firebase Auth token validation** on all protected `/api` routes
- **Firestore security rules** enforce per-user data isolation
- **Input validation & sanitization** on all forms (prevent XSS, injection)
- **No hardcoded secrets** — all credentials in `.env` (excluded from git)
- **CORS restrictions** — whitelist only trusted origins in production
- **API rate limiting** — implemented via `express-rate-limit` on all endpoints
- **No sensitive data logging** — never log tokens, passwords, or PII
- **`npm audit`** run before every production deployment

## Testing & Reliability

- **Minimum 80% test coverage** enforced via Jest coverage thresholds
- **All tests must pass before deployment** — CI gates on `npm test`
- **No broken builds allowed** — TypeScript `tsc --noEmit` runs before build
- **Error boundaries** on all async React subtrees
- **Loading states** for all async operations

## Accessibility (WCAG 2.1 AA)

- `aria-label` on all interactive elements without visible text
- Full **keyboard navigation** — Tab order logical, Enter/Space on all buttons
- Minimum **4.5:1 color contrast** ratio for all text
- **Visible focus indicators** — never `outline: none` without an alternative
- **Screen reader announcements** — use `aria-live` for dynamic updates

## Deployment

- **Stateless backend** — no server-side session storage
- **No `console.log` in production** — use a proper logger with env gating
- **No unused imports or dead code** — ESLint `no-unused-vars` error level
- **Multi-stage Docker build** — minimize final image size with `node:22-alpine`
- **PORT environment variable** — Cloud Run compatible

## Definition of Done

A feature is "done" only when:

- [ ] Code meets all hygiene standards above
- [ ] Firestore security rules cover the new data
- [ ] All tests pass (`npm test`)
- [ ] No lint errors (`npm run lint`)
- [ ] No TypeScript errors (`tsc --noEmit`)
- [ ] Accessibility verified (keyboard + screen reader)
- [ ] Feature is functional in production (Cloud Run)
