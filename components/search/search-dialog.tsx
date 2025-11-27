"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { products, brands, categories } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Honda CBR fren balatası",
    "Yamaha R6 piston",
    "Zincir dişli seti",
  ])

  const popularSearches = ["Fren balatası", "Hava filtresi", "Yağ filtresi", "Zincir seti", "LED far"]

  const searchProducts = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const lowerQuery = searchQuery.toLowerCase()
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.oem.toLowerCase().includes(lowerQuery) ||
        product.sku.toLowerCase().includes(lowerQuery) ||
        product.brand.name.toLowerCase().includes(lowerQuery) ||
        product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
    )
    setResults(filtered)
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchProducts(query)
    }, 300)

    return () => clearTimeout(debounce)
  }, [query, searchProducts])

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm)
    // Add to recent searches
    if (searchTerm && !recentSearches.includes(searchTerm)) {
      setRecentSearches((prev) => [searchTerm, ...prev.slice(0, 4)])
    }
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 bg-card border-border gap-0">
        <DialogTitle className="sr-only">Ürün Ara</DialogTitle>
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Input
            type="search"
            placeholder="Ürün adı, OEM veya SKU ile ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 text-lg placeholder:text-muted-foreground"
            autoFocus
          />
          {query && (
            <Button variant="ghost" size="icon" onClick={() => setQuery("")} className="flex-shrink-0">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {/* Search Results */}
          {query && results.length > 0 && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{results.length} sonuç bulundu</span>
                <Link
                  href={`/arama?q=${encodeURIComponent(query)}`}
                  onClick={() => onOpenChange(false)}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Tümünü Gör
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="space-y-2">
                {results.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    href={`/urun/${product.slug}`}
                    onClick={() => {
                      handleSearch(query)
                      onOpenChange(false)
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="relative w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.brand.name} | OEM: {product.oem}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {product.discountPrice ? (
                        <span className="text-sm font-bold text-primary">{formatPrice(product.discountPrice)}</span>
                      ) : (
                        <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {query && results.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">"{query}" için sonuç bulunamadı</p>
              <p className="text-sm text-muted-foreground mt-2">
                Farklı bir arama terimi deneyin veya OEM numarası ile arayın
              </p>
            </div>
          )}

          {/* Initial State - Recent & Popular Searches */}
          {!query && (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Son Aramalar
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Temizle
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(term)}
                        className="text-sm"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <TrendingUp className="h-4 w-4" />
                  Popüler Aramalar
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="sm"
                      onClick={() => setQuery(term)}
                      className="text-sm"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Hızlı Erişim</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 4).map((category) => (
                    <Link
                      key={category.id}
                      href={`/kategori/${category.slug}`}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center gap-2 p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <span className="text-sm text-foreground">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Brands */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Markalar</p>
                <div className="flex flex-wrap gap-2">
                  {brands.slice(0, 6).map((brand) => (
                    <Link key={brand.id} href={`/marka/${brand.slug}`} onClick={() => onOpenChange(false)}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
                        {brand.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-border bg-secondary/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>
                <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px]">↵</kbd> ile seç
              </span>
              <span>
                <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px]">ESC</kbd> ile kapat
              </span>
            </div>
            <span>OEM ile doğrudan arayabilirsiniz</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
