import { CategoryGrid } from '@/components/home/category-grid'

export const metadata = {
  title: 'Catégories | Vyna',
  description: 'Découvrez toutes les catégories de produits sur Vyna.'
}

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <CategoryGrid />
    </main>
  )
}
