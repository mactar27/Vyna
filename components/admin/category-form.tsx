'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { saveCategory, deleteCategory } from '@/app/actions'
import { toast } from 'sonner'
import { Loader2, Trash2 } from 'lucide-react'

interface CategoryFormProps {
  initialData?: {
    id: string
    name: string
    slug: string
    tagline: string
    image: string
  }
}

export function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    tagline: initialData?.tagline || '',
    image: initialData?.image || ''
  })

  // Auto-generate slug from name if slug is empty or user is typing name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setFormData(prev => ({
      ...prev,
      name: newName,
      // Only auto-update slug if we are creating new (no initialData)
      ...(!initialData && {
        slug: newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      })
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    const result = await saveCategory(initialData?.id || null, formData)
    
    setIsSaving(false)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success(initialData ? 'Catégorie modifiée avec succès' : 'Catégorie créée avec succès')
      router.push('/admin/categories')
    }
  }

  const handleDelete = async () => {
    if (!initialData || !confirm('Voulez-vous vraiment supprimer cette catégorie ?')) return
    
    setIsDeleting(true)
    const result = await deleteCategory(initialData.id)
    setIsDeleting(false)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Catégorie supprimée')
      router.push('/admin/categories')
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de la catégorie *</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={handleNameChange}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL) *</Label>
            <Input 
              id="slug" 
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tagline">Slogan (Tagline) *</Label>
          <Input 
            id="tagline" 
            value={formData.tagline}
            onChange={(e) => setFormData({...formData, tagline: e.target.value})}
            placeholder="Ex: Soins nourrissants pour le corps"
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">URL de l'image *</Label>
          <Input 
            id="image" 
            value={formData.image}
            onChange={(e) => setFormData({...formData, image: e.target.value})}
            placeholder="/images/categories/..."
            required 
          />
          {formData.image && (
            <div className="mt-4 relative h-32 w-32 rounded-lg border overflow-hidden">
              <img src={formData.image} alt="Aperçu" className="object-cover w-full h-full" />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          {initialData ? (
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isDeleting || isSaving}
            >
              {isDeleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash2 className="h-4 w-4 mr-2" />}
              Supprimer
            </Button>
          ) : (
            <div /> // Spacer
          )}
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push('/admin/categories')}
              disabled={isSaving || isDeleting}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSaving || isDeleting}>
              {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {initialData ? 'Enregistrer les modifications' : 'Créer la catégorie'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
