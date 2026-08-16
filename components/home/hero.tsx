import Image from 'next/image'
import { ButtonLink } from '@/components/ui/button-link'

export function Hero() {
  return (
    <section className="relative min-h-[580px] overflow-hidden md:min-h-[640px] lg:min-h-[720px]">

      {/* Image couvre tout le hero */}
      <Image
        src="/images/hero-flatlay.png"
        alt="Sélection de produits de beauté, accessoires et soins"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Texte superposé à gauche */}
      <div className="relative z-10 flex h-full min-h-[inherit] max-w-xl flex-col justify-center px-8 py-16 lg:px-16 xl:px-24">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-primary">
          Beauté · Accessoires · Lifestyle
        </p>
        <h1 className="text-balance font-serif text-4xl font-medium leading-[1.06] sm:text-5xl lg:text-[3.5rem]">
          Tout ce qu&apos;il vous faut,<br className="hidden sm:inline" /> au même endroit.
        </h1>
        <p className="mt-5 max-w-sm text-pretty text-base leading-relaxed text-foreground/70">
          Beauté, accessoires et essentiels sélectionnés avec soin.
          Choisissez vos articles et commandez directement en ligne.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
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
    </section>
  )
}



