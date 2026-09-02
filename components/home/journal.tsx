import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/reveal'
import { ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/db'

export async function Journal() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  })
  return (
    <section className="bg-secondary/40 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative Stickers */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-8 top-12 opacity-80 rotate-[-10deg]">
          <span className="font-serif text-2xl text-accent font-bold italic block mb-2">tropical<br/>state</span>
          <Image src="/images/fleur.png" alt="Flower sticker" width={60} height={60} className="drop-shadow-md ml-4" />
        </div>
        <div className="absolute right-4 bottom-8 opacity-80 rotate-[15deg] hidden md:block">
          <Image src="/images/coco.png" alt="Coconut sticker" width={120} height={120} className="drop-shadow-lg" />
        </div>
        <div className="absolute -left-4 bottom-0 opacity-80">
          <Image src="/images/fleur.png" alt="Hibiscus sticker" width={180} height={180} className="drop-shadow-lg" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left: Text Content */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <Reveal>
              <h2 className="font-serif text-4xl font-medium sm:text-5xl text-primary">
                Le journal
              </h2>
              <p className="mt-6 text-base text-primary/80 leading-relaxed max-w-sm">
                Conseils, routines et inspirations pour prendre soin de soi naturellement.
              </p>
              <Link href="/journal" className="mt-8 inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4">
                Découvrir le journal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          {/* Right: Articles Grid */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:grid-cols-3">
              {articles.map((article, i) => (
                <Reveal key={i} delay={i * 100}>
                  <Link href={`/journal/${article.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary mb-4 flex items-center justify-center">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="font-serif text-4xl opacity-30 select-none">✦</span>
                      )}
                      {/* Decorative tape placeholder on image */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/40 backdrop-blur-md rotate-[-3deg] z-10" />
                    </div>
                    <h3 className="text-sm font-medium text-primary leading-snug group-hover:text-primary/80">
                      {article.title}
                    </h3>
                    <span className="mt-2 text-[11px] uppercase tracking-wider text-accent underline underline-offset-4 font-semibold group-hover:text-accent/80 block">
                      Lire l'article
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            
            <div className="mt-10 flex justify-end">
              <Link href="/journal" className="inline-flex items-center text-xs font-semibold uppercase tracking-widest text-primary hover:opacity-70">
                Voir tous les articles <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
