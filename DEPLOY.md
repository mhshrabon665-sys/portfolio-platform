# Deployment Guide — Portfolio Platform
# ======================================

## STEP 1 — Supabase Setup (10 mins)

1. Go to https://supabase.com → "New Project"
2. Name it anything, pick a region close to Bangladesh (Singapore or Mumbai)
3. Wait ~2 mins for it to spin up
4. Go to SQL Editor → New Query
5. Paste the entire contents of `supabase-schema.sql` → Run
6. Go to Project Settings → API
7. Copy these 3 values — you will need them:
   - Project URL  (looks like: https://abcxyz.supabase.co)
   - anon/public key
   - service_role key (keep this secret — never expose in frontend)


## STEP 2 — Vercel Setup (10 mins)

1. Push this project to a GitHub repository:
   ```
   git init
   git add .
   git commit -m "initial"
   git remote add origin https://github.com/YOURUSERNAME/portfolio-platform.git
   git push -u origin main
   ```

2. Go to https://vercel.com → "Add New Project"
3. Import your GitHub repo
4. In "Environment Variables", add these 3:
   ```
   NEXT_PUBLIC_SUPABASE_URL     = https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   SUPABASE_SERVICE_ROLE_KEY    = your-service-role-key
   ```
5. Click Deploy — Vercel builds and deploys automatically


## STEP 3 — Connect Your Test Domain

1. In Vercel dashboard → your project → Settings → Domains
2. Add your test domain (e.g. testportfolio.xyz)
3. In your domain registrar (Namecheap/GoDaddy etc):
   - Add CNAME record:  `@`  →  `cname.vercel-dns.com`
   - Or the A records Vercel shows you
4. Wait 5–30 mins for DNS to propagate
5. Vercel auto-issues free SSL certificate


## STEP 4 — Test Everything

Visit:  https://yourtestdomain.com/portfolio
- Fill in details → click "Publish Website"
- Pick a username → set password → Publish
- Should redirect to success page with your live URL
- Visit the live URL — portfolio should load
- Visit  yourtestdomain.com/USERNAME/edit → enter password → editor loads
- Make a change → Save Changes → check live URL updated


## STEP 5 — Switch to Main Domain (when ready)

1. In Vercel → Domains → Add `buildbypassion.net`
2. Update DNS at your domain registrar to point to Vercel
3. Remove test domain or keep both pointing to same project


## LOCAL DEVELOPMENT (optional)

```bash
cp .env.local.example .env.local
# Fill in your Supabase values in .env.local

npm install
npm run dev
# Open http://localhost:3000
```


## TROUBLESHOOTING

- "Username taken" but it shouldn't be → Check Supabase table in dashboard
- Photos not saving → Check storage bucket was created (step 1 SQL)
- Deployment fails → Check all 3 env variables are set in Vercel
- Portfolio page blank → Check Supabase URL and anon key are correct
- Edit page not working → Confirm service_role key is set (not anon key)
