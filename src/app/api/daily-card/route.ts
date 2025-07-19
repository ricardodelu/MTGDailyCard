import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { DailyCard } from '@/types/card'

// Fallback card data when no daily card is available
const createFallbackCard = (date: string): DailyCard => ({
  id: 0,
  date,
  card_id: "40e47915-43d1-4f05-92ef-e6ac8691e98a",
  card_name: "Lightning Bolt",
  image_url: "https://cards.scryfall.io/normal/front/4/0/40e47915-43d1-4f05-92ef-e6ac8691e98a.jpg",
  details_json: {
    mana_cost: "{R}",
    type_line: "Instant",
    oracle_text: "Lightning Bolt deals 3 damage to any target.",
    set_name: "Magic 2011",
    rarity: "common",
    artist: "Christopher Moeller"
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
})

export async function GET() {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]
    
    // Try to fetch today's card from Supabase
    const { data, error } = await supabase
      .from('daily_card')
      .select('*')
      .eq('date', today)
      .single()

    if (error) {
      console.error('Error fetching daily card:', error)
      
      // If no card found for today, return fallback card
      if (error.code === 'PGRST116') {
        console.log(`No card found for ${today}, returning fallback card`)
        const fallbackCard = createFallbackCard(today)
        return NextResponse.json(fallbackCard)
      }
      
      // For other database errors, also return fallback
      console.warn('Database error, returning fallback card:', error.message)
      const fallbackCard = createFallbackCard(today)
      return NextResponse.json(fallbackCard)
    }

    const dailyCard: DailyCard = data
    console.log(`Successfully fetched daily card for ${today}: ${dailyCard.card_name}`)
    return NextResponse.json(dailyCard)
  } catch (error) {
    console.error('Unexpected error:', error)
    
    // Return fallback card even on unexpected errors
    const today = new Date().toISOString().split('T')[0]
    const fallbackCard = createFallbackCard(today)
    console.log('Returning fallback card due to unexpected error')
    return NextResponse.json(fallbackCard)
  }
}