import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from 'react-icons/fi'

export default function CartPage() {
  const { cart, cartTotal, dispatch } = useApp()
  const navigate = useNavigate()

  const deliveryFee = cartTotal > 500 ? 0 : 40
  const taxes = Math.round(cartTotal * 0.05)
  const grandTotal = cartTotal + deliveryFee + taxes

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <FiShoppingBag className="text-6xl text-warm-dim mb-4 mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold font-display mb-2">Your cart is empty</h2>
        <p className="text-warm-gray text-sm mb-6">Add some delicious dishes to get started!</p>
        <button onClick={() => navigate('/')} className="bg-gold text-black-deep font-semibold text-sm px-6 py-3 rounded-xl hover:bg-gold-light transition-colors">
          Browse Restaurants
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 sm:px-6 pb-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl font-bold font-display mb-6"
      >
        Your <span className="text-gold">Cart</span>
      </motion.h1>

      <div className="space-y-3">
        {cart.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-black-card border border-black-border rounded-xl p-4 flex items-center gap-4"
          >
            {item.image && (
              <img src={item.image} alt={item.name} className="w-16 h-14 rounded-lg object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-warm-white truncate">{item.name}</h3>
              <p className="text-gold text-sm font-semibold mt-0.5">₹{item.price * item.qty}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty - 1 } })}
                className="w-7 h-7 rounded-lg bg-black-elevated border border-black-border flex items-center justify-center text-warm-white hover:border-gold/50 transition-colors"
              >
                <FiMinus size={12} />
              </button>
              <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
              <button
                onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item.id, qty: item.qty + 1 } })}
                className="w-7 h-7 rounded-lg bg-black-elevated border border-black-border flex items-center justify-center text-warm-white hover:border-gold/50 transition-colors"
              >
                <FiPlus size={12} />
              </button>
            </div>
            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
              className="text-warm-dim hover:text-danger transition-colors ml-1"
            >
              <FiTrash2 size={14} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bill */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-black-card border border-black-border rounded-xl p-5 mt-6"
      >
        <h3 className="text-sm font-semibold text-warm-white uppercase tracking-wider mb-4">Bill Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-warm-gray"><span>Item Total</span><span>₹{cartTotal}</span></div>
          <div className="flex justify-between text-warm-gray">
            <span>Delivery Fee</span>
            <span>{deliveryFee === 0 ? <span className="text-success">FREE</span> : `₹${deliveryFee}`}</span>
          </div>
          <div className="flex justify-between text-warm-gray"><span>Taxes</span><span>₹{taxes}</span></div>
          <div className="border-t border-black-border pt-2 flex justify-between text-warm-white font-semibold">
            <span>Grand Total</span><span className="text-gold">₹{grandTotal}</span>
          </div>
        </div>
      </motion.div>

      {deliveryFee === 0 && (
        <p className="text-success text-xs text-center mt-2">🎉 You saved ₹40 on delivery!</p>
      )}

      {/* Checkout */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => { dispatch({ type: 'START_DELIVERY' }); navigate('/tracking') }}
        className="w-full mt-6 bg-gradient-to-r from-gold to-gold-dark text-black-deep font-bold py-4 rounded-xl text-sm hover:shadow-lg hover:shadow-gold/20 transition-all"
      >
        Place Order — ₹{grandTotal}
      </motion.button>
    </div>
  )
}
