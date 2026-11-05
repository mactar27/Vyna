import Link from 'next/link'
import { CheckCircle2, PackageCheck } from 'lucide-react'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>
}) {
  const { order: orderId } = await searchParams
  const order = orderId ? await prisma.order.findUnique({ where: { id: orderId } }) : null

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="font-serif text-3xl font-medium text-emerald-900 sm:text-4xl">
          {order?.status === 'CONFIRMED' ? 'Paiement validé' : 'Commande reçue'}
        </h1>

        <p className="mt-4 text-base text-emerald-800">
          {order?.status === 'CONFIRMED'
            ? 'Votre paiement a bien été reçu. Nous préparons votre commande.'
            : 'Votre commande a bien été enregistrée. Nous la traitons dans les plus brefs délais.'}
        </p>

        {order && (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-white/70 p-4 text-left text-sm text-emerald-900">
            <p><span className="font-semibold">Commande :</span> #{order.id.slice(0, 8).toUpperCase()}</p>
            <p><span className="font-semibold">Total :</span> {order.subtotal.toLocaleString('fr-FR')} FCFA</p>
            <p><span className="font-semibold">Statut :</span> {order.status}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Retour à l’accueil
          </Link>
          <Link
            href="/boutique"
            className="inline-flex items-center justify-center rounded-full border border-emerald-600 bg-white px-5 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
          >
            Continuer mes achats
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-emerald-800">
          <PackageCheck className="h-4 w-4" />
          Un e-mail de confirmation vous sera envoyé rapidement.
        </div>
      </div>
    </div>
  )
}
