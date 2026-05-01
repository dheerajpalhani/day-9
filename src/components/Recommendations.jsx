import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { FiPlus, FiStar, FiZap } from 'react-icons/fi'

export default function Recommendations() {
  const { getRecommendations, dispatch } = useApp()
  const items = getRecommendations()

  if (!items.length) return null

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <FiZap className="text-gold text-xl" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">
              You May Also <span className="text-gold">Like</span>
            </h2>
            <p className="text-warm-gray text-sm mt-1">Personalized picks based on your taste & time of day</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-black-card border border-black-border rounded-xl overflow-hidden group hover:border-gold/30 transition-all duration-300"
            >
              <div className="relative h-28 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black-card to-transparent" />
              </div>
              <div className="p-3">
                <h4 className="text-sm font-medium text-warm-white truncate">{item.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gold text-sm font-semibold">₹{item.price}</span>
                  <div className="flex items-center gap-1 text-xs text-warm-gray">
                    <FiStar className="text-gold" /> {item.rating}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch({ type: 'ADD_TO_CART', payload: item })}
                  className="w-full mt-2 py-1.5 rounded-lg bg-gold/10 text-gold text-xs font-semibold flex items-center justify-center gap-1 hover:bg-gold/20 transition-colors"
                >
                  <FiPlus size={12} /> Add
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
