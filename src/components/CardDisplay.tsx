'use client'

import { DailyCard } from '@/types/card'
import Image from 'next/image'
import { useState } from 'react'

interface CardDisplayProps {
  card: DailyCard
}

export default function CardDisplay({ card }: CardDisplayProps) {
  const [imageError, setImageError] = useState(false)
  const details = card.details_json

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
      <div className="md:flex">
        {/* Card Image */}
        <div className="md:w-1/2 flex-shrink-0">
          {card.image_url && !imageError ? (
            <div className="relative h-96 md:h-full">
              <Image
                src={card.image_url}
                alt={card.card_name}
                fill
                className="object-contain bg-gray-100 dark:bg-gray-700"
                priority
                onError={() => {
                  console.warn(`Failed to load image for ${card.card_name}: ${card.image_url}`)
                  setImageError(true)
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : (
            <div className="h-96 md:h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <div className="text-center">
                <span className="text-gray-500 dark:text-gray-400 text-lg block mb-2">
                  {imageError ? 'Image failed to load' : 'No image available'}
                </span>
                {imageError && card.image_url && (
                  <button 
                    onClick={() => setImageError(false)}
                    className="text-sm text-blue-500 hover:text-blue-700 underline"
                  >
                    Retry loading image
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Card Details */}
        <div className="md:w-1/2 p-8">
          <div className="space-y-6">
            {/* Card Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {card.card_name}
            </h1>

            {/* Mana Cost */}
            {details.mana_cost && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Mana Cost:
                </span>
                <span className="text-lg font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {details.mana_cost}
                </span>
              </div>
            )}

            {/* Type Line */}
            {details.type_line && (
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Type:
                </span>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {details.type_line}
                </p>
              </div>
            )}

            {/* Power/Toughness */}
            {(details.power || details.toughness) && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Power/Toughness:
                </span>
                <span className="text-lg font-bold bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded">
                  {details.power || '?'}/{details.toughness || '?'}
                </span>
              </div>
            )}

            {/* Oracle Text */}
            {details.oracle_text && (
              <div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Text:
                </span>
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4 italic">
                  {details.oracle_text}
                </p>
              </div>
            )}

            {/* Set Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {details.set_name && (
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Set:
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {details.set_name}
                  </p>
                </div>
              )}
              
              {details.rarity && (
                <div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Rarity:
                  </span>
                  <p className={`text-sm font-medium capitalize ${
                    details.rarity === 'common' ? 'text-gray-600' :
                    details.rarity === 'uncommon' ? 'text-green-600' :
                    details.rarity === 'rare' ? 'text-yellow-600' :
                    details.rarity === 'mythic' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {details.rarity}
                  </p>
                </div>
              )}
              
              {details.artist && (
                <div className="sm:col-span-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Artist:
                  </span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {details.artist}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}