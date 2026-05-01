import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import CartPage from './pages/CartPage'
import DeliveryTracking from './pages/DeliveryTracking'
import ProfilePage from './pages/ProfilePage'
import ComboSuggestion from './components/ComboSuggestion'

export default function App() {
  return (
    <div className="min-h-screen bg-black-deep text-warm-white font-sans">
      <Navbar />
      <main className="pt-16 sm:pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant/:id" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/tracking" element={<DeliveryTracking />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </main>
      <ComboSuggestion />
      <Footer />
    </div>
  )
}
