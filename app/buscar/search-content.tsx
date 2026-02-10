"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Loader2 } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { getProducts, type Product } from "@/lib/services/products"
import { getGrabados, type Grabado } from "@/lib/services/grabados"
import { Input } from "@/components/ui/input"

type SearchResult = (Product | Grabado) & { type?: string }

export function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [products, grabados] = await Promise.all([getProducts(), getGrabados()])
        const allResults: SearchResult[] = [
          ...products.map(p => ({ ...p, type: 'product' })),
          ...grabados.map(g => ({ ...g, type: 'grabado' }))
        ]
        setResults(allResults)
      } catch (err) {
        console.error('Error loading search data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []
    const searchTerm = query.toLowerCase()
    return results.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.tagline?.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.subcategory?.toLowerCase().includes(searchTerm) ||
        (item.type === 'product' && (item as Product).category.toLowerCase().includes(searchTerm)),
    )
  }, [query, results])

  return (
    <>
      {/* Search Header */}
      <section className="border-b border-border px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-center text-3xl font-light tracking-tight text-foreground sm:text-4xl">
            <span className="italic">Buscar</span>
          </h1>
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="¿Qué estás buscando?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 rounded-none border-border bg-background pl-12 text-base placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {query.trim() && (
            <p className="mb-8 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "resultado" : "resultados"} para "{query}"
            </p>
          )}
          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : query.trim() ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">No encontramos resultados para tu búsqueda.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Proba con otras palabras o explora nuestros productos.
              </p>
              <a
                href="/colecciones"
                className="mt-6 inline-block text-sm uppercase tracking-widest text-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                Ver productos
              </a>
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">Escribí algo para comenzar a buscar.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
