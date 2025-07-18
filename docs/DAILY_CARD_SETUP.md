# Daily MTG Card Cron Job Setup

This document explains how to set up the daily cron job that fetches and stores random Magic: The Gathering cards.

## Prerequisites

1. **Supabase Project**: You need a Supabase project with the `daily_card` table created
2. **GitHub Repository Secrets**: Configure the required environment variables in GitHub

## Database Setup

1. In your Supabase project, run the SQL script from `database/schema.sql` to create the required table:
   ```sql
   -- Run this in your Supabase SQL editor
   -- Copy and paste the contents of database/schema.sql
   ```

2. The table structure will be:
   - `id` - Serial primary key
   - `date` - Unique date (YYYY-MM-DD)
   - `card_id` - Scryfall card ID
   - `card_name` - Name of the MTG card
   - `image_url` - URL to card image
   - `details_json` - JSONB containing card details (mana cost, type, text, etc.)

## GitHub Secrets Configuration

In your GitHub repository, go to Settings > Secrets and variables > Actions, and add these secrets:

### Required Secrets
- `SUPABASE_URL` - Your Supabase project URL (found in Settings > API)
- `SUPABASE_ANON_KEY` - Your Supabase anon public key (found in Settings > API)

Example values:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## How It Works

1. **Schedule**: The GitHub Action runs daily at midnight UTC (`0 0 * * *`)
2. **Manual Trigger**: You can also trigger it manually via GitHub Actions tab
3. **Process**:
   - Fetches a random card from Scryfall API (`https://api.scryfall.com/cards/random`)
   - Extracts relevant card data (name, image, mana cost, type, etc.)
   - Stores it in the `daily_card` table with today's date
   - Uses upsert to replace any existing card for the same date

## Testing Locally

To test the script locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables:
   ```bash
   export SUPABASE_URL="your-supabase-url"
   export SUPABASE_ANON_KEY="your-supabase-anon-key"
   ```

3. Run the script:
   ```bash
   node scripts/fetch-daily-card.js
   ```

## Files Added

- `.github/workflows/daily-card-fetch.yml` - GitHub Actions workflow
- `scripts/fetch-daily-card.js` - Main script that fetches and stores cards
- `database/schema.sql` - Database table schema
- `docs/DAILY_CARD_SETUP.md` - This setup guide

## Troubleshooting

- **Script fails**: Check GitHub Actions logs for detailed error messages
- **Database errors**: Ensure the table is created and RLS policies allow inserts
- **API rate limits**: Scryfall API is free but has rate limits; the daily schedule should be well within limits
- **Environment variables**: Double-check that secrets are correctly set in GitHub

## API Reference

- **Scryfall API**: https://scryfall.com/docs/api
- **Supabase Docs**: https://supabase.com/docs