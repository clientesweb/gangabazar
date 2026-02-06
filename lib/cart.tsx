"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "./products"

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Product, size: string, color: string, quantity?: number) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ganga-bazar-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Error loading cart:", e)
      }
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("ganga-bazar-cart", JSON.stringify(items))
  }, [items])

  const addItem = (product: Product, size: string, color: string, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color,
      )
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }
      return [...prev, { product, size, color, quantity }]
    })
  }

  const removeItem = (productId: string, size: string, color: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.size === size && item.color === color)),
    )
  }

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, size, color)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size && item.color === color ? { ...item, quantity } : item,
      ),
    )
  }

  const clearCart = () => setItems([])

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
