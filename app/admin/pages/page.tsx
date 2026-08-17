import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function PagesPage() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-medium">Pages statiques</h1>
      </div>
      
      <div className="rounded-xl border bg-card overflow-hidden">
        {pages.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            Aucune page créée.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary/50 text-muted-foreground uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-medium">Titre</th>
                  <th className="px-6 py-4 font-medium">Slug</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{page.title}</td>
                    <td className="px-6 py-4 text-muted-foreground">{page.slug}</td>
                    <td className="px-6 py-4">{page.isPublished ? 'Publié' : 'Brouillon'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
