import Link from "next/link"
import Image from "next/image"
import type { Brand } from "@/lib/types"

interface BrandsSectionProps {
  brands?: Brand[]
}

export function BrandsSection({ brands = [] }: BrandsSectionProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Popüler Markalar</h2>
          <p className="text-muted-foreground mt-2">En çok aranan motosiklet markaları</p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/marka/${brand.slug}`}
              className="flex items-center justify-center p-4 bg-card border border-border rounded-lg hover:border-primary transition-colors group"
            >
              <Image
                src={brand.logo || `/placeholder.svg?height=40&width=80&query=${brand.name} logo`}
                alt={brand.name}
                width={80}
                height={40}
                className="opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
