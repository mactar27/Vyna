import { loginAdmin } from '@/app/actions'
import { AlertCircle } from 'lucide-react'

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const resolvedParams = await searchParams;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm rounded-3xl bg-card p-10 shadow-sm border border-border">
        <h1 className="font-serif text-3xl font-medium text-center mb-2 text-primary">Accès restreint</h1>
        <p className="text-center text-sm text-muted-foreground mb-8">
          Veuillez entrer le mot de passe pour accéder à l'administration.
        </p>

        {resolvedParams.error && (
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            Mot de passe incorrect
          </div>
        )}

        <form action={loginAdmin} className="flex flex-col gap-5">
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
            className="flex h-12 w-full rounded-xl border border-input bg-transparent px-4 py-2 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="h-12 w-full rounded-xl bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  )
}
