"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { type Grabado } from "@/lib/services/grabados"
import { getNewGrabadosWithDetails, generateGrabadoSlug } from "@/lib/services/grabados"

interface NewGrabadosSectionProps {
  grabados?: any[]
}

export function NewGrabadosSection({ grabados: serverGrabados }: NewGrabadosSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [newGrabados, setNewGrabados] = useState<any[]>(serverGrabados || [])
  const [loading, setLoading] = useState(!serverGrabados)

  useEffect(() => {
    if (!serverGrabados) {
      getNewGrabadosWithDetails(8)
        .then(setNewGrabados)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [serverGrabados])

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

  useEffect(() => {
    checkScroll()
    scrollRef.current?.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [])

  if (loading && !serverGrabados) {
    return (
      <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-muted-foreground">Cargando grabados...</p>
        </div>
      </section>
    )
  }

  if (newGrabados.length === 0) {
    return null
  }

  return (
    <section className="bg-muted/30 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Lo ultimo en grabados
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Nuevos <span className="text-primary">grabados</span>
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hide -mx-4 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 sm:gap-8"
        >
          {newGrabados.map((grabado) => {
            const slug = generateGrabadoSlug(grabado.name)
            const isFavorite = favorites.includes(grabado.id)
            const mainImage = grabado.mainImage || grabado.images?.[0]?.image_url || '/placeholder.svg'

            return (
              <Link
                key={grabado.id}
                href={`/grabado/${slug}`}
                className="group min-w-[280px] snap-start sm:min-w-[320px]"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                  <img
                    src={mainImage}
                    alt={grabado.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {grabado.is_new && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#1A1A1A] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Nuevo
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(grabado.id)
                    }}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]/80 backdrop-blur transition-all hover:bg-[#1A1A1A]"
                  >
                    <Heart className={cn("h-5 w-5", isFavorite ? "fill-white text-white" : "text-white")} />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">{grabado.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{grabado.tagline}</p>
                  <p className="mt-2 text-sm font-bold text-foreground">${grabado.price.toLocaleString()}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
