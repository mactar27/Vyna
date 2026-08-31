'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Camera, Music2, MessageCircle, Heart } from 'lucide-react'

export function SiteFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 relative inline-block">
              <span className="font-serif text-4xl tracking-widest text-white">VYNA</span>
              <span className="absolute -right-6 top-0 text-2xl rotate-12 opacity-80">🌸</span>
            </Link>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-6">
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">Boutique</h3>
              <ul className="mt-4 flex flex-col gap-3 text-xs text-primary-foreground/70">
                <li><Link href="/categorie/soins-visage" className="hover:text-white">Soins visage</Link></li>
                <li><Link href="/categorie/bijoux" className="hover:text-white">Bijoux & accessoires</Link></li>
                <li><Link href="/categorie/savon-noir" className="hover:text-white">Savon noir</Link></li>
                <li><Link href="/categorie/lunettes" className="hover:text-white">Lunettes de soleil</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">À propos</h3>
              <ul className="mt-4 flex flex-col gap-3 text-xs text-primary-foreground/70">
                <li><Link href="/notre-histoire" className="hover:text-white">Notre histoire</Link></li>
                <li><Link href="/valeurs" className="hover:text-white">Nos valeurs</Link></li>
                <li><Link href="/ingredients" className="hover:text-white">Ingrédients</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-white">Aide & infos</h3>
              <ul className="mt-4 flex flex-col gap-3 text-xs text-primary-foreground/70">
                <li><Link href="/livraison" className="hover:text-white">Livraison</Link></li>
                <li><Link href="/retours" className="hover:text-white">Retours & remboursements</Link></li>
                <li><Link href="/paiement" className="hover:text-white">Paiement sécurisé</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-white relative inline-block">
                Nous suivre
                <span className="absolute -bottom-8 -right-8 text-sm font-serif italic text-accent opacity-80 rotate-[-15deg] px-2 py-1 bg-white/10 rounded-md backdrop-blur-sm">XOXO</span>
              </h3>
              <div className="mt-4 flex gap-4 text-primary-foreground/70">
                <a href="#" className="hover:text-white"><Camera className="h-4 w-4" /></a>
                <a href="#" className="hover:text-white"><Music2 className="h-4 w-4" /></a>
                <a href="#" className="hover:text-white"><MessageCircle className="h-4 w-4" /></a>
                <a href="#" className="hover:text-white"><Heart className="h-4 w-4" /></a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 lg:ml-auto">
            <h3 className="font-serif text-xl font-medium text-white">Rejoins l'univers VYNA</h3>
            <p className="mt-2 text-xs leading-relaxed text-primary-foreground/70">
              Sois la première informée des nouveautés et offres exclusives.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                required
                placeholder="Ton e-mail"
                className="h-10 border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:ring-white/30"
              />
              <Button type="submit" variant="secondary" className="h-10 px-6 font-medium bg-pink-400 text-white hover:bg-pink-500">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-[11px] text-primary-foreground/50 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <p>© {new Date().getFullYear()} VYNA. Tous droits réservés.</p>
            <p>
              Réalisé par{' '}
              <a href="https://wockytech.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 transition-colors">
                WockyTech
              </a>
            </p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 sm:mt-0">
            <Link href="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white">Confidentialité</Link>
            <Link href="/cgv" className="hover:text-white">Conditions générales</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
