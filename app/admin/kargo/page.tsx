"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RefreshCw, Truck, Package, Clock, CheckCircle, Search } from "lucide-react"

const mockShipments = [
  {
    id: "1",
    orderId: "SIP-2024-001",
    trackingNo: "YK123456789TR",
    carrier: "Yurtiçi Kargo",
    customer: "Ahmet Yılmaz",
    city: "İstanbul",
    status: "delivered",
    createdAt: "2024-01-10",
    deliveredAt: "2024-01-12",
  },
  {
    id: "2",
    orderId: "SIP-2024-002",
    trackingNo: "MNG987654321TR",
    carrier: "MNG Kargo",
    customer: "Mehmet Kara",
    city: "Ankara",
    status: "in_transit",
    createdAt: "2024-01-14",
    deliveredAt: null,
  },
  {
    id: "3",
    orderId: "SIP-2024-003",
    trackingNo: "PTT456789123TR",
    carrier: "PTT Kargo",
    customer: "Ayşe Demir",
    city: "İzmir",
    status: "shipped",
    createdAt: "2024-01-15",
    deliveredAt: null,
  },
  {
    id: "4",
    orderId: "SIP-2024-004",
    trackingNo: null,
    carrier: "Yurtiçi Kargo",
    customer: "Can Yıldız",
    city: "Bursa",
    status: "pending",
    createdAt: "2024-01-15",
    deliveredAt: null,
  },
]

export default function ShippingPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle className="mr-1 h-3 w-3" />
            Teslim Edildi
          </Badge>
        )
      case "in_transit":
        return (
          <Badge className="bg-blue-500/10 text-blue-500">
            <Truck className="mr-1 h-3 w-3" />
            Yolda
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            <Package className="mr-1 h-3 w-3" />
            Kargoya Verildi
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="mr-1 h-3 w-3" />
            Bekliyor
          </Badge>
        )
      default:
        return null
    }
  }

  const deliveredCount = mockShipments.filter((s) => s.status === "delivered").length
  const inTransitCount = mockShipments.filter((s) => s.status === "in_transit").length
  const pendingCount = mockShipments.filter((s) => s.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kargo Yönetimi</h1>
          <p className="text-muted-foreground">Gönderi takibi ve yönetimi</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Durumları Güncelle
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Gönderi</p>
              <p className="text-2xl font-bold">{mockShipments.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Teslim Edilen</p>
              <p className="text-2xl font-bold">{deliveredCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Truck className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yolda</p>
              <p className="text-2xl font-bold">{inTransitCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-yellow-500/10 p-3">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bekleyen</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Sipariş no veya takip no ara..." className="pl-10" />
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sipariş No</TableHead>
              <TableHead>Takip No</TableHead>
              <TableHead>Kargo Firması</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Şehir</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead className="text-center">Durum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockShipments.map((shipment) => (
              <TableRow key={shipment.id}>
                <TableCell className="font-mono font-medium">{shipment.orderId}</TableCell>
                <TableCell>
                  {shipment.trackingNo ? (
                    <code className="rounded bg-muted px-2 py-1 text-sm">{shipment.trackingNo}</code>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>{shipment.carrier}</TableCell>
                <TableCell>{shipment.customer}</TableCell>
                <TableCell>{shipment.city}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{shipment.createdAt}</p>
                    {shipment.deliveredAt && <p className="text-muted-foreground">Teslim: {shipment.deliveredAt}</p>}
                  </div>
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(shipment.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
