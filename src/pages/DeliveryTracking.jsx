import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { FiCheck, FiPackage, FiTruck, FiHome } from 'react-icons/fi'

const stages = [
  { key: 'preparing', label: 'Preparing your order', icon: <FiPackage />, detail: 'Our chef is crafting your meal with care', duration: 4000 },
  { key: 'picked', label: 'Order picked up', icon: <FiCheck />, detail: 'Your delivery partner has collected your order', duration: 4000 },
  { key: 'onTheWay', label: 'On the way', icon: <FiTruck />, detail: 'Heading to your doorstep right now!', duration: 5000 },
  { key: 'delivered', label: 'Delivered!', icon: <FiHome />, detail: 'Enjoy your meal! 🎉', duration: 0 },
]

export default function DeliveryTracking() {
  const { deliveryStatus, dispatch } = useApp()
  const navigate = useNavigate()
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (!deliveryStatus) return

    const stageKeys = ['preparing', 'picked', 'onTheWay', 'delivered']
    const idx = stageKeys.indexOf(deliveryStatus)
    if (idx >= 0) setActiveIdx(idx)

    if (deliveryStatus === 'delivered') return

    const nextStage = stageKeys[idx + 1]
    const timer = setTimeout(() => {
      dispatch({ type: 'UPDATE_DELIVERY', payload: nextStage })
    }, stages[idx].duration)

    return () => clearTimeout(timer)
  }, [deliveryStatus, dispatch])

  if (!deliveryStatus) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <FiTruck className="text-5xl text-warm-dim mb-4" />
        <h2 className="text-2xl font-bold font-display mb-2">No active orders</h2>
        <p className="text-warm-gray text-sm mb-6">Place an order to track it here</p>
        <button onClick={() => navigate('/')} className="bg-gold text-black-deep font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gold-light transition-colors">
          Browse Restaurants
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 sm:px-6 pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold font-display mb-2"
      >
        Order <span className="text-gold">Tracking</span>
      </motion.h1>
      <p className="text-warm-gray text-sm mb-8">Your order is being prepared with love ❤️</p>

      {/* Progress bar */}
      <div className="relative mb-10">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-black-border" />
        <motion.div
          className="absolute left-5 top-0 w-0.5 bg-gold origin-top"
          initial={{ height: 0 }}
          animate={{ height: `${(activeIdx / (stages.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />

        <div className="space-y-10">
          {stages.map((stage, i) => {
            const isActive = i <= activeIdx
            const isCurrent = i === activeIdx

            return (
              <motion.div
                key={stage.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-4 relative"
              >
                <motion.div
                  animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: isCurrent ? Infinity : 0, duration: 1.5 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 transition-all ${
                    isActive
                      ? 'bg-gold border-gold text-black-deep'
                      : 'bg-black-elevated border-black-border text-warm-dim'
                  }`}
                >
                  {stage.icon}
                </motion.div>
                <div className="pt-1">
                  <h3 className={`font-semibold text-sm ${isActive ? 'text-warm-white' : 'text-warm-dim'}`}>
                    {stage.label}
                  </h3>
                  <p className={`text-xs mt-0.5 ${isActive ? 'text-warm-gray' : 'text-warm-dim'}`}>
                    {stage.detail}
                  </p>
                  {isCurrent && i < stages.length - 1 && (
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="mt-2 text-xs text-gold font-medium"
                    >
                      In progress...
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Delivery animation */}
      {activeIdx < 3 && (
        <div className="bg-black-card border border-black-border rounded-2xl p-6 text-center">
          <motion.div
            animate={{ x: [0, 10, 0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-5xl mb-3"
          >
            🛵
          </motion.div>
          <p className="text-sm text-warm-gray">Estimated delivery in <span className="text-gold font-semibold">15-20 min</span></p>
        </div>
      )}

      {activeIdx === 3 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-black-card border border-gold/30 rounded-2xl p-6 text-center"
        >
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-lg font-bold text-gold font-display mb-2">Order Delivered!</h3>
          <p className="text-warm-gray text-sm mb-4">We hope you enjoy your meal</p>
          <button
            onClick={() => { dispatch({ type: 'CLEAR_DELIVERY' }); navigate('/') }}
            className="bg-gold text-black-deep font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gold-light transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      )}
    </div>
  )
}
