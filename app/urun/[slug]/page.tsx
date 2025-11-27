import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductDetail } from "@/components/product/product-detail"
import { RelatedProducts } from "@/components/product/related-products"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { products } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Ana Sayfa
          </a>
          <span className="text-muted-foreground">/</span>
          <a href="/urunler" className="text-muted-foreground hover:text-foreground">
            Ürünler
          </a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </Breadcrumb>

        <ProductDetail product={product} />
        <RelatedProducts currentProduct={product} />
      </main>
      <Footer />
    </div>
  )
}
