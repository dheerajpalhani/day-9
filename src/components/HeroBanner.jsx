import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const categories = [
  { label: 'All', value: 'all', emoji: '🍽️' },
  { label: 'Biryani', value: 'biryani', emoji: '🍚' },
  { label: 'Pizza', value: 'pizza', emoji: '🍕' },
  { label: 'Burger', value: 'burger', emoji: '🍔' },
  { label: 'Chinese', value: 'chinese', emoji: '🥡' },
  { label: 'South Indian', value: 'south-indian', emoji: '🥘' },
  { label: 'Dessert', value: 'dessert', emoji: '🍰' },
  { label: 'Healthy', value: 'healthy', emoji: '🥗' },
  { label: 'Fast Food', value: 'fast-food', emoji: '🌮' },
]

export default function HeroBanner({ onCategoryChange, activeCategory }) {
  const [search, setSearch] = useState('')
  const { restaurantData } = useApp()
  const navigate = useNavigate()
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = (val) => {
    setSearch(val)
    if (val.length > 1) {
      const results = restaurantData.filter(r =>
        r.name.toLowerCase().includes(val.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 5)
      setSuggestions(results)
    } else {
      setSuggestions([])
    }
  }

  return (
    <section className="relative w-full px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col items-center justify-center overflow-hidden py-10">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block border border-gold/30 bg-gold/5 px-4 py-1.5 rounded-full mb-6"
        >
          <p className="text-gold text-xs font-semibold tracking-widest uppercase">
            Premium Food Delivery
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-display leading-[1.1] mb-6 tracking-tight"
        >
          Discover <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark">
            Extraordinary
          </span> Flavors
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-warm-gray text-lg sm:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          AI-curated restaurants, handpicked menus, and smart recommendations — delivered straight to your door.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-full max-w-2xl mx-auto mb-10"
        >
          <div className="flex items-center bg-black-deep/60 backdrop-blur-lg border border-gold/30 rounded-full px-6 py-4 focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/20 transition-all shadow-2xl shadow-gold/5">
            <FiSearch className="text-gold mr-4 text-2xl" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, or dishes..."
              value={search}
              onChange={e => handleSearch(e.target.value)}
              className="flex-1 bg-transparent text-warm-white placeholder:text-warm-gray/60 outline-none text-base sm:text-lg"
            />
          </div>

          {/* Search suggestions */}
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 left-0 right-0 bg-black-card border border-black-border rounded-xl overflow-hidden shadow-2xl z-20"
            >
              {suggestions.map(r => (
                <button
                  key={r.id}
                  onClick={() => { navigate(`/restaurant/${r.id}`); setSuggestions([]); setSearch('') }}
                  className="w-full text-left px-4 py-3 hover:bg-black-elevated transition-colors flex items-center gap-3 border-b border-black-border last:border-0"
                >
                  <img src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-warm-white">{r.name}</p>
                    <p className="text-xs text-warm-gray">{r.cuisine} • {r.rating} ★</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Category chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.value}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.value
                  ? 'bg-gold text-black-deep border-gold'
                  : 'bg-black-elevated text-warm-gray border-black-border hover:border-gold/40 hover:text-warm-white'
              }`}
            >
              <span className="mr-1.5">{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
