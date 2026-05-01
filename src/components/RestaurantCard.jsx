import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { FiStar, FiClock, FiHeart } from 'react-icons/fi'

export default function RestaurantCard({ restaurant }) {
  const navigate = useNavigate()
  const { favorites, dispatch } = useApp()
  const isFav = favorites.includes(restaurant.id)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl overflow-hidden bg-black-card border border-black-border hover:border-gold/30 transition-all duration-300 backdrop-blur-sm">
        {/* Image */}
        <div className="relative h-44 overflow-hidden" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black-deep/70 to-transparent" />

          {restaurant.offers && (
            <span className="absolute top-3 left-3 bg-gold text-black-deep text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
              {restaurant.offers}
            </span>
          )}

          {/* Favorite button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => { e.stopPropagation(); dispatch({ type: 'TOGGLE_FAVORITE', payload: restaurant.id }) }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isFav ? 'bg-gold text-black-deep' : 'bg-black-deep/50 text-warm-white hover:text-gold'
            }`}
          >
            <FiHeart size={14} fill={isFav ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Info */}
        <div className="p-4" onClick={() => navigate(`/restaurant/${restaurant.id}`)}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base font-semibold text-warm-white group-hover:text-gold transition-colors">
                {restaurant.name}
              </h3>
              <p className="text-warm-gray text-sm mt-0.5">{restaurant.cuisine}</p>
            </div>
            <span className="flex items-center gap-1 bg-gold/10 text-gold text-xs font-bold px-2 py-1 rounded-lg">
              <FiStar size={12} /> {restaurant.rating}
            </span>
          </div>

          <div className="flex items-center gap-4 mt-3 text-xs text-warm-gray">
            <span className="flex items-center gap-1">
              <FiClock size={12} /> {restaurant.deliveryTime}
            </span>
            <span>{restaurant.priceRange}</span>
            {restaurant.veg && (
              <span className="w-4 h-4 border border-success rounded-sm flex items-center justify-center">
                <span className="w-2 h-2 bg-success rounded-full" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
