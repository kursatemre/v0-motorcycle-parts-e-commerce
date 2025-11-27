import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductsGrid } from "@/components/product/products-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { Breadcrumb } from "@/components/ui/breadcrumb"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            Ana Sayfa
          </a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">Tüm Ürünler</span>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Tüm Ürünler</h1>
          <p className="text-muted-foreground">8 ürün bulundu</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>
          <div className="lg:col-span-3">
            <ProductsGrid />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
