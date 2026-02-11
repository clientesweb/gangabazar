import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getGrabadoBySlugOrIdWithDetails } from "@/lib/services/grabados"
import { GrabadoDetailClient } from "@/app/grabado/[slug]/grabado-client"

export default async function GrabadoProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: grabadoSlug } = await params
  let grabado = null
  let error: string | null = null

  try {
    grabado = await getGrabadoBySlugOrIdWithDetails(grabadoSlug)
  } catch (err) {
    error = (err as Error).message || "Grabado no encontrado"
  }

  if (error || !grabado) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-light text-foreground">Grabado no encontrado</h1>
            <a href="/categorias/grabados" className="mt-4 inline-block text-sm text-muted-foreground hover:text-accent">
              Volver a Grabados
            </a>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <GrabadoDetailClient grabado={grabado} relatedGrabados={[]} />
      <Footer />
    </div>
  )
}
