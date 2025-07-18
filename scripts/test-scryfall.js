#!/usr/bin/env node

/**
 * Test script to verify Scryfall API connectivity
 */

const https = require('https');

async function testScryfallAPI() {
  console.log('Testing Scryfall API connectivity...');
  
  return new Promise((resolve) => {
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
            console.error(`✗ HTTP error! status: ${res.statusCode}`);
            resolve(false);
            return;
          }
          
          const cardData = JSON.parse(data);
          
          console.log('✓ Successfully fetched random card from Scryfall');
          console.log(`Card Name: ${cardData.name}`);
          console.log(`Card ID: ${cardData.id}`);
          console.log(`Set: ${cardData.set_name} (${cardData.set})`);
          console.log(`Type: ${cardData.type_line}`);
          console.log(`Mana Cost: ${cardData.mana_cost || 'N/A'}`);
          
          if (cardData.image_uris) {
            console.log(`Image URL: ${cardData.image_uris.normal}`);
          }
          
          resolve(true);
        } catch (error) {
          console.error('✗ Failed to parse response:', error.message);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('✗ Failed to fetch from Scryfall API:', error.message);
      resolve(false);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.error('✗ Request timeout');
      resolve(false);
    });
    
    req.end();
  });
}

// Run test
testScryfallAPI().then(success => {
  process.exit(success ? 0 : 1);
});