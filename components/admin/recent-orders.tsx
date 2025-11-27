import Link from "next/link"
import { Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const orders = [
  { id: "SP-2024-156", customer: "Ahmet Yılmaz", total: 1248, status: "pending", date: "2 dk önce" },
  { id: "SP-2024-155", customer: "Mehmet Demir", total: 599, status: "processing", date: "15 dk önce" },
  { id: "SP-2024-154", customer: "Ali Kaya", total: 2150, status: "shipped", date: "1 saat önce" },
  { id: "SP-2024-153", customer: "Can Öztürk", total: 450, status: "delivered", date: "2 saat önce" },
  { id: "SP-2024-152", customer: "Emre Şahin", total: 899, status: "delivered", date: "3 saat önce" },
]

const statusConfig = {
  pending: { label: "Bekliyor", class: "bg-yellow-500/20 text-yellow-400" },
  processing: { label: "Hazırlanıyor", class: "bg-blue-500/20 text-blue-400" },
  shipped: { label: "Kargoda", class: "bg-purple-500/20 text-purple-400" },
  delivered: { label: "Teslim Edildi", class: "bg-green-500/20 text-green-400" },
}

export function RecentOrders() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Son Siparişler</h2>
        <Link href="/admin/siparisler">
          <Button variant="ghost" size="sm" className="text-primary">
            Tümünü Gör
          </Button>
        </Link>
      </div>
      <div className="divide-y divide-border">
        {orders.map((order) => {
          const status = statusConfig[order.status as keyof typeof statusConfig]

          return (
            <div key={order.id} className="flex items-center justify-between p-4">
              <div className="flex-1">
                <p className="font-medium text-foreground">#{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
              </div>
              <div className="text-right mr-4">
                <p className="font-medium text-foreground">{formatPrice(order.total)}</p>
                <p className="text-xs text-muted-foreground">{order.date}</p>
              </div>
              <Badge className={`${status.class} border-0`}>{status.label}</Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Detay Gör
                  </DropdownMenuItem>
                  <DropdownMenuItem>Durumu Güncelle</DropdownMenuItem>
                  <DropdownMenuItem>Fatura Yazdır</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        })}
      </div>
    </div>
  )
}
