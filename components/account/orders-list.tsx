import Link from "next/link"
import { Package, Eye, Truck, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const orders = [
  {
    id: "SP-2024-001",
    date: "25 Kasım 2024",
    status: "shipped",
    statusText: "Kargoda",
    total: 1248,
    items: 3,
    trackingNumber: "1234567890",
  },
  {
    id: "SP-2024-002",
    date: "20 Kasım 2024",
    status: "delivered",
    statusText: "Teslim Edildi",
    total: 599,
    items: 1,
  },
  {
    id: "SP-2024-003",
    date: "15 Kasım 2024",
    status: "processing",
    statusText: "Hazırlanıyor",
    total: 2150,
    items: 2,
  },
  {
    id: "SP-2024-004",
    date: "10 Kasım 2024",
    status: "delivered",
    statusText: "Teslim Edildi",
    total: 450,
    items: 1,
  },
]

const statusStyles = {
  pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: Clock },
  processing: { bg: "bg-blue-500/20", text: "text-blue-400", icon: Package },
  shipped: { bg: "bg-purple-500/20", text: "text-purple-400", icon: Truck },
  delivered: { bg: "bg-green-500/20", text: "text-green-400", icon: Check },
}

export function OrdersList() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Henüz Siparişiniz Yok</h2>
          <p className="text-muted-foreground mb-6">İlk siparişinizi vermek için alışverişe başlayın.</p>
          <Link href="/urunler">
            <Button className="bg-primary text-primary-foreground">Alışverişe Başla</Button>
          </Link>
        </div>
      ) : (
        orders.map((order) => {
          const style = statusStyles[order.status as keyof typeof statusStyles]
          const StatusIcon = style.icon

          return (
            <div key={order.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">#{order.id}</h3>
                    <Badge className={`${style.bg} ${style.text} border-0`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {order.statusText}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                  <p className="text-sm text-muted-foreground">{order.items} ürün</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">{formatPrice(order.total)}</p>
                  {order.trackingNumber && (
                    <p className="text-xs text-muted-foreground mt-1">Takip No: {order.trackingNumber}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Link href={`/siparis/${order.id}`}>
                  <Button variant="outline" size="sm" className="border-border bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    Detay
                  </Button>
                </Link>
                {order.status === "shipped" && (
                  <Button variant="outline" size="sm" className="border-border bg-transparent">
                    <Truck className="h-4 w-4 mr-1" />
                    Kargo Takip
                  </Button>
                )}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
