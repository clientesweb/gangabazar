"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ChevronDown, ChevronUp, Lock, MessageCircle, Banknote, CreditCard, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart"

const WHATSAPP_NUMBER = "5491130163458"

const paymentMethods = [
  {
    id: "transferencia",
    label: "Transferencia bancaria",
    description: "CBU / Alias",
    icon: Banknote,
  },
  {
    id: "mercadopago",
    label: "Mercado Pago",
    description: "Link de pago",
    icon: CreditCard,
  },
  {
    id: "efectivo",
    label: "Efectivo",
    description: "Al momento de la entrega",
    icon: DollarSign,
  },
]

export default function CheckoutPage() {
  const { items, total, clearCart, itemCount } = useCart()
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    province: "",
    notes: "",
    paymentMethod: "transferencia",
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-background">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="font-serif text-xl text-foreground">
              Ganga Bazar
            </Link>
          </div>
        </header>
        <main className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-light text-foreground">No hay productos en tu carrito</h1>
            <Link href="/colecciones">
              <Button className="mt-6 rounded-none bg-primary px-8 py-6 text-primary-foreground hover:bg-primary/90">
                Explorar coleccion
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  function buildWhatsAppMessage() {
    const itemLines = items.map((item) => {
      const subtotal = item.product.price * item.quantity
      return `- ${item.product.name} (${item.color} / ${item.size}) x${item.quantity} = $${subtotal.toLocaleString()}`
    })

    const paymentLabel = paymentMethods.find((m) => m.id === formData.paymentMethod)?.label || formData.paymentMethod

    const message = [
      `*Nuevo pedido - Ganga Bazar*`,
      ``,
      `*Cliente:* ${formData.firstName} ${formData.lastName}`,
      `*Telefono:* ${formData.phone}`,
      `*Direccion:* ${formData.address}${formData.apartment ? `, ${formData.apartment}` : ""}`,
      `*Ciudad:* ${formData.city}${formData.province ? `, ${formData.province}` : ""}`,
      ``,
      `*Productos (${itemCount} ${itemCount === 1 ? "articulo" : "articulos"}):*`,
      ...itemLines,
      ``,
      `*Total:* $${total.toLocaleString()}`,
      `*Envio:* A coordinar`,
      `*Forma de pago:* ${paymentLabel}`,
      formData.notes ? `\n*Notas:* ${formData.notes}` : "",
    ].filter(Boolean).join("\n")

    return encodeURIComponent(message)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    const message = buildWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

    clearCart()
    window.open(whatsappUrl, "_blank")

    // Small delay to let WhatsApp open before navigating
    setTimeout(() => {
      setIsSending(false)
      window.location.href = "/checkout/confirmacion"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/carrito" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
            <ArrowLeft className="h-4 w-4" />
            Volver al carrito
          </Link>
          <Link href="/" className="font-serif text-xl text-foreground">
            Ganga Bazar
          </Link>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Compra segura
          </div>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Form Section */}
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact & Address */}
                <div>
                  <h2 className="text-lg font-medium text-foreground">Informacion de contacto</h2>
                  <div className="mt-4 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">Nombre</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="mt-1 rounded-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="mt-1 rounded-none"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefono / WhatsApp</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="mt-1 rounded-none"
                        placeholder="+54 11 1234-5678"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h2 className="text-lg font-medium text-foreground">Direccion de entrega</h2>
                  <p className="mt-1 text-xs text-muted-foreground">El envio se coordina por WhatsApp</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <Label htmlFor="address">Direccion</Label>
                      <Input
                        id="address"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="mt-1 rounded-none"
                        placeholder="Calle y numero"
                      />
                    </div>
                    <div>
                      <Label htmlFor="apartment">Piso / Departamento (opcional)</Label>
                      <Input
                        id="apartment"
                        value={formData.apartment}
                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                        className="mt-1 rounded-none"
                        placeholder="Ej: 4to A"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="mt-1 rounded-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="province">Provincia</Label>
                        <Input
                          id="province"
                          value={formData.province}
                          onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                          className="mt-1 rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h2 className="text-lg font-medium text-foreground">Forma de pago</h2>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    className="mt-4 space-y-3"
                  >
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex cursor-pointer items-center justify-between border p-4 transition-colors ${formData.paymentMethod === method.id ? "border-foreground bg-secondary" : "border-border"}`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <div className="flex items-center gap-3">
                            <method.icon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <span className="text-sm font-medium text-foreground">{method.label}</span>
                              <p className="text-xs text-muted-foreground">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes">Notas del pedido (opcional)</Label>
                  <textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1 w-full rounded-none border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    rows={3}
                    placeholder="Personalizacion, horarios de entrega, etc."
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full h-14 rounded-none bg-[#25D366] text-[#FFFFFF] hover:bg-[#25D366]/90 disabled:opacity-50"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {isSending ? "Enviando pedido..." : "Enviar pedido por WhatsApp"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Al confirmar, tu pedido se enviara directamente a nuestro WhatsApp para coordinar el pago y envio.
                </p>
              </form>
            </div>

            {/* Order Summary */}
            <div className="order-1 lg:order-2">
              {/* Mobile Toggle */}
              <button
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="flex w-full items-center justify-between border-b border-t border-border bg-secondary p-4 lg:hidden"
              >
                <span className="flex items-center gap-2 text-sm text-foreground">
                  {showOrderSummary ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {showOrderSummary ? "Ocultar" : "Mostrar"} resumen del pedido
                </span>
                <span className="text-sm font-medium text-foreground">${total.toLocaleString()}</span>
              </button>

              <div className={`bg-secondary p-6 sm:p-8 ${showOrderSummary ? "block" : "hidden"} lg:block`}>
                <h2 className="text-lg font-medium text-foreground">Resumen del pedido</h2>

                {/* Items */}
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden bg-muted">
                        <img
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-xs text-background">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.color} / {item.size}
                        </p>
                      </div>
                      <p className="text-sm text-foreground">${(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-3 border-t border-border pt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({itemCount} {itemCount === 1 ? "articulo" : "articulos"})</span>
                    <span className="text-foreground">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Envio</span>
                    <span className="text-foreground">A coordinar</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-3">
                    <span className="text-base font-medium text-foreground">Total</span>
                    <span className="text-base font-medium text-foreground">${total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
