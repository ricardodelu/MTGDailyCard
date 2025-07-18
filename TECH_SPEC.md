# Technical Specification Document

## Overview
A Next.js web app that displays a daily, random Magic: The Gathering card. Card data is fetched by an AI agent and stored in Supabase Postgres. The frontend is deployed on Vercel.

---

## Architecture

### Frontend
- **Framework:** React (Next.js, TypeScript)
- **Deployment:** Vercel
- **Pages:**
  - `/` - Home, shows today's card
  - `/about` - Info about the app (optional)
- **Components:** Card display, loading/error states

### Backend/Data Layer
- **Database:** Supabase Postgres
- **Tables:**
  - `daily_card`
    - `id` (serial, PK)
    - `date` (date, unique)
    - `card_id` (text)
    - `card_name` (text)
    - `image_url` (text)
    - `details_json` (jsonb) — e.g., mana cost, type, text, set, etc.

- **API Integration:** Use Scryfall or another public MTG API for card data.
- **Automation:** 
  - **Cron job (GitHub Actions or Supabase Edge Functions):** Triggers daily, uses AI Agent or API to pull a random card and insert into DB.

### AI/Web Agent
- **Purpose:** Retrieve a random MTG card and its details, either via API or intelligent web scraping if API unavailable.
- **Integration:** Script triggered by cron job, can run as a GitHub Action or serverless function (Node.js).
- **Free AI Options:** OpenAI GPT (if allowed for web search), or Copilot agent with custom prompt.

### DevOps
- **CI/CD:** GitHub Actions
- **Environment Variables:** API keys, Supabase credentials, etc. (managed via Vercel/Supabase secrets)
- **Monitoring:** Basic logging for cron job failures.

---

## Key Flows

### Daily Card Update
1. Cron job triggers AI agent/script.
2. Agent fetches random card data (API or web).
3. Agent stores card in `daily_card` table (date = today).
4. Frontend fetches today's card (SSR/ISR or client-side fetch).

### Display Card
- On visit to `/`, fetch today's card from Supabase.
- Render card name, image, and key details.

---

## Open Questions
- Should we fallback to previous card if new fetch fails?
- Is there a way to let users "see yesterday's card" (optional)?

---

## Implementation Steps
1. Bootstrap Next.js app, deploy hello world to Vercel.
2. Set up Supabase project; create `daily_card` table.
3. Create API route or script to fetch/store random card.
4. Schedule and test daily automation (GitHub Actions or Supabase cron).
5. Build frontend card display.
6. Integrate Copilot agents for issues, PRs, and automation.

---

## References
- [Scryfall API Docs](https://scryfall.com/docs/api)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)