'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, ShoppingBag, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import { SearchDialog } from '@/components/search-dialog'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/boutique', label: 'Boutique' },
  { href: '/categorie/beaute', label: 'Beauté' },
  { href: '/categorie/accessoires', label: 'Accessoires' },
  { href: '/categorie/nouveautes', label: 'Nouveautés' },
]

export function SiteHeader() {
  const { count, setOpen } = useCart()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isAdmin = pathname?.startsWith('/admin')
  if (isAdmin) return null

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-xs tracking-wide">
          Livraison internationale — commandez directement en ligne
        </p>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 border-b transition-all duration-300',
          scrolled
            ? 'border-border bg-background/85 backdrop-blur-md'
            : 'border-transparent bg-background',
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          {/* Left: mobile menu + logo */}
          <div className="flex items-center gap-2">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <button
                    className="md:hidden inline-flex size-8 shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    aria-label="Menu"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="border-b px-6 py-5 text-left">
                  <SheetTitle className="inline-flex items-center border border-foreground px-2.5 py-1 font-serif text-sm font-semibold tracking-[0.22em] uppercase">
                    Vyna
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-3 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="my-2 h-px bg-border" />
                  <Link
                    href="/compte"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-md px-3 py-3 text-base transition-colors hover:bg-secondary"
                  >
                    Mon compte
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex items-center border border-foreground px-2.5 py-1 font-serif text-sm font-semibold tracking-[0.22em] uppercase">
                Vyna
              </span>
            </Link>
          </div>

          {/* Center: nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname?.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm tracking-wide text-foreground/80 transition-colors hover:text-foreground',
                    active && 'text-foreground',
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-primary" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Rechercher"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}
              onClick={() => setOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium leading-none text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <CartDrawer />
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
