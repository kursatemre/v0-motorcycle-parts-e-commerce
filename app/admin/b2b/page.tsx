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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Ban,
  Building2,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"

const mockDealers = [
  {
    id: "1",
    companyName: "Mehmet Motor Ltd. Şti.",
    contactName: "Mehmet Kara",
    email: "info@mehmetmotor.com",
    phone: "0212 456 7890",
    city: "İstanbul",
    taxNo: "1234567890",
    discountRate: 15,
    creditLimit: 50000,
    currentDebt: 12500,
    status: "approved",
    totalOrders: 45,
    totalSpent: 125000,
    createdAt: "2023-06-15",
  },
  {
    id: "2",
    companyName: "Motor Parts A.Ş.",
    contactName: "Ali Yıldırım",
    email: "satis@motorparts.com",
    phone: "0216 333 4444",
    city: "İstanbul",
    taxNo: "9876543210",
    discountRate: 20,
    creditLimit: 100000,
    currentDebt: 45000,
    status: "approved",
    totalOrders: 78,
    totalSpent: 340000,
    createdAt: "2023-03-20",
  },
  {
    id: "3",
    companyName: "Ankara Moto Center",
    contactName: "Hasan Demir",
    email: "info@ankaramotocenter.com",
    phone: "0312 555 6666",
    city: "Ankara",
    taxNo: "5555555555",
    discountRate: 12,
    creditLimit: 30000,
    currentDebt: 0,
    status: "pending",
    totalOrders: 0,
    totalSpent: 0,
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    companyName: "İzmir Motosiklet",
    contactName: "Emre Çelik",
    email: "emre@izmirmotosiklet.com",
    phone: "0232 777 8888",
    city: "İzmir",
    taxNo: "3333333333",
    discountRate: 0,
    creditLimit: 0,
    currentDebt: 0,
    status: "rejected",
    totalOrders: 0,
    totalSpent: 0,
    createdAt: "2024-01-05",
  },
]

export default function B2BPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredDealers = mockDealers.filter((dealer) => {
    const matchesSearch =
      dealer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.contactName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || dealer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const approvedCount = mockDealers.filter((d) => d.status === "approved").length
  const pendingCount = mockDealers.filter((d) => d.status === "pending").length
  const totalRevenue = mockDealers.reduce((sum, d) => sum + d.totalSpent, 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle className="mr-1 h-3 w-3" />
            Onaylı
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            <Clock className="mr-1 h-3 w-3" />
            Bekliyor
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Reddedildi
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">B2B Bayi Yönetimi</h1>
          <p className="text-muted-foreground">Bayi başvuruları ve yönetimi</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Bayi
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Bayi Ekle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Firma Adı *</Label>
                <Input placeholder="Firma adı" />
              </div>
              <div className="space-y-2">
                <Label>Yetkili Kişi *</Label>
                <Input placeholder="Ad Soyad" />
              </div>
              <div className="space-y-2">
                <Label>E-posta *</Label>
                <Input type="email" placeholder="info@firma.com" />
              </div>
              <div className="space-y-2">
                <Label>Telefon *</Label>
                <Input placeholder="0212 000 0000" />
              </div>
              <div className="space-y-2">
                <Label>Vergi No *</Label>
                <Input placeholder="1234567890" />
              </div>
              <div className="space-y-2">
                <Label>Şehir *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Şehir seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="istanbul">İstanbul</SelectItem>
                    <SelectItem value="ankara">Ankara</SelectItem>
                    <SelectItem value="izmir">İzmir</SelectItem>
                    <SelectItem value="bursa">Bursa</SelectItem>
                    <SelectItem value="antalya">Antalya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>İskonto Oranı (%)</Label>
                <Input type="number" placeholder="15" />
              </div>
              <div className="space-y-2">
                <Label>Kredi Limiti (TL)</Label>
                <Input type="number" placeholder="50000" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Adres</Label>
                <Textarea placeholder="Açık adres..." />
              </div>
              <div className="flex items-center justify-between sm:col-span-2">
                <Label>Hemen Onayla</Label>
                <Switch />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>Kaydet</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Bayi</p>
              <p className="text-2xl font-bold">{mockDealers.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Onaylı</p>
              <p className="text-2xl font-bold">{approvedCount}</p>
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
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Ciro</p>
              <p className="text-2xl font-bold">{(totalRevenue / 1000).toFixed(0)}K TL</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Firma veya yetkili ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="approved">Onaylı</SelectItem>
            <SelectItem value="pending">Bekleyen</SelectItem>
            <SelectItem value="rejected">Reddedilen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Firma</TableHead>
              <TableHead>İletişim</TableHead>
              <TableHead className="text-center">İskonto</TableHead>
              <TableHead className="text-right">Kredi Limiti</TableHead>
              <TableHead className="text-right">Borç</TableHead>
              <TableHead className="text-center">Durum</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDealers.map((dealer) => (
              <TableRow key={dealer.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{dealer.companyName}</p>
                    <p className="text-sm text-muted-foreground">
                      {dealer.city} • VN: {dealer.taxNo}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-sm">{dealer.contactName}</p>
                    <p className="text-sm text-muted-foreground">{dealer.email}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="secondary">%{dealer.discountRate}</Badge>
                </TableCell>
                <TableCell className="text-right">{dealer.creditLimit.toLocaleString("tr-TR")} TL</TableCell>
                <TableCell className="text-right">
                  <span className={dealer.currentDebt > dealer.creditLimit * 0.8 ? "text-red-500 font-semibold" : ""}>
                    {dealer.currentDebt.toLocaleString("tr-TR")} TL
                  </span>
                </TableCell>
                <TableCell className="text-center">{getStatusBadge(dealer.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Detay
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Düzenle
                      </DropdownMenuItem>
                      {dealer.status === "pending" && (
                        <>
                          <DropdownMenuItem className="text-green-500">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Onayla
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reddet
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Ban className="mr-2 h-4 w-4" />
                        Engelle
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
