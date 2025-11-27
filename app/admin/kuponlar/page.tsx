"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Copy, MoreHorizontal, Pencil, Trash2, Ticket, TrendingUp, Users } from "lucide-react"

const mockCoupons = [
  {
    id: "1",
    code: "HOSGELDIN20",
    description: "Yeni üyelere %20 indirim",
    type: "percentage",
    value: 20,
    minAmount: 200,
    maxUses: 1000,
    usedCount: 456,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
  },
  {
    id: "2",
    code: "ILKSIPARIS",
    description: "İlk siparişe 50 TL indirim",
    type: "fixed",
    value: 50,
    minAmount: 300,
    maxUses: 500,
    usedCount: 234,
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    status: "active",
  },
  {
    id: "3",
    code: "OZEL100",
    description: "VIP müşterilere özel 100 TL indirim",
    type: "fixed",
    value: 100,
    minAmount: 1000,
    maxUses: 100,
    usedCount: 100,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "exhausted",
  },
  {
    id: "4",
    code: "YAZ2024",
    description: "Yaz kampanyası %15 indirim",
    type: "percentage",
    value: 15,
    minAmount: 0,
    maxUses: null,
    usedCount: 0,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "scheduled",
  },
]

export default function CouponsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredCoupons = mockCoupons.filter(
    (coupon) =>
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeCount = mockCoupons.filter((c) => c.status === "active").length
  const totalUsage = mockCoupons.reduce((sum, c) => sum + c.usedCount, 0)

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
      case "exhausted":
        return <Badge variant="secondary">Tükendi</Badge>
      case "expired":
        return <Badge variant="destructive">Süresi Doldu</Badge>
      default:
        return null
    }
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kuponlar</h1>
          <p className="text-muted-foreground">İndirim kuponu yönetimi</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Kupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yeni Kupon Oluştur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Kupon Kodu *</Label>
                <Input placeholder="INDIRIM20" className="uppercase" />
              </div>
              <div className="space-y-2">
                <Label>Açıklama</Label>
                <Input placeholder="Kupon açıklaması" />
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
                      <SelectItem value="fixed">Sabit (TL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Değer</Label>
                  <Input type="number" placeholder="20" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Min. Sepet (TL)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Max. Kullanım</Label>
                  <Input type="number" placeholder="Sınırsız" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Başlangıç</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>Bitiş</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Aktif</Label>
                <Switch defaultChecked />
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
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktif Kupon</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Kullanım</p>
              <p className="text-2xl font-bold">{totalUsage}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Benzersiz Kullanıcı</p>
              <p className="text-2xl font-bold">{Math.round(totalUsage * 0.85)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Kupon kodu veya açıklama ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kupon Kodu</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead className="text-center">İndirim</TableHead>
              <TableHead className="text-center">Min. Sepet</TableHead>
              <TableHead className="text-center">Kullanım</TableHead>
              <TableHead>Geçerlilik</TableHead>
              <TableHead className="text-center">Durum</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm font-semibold">{coupon.code}</code>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyCode(coupon.code)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{coupon.description}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">
                    {coupon.type === "percentage" ? `%${coupon.value}` : `${coupon.value} TL`}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{coupon.minAmount > 0 ? `${coupon.minAmount} TL` : "-"}</TableCell>
                <TableCell className="text-center">
                  {coupon.usedCount}
                  {coupon.maxUses && ` / ${coupon.maxUses}`}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{coupon.startDate}</p>
                    <p className="text-muted-foreground">{coupon.endDate}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(coupon.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Kopyala
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
