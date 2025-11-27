"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ChevronRight } from "lucide-react"
import { brands, motorcycleModels } from "@/lib/mock-data"

export function HeroSection() {
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")

  const years = Array.from({ length: 25 }, (_, i) => (2024 - i).toString())
  const models = selectedBrand ? motorcycleModels[selectedBrand] || [] : []

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/placeholder.svg?height=800&width=1600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Motosikletiniz İçin
              <span className="text-primary block mt-2">Doğru Parça</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Türkiye'nin en kapsamlı motosiklet yedek parça kataloğu. Binlerce ürün, orijinal kalite ve hızlı teslimat
              garantisi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Ürünleri Keşfet
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
                Kampanyalar
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Ürün Çeşidi</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">100+</p>
                <p className="text-sm text-muted-foreground">Marka</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">25K+</p>
                <p className="text-sm text-muted-foreground">Mutlu Müşteri</p>
              </div>
            </div>
          </div>

          {/* Vehicle Selector */}
          <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Aracınıza Uygun Parça Bulun</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Marka</label>
                <Select
                  value={selectedBrand}
                  onValueChange={(value) => {
                    setSelectedBrand(value)
                    setSelectedModel("")
                  }}
                >
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Marka seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {brands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.name}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!selectedBrand}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Model seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {models.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Yıl</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue placeholder="Yıl seçin" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border max-h-60">
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                <Search className="mr-2 h-4 w-4" />
                Parça Ara
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              OEM veya parça numarası ile de arama yapabilirsiniz
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
