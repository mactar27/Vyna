'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteCategory } from '@/app/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function DeleteCategoryButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Voulez-vous vraiment supprimer cette catégorie ?')) return
    
    setIsDeleting(true)
    const result = await deleteCategory(id)
    setIsDeleting(false)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Catégorie supprimée')
      router.refresh()
    }
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-destructive hover:text-destructive-foreground h-9 w-9 text-destructive"
      title="Supprimer"
    >
      {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </button>
  )
}
