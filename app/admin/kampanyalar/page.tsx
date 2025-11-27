"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Calendar, Percent, Tag, TrendingUp, Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const mockCampaigns = [
  {
    id: "1",
    name: "Kış İndirimi",
    description: "Tüm fren parçalarında %20 indirim",
    type: "percentage",
    value: 20,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "active",
    usageCount: 145,
    revenue: 45600,
    image: "/winter-sale-motorcycle-parts.jpg",
  },
  {
    id: "2",
    name: "Yeni Yıl Kampanyası",
    description: "500 TL üzeri alışverişlerde 50 TL indirim",
    type: "fixed",
    value: 50,
    minAmount: 500,
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    status: "active",
    usageCount: 89,
    revenue: 28400,
    image: "/new-year-motorcycle-sale.jpg",
  },
  {
    id: "3",
    name: "Bahar Hazırlığı",
    description: "Yağ ve filtre setlerinde %15 indirim",
    type: "percentage",
    value: 15,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    status: "scheduled",
    usageCount: 0,
    revenue: 0,
    image: "/spring-motorcycle-maintenance.jpg",
  },
  {
    id: "4",
    name: "Black Friday",
    description: "Seçili ürünlerde %30'a varan indirimler",
    type: "percentage",
    value: 30,
    startDate: "2023-11-24",
    endDate: "2023-11-27",
    status: "ended",
    usageCount: 456,
    revenue: 125000,
    image: "/black-friday-motorcycle-deals.jpg",
  },
]

export default function CampaignsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active")
  const totalRevenue = mockCampaigns.reduce((sum, c) => sum + c.revenue, 0)
  const totalUsage = mockCampaigns.reduce((sum, c) => sum + c.usageCount, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-500">Aktif</Badge>
      case "scheduled":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Planlandı
          </Badge>
        )
      case "ended":
        return <Badge variant="secondary">Sona Erdi</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kampanyalar</h1>
          <p className="text-muted-foreground">İndirim ve promosyon kampanyaları</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Kampanya
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Kampanya Oluştur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Kampanya Adı *</Label>
                <Input placeholder="Örn: Yaz İndirimi" />
              </div>
              <div className="space-y-2">
                <Label>Açıklama</Label>
                <Textarea placeholder="Kampanya detayları..." />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>İndirim Tipi</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Yüzde (%)</SelectItem>
                      <SelectItem value="fixed">Sabit Tutar (TL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>İndirim Değeri</Label>
                  <Input type="number" placeholder="20" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Başlangıç Tarihi</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Bitiş Tarihi</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Minimum Sepet Tutarı (TL)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Geçerli Kategoriler</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tüm kategoriler" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Kategoriler</SelectItem>
                      <SelectItem value="fren">Fren Sistemleri</SelectItem>
                      <SelectItem value="motor">Motor Parçaları</SelectItem>
                      <SelectItem value="elektrik">Elektrik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Hemen Aktif Et</Label>
                <Switch />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Oluştur</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Percent className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktif Kampanya</p>
              <p className="text-2xl font-bold">{activeCampaigns.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Ciro</p>
              <p className="text-2xl font-bold">{(totalRevenue / 1000).toFixed(0)}K TL</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Tag className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kullanım</p>
              <p className="text-2xl font-bold">{totalUsage}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-yellow-500/10 p-3">
              <Calendar className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Planlanan</p>
              <p className="text-2xl font-bold">{mockCampaigns.filter((c) => c.status === "scheduled").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden">
            <div className="relative aspect-[2/1]">
              <Image src={campaign.image || "/placeholder.svg"} alt={campaign.name} fill className="object-cover" />
              <div className="absolute right-2 top-2">{getStatusBadge(campaign.status)}</div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Görüntüle
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      Düzenle
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Sil
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{campaign.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">İndirim:</span>
                <Badge variant="secondary">
                  {campaign.type === "percentage" ? `%${campaign.value}` : `${campaign.value} TL`}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tarih:</span>
                <span>
                  {campaign.startDate} - {campaign.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between border-t pt-3 text-sm">
                <span>
                  <strong>{campaign.usageCount}</strong> kullanım
                </span>
                <span className="font-semibold text-green-500">{campaign.revenue.toLocaleString("tr-TR")} TL</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
