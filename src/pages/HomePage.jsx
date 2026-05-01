import { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import FeaturedCarousel from '../components/FeaturedCarousel'
import Recommendations from '../components/Recommendations'
import RestaurantList from '../components/RestaurantList'

export default function HomePage() {
  const [category, setCategory] = useState('all')

  return (
    <>
      <HeroBanner onCategoryChange={setCategory} activeCategory={category} />
      <FeaturedCarousel />
      <Recommendations />
      <RestaurantList category={category} />
    </>
  )
}
