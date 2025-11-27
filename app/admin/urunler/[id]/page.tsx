"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, Plus, Save, Eye, Trash2, History } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { mockProducts, categories, brands } from "@/lib/mock-data"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id) || mockProducts[0]

  const [specifications, setSpecifications] = useState([
    { key: "Çap", value: "320mm" },
    { key: "Kalınlık", value: "5mm" },
    { key: "Malzeme", value: "Paslanmaz Çelik" },
  ])

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
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
            <h1 className="text-2xl font-bold">Ürün Düzenle</h1>
            <p className="text-muted-foreground">{product.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" />
            Geçmiş
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/urun/${product.slug}`}>
              <Eye className="mr-2 h-4 w-4" />
              Önizle
            </Link>
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Kaydet
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
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
                    <Input id="name" defaultValue={product.name} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU (Stok Kodu) *</Label>
                      <Input id="sku" defaultValue={product.sku} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="oem">OEM Kodu</Label>
                      <Input id="oem" defaultValue={product.oem || ""} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Marka *</Label>
                      <Select defaultValue={product.brand.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
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
                      <Label>Kategori *</Label>
                      <Select defaultValue={product.category}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea id="description" defaultValue={product.description} rows={6} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ürün Görselleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-4">
                    {product.images.map((image, index) => (
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
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {index === 0 && <Badge className="absolute bottom-2 left-2">Ana Görsel</Badge>}
                      </div>
                    ))}
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary hover:bg-muted">
                      <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Görsel Ekle</span>
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
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
                        placeholder="Özellik adı"
                        value={spec.key}
                        onChange={(e) => {
                          const updated = [...specifications]
                          updated[index].key = e.target.value
                          setSpecifications(updated)
                        }}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Değer"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...specifications]
                          updated[index].value = e.target.value
                          setSpecifications(updated)
                        }}
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon" onClick={() => removeSpecification(index)}>
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
                  <CardTitle>Kargo Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Ağırlık (kg)</Label>
                      <Input type="number" defaultValue="1.2" />
                    </div>
                    <div className="space-y-2">
                      <Label>En (cm)</Label>
                      <Input type="number" defaultValue="35" />
                    </div>
                    <div className="space-y-2">
                      <Label>Boy (cm)</Label>
                      <Input type="number" defaultValue="35" />
                    </div>
                    <div className="space-y-2">
                      <Label>Yükseklik (cm)</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compatibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Uyumlu Modeller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((model, index) => (
                      <Badge key={index} variant="secondary">
                        {model}
                        <X className="ml-1 h-3 w-3 cursor-pointer" />
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Model Ekle
                    </Button>
                  </div>
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
                    <Label>Meta Başlık</Label>
                    <Input defaultValue={product.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Açıklama</Label>
                    <Textarea defaultValue={product.description} rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label>URL (Slug)</Label>
                    <Input defaultValue={product.slug} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fiyatlandırma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Satış Fiyatı (TL) *</Label>
                <Input type="number" defaultValue={product.price} />
              </div>
              <div className="space-y-2">
                <Label>Eski Fiyat (TL)</Label>
                <Input type="number" defaultValue={product.originalPrice || ""} />
              </div>
              <div className="space-y-2">
                <Label>Maliyet (TL)</Label>
                <Input type="number" placeholder="0.00" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stok</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Stok Adedi *</Label>
                <Input type="number" defaultValue={product.stock} />
              </div>
              <div className="space-y-2">
                <Label>Minimum Stok Uyarısı</Label>
                <Input type="number" defaultValue={10} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Stok Takibi</Label>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Durum</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Aktif</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Öne Çıkan</Label>
                <Switch defaultChecked={product.featured} />
              </div>
              <div className="flex items-center justify-between">
                <Label>Yeni Ürün</Label>
                <Switch defaultChecked={product.isNew} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
