'use server'

import { searchProducts, getCategories } from '@/lib/products'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function searchProductsAction(query: string) {
  return searchProducts(query)
}

export async function getCategoriesAction() {
  return getCategories()
}

export async function submitReview(productId: string, formData: FormData) {
  const author = formData.get('author') as string
  const text = formData.get('text') as string
  const ratingStr = formData.get('rating') as string
  
  if (!author || !text || !ratingStr) {
    return { error: 'Veuillez remplir tous les champs.' }
  }
  
  const rating = parseInt(ratingStr, 10)
  if (isNaN(rating) || rating < 1 || rating > 5) {
    return { error: 'Note invalide.' }
  }

  try {
    await prisma.review.create({
      data: {
        author,
        text,
        rating,
        date: new Date(),
        status: 'PENDING',
        productId,
      },
    })
    
    // We revalidate the product path but since it's PENDING it won't show up immediately anyway.
    revalidatePath(`/produit/[slug]`, 'page')
    return { success: true }
  } catch (err) {
    console.error('Error submitting review:', err)
    return { error: 'Erreur lors de la soumission de l\'avis.' }
  }
}

export async function updateReviewStatus(reviewId: string, status: 'PUBLISHED' | 'REJECTED' | 'PENDING') {
  try {
    const updatedReview = await prisma.review.update({
      where: { id: reviewId },
      data: { status },
      include: { product: true } // Need product slug to revalidate correctly
    })
    
    if (updatedReview.product) {
      revalidatePath(`/produit/${updatedReview.product.slug}`)
    }
    revalidatePath('/admin/avis')
    
    return { success: true }
  } catch (err) {
    console.error('Error updating review status:', err)
    return { error: 'Erreur lors de la mise à jour.' }
  }
}

export async function deleteReview(reviewId: string) {
  try {
    const deleted = await prisma.review.delete({
      where: { id: reviewId },
      include: { product: true }
    })
    
    if (deleted.product) {
      revalidatePath(`/produit/${deleted.product.slug}`)
    }
    revalidatePath('/admin/avis')
    
    return { success: true }
  } catch (err) {
    console.error('Error deleting review:', err)
    return { error: 'Erreur lors de la suppression.' }
  }
}

