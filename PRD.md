# Product Requirements Document (PRD)

## Product Name
Random Magic: The Gathering Card a Day

## Objective
Deliver a web application that displays a randomly-selected Magic: The Gathering (MTG) card each day. The card data is fetched and stored automatically via an AI agent, with a modern frontend and robust backend.

## Target Users
- Magic: The Gathering fans
- Casual web visitors interested in daily trivia/cards
- Potentially, collectors or competitive players

## Core Features
- **Daily MTG Card:** Each day, display a new, random MTG card with image and details.
- **Card Data Source:** Use an AI agent to fetch card data from the web or public APIs (e.g., Scryfall).
- **Backend Storage:** Store daily cards and metadata in Supabase Postgres.
- **Frontend:** Responsive UI (React + Next.js), deployed via Vercel.
- **Automation:** Use a scheduled (cron) job to fetch and store the new card daily.
- **Copilot Agent Integration:** Leverage GitHub Copilot agents for automation and issue management.

## Success Metrics
- App is reliably up and running, updating daily.
- Zero days missed in card updates over a month.
- Positive user feedback on UI and daily experience.

## User Stories
1. **As a user, I want to see a new, random Magic card every day, so I can learn about cards I may not know.**
2. **As a user, I want to view details and an image of the card, so I get the full context.**
3. **As an admin/dev, I want the process to be automated, so I don't have to manually update the card each day.**
4. **As an admin/dev, I want to use Copilot Agents to manage and automate parts of the project development.**
5. **As a user, I want the app to be responsive and mobile-friendly, so I can check cards on any device.**

## Out of Scope (for MVP)
- User accounts or authentication
- Card history/archive or user-driven selection
- Social/sharing features

## Dependencies & Integrations
- Magic: The Gathering card data source (API or web scraping)
- Supabase Postgres
- Vercel
- GitHub Copilot agents support
- Free AI agent for web data retrieval (OpenAI, similar, or custom)

## Risks & Mitigations
- **API Limitations:** Use public/free APIs first (e.g., Scryfall). Have fallback scraping plan if rate-limited.
- **Automation Failures:** Set up notifications/logging for failed cron jobs.
- **Data Consistency:** Ensure daily jobs don't duplicate or skip days.

## Timeline
- Week 1: Setup repo, CI/CD, basic Next.js frontend
- Week 2: Integrate Supabase, fetch/store/display card
- Week 3: AI agent integration, cron job, polish UI
- Week 4: Testing, bug fixing, deploy MVP

## Stakeholders
- Project owner: ricardodelu
- Developers: Copilot agents, contributors