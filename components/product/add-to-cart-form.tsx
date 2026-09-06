'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { useCart } from '@/lib/cart-context'
import type { Product } from '@/lib/products'

interface AddToCartFormProps {
  product: Product
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  
  // existing variants (if any)
  const [variant, setVariant] = useState<string | undefined>(
    product.variants?.options[0]
  )
  
  // colors and sizes
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]
  )
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  )

  const handleAdd = () => {
    // Combine selected options into the variant string
    const parts = []
    if (variant) parts.push(variant)
    if (selectedColor) parts.push(`Couleur: ${selectedColor}`)
    if (selectedSize) parts.push(`Taille: ${selectedSize}`)
    const combinedVariant = parts.length > 0 ? parts.join(' | ') : undefined

    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.images[0] || '/placeholder.svg',
        variant: combinedVariant,
      },
      quantity
    )
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      {product.variants && (
        <div className="flex flex-col gap-2">
          <label htmlFor="variant-select" className="text-sm font-medium">
            {product.variants.label}
          </label>
          {/* Note: In a real app we might use a dedicated select/radio component for variants. 
              We're using a simple select here for brevity, assuming standard select is fine or 
              we can update later to a custom UI.
          */}
          <div className="flex flex-wrap gap-2">
            {product.variants.options.map((opt) => (
              <Button
                key={opt}
                type="button"
                variant={variant === opt ? 'default' : 'outline'}
                onClick={() => setVariant(opt)}
                className="h-10 px-4"
              >
                {opt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Selectors for Colors and Sizes */}
      {product.colors && product.colors.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Couleur</label>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                  selectedColor === color ? 'border-primary scale-110' : 'border-transparent hover:scale-105'
                }`}
                title={color}
              >
                <span
                  className="h-full w-full rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium">Taille</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size}
                type="button"
                variant={selectedSize === size ? 'default' : 'outline'}
                onClick={() => setSelectedSize(size)}
                className="h-10 min-w-[3rem] px-4"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground sm:sr-only">
            Quantité
          </label>
          <div className="flex h-12 w-32 items-center rounded-md border">
            <button
              type="button"
              className="flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="flex-1 text-center font-medium tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              className="flex h-full w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              disabled={quantity >= product.stock}
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Button
          onClick={handleAdd}
          size="lg"
          className="h-12 flex-1 text-base"
          disabled={!product.inStock}
        >
          {product.inStock ? (
            <>
              Ajouter au panier
              <ShoppingBag className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Rupture de stock'
          )}
        </Button>
      </div>

      {!product.inStock && (
        <p className="text-sm text-destructive">Ce produit est actuellement en rupture de stock.</p>
      )}
      {product.inStock && product.stock <= 5 && (
        <p className="text-sm text-amber-600 dark:text-amber-500">
          Plus que {product.stock} en stock !
        </p>
      )}
    </div>
  )
}
