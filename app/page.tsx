import { Hero } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { FeaturedProducts } from '@/components/home/featured-products'
import { NewArrivals } from '@/components/home/new-arrivals'
import { PromoBanner } from '@/components/home/promo-banner'
import { TrustBar } from '@/components/home/trust-bar'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <NewArrivals />
      <PromoBanner />
      <TrustBar />
    </>
  )
}
