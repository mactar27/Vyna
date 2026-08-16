'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/format'
import { Separator } from '@/components/ui/separator'

export function OrderSummary() {
  const { items, subtotal, setQuantity, removeItem, count } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl bg-secondary/30 p-6 text-center lg:p-8">
        <p className="text-muted-foreground">Votre panier est vide.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded-2xl bg-secondary/30 p-6 lg:p-8">
      <h2 className="mb-6 font-serif text-xl font-medium sm:text-2xl">
        Votre panier <span className="text-muted-foreground">({count})</span>
      </h2>

      <div className="flex flex-col gap-6">
        <div className="hidden grid-cols-12 gap-4 text-sm text-muted-foreground md:grid">
          <div className="col-span-6">Produit</div>
          <div className="col-span-2 text-right">Prix</div>
          <div className="col-span-2 text-center">Quantité</div>
          <div className="col-span-2 text-right">Sous-total</div>
        </div>
        <Separator className="hidden md:block" />

        <ul className="flex flex-col gap-6">
          {items.map((item) => (
            <li key={`${item.id}-${item.variant || ''}`} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
              {/* Produit */}
              <div className="col-span-6 flex items-start gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-background md:h-24 md:w-20">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-foreground">{item.name}</span>
                  {item.variant && <span className="text-xs text-muted-foreground">{item.variant}</span>}
                  <button
                    onClick={() => removeItem(item.id, item.variant)}
                    className="mt-2 w-fit text-xs text-muted-foreground transition-colors hover:text-destructive md:hidden"
                  >
                    Retirer
                  </button>
                </div>
              </div>

              {/* Prix */}
              <div className="col-span-2 hidden text-right text-sm md:block">
                {formatPrice(item.price)}
              </div>

              {/* Quantité & Mobile Prix */}
              <div className="col-span-1 flex items-center justify-between md:col-span-2 md:justify-center">
                <div className="flex items-center rounded-md border bg-background">
                  <button
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setQuantity(item.id, item.quantity - 1, item.variant)}
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                  <button
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => setQuantity(item.id, item.quantity + 1, item.variant)}
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                
                {/* Mobile price and remove */}
                <div className="flex flex-col items-end gap-1 md:hidden">
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>

              {/* Sous-total (Desktop) & Remove */}
              <div className="col-span-2 hidden items-center justify-end gap-4 md:flex">
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                <button
                  onClick={() => removeItem(item.id, item.variant)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Retirer l'article"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <Separator className="my-2" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Sous-total</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Livraison</span>
            <span className="text-muted-foreground">—</span>
          </div>
          <Separator className="my-1" />
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">Total</span>
            <div className="flex flex-col items-end">
              <span className="text-xl font-semibold tabular-nums">{formatPrice(subtotal)}</span>
              <span className="text-xs text-muted-foreground">Taxes incluses. Frais d'expédition calculés à l'étape suivante.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
