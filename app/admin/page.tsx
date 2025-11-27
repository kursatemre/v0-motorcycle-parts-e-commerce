import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentOrders } from "@/components/admin/recent-orders"
import { SalesChart } from "@/components/admin/sales-chart"
import { TopProducts } from "@/components/admin/top-products"
import { LowStockAlert } from "@/components/admin/low-stock-alert"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Mağaza performansınıza genel bakış</p>
      </div>

      <DashboardStats />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div>
          <LowStockAlert />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  )
}
