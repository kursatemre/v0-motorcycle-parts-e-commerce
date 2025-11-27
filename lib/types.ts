// Product Types
export interface Product {
  id: string
  sku: string
  oem: string
  name: string
  slug: string
  description: string
  price: number
  discountPrice?: number
  stock: number
  images: string[]
  brand: Brand
  category: Category
  compatibility: Compatibility[]
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  children?: Category[]
  image?: string
  productCount?: number
}

export interface Compatibility {
  brand: string
  model: string
  yearStart: number
  yearEnd: number
  engineType?: string
}

// Cart Types
export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  type: "retail" | "b2b"
  companyName?: string
  taxId?: string
  addresses: Address[]
  createdAt: Date
}

export interface Address {
  id: string
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  neighborhood: string
  address: string
  postalCode: string
  isDefault: boolean
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  user: User
  items: OrderItem[]
  status: OrderStatus
  shippingAddress: Address
  billingAddress: Address
  paymentMethod: "credit_card" | "bank_transfer" | "cash_on_delivery"
  shippingMethod: string
  shippingCost: number
  subtotal: number
  discount: number
  total: number
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  product: Product
  quantity: number
  price: number
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"

// Filter Types
export interface ProductFilters {
  search?: string
  brand?: string
  model?: string
  yearStart?: number
  yearEnd?: number
  engineType?: string
  category?: string
  priceMin?: number
  priceMax?: number
  inStock?: boolean
  sortBy?: "price_asc" | "price_desc" | "name" | "newest" | "popular"
}

// B2B Types
export interface B2BCustomer {
  id: string
  user: User
  discountRate: number
  creditLimit: number
  currentDebt: number
  paymentTermDays: number
  isApproved: boolean
}
