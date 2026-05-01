import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { FiStar, FiMapPin, FiGift, FiHeart, FiShoppingBag, FiChevronRight, FiAward } from 'react-icons/fi'

const tierColors = { Gold: 'text-gold', Silver: 'text-warm-gray', Platinum: 'text-warm-white' }

export default function ProfilePage() {
  const { user, favorites, restaurantData } = useApp()
  const favRestaurants = restaurantData.filter(r => favorites.includes(r.id))

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 pb-24">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black-card border border-black-border rounded-2xl p-6 flex items-center gap-5"
      >
        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-gold" />
        <div className="flex-1">
          <h1 className="text-xl font-bold font-display">{user.name}</h1>
          <p className="text-warm-gray text-sm">{user.email}</p>
          <p className="text-warm-dim text-xs mt-1">Member since {user.joinDate}</p>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${tierColors[user.tier] || 'text-gold'}`}>{user.tier}</div>
          <div className="flex items-center gap-1 text-xs text-warm-gray mt-1"><FiAward /> {user.rewardsPoints} pts</div>
        </div>
      </motion.div>

      {/* Rewards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-2xl p-5"
      >
        <div className="flex items-center gap-3 mb-3">
          <FiGift className="text-gold text-xl" />
          <h2 className="text-base font-semibold">Rewards & Offers</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Points', value: user.rewardsPoints, icon: '⭐' },
            { label: 'Orders Placed', value: user.previousOrders.length, icon: '📦' },
            { label: 'Savings', value: '₹1,240', icon: '💰' },
            { label: 'Next Reward', value: '550 pts', icon: '🎯' },
          ].map((stat, i) => (
            <div key={i} className="bg-black-deep/50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-sm font-bold text-warm-white">{stat.value}</div>
              <div className="text-xs text-warm-gray">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Saved Addresses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <h2 className="text-lg font-bold font-display mb-3 flex items-center gap-2">
          <FiMapPin className="text-gold" /> Saved Addresses
        </h2>
        <div className="space-y-2">
          {user.savedAddresses.map(addr => (
            <div key={addr.id} className="bg-black-card border border-black-border rounded-xl p-4 flex items-center gap-3 hover:border-gold/20 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center text-gold text-sm font-bold">
                {addr.label[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-warm-white">{addr.label}</p>
                <p className="text-xs text-warm-gray truncate">{addr.address}</p>
              </div>
              {addr.isDefault && (
                <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">DEFAULT</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Favorites */}
      {favRestaurants.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h2 className="text-lg font-bold font-display mb-3 flex items-center gap-2">
            <FiHeart className="text-gold" /> Favorites
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {favRestaurants.map(r => (
              <div key={r.id} className="bg-black-card border border-black-border rounded-xl overflow-hidden hover:border-gold/20 transition-all">
                <img src={r.image} alt={r.name} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h4 className="text-sm font-medium text-warm-white truncate">{r.name}</h4>
                  <p className="text-xs text-warm-gray mt-0.5">{r.cuisine} • <span className="text-gold">{r.rating} ★</span></p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Previous Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <h2 className="text-lg font-bold font-display mb-3 flex items-center gap-2">
          <FiShoppingBag className="text-gold" /> Previous Orders
        </h2>
        <div className="space-y-3">
          {user.previousOrders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="bg-black-card border border-black-border rounded-xl p-4 hover:border-gold/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-warm-white">{order.restaurantName}</h4>
                  <p className="text-xs text-warm-dim">{order.id} • {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gold">₹{order.total}</p>
                  <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">{order.status}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-warm-gray">
                <span>{order.items.map(i => `${i.name} x${i.qty}`).join(', ')}</span>
                <span className="flex items-center gap-0.5 text-gold"><FiStar size={10} /> {order.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
