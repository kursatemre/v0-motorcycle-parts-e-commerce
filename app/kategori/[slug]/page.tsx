import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductsGrid } from "@/components/product/products-grid"
import { ProductFilters } from "@/components/product/product-filters"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { categories } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categories.find((c) => c.slug === slug)

  if (!category) {
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
          <a href="/kategoriler" className="text-muted-foreground hover:text-foreground">
            Kategoriler
          </a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{category.name}</span>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{category.name}</h1>
            {category.children && <p className="text-muted-foreground mt-1">{category.children.length} alt kategori</p>}
          </div>
        </div>

        {/* Subcategories */}
        {category.children && category.children.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {category.children.map((sub) => (
              <a
                key={sub.id}
                href={`/kategori/${sub.slug}`}
                className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {sub.name}
              </a>
            ))}
          </div>
        )}

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
