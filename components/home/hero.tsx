import Image from 'next/image'
import { ButtonLink } from '@/components/ui/button-link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:gap-8 md:py-20 lg:py-24">
        <div className="animate-fade-up order-2 md:order-1">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-primary">
            Beauté · Accessoires · Lifestyle
          </p>
          <h1 className="text-balance font-serif text-4xl font-medium leading-[1.05] sm:text-5xl lg:text-6xl">
            Tout ce qu&apos;il vous faut, au même endroit.
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
            Beauté, accessoires et essentiels sélectionnés avec soin. Choisissez vos
            articles et commandez directement en ligne.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/boutique" size="lg" className="h-12 px-7 text-sm">
              Découvrir la boutique
            </ButtonLink>
            <ButtonLink
              href="/categorie/nouveautes"
              size="lg"
              variant="outline"
              className="h-12 px-7 text-sm"
            >
              Voir les nouveautés
            </ButtonLink>
          </div>
        </div>

        <div className="animate-fade-up order-1 md:order-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary md:aspect-[4/5]">
            <Image
              src="/images/hero-flatlay.png"
              alt="Sélection de produits de beauté, accessoires et soins disposés sur un fond ivoire"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
