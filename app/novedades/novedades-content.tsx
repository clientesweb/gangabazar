"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getNewProducts, type Product } from "@/lib/services/products"
import { Loader2, Sparkles } from "lucide-react"

export function NovedadesContent() {
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
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          {/* Subtle decorative background */}
          <div className="absolute inset-0 bg-[#C8AD7F]/5" />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#C8AD7F]/[0.07]" />
          <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#C8AD7F]/[0.05]" />

          <div className="relative mx-auto max-w-7xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C8AD7F]/30 bg-[#C8AD7F]/10 px-4 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#a89060]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#a89060]">
                Lo mas nuevo
              </span>
            </div>
            <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-[#4F4D46] sm:text-6xl lg:text-7xl">
              Novedades
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-[#4F4D46]/70 sm:text-lg">
              Las ultimas incorporaciones a nuestra coleccion. Productos nuevos, misma filosofia: personalizar cada detalle para vos.
            </p>

            {/* Product count pill */}
            {!loading && newProducts.length > 0 && (
              <p className="mt-8 text-sm font-semibold text-[#4F4D46]/50">
                {newProducts.length} {newProducts.length === 1 ? "producto" : "productos"}
              </p>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-20">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8AD7F]/10">
                  <Loader2 className="h-6 w-6 animate-spin text-[#a89060]" />
                </div>
                <p className="text-sm font-medium text-[#4F4D46]/50">
                  Cargando novedades...
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                  {newProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {newProducts.length === 0 && (
                  <div className="flex flex-col items-center justify-center gap-4 py-20">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#C8AD7F]/10">
                      <Sparkles className="h-7 w-7 text-[#a89060]" />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-[#4F4D46]">
                        Pronto nuevos productos
                      </p>
                      <p className="mt-1 text-sm text-[#4F4D46]/60">
                        Estamos preparando novedades para vos.
                      </p>
                    </div>
                  </div>
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
