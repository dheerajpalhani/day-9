import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import menuItems from '../data/menu.json'
import reviews from '../data/reviews.json'
import { FiStar, FiClock, FiMapPin, FiPlus, FiMinus, FiHeart } from 'react-icons/fi'

const SpiceLevel = ({ level }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3].map(i => (
      <span key={i} className={`text-xs ${i <= level ? 'text-danger' : 'text-warm-dim'}`}>🌶️</span>
    ))}
  </div>
)

export default function MenuPage() {
  const { id } = useParams()
  const { restaurantData, cart, favorites, dispatch } = useApp()

  const restaurant = restaurantData.find(r => r.id === parseInt(id))
  const items = menuItems.filter(m => m.restaurantId === parseInt(id))
  const restaurantReviews = reviews.filter(r => r.restaurantId === parseInt(id))
  const isFav = favorites.includes(parseInt(id))

  if (!restaurant) {
    return (
      <div className="text-center text-warm-gray min-h-screen">
        <p className="text-4xl mb-3">🍽️</p>
        <p>Restaurant not found</p>
      </div>
    )
  }

  const getCartQty = (itemId) => {
    const item = cart.find(c => c.id === itemId)
    return item ? item.qty : 0
  }

  return (
    <div className="min-h-screen">
      {/* Restaurant Header */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-black-deep/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-4xl font-bold font-display text-warm-white"
              >
                {restaurant.name}
              </motion.h1>
              <p className="text-warm-gray text-sm mt-1">{restaurant.cuisine} • {restaurant.priceRange}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-warm-gray">
                <span className="flex items-center gap-1 text-gold"><FiStar /> {restaurant.rating}</span>
                <span className="flex items-center gap-1"><FiClock /> {restaurant.deliveryTime}</span>
                <span className="flex items-center gap-1"><FiMapPin /> {restaurant.address}</span>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', payload: restaurant.id })}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                isFav ? 'bg-gold border-gold text-black-deep' : 'bg-black-deep/50 border-black-border text-warm-white hover:border-gold/50'
              }`}
            >
              <FiHeart fill={isFav ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>
      </div>

      {restaurant.offers && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
          <div className="bg-gold/10 border border-gold/20 rounded-xl px-4 py-2.5 text-sm text-gold font-medium">
            🎉 {restaurant.offers}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-xl sm:text-2xl font-bold font-display mb-6">
          Menu <span className="text-gold">({items.length} items)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => {
            const qty = getCartQty(item.id)
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-black-card border border-black-border rounded-xl overflow-hidden hover:border-gold/20 transition-all group"
              >
                <div className="flex gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-4 h-4 border rounded-sm flex items-center justify-center ${item.isVeg ? 'border-success' : 'border-danger'}`}>
                        <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-success' : 'bg-danger'}`} />
                      </span>
                      {item.isBestseller && (
                        <span className="text-[10px] font-bold text-gold bg-gold/10 px-1.5 py-0.5 rounded">★ BESTSELLER</span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-warm-white">{item.name}</h3>
                    <p className="text-gold font-semibold text-sm mt-1">₹{item.price}</p>
                    <p className="text-warm-dim text-xs mt-1 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-warm-gray">
                      <span>{item.calories} cal</span>
                      <SpiceLevel level={item.spicyLevel} />
                      <span className="flex items-center gap-0.5 text-gold"><FiStar size={10} /> {item.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-24 h-20 rounded-xl object-cover" loading="lazy" />
                    {qty === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                        className="w-24 py-1.5 rounded-lg bg-gold/10 border border-gold/30 text-gold text-xs font-bold flex items-center justify-center gap-1 hover:bg-gold/20 transition-colors"
                      >
                        <FiPlus size={12} /> ADD
                      </motion.button>
                    ) : (
                      <div className="flex items-center gap-2 bg-gold rounded-lg overflow-hidden">
                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: qty - 1 } })} className="px-2 py-1.5 text-black-deep hover:bg-gold-dark transition-colors"><FiMinus size={12} /></button>
                        <span className="text-black-deep text-xs font-bold w-4 text-center">{qty}</span>
                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: qty + 1 } })} className="px-2 py-1.5 text-black-deep hover:bg-gold-dark transition-colors"><FiPlus size={12} /></button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Reviews */}
        {restaurantReviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold font-display mb-4">
              Reviews <span className="text-gold">({restaurantReviews.length})</span>
            </h2>
            <div className="space-y-3">
              {restaurantReviews.map(r => (
                <div key={r.id} className="bg-black-elevated border border-black-border rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-warm-white">{r.userName}</span>
                    <span className="flex items-center gap-1 text-gold text-xs"><FiStar size={10} /> {r.rating}</span>
                  </div>
                  <p className="text-sm text-warm-gray">{r.comment}</p>
                  <p className="text-xs text-warm-dim mt-2">{r.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
