export interface DailyCard {
  id: number
  date: string
  card_id: string
  card_name: string
  image_url: string | null
  details_json: CardDetails
  created_at: string
  updated_at: string
}

export interface CardDetails {
  mana_cost?: string
  type_line?: string
  oracle_text?: string
  power?: string
  toughness?: string
  set_name?: string
  rarity?: string
  artist?: string
  [key: string]: unknown
}