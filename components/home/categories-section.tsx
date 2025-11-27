import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  image_url: string | null
  description: string | null
}

interface CategoriesSectionProps {
  categories: Category[]
}

// Default categories as fallback
const defaultCategories = [
  { id: "1", name: "Motor Parçaları", slug: "motor-parcalari", image_url: null, description: null },
  { id: "2", name: "Fren Sistemi", slug: "fren-sistemi", image_url: null, description: null },
  { id: "3", name: "Elektrik & Aydınlatma", slug: "elektrik-aydinlatma", image_url: null, description: null },
  { id: "4", name: "Süspansiyon", slug: "suspansiyon", image_url: null, description: null },
  { id: "5", name: "Şanzıman & Debriyaj", slug: "sanziman-debriyaj", image_url: null, description: null },
  { id: "6", name: "Kaporta & Plastik", slug: "kaporta-plastik", image_url: null, description: null },
  { id: "7", name: "Lastik & Jant", slug: "lastik-jant", image_url: null, description: null },
  { id: "8", name: "Yağ & Bakım", slug: "yag-bakim", image_url: null, description: null },
]

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const displayCategories = categories.length > 0 ? categories : defaultCategories

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Kategoriler</h2>
            <p className="text-muted-foreground mt-1">İhtiyacınız olan parçayı kolayca bulun</p>
          </div>
          <Link href="/kategoriler" className="hidden sm:flex items-center text-primary hover:underline">
            Tümünü Gör
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {displayCategories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/kategori/${category.slug}`}
              className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
            >
              <div className="aspect-square relative bg-secondary">
                <Image
                  src={
                    category.image_url ||
                    `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(category.name + " motorcycle parts")}`
                  }
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{category.description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/kategoriler"
          className="sm:hidden flex items-center justify-center text-primary hover:underline mt-6"
        >
          Tümünü Gör
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </section>
  )
}
