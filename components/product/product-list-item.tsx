import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductListItemProps {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
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
    <div className="flex gap-4 bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
      {/* Image */}
      <Link href={`/urun/${product.slug}`} className="flex-shrink-0">
        <div className="relative w-32 h-32 bg-secondary rounded-lg overflow-hidden">
          <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">
              %{discountPercent}
            </Badge>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/marka/${product.brand.slug}`}>
              <span className="text-xs text-primary font-medium hover:underline">{product.brand.name}</span>
            </Link>
            <Link href={`/urun/${product.slug}`}>
              <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              OEM: {product.oem} | SKU: {product.sku}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>

        {/* Compatibility */}
        {product.compatibility.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.compatibility.slice(0, 2).map((comp, index) => (
              <span key={index} className="text-xs px-2 py-0.5 bg-secondary rounded text-muted-foreground">
                {comp.brand} {comp.model} ({comp.yearStart}-{comp.yearEnd})
              </span>
            ))}
            {product.compatibility.length > 2 && (
              <span className="text-xs px-2 py-0.5 bg-secondary rounded text-muted-foreground">
                +{product.compatibility.length - 2} daha
              </span>
            )}
          </div>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <span className="flex items-center gap-1 text-xs text-green-500">
                <Check className="h-3 w-3" />
                Stokta ({product.stock} adet)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-destructive">
                <X className="h-3 w-3" />
                Tükendi
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              {hasDiscount ? (
                <>
                  <span className="text-lg font-bold text-primary">{formatPrice(product.discountPrice!)}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
              )}
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={product.stock === 0}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
