"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Share2, Check, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercent = hasDiscount ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Images */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-secondary rounded-xl overflow-hidden">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
          {hasDiscount && (
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground text-lg px-3 py-1">
              %{discountPercent} İndirim
            </Badge>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/marka/${product.brand.slug}`}>
              <span className="text-sm text-primary font-medium hover:underline">{product.brand.name}</span>
            </Link>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mt-1">{product.name}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Codes */}
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span>
            OEM: <span className="text-foreground font-mono">{product.oem}</span>
          </span>
          <span>
            SKU: <span className="text-foreground font-mono">{product.sku}</span>
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 pb-6 border-b border-border">
          {hasDiscount ? (
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.discountPrice!)}</span>
              <span className="text-xl text-muted-foreground line-through">{formatPrice(product.price)}</span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
          )}
          <p className="text-sm text-muted-foreground mt-1">KDV Dahil</p>
        </div>

        {/* Stock Status */}
        <div className="py-4 border-b border-border">
          {product.stock > 0 ? (
            <div className="flex items-center gap-2 text-green-500">
              <Check className="h-5 w-5" />
              <span className="font-medium">Stokta Mevcut</span>
              <span className="text-muted-foreground">({product.stock} adet)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-destructive">
              <span className="font-medium">Stokta Yok</span>
            </div>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="py-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <Button variant="ghost" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={increaseQuantity} disabled={quantity >= product.stock}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Sepete Ekle
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 py-6">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-2 bg-secondary rounded-lg">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Ücretsiz Kargo</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-2 bg-secondary rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Garanti</span>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="p-2 bg-secondary rounded-lg">
              <RotateCcw className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground">Kolay İade</span>
          </div>
        </div>

        {/* Compatibility */}
        {product.compatibility.length > 0 && (
          <div className="py-4 border-t border-border">
            <h3 className="font-semibold text-foreground mb-3">Uyumlu Modeller</h3>
            <div className="flex flex-wrap gap-2">
              {product.compatibility.map((comp, index) => (
                <span key={index} className="px-3 py-1 bg-secondary rounded-lg text-sm text-foreground">
                  {comp.brand} {comp.model} ({comp.yearStart}-{comp.yearEnd})
                  {comp.engineType && ` - ${comp.engineType}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabs - Full Width */}
      <div className="lg:col-span-2 mt-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="bg-secondary border-b border-border w-full justify-start rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
            >
              Açıklama
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
            >
              Teknik Özellikler
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
            >
              Kargo & İade
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Bu ürün, orijinal parça kalitesinde üretilmiş olup, aracınızın performansını en üst düzeyde tutmanızı
                sağlar. Uzun ömürlü kullanım için özel malzemelerden imal edilmiştir.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">OEM Numarası</span>
                <span className="text-foreground font-mono">{product.oem}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">SKU</span>
                <span className="text-foreground font-mono">{product.sku}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Ağırlık</span>
                <span className="text-foreground">{product.weight} kg</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Boyutlar</span>
                <span className="text-foreground">
                  {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Marka</span>
                <span className="text-foreground">{product.brand.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Kategori</span>
                <span className="text-foreground">{product.category.name}</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Kargo Bilgileri</h4>
                <p>
                  500 TL ve üzeri siparişlerde kargo ücretsizdir. Bu tutarın altındaki siparişlerde kargo ücreti sepet
                  sayfasında hesaplanır.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Teslimat Süresi</h4>
                <p>
                  Siparişleriniz 1-3 iş günü içinde kargoya verilir. Teslimat süresi bulunduğunuz bölgeye göre 1-5 iş
                  günü arasında değişiklik gösterebilir.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">İade Koşulları</h4>
                <p>
                  Ürünlerimizi teslim aldığınız tarihten itibaren 14 gün içinde iade edebilirsiniz. İade edilecek
                  ürünlerin kullanılmamış ve orijinal ambalajında olması gerekmektedir.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
