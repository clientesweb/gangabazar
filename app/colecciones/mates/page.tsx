"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { getProductsByCategory } from "@/lib/services/products"
import { type Product } from "@/lib/services/products"
import { Loader2 } from "lucide-react"

export default function MatesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductsByCategory("mates")
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img
            src="/images/category-mates.jpg"
            alt="Mates personalizados"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary-foreground/80">Coleccion</span>
            <h1 className="mt-2 text-5xl font-bold text-primary-foreground sm:text-6xl lg:text-7xl">Mates</h1>
            <p className="mt-4 max-w-md text-base font-medium text-primary-foreground/80">El companero de todos los dias, personalizado para vos.</p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                {loading ? "Cargando..." : `${products.length} productos`}
              </p>
              <div className="flex gap-4">
                <select className="rounded-lg border-b border-foreground bg-transparent py-2 text-sm font-medium focus:outline-none">
                  <option>Ordenar por</option>
                  <option>Precio: menor a mayor</option>
                  <option>Precio: mayor a menor</option>
                  <option>Mas nuevos</option>
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
