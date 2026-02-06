"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart"
import { type Product } from "@/lib/services/products"
import { getFeaturedProductsWithDetails, generateSlug } from "@/lib/services/products"

interface FeaturedProductsProps {
  products?: Product[]
}

export function FeaturedProducts({ products: serverProducts }: FeaturedProductsProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({})
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(serverProducts || [])
  const [loading, setLoading] = useState(!serverProducts)
  const { addItem } = useCart()

  useEffect(() => {
    if (!serverProducts) {
      getFeaturedProductsWithDetails(4)
        .then(setFeaturedProducts)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [serverProducts])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleAddToCart = (product: Product, size: string) => {
    // Create a compatible object for cart
    const cartItem = {
      ...product,
      colors: [], // No colors in new schema yet
      sizes: [size],
    }
    addItem(cartItem as any, size, "Unico", 1)
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  if (loading && !serverProducts) {
    return (
      <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-muted-foreground">Cargando productos...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Los mas elegidos</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Productos <span className="text-primary">destacados</span>
            </h2>
          </div>
          <Link
            href="/colecciones"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
          >
            Ver todos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {featuredProducts.map((product: any) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <Link href={`/producto/${generateSlug(product.name)}`}>
                  <img
                    src={product.mainImage || product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                {product.isNew && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    Nuevo
                  </span>
                )}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-all hover:bg-background"
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      favorites.includes(product.id) ? "fill-primary text-primary" : "text-foreground",
                    )}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 translate-y-full rounded-b-2xl bg-primary p-4 transition-transform duration-300 group-hover:translate-y-0">
                  {addedToCart === product.id ? (
                    <div className="flex items-center justify-center gap-2 py-4 text-primary-foreground">
                      <Check className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Agregado</span>
                    </div>
                  ) : (
                    <>
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="mb-3 flex justify-center gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))}
                              className={cn(
                                "flex h-8 items-center justify-center rounded-full border px-3 text-xs font-semibold transition-colors cursor-pointer",
                                selectedSizes[product.id] === size
                                  ? "border-primary-foreground bg-primary-foreground text-primary"
                                  : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10",
                              )}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      )}
                      <Button
                        onClick={() => {
                          const size = selectedSizes[product.id] || (product.sizes?.[0]) || "Único"
                          handleAddToCart(product, size)
                        }}
                        className="w-full rounded-full bg-transparent text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary-foreground/10"
                      >
                        Agregar al carrito
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <Link href={`/producto/${generateSlug(product.name)}`} className="block">
                <div className="mt-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{product.tagline}</span>
                  <h3 className="mt-1 text-base font-bold text-foreground">{product.name}</h3>
                  <p className="mt-1 text-sm font-bold text-foreground">${product.price.toLocaleString()}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
