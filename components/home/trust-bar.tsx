import { ShoppingCart, ShieldCheck, Truck, Headphones } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const items = [
  {
    icon: ShoppingCart,
    title: 'Commande simple',
    text: 'Commandez directement en ligne.',
  },
  {
    icon: ShieldCheck,
    title: 'Paiement sécurisé',
    text: 'Vos informations sont protégées.',
  },
  {
    icon: Truck,
    title: 'Livraison',
    text: 'Expédition selon votre pays.',
  },
  {
    icon: Headphones,
    title: 'Support client',
    text: 'Une assistance quand vous en avez besoin.',
  },
]

export function TrustBar() {
  return (
    <section className="border-y bg-secondary/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 70} className="flex flex-col items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-sans text-sm font-medium">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
