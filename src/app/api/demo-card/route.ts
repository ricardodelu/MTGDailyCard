import { NextResponse } from 'next/server'

export async function GET() {
  // Mock card data for demonstration
  const mockCard = {
    id: 1,
    date: new Date().toISOString().split('T')[0],
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
  }

  return NextResponse.json(mockCard)
}