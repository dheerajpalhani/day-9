import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { FiChevronLeft, FiChevronRight, FiStar, FiClock } from 'react-icons/fi'

export default function FeaturedCarousel() {
  const { restaurantData } = useApp()
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  const featured = restaurantData.filter(r => r.rating >= 4.5).slice(0, 8)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">
              Featured <span className="text-gold">Restaurants</span>
            </h2>
            <p className="text-warm-gray text-sm mt-1">Handpicked by our AI for you</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button onClick={() => scroll(-1)} className="w-9 h-9 rounded-full bg-black-elevated border border-black-border flex items-center justify-center hover:border-gold/50 transition-colors">
              <FiChevronLeft className="text-warm-white" />
            </button>
            <button onClick={() => scroll(1)} className="w-9 h-9 rounded-full bg-black-elevated border border-black-border flex items-center justify-center hover:border-gold/50 transition-colors">
              <FiChevronRight className="text-warm-white" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
          {featured.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              className="min-w-[300px] sm:min-w-[320px] cursor-pointer group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-black-card border border-black-border group-hover:border-gold/30 transition-all duration-300">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black-deep/80 to-transparent" />
                  {r.offers && (
                    <span className="absolute top-3 left-3 bg-gold text-black-deep text-xs font-bold px-2.5 py-1 rounded-lg">
                      {r.offers}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-warm-white group-hover:text-gold transition-colors">{r.name}</h3>
                  <p className="text-warm-gray text-sm mt-1">{r.cuisine} • {r.priceRange}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-warm-gray">
                    <span className="flex items-center gap-1 text-gold">
                      <FiStar /> {r.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock /> {r.deliveryTime}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
