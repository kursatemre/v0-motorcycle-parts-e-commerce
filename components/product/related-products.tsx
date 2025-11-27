import { ProductCard } from "@/components/product/product-card"
import type { Product } from "@/lib/types"
import { products } from "@/lib/mock-data"

interface RelatedProductsProps {
  currentProduct: Product
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const relatedProducts = products
    .filter((p) => p.id !== currentProduct.id)
    .filter((p) => p.category.id === currentProduct.category.id || p.brand.id === currentProduct.brand.id)
    .slice(0, 4)

  if (relatedProducts.length === 0) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-6">Benzer Ürünler</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
