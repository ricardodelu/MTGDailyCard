#!/usr/bin/env node

/**
 * Daily MTG Card Fetcher
 * 
 * This script fetches a random Magic: The Gathering card from the Scryfall API
 * and stores it in the Supabase daily_card table.
 */

const { createClient } = require('@supabase/supabase-js');
const https = require('https');

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Error: Missing required environment variables');
  console.error('Required: SUPABASE_URL, SUPABASE_ANON_KEY');
  process.exit(1);
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Fetches a random MTG card from the Scryfall API
 * @returns {Promise<Object>} Card data from Scryfall
 */
async function fetchRandomCard() {
  return new Promise((resolve, reject) => {
    console.log('Fetching random card from Scryfall API...');
    
    const options = {
      hostname: 'api.scryfall.com',
      path: '/cards/random',
      method: 'GET',
      headers: {
        'User-Agent': 'MTGDailyCard/1.0'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            throw new Error(`Scryfall API error: ${res.statusCode} ${res.statusMessage}`);
          }
          
          const cardData = JSON.parse(data);
          console.log(`Fetched card: ${cardData.name} (${cardData.id})`);
          resolve(cardData);
        } catch (error) {
          reject(new Error(`Error parsing response: ${error.message}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

/**
 * Stores card data in the Supabase daily_card table
 * @param {Object} cardData - Card data from Scryfall API
 * @returns {Promise<void>}
 */
async function storeDailyCard(cardData) {
  try {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Prepare card data for storage
    const dailyCard = {
      date: today,
      card_id: cardData.id,
      card_name: cardData.name,
      image_url: cardData.image_uris?.normal || cardData.image_uris?.large || null,
      details_json: {
        mana_cost: cardData.mana_cost,
        type_line: cardData.type_line,
        oracle_text: cardData.oracle_text,
        set: cardData.set,
        set_name: cardData.set_name,
        rarity: cardData.rarity,
        colors: cardData.colors,
        cmc: cardData.cmc,
        power: cardData.power,
        toughness: cardData.toughness,
        artist: cardData.artist,
        scryfall_uri: cardData.scryfall_uri
      }
    };
    
    console.log(`Storing daily card for ${today}...`);
    
    // Insert or update the daily card
    const { data, error } = await supabase
      .from('daily_card')
      .upsert(dailyCard, { 
        onConflict: 'date',
        ignoreDuplicates: false 
      });
    
    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    
    console.log('Daily card stored successfully!');
    console.log(`Card: ${dailyCard.card_name}`);
    console.log(`Date: ${dailyCard.date}`);
    
  } catch (error) {
    console.error('Error storing daily card:', error);
    throw error;
  }
}

/**
 * Main function to fetch and store daily card
 */
async function main() {
  try {
    console.log('Starting daily MTG card fetch process...');
    
    // Fetch random card from Scryfall
    const cardData = await fetchRandomCard();
    
    // Store in Supabase
    await storeDailyCard(cardData);
    
    console.log('Daily MTG card fetch completed successfully!');
  } catch (error) {
    console.error('Daily card fetch failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { fetchRandomCard, storeDailyCard, main };