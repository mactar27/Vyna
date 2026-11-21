import { Hero } from '@/components/home/hero'
import { CategoryGrid } from '@/components/home/category-grid'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Journal } from '@/components/home/journal'
import { TrustBar } from '@/components/home/trust-bar'
import ComingSoonPage from '@/app/coming-soon/page'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  if (process.env.NEXT_PUBLIC_COMING_SOON === 'true') {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('admin_auth')?.value === 'faivyyy23'

    if (!isAdmin) {
      return <ComingSoonPage />
    }
  }

  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProducts />
      <Journal />
    </>
  )
}
