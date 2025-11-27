"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Product, CartItem, Cart } from "./types"

interface CartContextType {
  cart: Cart
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const calculateTotals = useCallback((cartItems: CartItem[]) => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cartItems.reduce((sum, item) => {
      const price = item.product.discountPrice || item.product.price
      return sum + price * item.quantity
    }, 0)
    return { totalItems, totalPrice }
  }, [])

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id)
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }
      return [...prev, { product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const { totalItems, totalPrice } = calculateTotals(items)

  const cart: Cart = {
    items,
    totalItems,
    totalPrice,
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
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
