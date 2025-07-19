'use client'

import { useState, useEffect } from 'react'
import { DailyCard } from '@/types/card'
import CardDisplay from '@/components/CardDisplay'
import LoadingCard from '@/components/LoadingCard'
import ErrorDisplay from '@/components/ErrorDisplay'

export default function Demo() {
  const [card, setCard] = useState<DailyCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDemoCard = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/demo-card')
      
      if (!response.ok) {
        throw new Error('Failed to fetch demo card')
      }
      
      const demoCard = await response.json()
      setCard(demoCard)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDemoCard()
  }, [])

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="text-center py-8 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-2">
          MTGDailyCard Demo
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your daily Magic: The Gathering card • {today}
        </p>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {loading && <LoadingCard />}
        
        {error && (
          <ErrorDisplay 
            message={error} 
            onRetry={fetchDemoCard}
          />
        )}
        
        {card && !loading && !error && (
          <CardDisplay card={card} />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400">
        <p className="text-sm">
          Demo page • Powered by{' '}
          <span className="font-semibold">Next.js</span> and{' '}
          <span className="font-semibold">Supabase</span>
        </p>
      </footer>
    </div>
  )
}