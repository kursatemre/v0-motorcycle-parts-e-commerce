import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartContent } from "@/components/cart/cart-content"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Alışveriş Sepeti</h1>
        <CartContent />
      </main>
      <Footer />
    </div>
  )
}
