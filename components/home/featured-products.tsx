import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { ButtonLink } from '@/components/ui/button-link'

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-12 flex flex-col items-center justify-center relative">
          <h2 className="font-serif text-4xl font-medium sm:text-5xl text-primary relative inline-block">
            Nos coups de cœur
            {/* Flower sticker */}
            <div className="absolute -right-20 -top-8 rotate-12">
              <Image src="/images/fleur.png" alt="Flower sticker" width={80} height={80} className="drop-shadow-md" />
            </div>
          </h2>
          {/* Wavy line placeholder */}
          <div className="mt-4 opacity-50 text-accent">
            <svg width="150" height="12" viewBox="0 0 150 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 6C15 6 15 1.5 30 1.5C45 1.5 45 10.5 60 10.5C75 10.5 75 6 90 6C105 6 105 1.5 120 1.5C135 1.5 135 10.5 148.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/boutique" variant="outline" className="h-12 border-primary/20 px-8 text-primary hover:bg-primary/5">
            Voir tout
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
