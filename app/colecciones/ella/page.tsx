'use client'

import { useEffect, useState } from 'react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByCategory } from "@/lib/services/products"
import { Loader2 } from 'lucide-react'

export default function EllaPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProductsByCategory("ella")
        setProducts(data)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadProducts()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src="/elegant-woman-fashion-model-wearing-earth-tone-dre.jpg"
            alt="Colección Ella"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-white/80">Colección</span>
            <h1 className="mt-2 font-serif text-5xl font-light text-white sm:text-6xl lg:text-7xl">Ella</h1>
            <p className="mt-4 max-w-md text-base text-white/80">Tu estilo, tu ritmo. Prendas que fluyen con vos.</p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">{loading ? "Cargando..." : `${products.length} prendas`}</p>
              <div className="flex gap-4">
                <select className="border-b border-foreground bg-transparent py-2 text-sm focus:outline-none">
                  <option>Ordenar por</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Más nuevos</option>
                </select>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ProductGrid products={products} columns={3} />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
