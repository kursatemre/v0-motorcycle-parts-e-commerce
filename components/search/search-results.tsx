"use client"

import { useState, useMemo } from "react"
import { Grid, List, ArrowUpDown, SearchX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product/product-card"
import { ProductListItem } from "@/components/product/product-list-item"
import { products } from "@/lib/mock-data"

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")

  const filteredProducts = useMemo(() => {
    if (!query) return products

    const lowerQuery = query.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.oem.toLowerCase().includes(lowerQuery) ||
        product.sku.toLowerCase().includes(lowerQuery) ||
        product.brand.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
  }, [query])

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]
    switch (sortBy) {
      case "price_asc":
        return sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
      case "price_desc":
        return sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      default:
        return sorted
    }
  }, [filteredProducts, sortBy])

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Arama yapın</h2>
        <p className="text-muted-foreground max-w-md">Ürün adı, OEM numarası veya SKU ile arama yapabilirsiniz</p>
      </div>
    )
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <SearchX className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Sonuç bulunamadı</h2>
        <p className="text-muted-foreground max-w-md">
          "{query}" için herhangi bir ürün bulunamadı. Farklı anahtar kelimeler veya OEM numarası ile tekrar deneyin.
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{sortedProducts.length}</span> ürün bulundu
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-secondary border-border">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="relevance">En Alakalı</SelectItem>
              <SelectItem value="price_asc">Fiyat (Düşükten Yükseğe)</SelectItem>
              <SelectItem value="price_desc">Fiyat (Yüksekten Düşüğe)</SelectItem>
              <SelectItem value="newest">En Yeni</SelectItem>
              <SelectItem value="name">İsme Göre (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
