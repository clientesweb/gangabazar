"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getNewProducts, type Product } from "@/lib/services/products"
import { Loader2 } from "lucide-react"

export default function NovedadesPage() {
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNewProducts(50)
      .then(setNewProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Lo más nuevo</span>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="italic">Novedades</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Las últimas incorporaciones a nuestra colección. Prendas nuevas, misma filosofía: acompañarte sin
              exigencias.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                  {newProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {newProducts.length === 0 && (
                  <p className="text-center text-muted-foreground">No hay novedades en este momento.</p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
