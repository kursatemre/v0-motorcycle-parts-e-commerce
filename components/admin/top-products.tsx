import Image from "next/image"
import { products } from "@/lib/mock-data"

export function TopProducts() {
  const topProducts = products.slice(0, 5)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">En Çok Satan Ürünler</h2>
      </div>
      <div className="divide-y divide-border">
        {topProducts.map((product, index) => (
          <div key={product.id} className="flex items-center gap-3 p-4">
            <span className="text-sm font-medium text-muted-foreground w-6">{index + 1}.</span>
            <div className="relative w-10 h-10 bg-secondary rounded overflow-hidden flex-shrink-0">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.brand.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {formatPrice(product.discountPrice || product.price)}
              </p>
              <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 50 + 10)} satış</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
