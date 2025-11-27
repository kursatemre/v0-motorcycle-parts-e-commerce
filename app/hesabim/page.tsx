import { redirect } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AccountSidebar } from "@/components/account/account-sidebar"
import { AccountOverview } from "@/components/account/account-overview"
import { createClient } from "@/lib/supabase/server"

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/giris")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch user stats
  const [ordersRes, favoritesRes, addressesRes] = await Promise.all([
    supabase.from("orders").select("id, status", { count: "exact" }).eq("user_id", user.id),
    supabase.from("favorites").select("id", { count: "exact" }).eq("user_id", user.id),
    supabase.from("addresses").select("id", { count: "exact" }).eq("user_id", user.id),
  ])

  // Fetch recent orders
  const { data: recentOrders } = await supabase
    .from("orders")
    .select("id, order_number, status, total, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3)

  const stats = {
    totalOrders: ordersRes.count || 0,
    activeOrders: ordersRes.data?.filter((o) => !["delivered", "cancelled"].includes(o.status)).length || 0,
    favorites: favoritesRes.count || 0,
    addresses: addressesRes.count || 0,
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">Hesabım</h1>
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <AccountSidebar />
          </aside>
          <div className="lg:col-span-3">
            <AccountOverview user={user} profile={profile} stats={stats} recentOrders={recentOrders || []} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
