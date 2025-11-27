import { TrendingUp, TrendingDown, Package, ShoppingCart, Users, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Toplam Satış",
    value: "₺245.850",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "Bu ay",
  },
  {
    title: "Sipariş Sayısı",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "Bu ay",
  },
  {
    title: "Yeni Müşteri",
    value: "48",
    change: "-2.4%",
    trend: "down",
    icon: Users,
    description: "Bu ay",
  },
  {
    title: "Ürün Sayısı",
    value: "1.245",
    change: "+24",
    trend: "up",
    icon: Package,
    description: "Aktif ürün",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown

        return (
          <div key={stat.title} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                <TrendIcon className="h-3 w-3" />
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </div>
        )
      })}
    </div>
  )
}
