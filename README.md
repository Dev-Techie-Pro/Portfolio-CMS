# Portfolio CMS (unified)

Single Next.js application combining the public portfolio site and the staff admin dashboard.

## Structure

- **Public site** — `/`, `/about`, `/projects`, `/blogs`, etc. (original portfolio UI)
- **Admin dashboard** — `/admin` (CMS, settings, users)
- **API** — `/api/*` staff routes, `/api/public/*` CORS APIs, `/api/blogs` and `/api/portfolio/*` for the public site

## Setup

```bash
npm install
cp .env.example .env.local
# Fill Supabase keys, CRON_SECRET (production), etc.
npm run db:push   # when Supabase CLI is linked
npm run dev
```

- Portfolio: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

Promote first admin in Supabase SQL:

```sql
update public.profiles set role = 'super_admin' where email = 'your@email.com';
```

## Scripts

| Command | Description |
| -------- | ------------- |
| `npm run dev` | Build admin client + Next dev server |
| `npm run build` | Production build |
| `npm run build:client` | Compile `client/` → `public/js/` |
| `npm run import:projects` | Seed `projects.detail_payload` from static `projects-data.js` |
| `npm run seed:blogs` | Seed blog posts (requires env) |
| `npm run test:ci` | Smoke tests for guards and public APIs |

## Merged repositories

- [Portfolio](https://github.com/Dev-Techie-Pro/Portfolio) — public frontend
- [Admin-Portfolio](https://github.com/Dev-Techie-Pro/Admin-Portfolio) — CMS, Supabase schema, staff APIs
