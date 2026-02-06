import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProductBySlugOrIdWithDetails } from "@/lib/services/products"
import { ProductDetailClient } from "./product-client"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: productSlug } = await params
  let product = null
  let error: string | null = null

  try {
    product = await getProductBySlugOrIdWithDetails(productSlug)
  } catch (err) {
    error = (err as Error).message || "Producto no encontrado"
  }

  if (error || !product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-light text-foreground">Producto no encontrado</h1>
            <a href="/" className="mt-4 inline-block text-sm text-muted-foreground hover:text-accent">
              Volver al inicio
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
      <ProductDetailClient product={product} relatedProducts={[]} />
      <Footer />
    </div>
  )
}
