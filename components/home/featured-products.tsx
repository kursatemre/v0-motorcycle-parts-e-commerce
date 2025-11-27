import Link from "next/link"
import { ChevronRight, Package } from "lucide-react"
import { ProductCard } from "@/components/product/product-card"

interface FeaturedProductsProps {
  products: any[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Öne Çıkan Ürünler</h2>
            <p className="text-muted-foreground mt-1">En çok tercih edilen parçalar</p>
          </div>
          <Link href="/urunler" className="hidden sm:flex items-center text-primary hover:underline">
            Tümünü Gör
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground">Henüz öne çıkan ürün yok</h3>
            <p className="text-muted-foreground mt-1">Yakında yeni ürünler eklenecek</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <Link href="/urunler" className="sm:hidden flex items-center justify-center text-primary hover:underline mt-6">
          Tümünü Gör
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </section>
  )
}
