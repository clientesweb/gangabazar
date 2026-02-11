"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Minus, Plus, Truck, RotateCcw, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useCart } from "@/lib/cart"
import { cn } from "@/lib/utils"
import { generateSlug, generateProductUrl } from "@/lib/services/products"

interface ProductDetailProps {
  product: any
  relatedProducts?: any[]
}

export function ProductDetailClient({ product, relatedProducts = [] }: ProductDetailProps) {
  const { addItem } = useCart()

  // Generate slug from product name
  const slug = generateSlug(product.name)

  // Setup images - handle both old and new schema
  const images = product.images && product.images.length > 0
    ? product.images.map((img: any) => typeof img === 'string' ? img : img.image_url)
    : [product.mainImage || product.image || '/placeholder.svg']
  const [selectedImage, setSelectedImage] = useState(0)

  // Setup variants/colors
  const variants = product.variants || []
  const [selectedColor, setSelectedColor] = useState<string | null>(variants.length > 0 ? variants[0].id : null)

  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    const colorName = variants.find((v: any) => v.id === selectedColor)?.color_name || "General"
    addItem(product, "Único", colorName, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const categoryLabels: Record<string, string> = {
    termos: "Termos",
    mates: "Mates",
    accesorios: "Accesorios",
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-background px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-accent">
              Inicio
            </Link>
            <span>/</span>
            <Link href={`/categorias/${product.category}`} className="hover:text-accent">
              {categoryLabels[product.category] || product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="bg-background px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Images */}
            <div className="flex flex-col-reverse gap-4 sm:flex-row">
              <div className="flex gap-2 sm:flex-col">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square w-16 shrink-0 overflow-hidden border-2 transition-colors sm:w-20",
                      selectedImage === index ? "border-foreground" : "border-transparent",
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Vista ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="relative w-full aspect-square max-h-[600px] overflow-hidden bg-muted">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                {product.is_new && (
                  <span className="absolute left-4 top-4 bg-primary px-3 py-1 text-[10px] uppercase tracking-widest text-primary-foreground">
                    Nuevo
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {product.tagline || slug || product.category}
              </span>
              <h1 className="mt-2 font-serif text-3xl font-light text-foreground sm:text-4xl">{product.name}</h1>
              <p className="mt-2 text-lg text-foreground">${product.price.toLocaleString()}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {/* Color Selection */}
              {variants.length > 0 && (
                <div className="mt-8">
                  <span className="text-sm font-medium text-foreground">
                    Color: {variants.find((v: any) => v.id === selectedColor)?.color_name || "Seleccioná un color"}
                  </span>
                  <div className="mt-3 flex gap-3">
                    {variants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedColor(variant.id)}
                        className={cn(
                          "relative h-10 w-10 rounded-full border-2 transition-all",
                          selectedColor === variant.id ? "border-foreground scale-110" : "border-border",
                        )}
                        style={{ backgroundColor: variant.color_hex }}
                        title={variant.color_name}
                      >
                        {selectedColor === variant.id && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span
                              className={cn(
                                "h-2 w-2 rounded-full",
                                variant.color_hex === "#FFFFFF" || variant.color_hex === "#F5EDE4" || variant.color_hex === "#F5F0E6"
                                  ? "bg-foreground"
                                  : "bg-white",
                              )}
                            />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-6">
                <span className="text-sm font-medium text-foreground">Cantidad</span>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-12 w-12 items-center justify-center text-foreground transition-colors hover:bg-muted"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex h-12 w-12 items-center justify-center text-sm text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex h-12 w-12 items-center justify-center text-foreground transition-colors hover:bg-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={variants.length > 0 && !selectedColor}
                  className="flex-1 h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {addedToCart ? "Agregado al carrito" : "Agregar al carrito"}
                </Button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="flex h-14 w-14 items-center justify-center border border-border transition-colors hover:border-foreground"
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isFavorite ? "fill-accent text-accent" : "text-foreground",
                    )}
                  />
                </button>
              </div>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div className="flex flex-col items-center gap-2 text-center">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Envio a coordinar</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <RotateCcw className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">30 días de cambio</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Compra segura</span>
                </div>
              </div>

              {/* Accordion Details */}
              <Accordion type="single" collapsible className="mt-8 border-t border-border">
                <AccordionItem value="details">
                  <AccordionTrigger className="text-sm font-medium">Detalles del producto</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-sm font-medium">Envios y devoluciones</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      El envio se coordina por WhatsApp al momento de realizar tu pedido. Aceptamos cambios dentro de los 30 dias posteriores a la compra.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
