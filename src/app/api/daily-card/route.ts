import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { DailyCard } from '@/types/card'

export async function GET() {
  try {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]
    
    // Fetch today's card from Supabase
    const { data, error } = await supabase
      .from('daily_card')
      .select('*')
      .eq('date', today)
      .single()

    if (error) {
      console.error('Error fetching daily card:', error)
      
      // If no card found for today, return a message
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'No card found for today' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: 'Failed to fetch daily card' },
        { status: 500 }
      )
    }

    const dailyCard: DailyCard = data

    return NextResponse.json(dailyCard)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}