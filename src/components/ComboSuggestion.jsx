import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { FiX, FiPlus, FiZap } from 'react-icons/fi'

export default function ComboSuggestion() {
  const { comboSuggestion, dispatch } = useApp()

  if (!comboSuggestion) return null

  const { suggest, trigger } = comboSuggestion

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-16 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[400px] z-40"
      >
        <div className="bg-black-card border border-gold/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
              <FiZap className="text-gold text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gold mb-1">Smart Suggestion</p>
              <p className="text-sm text-warm-white">{suggest.message}</p>
              <div className="flex gap-2 mt-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    dispatch({ type: 'ADD_TO_CART', payload: { id: suggest.id, name: suggest.name, price: suggest.price, image: '', calories: 0, isVeg: true } })
                    dispatch({ type: 'DISMISS_COMBO' })
                  }}
                  className="flex items-center gap-1 bg-gold text-black-deep text-xs font-bold px-4 py-2 rounded-lg hover:bg-gold-light transition-colors"
                >
                  <FiPlus size={12} /> Add ₹{suggest.price}
                </motion.button>
                <button
                  onClick={() => dispatch({ type: 'DISMISS_COMBO' })}
                  className="text-xs text-warm-gray hover:text-warm-white transition-colors px-3"
                >
                  No thanks
                </button>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: 'DISMISS_COMBO' })}
              className="text-warm-dim hover:text-warm-white transition-colors"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
