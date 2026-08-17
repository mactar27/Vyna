'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function SiteFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="mt-24 border-t bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Image src="/logo.png" alt="Vyna Logo" width={120} height={40} className="h-9 w-auto object-contain" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Beauté, accessoires et essentiels sélectionnés avec soin. Une boutique
              pensée pour évoluer avec vous.
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href="#"
                className="flex h-9 items-center justify-center rounded-full border px-4 text-xs transition-colors hover:bg-background"
              >
                Instagram
              </a>
              <a
                href="#"
                className="flex h-9 items-center justify-center rounded-full border px-4 text-xs transition-colors hover:bg-background"
              >
                Facebook
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium">Boutique</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li><Link href="/categorie/beaute" className="hover:text-foreground">Beauté</Link></li>
              <li><Link href="/categorie/accessoires" className="hover:text-foreground">Accessoires</Link></li>
              <li><Link href="/categorie/soins" className="hover:text-foreground">Soins</Link></li>
              <li><Link href="/categorie/nouveautes" className="hover:text-foreground">Nouveautés</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium">Aide</h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">

              <li><Link href="/panier" className="hover:text-foreground">Mon panier</Link></li>
              <li><Link href="/livraison" className="hover:text-foreground">Livraison</Link></li>
              <li><Link href="/boutique" className="hover:text-foreground">Toute la boutique</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium">Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Recevez nos nouveautés et sélections du moment.
            </p>
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                required
                placeholder="Votre email"
                aria-label="Votre email"
                className="bg-background"
              />
              <Button type="submit" variant="default">
                OK
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Vyna. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">Confidentialité</Link>
            <Link href="#" className="hover:text-foreground">Conditions</Link>
          </div>
        </div>
        <div className="mt-4 border-t pt-4 text-center text-xs text-muted-foreground/60">
          Réalisé par{' '}
          <a
            href="https://wockytech.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground hover:underline"
          >
            WockyTech
          </a>
        </div>
      </div>
    </footer>
  )
}
