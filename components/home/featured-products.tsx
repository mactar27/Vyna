import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { Reveal } from '@/components/reveal'
import { ButtonLink } from '@/components/ui/button-link'

export async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <section className="bg-secondary/50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl font-medium sm:text-4xl">
              Les essentiels du moment
            </h2>
            <p className="mt-2 text-muted-foreground">
              Une sélection à ajouter au panier en un geste.
            </p>
          </div>
          <ButtonLink href="/boutique" variant="ghost" className="hidden sm:inline-flex">Tout voir</ButtonLink>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <ButtonLink href="/boutique" variant="outline" className="w-full">Tout voir</ButtonLink>
        </div>
      </div>
    </section>
  )
}
