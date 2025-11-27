import { createClient } from "./server"

// Admin yetki kontrolü
export async function isAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  return profile?.role === "admin"
}

// Ürün işlemleri
export async function getProducts(options?: {
  page?: number
  limit?: number
  search?: string
  category?: string
  brand?: string
  status?: string
}) {
  const supabase = await createClient()
  const { page = 1, limit = 20, search, category, brand, status } = options || {}
  const offset = (page - 1) * limit

  let query = supabase
    .from("products")
    .select(
      `
      *,
      brand:brands(id, name, slug),
      category:categories(id, name, slug),
      images:product_images(id, url, alt_text, is_primary, sort_order)
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (search) {
    query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%,oem_code.ilike.%${search}%`)
  }

  if (category) {
    query = query.eq("category_id", category)
  }

  if (brand) {
    query = query.eq("brand_id", brand)
  }

  if (status === "active") {
    query = query.eq("is_active", true)
  } else if (status === "inactive") {
    query = query.eq("is_active", false)
  }

  const { data, error, count } = await query

  if (error) throw error

  return { products: data, total: count || 0 }
}

export async function getProductById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      brand:brands(id, name, slug),
      category:categories(id, name, slug),
      images:product_images(id, url, alt_text, is_primary, sort_order),
      compatibility:product_vehicle_compatibility(
        id,
        year_start,
        year_end,
        notes,
        vehicle_model:vehicle_models(
          id,
          name,
          slug,
          vehicle_brand:vehicle_brands(id, name, slug)
        )
      )
    `)
    .eq("id", id)
    .single()

  if (error) throw error

  return data
}

export async function createProduct(productData: {
  sku: string
  name: string
  slug: string
  description?: string
  short_description?: string
  brand_id?: string
  category_id?: string
  price: number
  compare_price?: number
  cost_price?: number
  stock_quantity?: number
  min_stock_level?: number
  weight?: number
  width?: number
  height?: number
  depth?: number
  oem_code?: string
  barcode?: string
  is_active?: boolean
  is_featured?: boolean
  is_new?: boolean
  meta_title?: string
  meta_description?: string
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("products").insert(productData).select().single()

  if (error) throw error

  return data
}

export async function updateProduct(
  id: string,
  productData: Partial<{
    sku: string
    name: string
    slug: string
    description?: string
    short_description?: string
    brand_id?: string
    category_id?: string
    price: number
    compare_price?: number
    cost_price?: number
    stock_quantity?: number
    min_stock_level?: number
    weight?: number
    width?: number
    height?: number
    depth?: number
    oem_code?: string
    barcode?: string
    is_active?: boolean
    is_featured?: boolean
    is_new?: boolean
    meta_title?: string
    meta_description?: string
  }>,
) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("products")
    .update({ ...productData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error

  return data
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) throw error

  return true
}

// Kategori işlemleri
export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true })

  if (error) throw error

  return data
}

export async function createCategory(categoryData: {
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  sort_order?: number
  is_active?: boolean
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("categories").insert(categoryData).select().single()

  if (error) throw error

  return data
}

// Marka işlemleri
export async function getBrands() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("brands").select("*").order("name", { ascending: true })

  if (error) throw error

  return data
}

// Araç markaları ve modelleri
export async function getVehicleBrands() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("vehicle_brands")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true })

  if (error) throw error

  return data
}

export async function getVehicleModels(brandId?: string) {
  const supabase = await createClient()

  let query = supabase
    .from("vehicle_models")
    .select(`
      *,
      vehicle_brand:vehicle_brands(id, name, slug)
    `)
    .eq("is_active", true)
    .order("name", { ascending: true })

  if (brandId) {
    query = query.eq("brand_id", brandId)
  }

  const { data, error } = await query

  if (error) throw error

  return data
}

// Sipariş işlemleri
export async function getOrders(options?: {
  page?: number
  limit?: number
  status?: string
  search?: string
}) {
  const supabase = await createClient()
  const { page = 1, limit = 20, status, search } = options || {}
  const offset = (page - 1) * limit

  let query = supabase
    .from("orders")
    .select(
      `
      *,
      user:profiles(id, first_name, last_name, email),
      items:order_items(
        id,
        product_name,
        product_sku,
        quantity,
        unit_price,
        total_price
      )
    `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  if (search) {
    query = query.or(`order_number.ilike.%${search}%`)
  }

  const { data, error, count } = await query

  if (error) throw error

  return { orders: data, total: count || 0 }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()

  const updateData: Record<string, unknown> = {
    status,
    updated_at: new Date().toISOString(),
  }

  if (status === "shipped") {
    updateData.shipped_at = new Date().toISOString()
  } else if (status === "delivered") {
    updateData.delivered_at = new Date().toISOString()
  }

  const { data, error } = await supabase.from("orders").update(updateData).eq("id", orderId).select().single()

  if (error) throw error

  return data
}

// Müşteri işlemleri
export async function getCustomers(options?: {
  page?: number
  limit?: number
  search?: string
  role?: string
}) {
  const supabase = await createClient()
  const { page = 1, limit = 20, search, role } = options || {}
  const offset = (page - 1) * limit

  let query = supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  if (search) {
    query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`)
  }

  if (role && role !== "all") {
    query = query.eq("role", role)
  }

  const { data, error, count } = await query

  if (error) throw error

  return { customers: data, total: count || 0 }
}

// Stok hareketleri
export async function createStockMovement(data: {
  product_id: string
  type: "in" | "out" | "adjustment"
  quantity: number
  previous_stock: number
  new_stock: number
  reason?: string
  reference_type?: string
  reference_id?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: movement, error } = await supabase
    .from("stock_movements")
    .insert({
      ...data,
      created_by: user?.id,
    })
    .select()
    .single()

  if (error) throw error

  // Ürün stok güncelle
  await supabase.from("products").update({ stock_quantity: data.new_stock }).eq("id", data.product_id)

  return movement
}

// Kupon işlemleri
export async function getCoupons() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("coupons").select("*").order("created_at", { ascending: false })

  if (error) throw error

  return data
}

export async function createCoupon(couponData: {
  code: string
  description?: string
  discount_type: "percentage" | "fixed"
  discount_value: number
  min_order_amount?: number
  max_discount_amount?: number
  usage_limit?: number
  valid_from?: string
  valid_until?: string
  is_active?: boolean
}) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("coupons").insert(couponData).select().single()

  if (error) throw error

  return data
}
