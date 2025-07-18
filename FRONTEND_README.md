# MTGDailyCard - Frontend Setup

This document describes the frontend implementation for displaying daily MTG cards.

## Features Implemented

- ✅ Main page that fetches today's card from Supabase
- ✅ Card display component with name, image, and details
- ✅ Responsive design for mobile and desktop
- ✅ Loading states and error handling
- ✅ Clean, modern UI with Tailwind CSS

## Quick Start

1. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **View Demo** (works without Supabase setup)
   Navigate to `http://localhost:3000/demo` to see the card display with mock data.

## Database Requirements

The app expects a `daily_card` table in Supabase with the schema defined in `database/schema.sql`.

## Component Structure

- `src/app/page.tsx` - Main page with card fetching logic
- `src/components/CardDisplay.tsx` - Card display component
- `src/components/LoadingCard.tsx` - Loading skeleton
- `src/components/ErrorDisplay.tsx` - Error state component
- `src/app/api/daily-card/route.ts` - API route for fetching daily card
- `src/types/card.ts` - TypeScript types for card data

## Responsive Design

The card display adapts to different screen sizes:
- **Desktop**: Card image on the left, details on the right
- **Mobile**: Card image on top, details below in single column

## Next Steps

To complete the application:
1. Set up Supabase project and apply the database schema
2. Configure environment variables
3. Implement the daily card automation (cron job to populate the database)
4. Deploy to Vercel