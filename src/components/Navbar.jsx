import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { FiShoppingBag, FiUser, FiHome, FiMapPin } from 'react-icons/fi'

export default function Navbar() {
  const { cartCount } = useApp()
  const location = useLocation()

  const links = [
    { to: '/', icon: <FiHome />, label: 'Home' },
    { to: '/tracking', icon: <FiMapPin />, label: 'Track' },
    { to: '/profile', icon: <FiUser />, label: 'Profile' },
  ]

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black-deep/80 border-b border-black-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <span className="text-black-deep font-bold text-lg font-display">Z</span>
          </div>
          <span className="text-xl font-semibold tracking-wide font-display text-gold">
            Zoya
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1.5 text-sm transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'text-gold'
                  : 'text-warm-gray hover:text-warm-white'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-black-elevated border border-black-border flex items-center justify-center transition-colors group-hover:border-gold/50"
          >
            <FiShoppingBag className="text-warm-white" />
          </motion.div>
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-black-deep text-xs font-bold rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          )}
        </Link>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-black-deep/95 backdrop-blur-xl border-t border-black-border flex justify-around items-center h-14 z-50">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
              location.pathname === link.to ? 'text-gold' : 'text-warm-gray'
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </Link>
        ))}
        <Link
          to="/cart"
          className={`flex flex-col items-center gap-0.5 text-xs relative transition-colors ${
            location.pathname === '/cart' ? 'text-gold' : 'text-warm-gray'
          }`}
        >
          <span className="text-lg"><FiShoppingBag /></span>
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-1 left-1/2 ml-2 w-4 h-4 bg-gold text-black-deep text-[10px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </motion.nav>
  )
}
