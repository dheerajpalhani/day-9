import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import RestaurantCard from './RestaurantCard'

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Veg', value: 'veg' },
  { label: 'Non-Veg', value: 'non-veg' },
  { label: 'Healthy', value: 'healthy' },
  { label: 'Fast Food', value: 'fast-food' },
  { label: 'Dessert', value: 'dessert' },
  { label: 'South Indian', value: 'south-indian' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Italian', value: 'italian' },
]

export default function RestaurantList({ category }) {
  const { restaurantData } = useApp()
  const [filter, setFilter] = useState('all')

  const activeFilter = category !== 'all' ? category : filter

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return restaurantData
    if (activeFilter === 'veg') return restaurantData.filter(r => r.veg)
    if (activeFilter === 'non-veg') return restaurantData.filter(r => !r.veg)
    return restaurantData.filter(r => r.tags.includes(activeFilter))
  }, [restaurantData, activeFilter])

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold font-display mb-2">
          All <span className="text-gold">Restaurants</span>
        </h2>
        <p className="text-warm-gray text-sm mb-6">{filtered.length} restaurants near you</p>

        {/* Filter pills */}
        {category === 'all' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  filter === f.value
                    ? 'bg-gold text-black-deep border-gold'
                    : 'bg-black-elevated text-warm-gray border-black-border hover:border-gold/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map(r => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-warm-gray">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-lg">No restaurants found for this filter</p>
          </div>
        )}
      </div>
    </section>
  )
}
