import { FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-black-border bg-black-deep py-10 pb-20 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold font-display text-gold mb-3">Zoya</h3>
            <p className="text-warm-gray text-sm leading-relaxed">
              Premium AI-powered food delivery. Curated restaurants, smart recommendations, and luxury dining at your doorstep.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-warm-white mb-3 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm text-warm-gray">
              <li className="hover:text-gold transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Partner with Us</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Blog</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-warm-white mb-3 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-warm-gray">
              <li className="hover:text-gold transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Safety</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-gold transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black-border flex items-center justify-center gap-1 text-warm-gray text-sm">
          Made with <FiHeart className="text-gold mx-1" /> by Zoya &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}
