import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discountPrice && product.discountPrice < product.price
  const discountPercent = hasDiscount ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Image */}
      <Link href={`/urun/${product.slug}`} className="block relative aspect-square bg-secondary">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasDiscount && <Badge className="bg-primary text-primary-foreground">%{discountPercent} İndirim</Badge>}
          {product.stock < 5 && product.stock > 0 && (
            <Badge variant="outline" className="bg-background/80 text-foreground border-border">
              Son {product.stock} Adet
            </Badge>
          )}
          {product.stock === 0 && <Badge variant="destructive">Tükendi</Badge>}
        </div>
        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/marka/${product.brand.slug}`}>
          <span className="text-xs text-primary font-medium hover:underline">{product.brand.name}</span>
        </Link>
        <Link href={`/urun/${product.slug}`}>
          <h3 className="font-medium text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">OEM: {product.oem}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold text-primary">{formatPrice(product.discountPrice!)}</span>
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          className="w-full mt-3 bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Sepete Ekle
        </Button>
      </div>
    </div>
  )
}
