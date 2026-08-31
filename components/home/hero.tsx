import Image from 'next/image'
import { ButtonLink } from '@/components/ui/button-link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <>
      {/* ── MOBILE : image plein écran + texte en dessous ── */}
      <section className="md:hidden">
        {/* Video full-width uncropped */}
        <div className="relative w-full">
          <video
            src="/images/hero-flatlay.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          />
          {/* Stickers visibles sur mobile */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-3 top-10 opacity-90 rotate-[-15deg]">
              <Image src="/images/fleur.png" alt="" width={80} height={80} className="drop-shadow-lg" />
            </div>
            <div className="absolute right-6 top-16 opacity-90 rotate-[10deg]">
              <span className="font-serif text-2xl text-primary font-bold italic block">summer<br/>vibes</span>
            </div>
          </div>
        </div>

        {/* Texte + bouton SOUS l'image */}
        <div className="bg-background px-6 py-10">
          <h1 className="font-serif text-4xl font-bold leading-[1.1] text-primary">
            <span className="text-accent">L'été,</span><br />
            la beauté dans chaque détail
          </h1>
          <p className="mt-4 text-base font-medium leading-relaxed text-foreground/80">
            Soins naturels, accessoires raffinés et essentiels du quotidien.
          </p>
          <div className="mt-8">
            <ButtonLink href="/boutique" size="lg" className="h-14 w-full rounded-md px-8 text-base font-medium shadow-md">
              Découvrir la boutique
              <ArrowRight className="ml-2 h-5 w-5" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── DESKTOP : layout original (texte par-dessus l'image) ── */}
      <section className="hidden md:block relative min-h-[700px] overflow-hidden lg:min-h-[800px] bg-background">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 bg-secondary/50">
          <video
            src="/images/hero-flatlay.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-right"
          />
        </div>

        {/* Decorative Stickers */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <div className="absolute left-12 top-20 opacity-90 rotate-[-15deg]">
            <Image src="/images/fleur.png" alt="" width={120} height={120} className="drop-shadow-lg" />
          </div>
          <div className="absolute left-[450px] top-[280px] opacity-80 rotate-[10deg]">
            <Image src="/images/eclat.png" alt="" width={60} height={60} className="drop-shadow-md" />
          </div>
          <div className="absolute left-8 bottom-24 opacity-90 rotate-[15deg]">
            <Image src="/images/coco.png" alt="" width={150} height={150} className="drop-shadow-lg" />
          </div>
          <div className="absolute left-[40%] bottom-[20%] opacity-80 rotate-[15deg]">
            <Image src="/images/lunettes.png" alt="" width={140} height={140} className="drop-shadow-lg" />
          </div>
          <div className="absolute right-32 top-32 opacity-90 rotate-[10deg]">
            <span className="font-serif text-4xl text-primary font-bold italic block mb-2">summer<br/>vibes</span>
            <div className="absolute -right-12 -top-6 rotate-12">
              <Image src="/images/fleur.png" alt="" width={80} height={80} className="drop-shadow-md" />
            </div>
          </div>
          <div className="absolute right-24 bottom-48 opacity-90 rotate-[-10deg]">
            <div className="absolute -left-20 -top-16">
              <Image src="/images/coquillage.png" alt="" width={130} height={130} className="drop-shadow-lg" />
            </div>
            <span className="font-serif text-5xl text-accent font-bold italic absolute">aloha ♡</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 mx-auto flex h-full min-h-[inherit] max-w-7xl flex-col justify-center px-12 py-20 w-[60%]">
          <div className="max-w-lg">
            <h1 className="text-balance font-serif text-6xl font-bold leading-[1.1] text-primary lg:text-[4.5rem]">
              <span className="text-accent">L'été,</span><br />
              la beauté dans chaque détail
            </h1>
            <p className="mt-6 max-w-[320px] text-pretty text-lg font-medium leading-relaxed text-foreground/80">
              Soins naturels, accessoires raffinés et essentiels du quotidien.
            </p>
            <div className="mt-10">
              <ButtonLink href="/boutique" size="lg" className="h-14 rounded-md px-8 text-base font-medium shadow-md">
                Découvrir la boutique
                <ArrowRight className="ml-2 h-5 w-5" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
