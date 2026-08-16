'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    if (!product.inStock) return
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
    })
    toast.success(`${product.name} ajouté au panier`)
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <Link href={`/produit/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium tracking-wide backdrop-blur">
              Nouveau
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-sale px-2.5 py-1 text-[11px] font-medium tracking-wide text-sale-foreground">
              -{discount}%
            </span>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
            <span className="rounded-full bg-background px-3 py-1 text-xs font-medium">
              Épuisé
            </span>
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          aria-label={`Ajouter ${product.name} au panier`}
          className={cn(
            'absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-sm transition-all duration-300',
            'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0',
            'hover:bg-primary hover:text-primary-foreground',
            'disabled:cursor-not-allowed disabled:opacity-0',
            'md:opacity-0 max-md:opacity-100 max-md:translate-y-0',
          )}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-0.5">
        <h3 className="text-sm font-medium leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm tabular-nums">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
