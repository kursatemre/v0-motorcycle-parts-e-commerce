import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchResults } from "@/components/search/search-results"
import { ProductFilters } from "@/components/product/product-filters"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const query = q || ""

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Arama Sonuçları</h1>
          {query && <p className="text-muted-foreground mt-1">"{query}" için sonuçlar gösteriliyor</p>}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <ProductFilters />
          </aside>
          <div className="lg:col-span-3">
            <SearchResults query={query} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
