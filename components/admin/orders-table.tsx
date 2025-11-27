"use client"

import { useState } from "react"
import { Eye, MoreHorizontal, Printer, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const orders = [
  {
    id: "SP-2024-156",
    customer: "Ahmet Yılmaz",
    email: "ahmet@email.com",
    total: 1248,
    items: 3,
    status: "pending",
    payment: "credit_card",
    date: "27 Kas 2024, 14:32",
  },
  {
    id: "SP-2024-155",
    customer: "Mehmet Demir",
    email: "mehmet@email.com",
    total: 599,
    items: 1,
    status: "processing",
    payment: "bank_transfer",
    date: "27 Kas 2024, 13:15",
  },
  {
    id: "SP-2024-154",
    customer: "Ali Kaya",
    email: "ali@email.com",
    total: 2150,
    items: 2,
    status: "shipped",
    payment: "credit_card",
    date: "27 Kas 2024, 11:45",
  },
  {
    id: "SP-2024-153",
    customer: "Can Öztürk",
    email: "can@email.com",
    total: 450,
    items: 1,
    status: "delivered",
    payment: "cash_on_delivery",
    date: "26 Kas 2024, 16:20",
  },
  {
    id: "SP-2024-152",
    customer: "Emre Şahin",
    email: "emre@email.com",
    total: 899,
    items: 2,
    status: "delivered",
    payment: "credit_card",
    date: "26 Kas 2024, 14:10",
  },
  {
    id: "SP-2024-151",
    customer: "Burak Yıldız",
    email: "burak@email.com",
    total: 3200,
    items: 4,
    status: "cancelled",
    payment: "credit_card",
    date: "26 Kas 2024, 10:05",
  },
]

const statusConfig = {
  pending: { label: "Bekliyor", class: "bg-yellow-500/20 text-yellow-400" },
  processing: { label: "Hazırlanıyor", class: "bg-blue-500/20 text-blue-400" },
  shipped: { label: "Kargoda", class: "bg-purple-500/20 text-purple-400" },
  delivered: { label: "Teslim Edildi", class: "bg-green-500/20 text-green-400" },
  cancelled: { label: "İptal", class: "bg-red-500/20 text-red-400" },
}

const paymentLabels = {
  credit_card: "Kredi Kartı",
  bank_transfer: "Havale/EFT",
  cash_on_delivery: "Kapıda Ödeme",
}

export function OrdersTable() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map((o) => o.id))
    }
  }

  const toggleOrder = (id: string) => {
    setSelectedOrders((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox checked={selectedOrders.length === orders.length} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Sipariş</TableHead>
            <TableHead>Müşteri</TableHead>
            <TableHead>Tutar</TableHead>
            <TableHead>Ödeme</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead>Tarih</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const status = statusConfig[order.status as keyof typeof statusConfig]

            return (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox checked={selectedOrders.includes(order.id)} onCheckedChange={() => toggleOrder(order.id)} />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.items} ürün</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{formatPrice(order.total)}</TableCell>
                <TableCell className="text-sm">{paymentLabels[order.payment as keyof typeof paymentLabels]}</TableCell>
                <TableCell>
                  <Badge className={`${status.class} border-0`}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{order.date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Detay
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="h-4 w-4 mr-2" />
                        Fatura Yazdır
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Truck className="h-4 w-4 mr-2" />
                        Kargo Bilgisi
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Durumu Güncelle</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">İptal Et</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <p className="text-sm text-muted-foreground">Toplam 156 siparişten 1-6 arası gösteriliyor</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Önceki
          </Button>
          <Button variant="outline" size="sm">
            Sonraki
          </Button>
        </div>
      </div>
    </div>
  )
}
