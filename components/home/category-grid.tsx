import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getCategories } from '@/lib/products'
import { Reveal } from '@/components/reveal'

export async function CategoryGrid() {
  const categories = await getCategories()
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl font-medium sm:text-4xl">Explorer la boutique</h2>
          <p className="mt-2 text-muted-foreground">
            Des catégories qui grandissent avec notre catalogue.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((cat, i) => (
          <Reveal key={cat.slug} delay={i * 80}>
            <Link
              href={`/categorie/${cat.slug}`}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl"
            >
              <Image
                src={cat.image || '/placeholder.svg'}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
              <div className="relative p-4 text-background">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl">{cat.name}</h3>
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="mt-0.5 text-xs text-background/80">{cat.tagline}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
