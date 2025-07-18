-- Database schema for MTGDailyCard
-- This SQL should be run in your Supabase project to create the required table

-- Create the daily_card table
CREATE TABLE IF NOT EXISTS daily_card (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    card_id TEXT NOT NULL,
    card_name TEXT NOT NULL,
    image_url TEXT,
    details_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the date column for faster queries
CREATE INDEX IF NOT EXISTS idx_daily_card_date ON daily_card(date);

-- Create an index on the card_name for search functionality (if needed later)
CREATE INDEX IF NOT EXISTS idx_daily_card_name ON daily_card(card_name);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_daily_card_updated_at 
    BEFORE UPDATE ON daily_card 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add Row Level Security (RLS) policies if needed
-- ALTER TABLE daily_card ENABLE ROW LEVEL SECURITY;

-- Example policy for public read access (adjust based on your needs)
-- CREATE POLICY "Enable read access for all users" ON daily_card FOR SELECT USING (true);

-- Example policy for service role insert/update access
-- CREATE POLICY "Enable insert for service role" ON daily_card FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Enable update for service role" ON daily_card FOR UPDATE USING (true);