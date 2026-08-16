import { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Tableau de bord Admin | Vyna',
}

const stats = [
  { label: 'Ventes totales', value: '2 450 000 FCFA', trend: '+18% ce mois' },
  { label: 'Commandes', value: '124', trend: '+8% ce mois' },
  { label: 'Clients', value: '312', trend: '+15% ce mois' },
  { label: 'Produits', value: '86', trend: '+3% ce mois' },
]

const recentOrders = [
  { id: '#1024', date: '12 mai 2026', total: 26500, status: 'Livrée', customer: 'Awa D.' },
  { id: '#1023', date: '12 mai 2026', total: 18000, status: 'En cours', customer: 'Fatou N.' },
  { id: '#1022', date: '11 mai 2026', total: 9500, status: 'Expédiée', customer: 'Oumar T.' },
  { id: '#1021', date: '11 mai 2026', total: 22000, status: 'Livrée', customer: 'Sophie M.' },
]

const recentProducts = [
  { name: 'Mascara Volume', stock: 'En stock', price: 8500, image: '/images/products/mascara-volume.png' },
  { name: 'Bracelet Élégance', stock: 'En stock', price: 10000, image: '/images/products/bracelet-elegance.png' },
  { name: 'Huile de soin', stock: 'En stock', price: 9000, image: '/images/products/huile-de-soin.png' },
  { name: 'Savon Noir', stock: 'En stock', price: 7500, image: '/images/products/savon-noir.png' },
]

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      
      <main className="flex-1 md:pl-64">
        <div className="flex h-16 items-center justify-between border-b px-8">
          <h1 className="font-serif text-2xl font-medium">Tableau de bord</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Admin</span>
            <div className="h-8 w-8 rounded-full bg-secondary" />
          </div>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="rounded-xl border bg-card p-6 shadow-sm">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <span className="mt-1 text-xs text-green-500">{stat.trend}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            {/* Commandes récentes */}
            <div className="rounded-xl border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="font-medium">Commandes récentes</h2>
                <select className="rounded-md border bg-transparent px-2 py-1 text-sm">
                  <option>30 derniers jours</option>
                  <option>7 derniers jours</option>
                </select>
              </div>
              <div className="p-0">
                <table className="w-full text-left text-sm">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="p-4 font-medium text-muted-foreground">Commande</th>
                      <th className="p-4 font-medium text-muted-foreground">Date</th>
                      <th className="p-4 font-medium text-muted-foreground">Client</th>
                      <th className="p-4 font-medium text-muted-foreground">Total</th>
                      <th className="p-4 font-medium text-muted-foreground">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4 text-muted-foreground">{order.date}</td>
                        <td className="p-4 text-muted-foreground">{order.customer}</td>
                        <td className="p-4 tabular-nums">{formatPrice(order.total)}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            order.status === 'Livrée' ? 'bg-green-500/10 text-green-500' :
                            order.status === 'En cours' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-blue-500/10 text-blue-500'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Produits récents */}
            <div className="rounded-xl border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="font-medium">Produits récents</h2>
                <Button size="sm" variant="outline">Ajouter un produit</Button>
              </div>
              <div className="flex flex-col gap-4 p-6">
                {recentProducts.map((product, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-md bg-secondary">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{formatPrice(product.price)}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{product.stock}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
