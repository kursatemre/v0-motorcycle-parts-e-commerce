import { Package, Heart, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { User } from "@supabase/supabase-js"

interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  email: string | null
  phone: string | null
  role: string
  created_at: string
}

interface Order {
  id: string
  order_number: string
  status: string
  total: number
  created_at: string
}

interface Stats {
  totalOrders: number
  activeOrders: number
  favorites: number
  addresses: number
}

interface AccountOverviewProps {
  user: User
  profile: Profile | null
  stats: Stats
  recentOrders: Order[]
}

export function AccountOverview({ user, profile, stats, recentOrders }: AccountOverviewProps) {
  const initials =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
      : user.email?.substring(0, 2).toUpperCase() || "U"

  const fullName =
    profile?.first_name && profile?.last_name ? `${profile.first_name} ${profile.last_name}` : "Kullanıcı"

  const memberSince = new Date(profile?.created_at || user.created_at).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "shipped":
        return "bg-blue-500/20 text-blue-400"
      case "delivered":
        return "bg-green-500/20 text-green-400"
      case "pending":
      case "confirmed":
        return "bg-yellow-500/20 text-yellow-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Beklemede",
      confirmed: "Onaylandı",
      processing: "Hazırlanıyor",
      shipped: "Kargoda",
      delivered: "Teslim Edildi",
      cancelled: "İptal Edildi",
      returned: "İade Edildi",
    }
    return labels[status] || status
  }

  return (
    <div className="space-y-6">
      {/* User Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{initials}</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{fullName}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Üyelik: {memberSince}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Package className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
          <p className="text-xs text-muted-foreground">Toplam Sipariş</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{stats.activeOrders}</p>
          <p className="text-xs text-muted-foreground">Aktif Sipariş</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Heart className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{stats.favorites}</p>
          <p className="text-xs text-muted-foreground">Favoriler</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{stats.addresses}</p>
          <p className="text-xs text-muted-foreground">Kayıtlı Adres</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Son Siparişler</h3>
          <Link href="/siparislerim">
            <Button variant="ghost" size="sm" className="text-primary">
              Tümünü Gör
            </Button>
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Henüz siparişiniz bulunmuyor</p>
            <Button asChild className="mt-4">
              <Link href="/urunler">Alışverişe Başla</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between py-3 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{order.order_number}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                  <p className="text-sm font-medium text-foreground mt-1">
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                      minimumFractionDigits: 0,
                    }).format(order.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
