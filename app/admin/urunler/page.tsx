"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
  Eye,
  Package,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

interface Product {
  id: string
  sku: string
  name: string
  slug: string
  price: number
  compare_price: number | null
  stock_quantity: number
  min_stock_level: number
  oem_code: string | null
  is_active: boolean
  is_featured: boolean
  created_at: string
  brand: { id: string; name: string; slug: string } | null
  category: { id: string; name: string; slug: string } | null
  images: { id: string; url: string; is_primary: boolean }[]
}

interface Category {
  id: string
  name: string
  slug: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch products
  const fetchProducts = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      let query = supabase
        .from("products")
        .select(
          `
          id, sku, name, slug, price, compare_price, stock_quantity, min_stock_level, 
          oem_code, is_active, is_featured, created_at,
          brand:brands(id, name, slug),
          category:categories(id, name, slug),
          images:product_images(id, url, is_primary)
        `,
          { count: "exact" },
        )
        .order("created_at", { ascending: false })

      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%,oem_code.ilike.%${searchQuery}%`)
      }

      if (selectedCategory !== "all") {
        query = query.eq("category_id", selectedCategory)
      }

      if (selectedStatus === "active") {
        query = query.gt("stock_quantity", 0)
      } else if (selectedStatus === "low") {
        query = query.gt("stock_quantity", 0).lte("stock_quantity", 10)
      } else if (selectedStatus === "out") {
        query = query.eq("stock_quantity", 0)
      }

      const { data, error, count } = await query

      if (error) throw error

      setProducts(data || [])
      setTotalProducts(count || 0)
    } catch (err) {
      console.error("Error fetching products:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch categories
  const fetchCategories = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from("categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("sort_order")

    if (data) setCategories(data)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProducts()
    }, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery, selectedCategory, selectedStatus])

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((p) => p.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const handleDelete = async () => {
    if (!productToDelete) return

    setIsDeleting(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("products").delete().eq("id", productToDelete)

      if (error) throw error

      setProducts((prev) => prev.filter((p) => p.id !== productToDelete))
      setTotalProducts((prev) => prev - 1)
    } catch (err) {
      console.error("Error deleting product:", err)
    } finally {
      setIsDeleting(false)
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return

    setIsDeleting(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.from("products").delete().in("id", selectedProducts)

      if (error) throw error

      setProducts((prev) => prev.filter((p) => !selectedProducts.includes(p.id)))
      setTotalProducts((prev) => prev - selectedProducts.length)
      setSelectedProducts([])
    } catch (err) {
      console.error("Error bulk deleting products:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  const getStockBadge = (stock: number, minStock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Tükendi</Badge>
    } else if (stock <= minStock) {
      return (
        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
          Düşük ({stock})
        </Badge>
      )
    }
    return <Badge variant="secondary">{stock} adet</Badge>
  }

  const lowStockCount = products.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= p.min_stock_level).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ürün Yönetimi</h1>
          <p className="text-muted-foreground">Toplam {totalProducts} ürün</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchProducts} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Yenile
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            İçe Aktar
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Dışa Aktar
          </Button>
          <Button asChild>
            <Link href="/admin/urunler/yeni">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Ürün
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Ürün adı, SKU veya OEM kodu ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Stok Durumu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="active">Stokta</SelectItem>
            <SelectItem value="low">Düşük Stok</SelectItem>
            <SelectItem value="out">Tükendi</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg border border-primary bg-primary/10 p-4">
          <span className="text-sm font-medium">{selectedProducts.length} ürün seçildi</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Package className="mr-2 h-4 w-4" />
              Toplu Stok Güncelle
            </Button>
            <Button variant="outline" size="sm">
              Fiyat Güncelle
            </Button>
            <Button variant="outline" size="sm">
              Kategori Değiştir
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
              Sil
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-lg border bg-card">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">Henüz ürün yok</h3>
            <p className="text-muted-foreground mb-4">İlk ürününüzü ekleyerek başlayın</p>
            <Button asChild>
              <Link href="/admin/urunler/yeni">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Ürün Ekle
              </Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedProducts.length === products.length && products.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-20">Görsel</TableHead>
                <TableHead>Ürün Adı</TableHead>
                <TableHead>SKU / OEM</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead className="text-right">Fiyat</TableHead>
                <TableHead className="text-center">Stok</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProducts.includes(product.id)}
                      onCheckedChange={() => toggleSelect(product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                      <Image
                        src={
                          product.images?.find((i) => i.is_primary)?.url ||
                          product.images?.[0]?.url ||
                          "/placeholder.svg?height=48&width=48"
                        }
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.brand?.name || "-"}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-mono text-sm">{product.sku}</p>
                      {product.oem_code && (
                        <p className="font-mono text-xs text-muted-foreground">OEM: {product.oem_code}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category?.name || "-"}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-y-1">
                      <p className="font-semibold">{product.price.toLocaleString("tr-TR")} TL</p>
                      {product.compare_price && (
                        <p className="text-sm text-muted-foreground line-through">
                          {product.compare_price.toLocaleString("tr-TR")} TL
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStockBadge(product.stock_quantity, product.min_stock_level)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/urun/${product.slug}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            Görüntüle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/urunler/${product.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Düzenle
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Kopyala
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setProductToDelete(product.id)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="flex items-center gap-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          <div className="flex-1">
            <p className="font-medium">Düşük Stok Uyarısı</p>
            <p className="text-sm text-muted-foreground">{lowStockCount} üründe stok kritik seviyede</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/stok">Stokları Güncelle</Link>
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ürünü silmek istediğinize emin misiniz?</AlertDialogTitle>
            <AlertDialogDescription>Bu işlem geri alınamaz. Ürün kalıcı olarak silinecektir.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
