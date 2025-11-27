"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent } from "@/components/ui/card"
import {
  Search,
  Download,
  MoreHorizontal,
  Eye,
  Mail,
  Ban,
  Users,
  UserCheck,
  ShoppingBag,
  TrendingUp,
} from "lucide-react"

const mockCustomers = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "0532 123 4567",
    type: "retail",
    orders: 12,
    totalSpent: 15600,
    lastOrder: "2024-01-10",
    status: "active",
  },
  {
    id: "2",
    name: "Mehmet Motor Ltd.",
    email: "info@mehmetmotor.com",
    phone: "0212 456 7890",
    type: "dealer",
    orders: 45,
    totalSpent: 125000,
    lastOrder: "2024-01-15",
    status: "active",
  },
  {
    id: "3",
    name: "Ayşe Kaya",
    email: "ayse@example.com",
    phone: "0544 987 6543",
    type: "retail",
    orders: 3,
    totalSpent: 2400,
    lastOrder: "2024-01-05",
    status: "active",
  },
  {
    id: "4",
    name: "Motor Parts A.Ş.",
    email: "satis@motorparts.com",
    phone: "0216 333 4444",
    type: "dealer",
    orders: 78,
    totalSpent: 340000,
    lastOrder: "2024-01-14",
    status: "active",
  },
  {
    id: "5",
    name: "Can Demir",
    email: "can@example.com",
    phone: "0555 111 2222",
    type: "retail",
    orders: 0,
    totalSpent: 0,
    lastOrder: null,
    status: "inactive",
  },
]

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = typeFilter === "all" || customer.type === typeFilter
    return matchesSearch && matchesType
  })

  const totalCustomers = mockCustomers.length
  const dealerCount = mockCustomers.filter((c) => c.type === "dealer").length
  const activeCount = mockCustomers.filter((c) => c.status === "active").length
  const totalRevenue = mockCustomers.reduce((sum, c) => sum + c.totalSpent, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Müşteriler</h1>
          <p className="text-muted-foreground">Müşteri yönetimi ve iletişim</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Dışa Aktar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Müşteri</p>
              <p className="text-2xl font-bold">{totalCustomers}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-blue-500/10 p-3">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bayiler</p>
              <p className="text-2xl font-bold">{dealerCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktif</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-yellow-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-yellow-500" />
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
            placeholder="İsim veya e-posta ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Müşteri Tipi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="retail">Bireysel</SelectItem>
            <SelectItem value="dealer">Bayi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Müşteri</TableHead>
              <TableHead>İletişim</TableHead>
              <TableHead className="text-center">Tip</TableHead>
              <TableHead className="text-center">Sipariş</TableHead>
              <TableHead className="text-right">Toplam Harcama</TableHead>
              <TableHead>Son Sipariş</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">#{customer.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{customer.email}</p>
                  <p className="text-sm text-muted-foreground">{customer.phone}</p>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant={customer.type === "dealer" ? "default" : "secondary"}>
                    {customer.type === "dealer" ? "Bayi" : "Bireysel"}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{customer.orders}</TableCell>
                <TableCell className="text-right font-semibold">
                  {customer.totalSpent.toLocaleString("tr-TR")} TL
                </TableCell>
                <TableCell>{customer.lastOrder || <span className="text-muted-foreground">-</span>}</TableCell>
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
                        <Mail className="mr-2 h-4 w-4" />
                        E-posta Gönder
                      </DropdownMenuItem>
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
