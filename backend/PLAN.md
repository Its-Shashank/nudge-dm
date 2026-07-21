# NudgeDM Backend — Remaining Work Plan

MVP APIs are built and verified (`scripts/verify.ts`). This plan tracks what's left before production.

---

## Phase 1 — Integration & quick wins

**Goal:** Connect frontend and fix config gaps.

| Task | Priority | Notes |
|------|----------|-------|
| Frontend API client + cookie auth | High | `credentials: 'include'`, base URL from env |
| Split `API_URL` vs `FRONTEND_URL` | High | Stop using `BETTER_AUTH_URL` for dashboard redirects |
| Add `CORS_ORIGIN` to `.env.example` | Medium | Already used in `app.ts` |
| Call `sendWelcomeEmail` on register | Low | Method exists, not wired |
| Add `npm run verify` script | Low | Wraps `scripts/verify.ts` |

---

## Phase 2 — Auth & account features

**Goal:** Complete user lifecycle beyond register/login.

| Task | Priority | Notes |
|------|----------|-------|
| Password reset / forgot password | High | Expose Better Auth flows via `/auth/*` |
| Email verification | Medium | `emailVerified` field exists, not enforced |
| `PATCH /auth/me` profile update | Medium | Name, image |
| Account deletion endpoint | Low | `sendAccountDeletedEmail` exists |
| Extract `auth.service.ts` | Low | Refactor from controller (optional) |

---

## Phase 3 — Billing polish

**Goal:** Real Stripe + self-serve subscription management.

| Task | Priority | Notes |
|------|----------|-------|
| Stripe Customer Portal endpoint | High | Cancel / update payment method |
| Sandbox Stripe webhook simulator | Medium | `POST /billing/webhook/sandbox` for local testing |
| Real Stripe keys + Stripe CLI webhooks | High | Required before go-live |
| Document price IDs in `.env.example` | Low | |

---

## Phase 4 — Instagram & automation reliability

**Goal:** Production-safe DM automation.

| Task | Priority | Notes |
|------|----------|-------|
| Instagram token refresh job | High | `expiresAt` stored, never renewed |
| OAuth `state` param (CSRF) | High | Callback has no state validation |
| Duplicate comment dedup | High | Same `commentId` can fire twice |
| Job queue for automation delays | Medium | `setTimeout` lost on restart |
| Filter automations by `media.id` | Low | Webhook has media, not used |
| Separate Meta webhook verify token | Low | Currently uses `FB_APP_SECRET` |
| Fix sandbox IG account collision | Low | `mock_ig_account_789` is global |

---

## Phase 5 — Testing, docs & deploy

**Goal:** Ship with confidence.

| Task | Priority | Notes |
|------|----------|-------|
| Jest/Vitest integration tests | High | Beyond `scripts/verify.ts` |
| Backend README | High | Setup, env, migrate, seed, sandbox |
| Security headers (`helmet`) | Medium | Mentioned in original plan |
| Rate limit `/automations`, `/billing` | Medium | Only auth/webhooks limited today |
| Health check includes DB ping | Low | `/health` is liveness only |
| Dockerfile + CI pipeline | Medium | |
| Remove unused `bcryptjs` dep | Low | Better Auth handles hashing |

---

## Viewing database tables

### Option A — Prisma Studio (recommended)

Visual browser UI for all tables:

```bash
cd backend
npm run prisma:studio
```

Opens **http://localhost:5555** — browse `user`, `session`, `account`, `instagram_account`, `automation`, `message_log`, `subscription`.

### Option B — psql CLI

```bash
psql postgresql://postgres:postgres@localhost:5432/nudgedm

# List tables
\dt

# Sample queries
SELECT id, name, email FROM "user";
SELECT * FROM subscription;
SELECT * FROM automation;
```

### Option C — GUI clients

Connect with **TablePlus**, **DBeaver**, or **pgAdmin** using:

| Field | Value |
|-------|-------|
| Host | `localhost` |
| Port | `5432` |
| Database | `nudgedm` |
| User | `postgres` |
| Password | `postgres` |

(Connection string matches `DATABASE_URL` in `.env`.)

---

## Dummy / seed data

Seed script creates 3 login-ready users with subscriptions, Instagram links, automations, and sample message logs.

```bash
cd backend
npm run db:seed
```

| Email | Password | Plan |
|-------|----------|------|
| `demo-free@nudgedm.com` | `password123` | FREE |
| `demo-starter@nudgedm.com` | `password123` | STARTER |
| `demo-pro@nudgedm.com` | `password123` | PRO |

Re-running the seed is safe — existing users are skipped.

---

## Suggested order

```
Phase 1 (integration) → Phase 3 (billing) → Phase 4 (reliability) → Phase 2 (auth extras) → Phase 5 (ops)
```

Frontend work can start in parallel with Phase 1.
