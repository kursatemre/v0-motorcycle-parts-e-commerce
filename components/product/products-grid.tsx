"use client"

import { useState } from "react"
import { Grid, List, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product/product-card"
import { ProductListItem } from "@/components/product/product-list-item"
import { products } from "@/lib/mock-data"

export function ProductsGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-secondary border-border">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="newest">En Yeni</SelectItem>
              <SelectItem value="price_asc">Fiyat (Düşükten Yükseğe)</SelectItem>
              <SelectItem value="price_desc">Fiyat (Yüksekten Düşüğe)</SelectItem>
              <SelectItem value="popular">En Popüler</SelectItem>
              <SelectItem value="name">İsme Göre (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button variant="outline" disabled>
          Önceki
        </Button>
        <Button variant="secondary">1</Button>
        <Button variant="ghost">2</Button>
        <Button variant="ghost">3</Button>
        <Button variant="outline">Sonraki</Button>
      </div>
    </div>
  )
}
