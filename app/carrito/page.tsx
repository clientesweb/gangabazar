"use client"

import Link from "next/link"
import { Minus, Plus, X, ArrowLeft, ShoppingBag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import { generateProductUrl } from "@/lib/services/products"

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-6 font-serif text-2xl font-light text-foreground">
              Tu carrito esta vacio
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Descubri productos personalizados con grabado laser.
            </p>
            <Link href="/categorias">
              <Button className="mt-6 rounded-none bg-primary px-8 py-6 text-primary-foreground hover:bg-primary/90">
                Explorar coleccion
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Seguir comprando
          </Link>

          <h1 className="font-serif text-3xl font-light text-foreground sm:text-4xl">
            Tu carrito
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "articulo" : "articulos"}
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 py-6 sm:gap-6"
                  >
                    <Link
                      href={generateProductUrl(item.product)}
                      className="flex-shrink-0"
                    >
                      <div className="h-32 w-24 overflow-hidden bg-muted sm:h-40 sm:w-32">
                        <img
                          src={item.product.mainImage || item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <Link href={generateProductUrl(item.product)}>
                            <h3 className="text-base font-medium text-foreground hover:text-accent">
                              {item.product.name}
                            </h3>
                          </Link>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.color} / {item.size}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.size,
                              item.color
                            )
                          }
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-muted"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="flex h-10 w-10 items-center justify-center text-sm text-foreground">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:bg-muted"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="text-base font-medium text-foreground">
                          ${item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary p-6 sm:p-8">
                <h2 className="text-lg font-medium text-foreground">
                  Resumen del pedido
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">
                      ${total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envio</span>
                    <span className="text-foreground">A coordinar</span>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-foreground">
                        Total
                      </span>
                      <span className="text-base font-medium text-foreground">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="mt-6 w-full h-14 rounded-none bg-primary text-primary-foreground hover:bg-primary/90">
                    Finalizar compra
                  </Button>
                </Link>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  El envio se coordina por WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
