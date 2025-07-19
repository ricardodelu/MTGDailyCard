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
    // Get today's date in YYYY-MM-DD format (using UTC to avoid timezone issues)
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    const todayLocal = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().split('T')[0]
    
    console.log(`Looking for card with date: ${today} (UTC) or ${todayLocal} (Local)`)
    
    // Check if we have valid environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    // Enhanced logging for debugging
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      urlLength: supabaseUrl?.length || 0,
      hasKey: !!supabaseKey,
      keyLength: supabaseKey?.length || 0,
      isPlaceholderUrl: supabaseUrl === 'https://placeholder.supabase.co',
      isPlaceholderKey: supabaseKey === 'placeholder-key'
    })
    
    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://placeholder.supabase.co' || supabaseKey === 'placeholder-key') {
      console.warn('Supabase configuration not available, returning fallback card')
      const fallbackCard = createFallbackCard(today)
      return NextResponse.json(fallbackCard)
    }
    
    // Try to fetch today's card from Supabase with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    try {
      console.log(`Attempting to fetch card from Supabase for date: ${today} (UTC) or ${todayLocal} (Local)`)
      
      // Try to find card for today (UTC) first, then local date
      let { data, error } = await supabase
        .from('daily_card')
        .select('*')
        .eq('date', today)
        .abortSignal(controller.signal)
        .single()
      
      // If not found with UTC date, try local date
      if (error && error.code === 'PGRST116' && today !== todayLocal) {
        console.log(`No card found for UTC date ${today}, trying local date ${todayLocal}`)
        const localResult = await supabase
          .from('daily_card')
          .select('*')
          .eq('date', todayLocal)
          .abortSignal(controller.signal)
          .single()
        
        data = localResult.data
        error = localResult.error
      }
      
      // Also try to get the most recent card if no exact date match
      if (error && error.code === 'PGRST116') {
        console.log(`No card found for ${today} or ${todayLocal}, trying most recent card`)
        const recentResult = await supabase
          .from('daily_card')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .abortSignal(controller.signal)
          .single()
        
        if (!recentResult.error && recentResult.data) {
          console.log(`Found most recent card for date: ${recentResult.data.date}`)
          data = recentResult.data
          error = null
        }
      }
      
      clearTimeout(timeoutId)

      if (error) {
        console.error('Supabase query error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        
        // If no card found at all, return fallback card
        if (error.code === 'PGRST116') {
          console.log(`No card found for any date, returning fallback card`)
          const fallbackCard = createFallbackCard(today)
          return NextResponse.json(fallbackCard)
        }
        
        // For other database errors, also return fallback
        console.warn('Database error, returning fallback card:', error.message)
        const fallbackCard = createFallbackCard(today)
        return NextResponse.json(fallbackCard)
      }

      const dailyCard: DailyCard = data
      console.log(`Successfully fetched daily card for ${dailyCard.date}:`, {
        cardName: dailyCard.card_name,
        cardId: dailyCard.card_id,
        imageUrl: dailyCard.image_url
      })
      return NextResponse.json(dailyCard)
    } catch (fetchError) {
      clearTimeout(timeoutId)
      
      // Enhanced error logging
      console.error('Database connection error details:', {
        error: fetchError,
        message: fetchError instanceof Error ? fetchError.message : 'Unknown error',
        name: fetchError instanceof Error ? fetchError.name : 'Unknown',
        stack: fetchError instanceof Error ? fetchError.stack : 'No stack trace'
      })
      
      // Handle network/timeout errors specifically
      if (fetchError instanceof Error) {
        if (fetchError.name === 'AbortError') {
          console.warn('Database request timed out after 10 seconds, returning fallback card')
        } else if (fetchError.message.includes('fetch failed')) {
          console.warn('Network error connecting to database (fetch failed), returning fallback card')
        } else {
          console.warn('Database connection error, returning fallback card:', fetchError.message)
        }
      }
      
      const fallbackCard = createFallbackCard(today)
      return NextResponse.json(fallbackCard)
    }
  } catch (error) {
    console.error('Unexpected error in daily card API:', error)
    
    // Return fallback card even on unexpected errors
    const today = new Date().toISOString().split('T')[0]
    const fallbackCard = createFallbackCard(today)
    console.log('Returning fallback card due to unexpected error')
    return NextResponse.json(fallbackCard)
  }
}