"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Product } from "@/lib/services/products"
import { getNewProductsWithDetails, generateSlug } from "@/lib/services/products"

interface NewArrivalsSectionProps {
  products?: Product[]
}

export function NewArrivalsSection({ products: serverProducts }: NewArrivalsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [newArrivals, setNewArrivals] = useState<Product[]>(serverProducts || [])
  const [loading, setLoading] = useState(!serverProducts)

  useEffect(() => {
    if (!serverProducts) {
      getNewProductsWithDetails(8)
        .then(setNewArrivals)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [serverProducts])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const checkScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.7
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
    setTimeout(checkScroll, 350)
  }

  if (loading && !serverProducts) {
    return (
      <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-muted-foreground">Cargando productos...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Lo ultimo
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nuevos <span className="text-primary">ingresos</span>
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full border-border bg-transparent",
                !canScrollLeft && "opacity-40 cursor-default",
              )}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full border-border bg-transparent",
                !canScrollRight && "opacity-40 cursor-default",
              )}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="mt-10 flex gap-5 overflow-x-auto scroll-smooth pb-4 sm:mt-12 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="group w-[260px] flex-shrink-0 sm:w-[280px] lg:w-[300px]"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                <Link href={`/producto/${generateSlug(product.name)}`}>
                  <img
                    src={product.mainImage || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <span className="absolute left-4 top-4 rounded-full bg-[#1A1A1A] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFFFFF]">
                  Nuevo
                </span>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]/80 backdrop-blur transition-all hover:bg-[#1A1A1A]"
                  aria-label={
                    favorites.includes(product.id)
                      ? "Quitar de favoritos"
                      : "Agregar a favoritos"
                  }
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      favorites.includes(product.id)
                        ? "fill-[#FFFFFF] text-[#FFFFFF]"
                        : "text-[#FFFFFF]",
                    )}
                  />
                </button>
              </div>
              <Link href={`/producto/${generateSlug(product.name)}`} className="block">
                <div className="mt-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {product.tagline}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-foreground">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-sm font-bold text-foreground">
                      ${product.price.toLocaleString()}
                    </p>
                    {product.originalPrice && (
                      <p className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile scroll arrows */}
        <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full border-border bg-transparent",
              !canScrollLeft && "opacity-40 cursor-default",
            )}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full border-border bg-transparent",
              !canScrollRight && "opacity-40 cursor-default",
            )}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
