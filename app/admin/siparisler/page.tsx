import { OrdersTable } from "@/components/admin/orders-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Filter } from "lucide-react"

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Siparişler</h1>
          <p className="text-muted-foreground">Tüm siparişleri yönetin</p>
        </div>
        <Button variant="outline" className="border-border bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Dışa Aktar
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-card border border-border rounded-lg p-4">
        <div className="flex-1 min-w-64">
          <div className="relative">
            <Input
              type="search"
              placeholder="Sipariş no, müşteri adı..."
              className="pl-10 bg-secondary border-border"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Tüm Durumlar</SelectItem>
            <SelectItem value="pending">Bekliyor</SelectItem>
            <SelectItem value="processing">Hazırlanıyor</SelectItem>
            <SelectItem value="shipped">Kargoda</SelectItem>
            <SelectItem value="delivered">Teslim Edildi</SelectItem>
            <SelectItem value="cancelled">İptal</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue placeholder="Tarih" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Tüm Tarihler</SelectItem>
            <SelectItem value="today">Bugün</SelectItem>
            <SelectItem value="week">Bu Hafta</SelectItem>
            <SelectItem value="month">Bu Ay</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-border bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          Daha Fazla Filtre
        </Button>
      </div>

      <OrdersTable />
    </div>
  )
}
