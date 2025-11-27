"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus, GripVertical, Save, Eye, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"

interface Category {
  id: string
  name: string
  slug: string
}

interface Brand {
  id: string
  name: string
  slug: string
}

interface VehicleBrand {
  id: string
  name: string
  slug: string
}

interface VehicleModel {
  id: string
  name: string
  slug: string
  brand_id: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Data from database
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [vehicleBrands, setVehicleBrands] = useState<VehicleBrand[]>([])
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([])

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    oem_code: "",
    brand_id: "",
    category_id: "",
    short_description: "",
    description: "",
    price: "",
    compare_price: "",
    cost_price: "",
    stock_quantity: "0",
    min_stock_level: "10",
    weight: "",
    width: "",
    height: "",
    depth: "",
    meta_title: "",
    meta_description: "",
    slug: "",
    is_active: true,
    is_featured: false,
    is_new: true,
  })

  const [images, setImages] = useState<string[]>([])
  const [selectedVehicleBrand, setSelectedVehicleBrand] = useState<string>("")
  const [compatibleModels, setCompatibleModels] = useState<string[]>([])
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }])

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const supabase = createClient()

      try {
        const [categoriesRes, brandsRes, vehicleBrandsRes] = await Promise.all([
          supabase.from("categories").select("id, name, slug").eq("is_active", true).order("sort_order"),
          supabase.from("brands").select("id, name, slug").eq("is_active", true).order("name"),
          supabase.from("vehicle_brands").select("id, name, slug").eq("is_active", true).order("name"),
        ])

        if (categoriesRes.data) setCategories(categoriesRes.data)
        if (brandsRes.data) setBrands(brandsRes.data)
        if (vehicleBrandsRes.data) setVehicleBrands(vehicleBrandsRes.data)
      } catch (err) {
        console.error("Error loading data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Load vehicle models when brand changes
  useEffect(() => {
    const loadModels = async () => {
      if (!selectedVehicleBrand) {
        setVehicleModels([])
        return
      }

      const supabase = createClient()
      const { data } = await supabase
        .from("vehicle_models")
        .select("id, name, slug, brand_id")
        .eq("brand_id", selectedVehicleBrand)
        .eq("is_active", true)
        .order("name")

      if (data) setVehicleModels(data)
    }

    loadModels()
  }, [selectedVehicleBrand])

  // Generate slug from name
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.name, formData.slug])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }

  const updateSpecification = (index: number, field: "key" | "value", value: string) => {
    const updated = [...specifications]
    updated[index][field] = value
    setSpecifications(updated)
  }

  const toggleModel = (modelId: string) => {
    setCompatibleModels((prev) => (prev.includes(modelId) ? prev.filter((m) => m !== modelId) : [...prev, modelId]))
  }

  const handleSubmit = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const supabase = createClient()

      // Validate required fields
      if (!formData.name || !formData.sku || !formData.price) {
        throw new Error("Ürün adı, SKU ve fiyat zorunludur")
      }

      // Create product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          name: formData.name,
          sku: formData.sku,
          slug: formData.slug,
          oem_code: formData.oem_code || null,
          brand_id: formData.brand_id || null,
          category_id: formData.category_id || null,
          short_description: formData.short_description || null,
          description: formData.description || null,
          price: Number.parseFloat(formData.price),
          compare_price: formData.compare_price ? Number.parseFloat(formData.compare_price) : null,
          cost_price: formData.cost_price ? Number.parseFloat(formData.cost_price) : null,
          stock_quantity: Number.parseInt(formData.stock_quantity) || 0,
          min_stock_level: Number.parseInt(formData.min_stock_level) || 10,
          weight: formData.weight ? Number.parseFloat(formData.weight) : null,
          width: formData.width ? Number.parseFloat(formData.width) : null,
          height: formData.height ? Number.parseFloat(formData.height) : null,
          depth: formData.depth ? Number.parseFloat(formData.depth) : null,
          meta_title: formData.meta_title || null,
          meta_description: formData.meta_description || null,
          is_active: formData.is_active,
          is_featured: formData.is_featured,
          is_new: formData.is_new,
        })
        .select()
        .single()

      if (productError) throw productError

      // Add vehicle compatibility if selected
      if (compatibleModels.length > 0 && product) {
        const compatibilityData = compatibleModels.map((modelId) => ({
          product_id: product.id,
          vehicle_model_id: modelId,
        }))

        await supabase.from("product_vehicle_compatibility").insert(compatibilityData)
      }

      router.push("/admin/urunler")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/urunler">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Yeni Ürün Ekle</h1>
            <p className="text-muted-foreground">Ürün bilgilerini doldurun ve kaydedin</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={isSaving}>
            <Eye className="mr-2 h-4 w-4" />
            Önizle
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Kaydet
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Genel</TabsTrigger>
              <TabsTrigger value="details">Detaylar</TabsTrigger>
              <TabsTrigger value="compatibility">Uyumluluk</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temel Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ürün Adı *</Label>
                    <Input
                      id="name"
                      placeholder="Örn: Brembo Ön Fren Diski 320mm"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU (Stok Kodu) *</Label>
                      <Input
                        id="sku"
                        placeholder="Örn: BRM-FD-320"
                        value={formData.sku}
                        onChange={(e) => handleInputChange("sku", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oem">OEM Kodu</Label>
                      <Input
                        id="oem"
                        placeholder="Örn: 78B40870"
                        value={formData.oem_code}
                        onChange={(e) => handleInputChange("oem_code", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marka</Label>
                      <Select value={formData.brand_id} onValueChange={(value) => handleInputChange("brand_id", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Marka seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand.id} value={brand.id}>
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) => handleInputChange("category_id", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="short_description">Kısa Açıklama</Label>
                    <Textarea
                      id="short_description"
                      placeholder="Ürün hakkında kısa bir açıklama..."
                      rows={3}
                      value={formData.short_description}
                      onChange={(e) => handleInputChange("short_description", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detaylı Açıklama</Label>
                    <Textarea
                      id="description"
                      placeholder="Ürün hakkında detaylı bilgi..."
                      rows={6}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Ürün Görselleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-4">
                    {images.map((image, index) => (
                      <div key={index} className="group relative aspect-square rounded-lg border bg-muted">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Ürün ${index + 1}`}
                          fill
                          className="rounded-lg object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => setImages(images.filter((_, i) => i !== index))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <div className="absolute left-2 top-2 cursor-grab opacity-0 transition-opacity group-hover:opacity-100">
                          <GripVertical className="h-4 w-4 text-white drop-shadow" />
                        </div>
                      </div>
                    ))}
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary hover:bg-muted">
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Görsel Ekle</span>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    PNG, JPG veya WebP. Maksimum 5MB. İlk görsel ana görsel olarak kullanılır.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teknik Özellikler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Özellik adı (Örn: Çap)"
                        value={spec.key}
                        onChange={(e) => updateSpecification(index, "key", e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Değer (Örn: 320mm)"
                        value={spec.value}
                        onChange={(e) => updateSpecification(index, "value", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpecification(index)}
                        disabled={specifications.length === 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addSpecification}>
                    <Plus className="mr-2 h-4 w-4" />
                    Özellik Ekle
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kargo Bilgileri (Desi)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="weight">Ağırlık (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="width">En (cm)</Label>
                      <Input
                        id="width"
                        type="number"
                        step="0.1"
                        placeholder="0"
                        value={formData.width}
                        onChange={(e) => handleInputChange("width", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height">Boy (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        placeholder="0"
                        value={formData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="depth">Yükseklik (cm)</Label>
                      <Input
                        id="depth"
                        type="number"
                        step="0.1"
                        placeholder="0"
                        value={formData.depth}
                        onChange={(e) => handleInputChange("depth", e.target.value)}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">Desi hesaplaması: (En x Boy x Yükseklik) / 3000</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compatibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uyumlu Modeller</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Motosiklet Markası</Label>
                    <Select value={selectedVehicleBrand} onValueChange={setSelectedVehicleBrand}>
                      <SelectTrigger>
                        <SelectValue placeholder="Marka seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleBrands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {vehicleModels.length > 0 && (
                    <div className="space-y-2">
                      <Label>Modeller</Label>
                      <div className="grid gap-2 sm:grid-cols-3">
                        {vehicleModels.map((model) => (
                          <div
                            key={model.id}
                            className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                              compatibleModels.includes(model.id)
                                ? "border-primary bg-primary/10"
                                : "hover:border-muted-foreground/50"
                            }`}
                            onClick={() => toggleModel(model.id)}
                          >
                            <p className="font-medium">{model.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {compatibleModels.length > 0 && (
                    <div className="space-y-2">
                      <Label>Seçili Modeller</Label>
                      <div className="flex flex-wrap gap-2">
                        {compatibleModels.map((modelId) => {
                          const model = vehicleModels.find((m) => m.id === modelId)
                          return model ? (
                            <Badge
                              key={modelId}
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => toggleModel(modelId)}
                            >
                              {model.name}
                              <X className="ml-1 h-3 w-3" />
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="seo" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Ayarları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Başlık</Label>
                    <Input
                      id="metaTitle"
                      placeholder="SEO için sayfa başlığı"
                      value={formData.meta_title}
                      onChange={(e) => handleInputChange("meta_title", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Önerilen: 50-60 karakter</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Açıklama</Label>
                    <Textarea
                      id="metaDescription"
                      placeholder="SEO için sayfa açıklaması"
                      rows={3}
                      value={formData.meta_description}
                      onChange={(e) => handleInputChange("meta_description", e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">Önerilen: 150-160 karakter</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL (Slug)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">motopart.com/urun/</span>
                      <Input
                        id="slug"
                        placeholder="urun-adi"
                        className="flex-1"
                        value={formData.slug}
                        onChange={(e) => handleInputChange("slug", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fiyatlandırma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Satış Fiyatı (TL) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compare_price">Eski Fiyat (TL)</Label>
                <Input
                  id="compare_price"
                  type="number"
                  placeholder="0.00"
                  value={formData.compare_price}
                  onChange={(e) => handleInputChange("compare_price", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost_price">Maliyet (TL)</Label>
                <Input
                  id="cost_price"
                  type="number"
                  placeholder="0.00"
                  value={formData.cost_price}
                  onChange={(e) => handleInputChange("cost_price", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stok</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stok Adedi</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock_quantity}
                  onChange={(e) => handleInputChange("stock_quantity", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minStock">Minimum Stok Uyarısı</Label>
                <Input
                  id="minStock"
                  type="number"
                  placeholder="10"
                  value={formData.min_stock_level}
                  onChange={(e) => handleInputChange("min_stock_level", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Durum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Aktif</Label>
                <Switch
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => handleInputChange("is_active", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Öne Çıkan</Label>
                <Switch
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleInputChange("is_featured", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="newArrival">Yeni Ürün</Label>
                <Switch
                  id="newArrival"
                  checked={formData.is_new}
                  onCheckedChange={(checked) => handleInputChange("is_new", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
