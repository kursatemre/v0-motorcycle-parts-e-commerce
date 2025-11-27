"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { brands, categories, motorcycleModels } from "@/lib/mock-data"

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const models = selectedBrand ? motorcycleModels[selectedBrand] || [] : []
  const years = Array.from({ length: 25 }, (_, i) => (2024 - i).toString())

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) => (prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]))
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId],
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 5000])
    setSelectedBrand("")
    setSelectedBrands([])
    setSelectedCategories([])
    setInStockOnly(false)
  }

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedCategories.length > 0 ||
    inStockOnly ||
    priceRange[0] > 0 ||
    priceRange[1] < 5000

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filtreler</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary/80">
            <X className="h-4 w-4 mr-1" />
            Temizle
          </Button>
        )}
      </div>

      {/* Vehicle Compatibility Filter */}
      <Collapsible defaultOpen className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
          Araç Uyumu
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-3">
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="bg-secondary border-border text-sm">
              <SelectValue placeholder="Marka" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.name}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select disabled={!selectedBrand}>
            <SelectTrigger className="bg-secondary border-border text-sm">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="bg-secondary border-border text-sm">
              <SelectValue placeholder="Yıl" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border max-h-48">
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      {/* Category Filter */}
      <Collapsible defaultOpen className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
          Kategori
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {categories.slice(0, 6).map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <label
                htmlFor={`cat-${category.id}`}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {category.name}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Brand Filter */}
      <Collapsible defaultOpen className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
          Marka
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.name)}
                onCheckedChange={() => toggleBrand(brand.name)}
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {brand.name}
              </label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range Filter */}
      <Collapsible defaultOpen className="mb-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-sm font-medium text-foreground hover:text-primary">
          Fiyat Aralığı
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="mb-4" />
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="bg-secondary border-border text-sm h-8"
                placeholder="Min"
              />
              <span className="text-muted-foreground">-</span>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="bg-secondary border-border text-sm h-8"
                placeholder="Max"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Stock Filter */}
      <div className="flex items-center gap-2 py-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
        />
        <label htmlFor="in-stock" className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
          Sadece Stokta Olanlar
        </label>
      </div>

      <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">Filtrele</Button>
    </div>
  )
}
