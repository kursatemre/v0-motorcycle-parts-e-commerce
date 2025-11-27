"use client"

import { useState } from "react"
import { ChevronRight, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { brands, motorcycleModels } from "@/lib/mock-data"

interface VehicleSelectorProps {
  onSelect?: (vehicle: { brand: string; model: string; year: string }) => void
}

export function VehicleSelector({ onSelect }: VehicleSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [savedVehicle, setSavedVehicle] = useState<{ brand: string; model: string; year: string } | null>(null)

  const years = Array.from({ length: 25 }, (_, i) => (2024 - i).toString())
  const models = selectedBrand ? motorcycleModels[selectedBrand] || [] : []

  const handleSave = () => {
    if (selectedBrand && selectedModel && selectedYear) {
      const vehicle = { brand: selectedBrand, model: selectedModel, year: selectedYear }
      setSavedVehicle(vehicle)
      onSelect?.(vehicle)
      setOpen(false)
    }
  }

  const handleClear = () => {
    setSelectedBrand("")
    setSelectedModel("")
    setSelectedYear("")
    setSavedVehicle(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-auto py-2 px-3 border-border hover:border-primary bg-transparent">
          {savedVehicle ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {savedVehicle.brand} {savedVehicle.model} ({savedVehicle.year})
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Search className="h-4 w-4" />
              <span className="text-sm">Aracınızı Seçin</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle>Aracınızı Seçin</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
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

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleClear}>
              Temizle
            </Button>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
              disabled={!selectedBrand || !selectedModel || !selectedYear}
            >
              Uygula
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
