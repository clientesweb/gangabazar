"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Product } from "@/lib/services/products"
import { getFeaturedProductsWithDetails, generateSlug, generateProductUrl } from "@/lib/services/products"
import { getFeaturedGrabadosWithDetails } from "@/lib/services/grabados"

type FeaturedItem = (Product | any) & { type?: string }

interface FeaturedProductsProps {
  products?: Product[]
}

export function FeaturedProducts({ products: serverProducts }: FeaturedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>(serverProducts || [])
  const [loading, setLoading] = useState(!serverProducts)

  useEffect(() => {
    if (!serverProducts) {
      Promise.all([
        getFeaturedProductsWithDetails(4),
        getFeaturedGrabadosWithDetails(2)
      ])
        .then(([products, grabados]) => {
          const items = [
            ...products.map(p => ({ ...p, type: 'product' })),
            ...grabados.map(g => ({ ...g, type: 'grabado' }))
          ]
          setFeaturedItems(items)
        })
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [serverProducts])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
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
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Los mas elegidos</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Productos <span className="text-primary">destacados</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
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
            <Link
              href="/categorias"
              className="group ml-4 hidden items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary sm:flex"
            >
              Ver todos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="mt-10 flex gap-5 overflow-x-auto scroll-smooth pb-4 sm:mt-12 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {featuredItems.map((item: any) => {
            const isGrabado = item.type === 'grabado'
            const href = isGrabado ? `/grabados/${item.slug || generateSlug(item.name)}` : generateProductUrl(item)
            return (
              <div
                key={item.id}
                className="group w-[260px] flex-shrink-0 sm:w-[280px] lg:w-[300px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                  <Link href={href}>
                    <img
                      src={item.mainImage || item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  {(item.isNew || item.is_new) && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#C8AD7F] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFFFFF]">
                      Nuevo
                    </span>
                  )}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#4F4D46]/70 backdrop-blur transition-all hover:bg-[#C8AD7F]"
                    aria-label={
                      favorites.includes(item.id)
                        ? "Quitar de favoritos"
                        : "Agregar a favoritos"
                    }
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        favorites.includes(item.id) ? "fill-[#FFFFFF] text-[#FFFFFF]" : "text-[#FFFFFF]",
                      )}
                    />
                  </button>
                </div>
                <Link href={href} className="block">
                  <div className="mt-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.tagline}</span>
                    <h3 className="mt-1 text-base font-bold text-foreground">{item.name}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <p className="text-sm font-bold text-foreground">${item.price.toLocaleString()}</p>
                      {item.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          ${item.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {/* Mobile scroll arrows + link */}
        <div className="mt-4 flex items-center justify-between sm:hidden">
          <Link
            href="/categorias"
            className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
          >
            Ver todos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <div className="flex items-center gap-3">
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
      </div>
    </section>
  )
}
