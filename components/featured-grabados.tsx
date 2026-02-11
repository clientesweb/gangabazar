"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart"
import { type Grabado } from "@/lib/services/grabados"
import { getFeaturedGrabadosWithDetails, generateGrabadoSlug } from "@/lib/services/grabados"

interface FeaturedGrabadosProps {
  grabados?: Grabado[]
}

export function FeaturedGrabados({ grabados: serverGrabados }: FeaturedGrabadosProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({})
  const [addedToCart, setAddedToCart] = useState<string | null>(null)
  const [featuredGrabados, setFeaturedGrabados] = useState<any[]>(serverGrabados || [])
  const [loading, setLoading] = useState(!serverGrabados)
  const { addItem } = useCart()

  useEffect(() => {
    if (!serverGrabados) {
      getFeaturedGrabadosWithDetails(4)
        .then(setFeaturedGrabados)
        .catch(console.error)
        .finally(() => setLoading(false))
    }
  }, [serverGrabados])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const handleAddToCart = (grabado: any, color: string) => {
    addItem(grabado, "Único", color, 1)
    setAddedToCart(grabado.id)
    setTimeout(() => setAddedToCart(null), 2000)
  }

  if (loading && !serverGrabados) {
    return (
      <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-muted-foreground">Cargando grabados...</p>
        </div>
      </section>
    )
  }

  if (featuredGrabados.length === 0) {
    return null
  }

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Destacados</p>
            <h2 className="mt-2 text-4xl font-bold text-foreground">Grabados Destacados</h2>
          </div>
          <Link href="/categorias/grabados" className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent">
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredGrabados.map((grabado) => {
            const slug = generateGrabadoSlug(grabado.name)
            const isFavorite = favorites.includes(grabado.id)
            const mainImage = grabado.mainImage || grabado.images?.[0]?.image_url || '/placeholder.svg'
            const defaultColor = grabado.variants?.[0]?.color_name || 'General'

            return (
              <div key={grabado.id} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
                  <Link href={`/grabados/${slug}`}>
                    <img
                      src={mainImage || "/placeholder.svg"}
                      alt={grabado.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {grabado.is_new && (
                    <span className="absolute left-4 top-4 rounded-full bg-[#C8AD7F] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Nuevo
                    </span>
                  )}

                  <button
                    onClick={() => toggleFavorite(grabado.id)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#4F4D46]/70 backdrop-blur transition-all hover:bg-[#C8AD7F]"
                  >
                    <Heart className={cn("h-5 w-5", isFavorite ? "fill-white text-white" : "text-white")} />
                  </button>
                </div>

                <div className="mt-4">
                  <Link href={`/grabados/${slug}`}>
                    <h3 className="text-base font-bold text-foreground hover:text-accent transition-colors">{grabado.name}</h3>
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">{grabado.tagline}</p>
                  <p className="mt-2 text-sm font-bold text-foreground">${grabado.price.toLocaleString()}</p>

                  {grabado.variants && grabado.variants.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {grabado.variants.map((variant: any) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedColors({ ...selectedColors, [grabado.id]: variant.id })}
                          className={cn(
                            "h-6 w-6 rounded-full border-2 transition-all",
                            selectedColors[grabado.id] === variant.id
                              ? "border-foreground ring-2 ring-foreground ring-offset-2"
                              : "border-muted hover:border-foreground"
                          )}
                          style={{ backgroundColor: variant.color_hex }}
                          title={variant.color_name}
                        />
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={() => handleAddToCart(grabado, selectedColors[grabado.id] || defaultColor)}
                    className={cn(
                      "mt-4 w-full",
                      addedToCart === grabado.id ? "bg-[#4F4D46] hover:bg-[#4F4D46] text-[#FFFFFF]" : "bg-[#a89060] hover:bg-[#C8AD7F] text-[#FFFFFF]"
                    )}
                  >
                    {addedToCart === grabado.id ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Agregado
                      </>
                    ) : (
                      "Agregar al carrito"
                    )}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
