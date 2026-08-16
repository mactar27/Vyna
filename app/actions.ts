'use server'

import { searchProducts, getCategories } from '@/lib/products'

export async function searchProductsAction(query: string) {
  return searchProducts(query)
}

export async function getCategoriesAction() {
  return getCategories()
}
