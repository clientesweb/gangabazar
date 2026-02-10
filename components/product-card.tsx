"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { getImagesByProductId } from "@/lib/services/images"
import { getImagesByGrabadoId } from "@/lib/services/grabado-images"
import type { Product } from "@/lib/services/products"
import { generateSlug } from "@/lib/services/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Detectar si es grabado o producto basado en la categoría
  const isGrabado = product.category === 'grabados'
  const baseRoute = isGrabado ? '/grabado' : '/producto'

  useEffect(() => {
    const getImages = isGrabado ? getImagesByGrabadoId : getImagesByProductId
    getImages(product.id)
      .then(setImages)
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [product.id, isGrabado])

  // Get main image or first image
  const mainImage = images.find((img) => img.is_main) || images[0]
  const secondImage = images.find((img, idx) => idx > 0 && img.id !== mainImage?.id)
  const imageUrl = mainImage?.image_url || '/placeholder.svg?height=400&width=300'
  const hoverImageUrl = secondImage?.image_url || imageUrl

  return (
    <div className="group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`${baseRoute}/${generateSlug(product.name)}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
          <img
            src={isHovered && hoverImageUrl ? hoverImageUrl : imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-all duration-700"
          />
          {product.is_new && (
            <span className="absolute left-4 top-4 rounded-full bg-[#1A1A1A] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FFFFFF]">
              Nuevo
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsFavorite(!isFavorite)
            }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A]/80 backdrop-blur transition-all hover:bg-[#1A1A1A]"
          >
            <Heart
              className={cn("h-5 w-5 transition-colors", isFavorite ? "fill-[#FFFFFF] text-[#FFFFFF]" : "text-[#FFFFFF]")}
            />
          </button>
        </div>
        <div className="mt-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{product.tagline}</span>
          <h3 className="mt-1 text-base font-bold text-foreground">{product.name}</h3>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-sm font-bold text-foreground">${product.price.toLocaleString()}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
