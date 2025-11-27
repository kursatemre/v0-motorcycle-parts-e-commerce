import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { BrandsSection } from "@/components/home/brands-section"
import { PromoBanner } from "@/components/home/promo-banner"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()

  const [categoriesRes, productsRes, brandsRes] = await Promise.all([
    supabase
      .from("categories")
      .select("id, name, slug, image_url, description")
      .eq("is_active", true)
      .order("sort_order")
      .limit(8),
    supabase
      .from("products")
      .select(`
        id, name, slug, price, compare_price, stock_quantity, oem_code, is_featured, is_new,
        brand:brands(id, name, slug),
        images:product_images(id, url, is_primary)
      `)
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(8),
    supabase.from("brands").select("id, name, slug, logo_url").eq("is_active", true).order("name").limit(12),
  ])

  const categories = categoriesRes.data || []
  const featuredProducts = productsRes.data || []
  const brands = brandsRes.data || []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection categories={categories} />
        <PromoBanner />
        <FeaturedProducts products={featuredProducts} />
        <BrandsSection brands={brands} />
      </main>
      <Footer />
    </div>
  )
}
