"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { products } from "@/lib/mock-data"

export function CartContent() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  // For demo purposes, add some items if cart is empty
  const demoItems =
    cart.items.length > 0
      ? cart.items
      : [
          { product: products[0], quantity: 2 },
          { product: products[3], quantity: 1 },
        ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = demoItems.reduce((sum, item) => {
    const price = item.product.discountPrice || item.product.price
    return sum + price * item.quantity
  }, 0)

  const shipping = subtotal >= 500 ? 0 : 49.9
  const total = subtotal + shipping

  if (demoItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <ShoppingBag className="h-20 w-20 text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">Sepetiniz Boş</h2>
        <p className="text-muted-foreground max-w-md mb-6">
          Henüz sepetinize ürün eklemediniz. Hemen alışverişe başlayın!
        </p>
        <Link href="/urunler">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Alışverişe Başla
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {demoItems.map((item) => {
          const price = item.product.discountPrice || item.product.price
          const hasDiscount = item.product.discountPrice && item.product.discountPrice < item.product.price

          return (
            <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4">
              <Link href={`/urun/${item.product.slug}`} className="flex-shrink-0">
                <div className="relative w-24 h-24 bg-secondary rounded-lg overflow-hidden">
                  <Image
                    src={item.product.images[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link href={`/urun/${item.product.slug}`}>
                      <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">OEM: {item.product.oem}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-right">
                    {hasDiscount && (
                      <span className="text-xs text-muted-foreground line-through block">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    )}
                    <span className="font-bold text-foreground">{formatPrice(price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Continue Shopping */}
        <div className="flex justify-between items-center pt-4">
          <Link href="/urunler">
            <Button variant="outline" className="border-border bg-transparent">
              Alışverişe Devam Et
            </Button>
          </Link>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
          <h2 className="text-lg font-semibold text-foreground mb-4">Sipariş Özeti</h2>

          {/* Coupon Code */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">Kupon Kodu</label>
            <div className="flex gap-2">
              <Input placeholder="Kupon kodunuz" className="bg-secondary border-border" />
              <Button variant="outline" className="border-border flex-shrink-0 bg-transparent">
                <Tag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ara Toplam</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kargo</span>
              {shipping === 0 ? (
                <span className="text-green-500">Ücretsiz</span>
              ) : (
                <span className="text-foreground">{formatPrice(shipping)}</span>
              )}
            </div>
            {subtotal < 500 && (
              <p className="text-xs text-primary">{formatPrice(500 - subtotal)} daha ekleyin, kargo ücretsiz!</p>
            )}
            <div className="border-t border-border pt-3">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Toplam</span>
                <span className="font-bold text-xl text-foreground">{formatPrice(total)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">KDV Dahil</p>
            </div>
          </div>

          <Button className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg">
            Siparişi Tamamla
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <div className="mt-4 space-y-2 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
              256-bit SSL güvenli ödeme
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
              14 gün koşulsuz iade garantisi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
