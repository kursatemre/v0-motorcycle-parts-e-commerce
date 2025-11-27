import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { OrdersList } from "@/components/account/orders-list"

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Siparişlerim</h1>
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <AccountSidebar />
          </aside>
          <div className="lg:col-span-3">
            <OrdersList />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
