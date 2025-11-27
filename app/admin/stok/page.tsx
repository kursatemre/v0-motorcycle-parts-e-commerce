"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Plus,
  Minus,
} from "lucide-react"
import { mockProducts } from "@/lib/mock-data"

export default function StockManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [stockFilter, setStockFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add")
  const [adjustmentQty, setAdjustmentQty] = useState("")

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock > 0 && product.stock <= 10) ||
      (stockFilter === "out" && product.stock === 0) ||
      (stockFilter === "ok" && product.stock > 10)
    return matchesSearch && matchesFilter
  })

  const totalStock = mockProducts.reduce((sum, p) => sum + p.stock, 0)
  const lowStockCount = mockProducts.filter((p) => p.stock > 0 && p.stock <= 10).length
  const outOfStockCount = mockProducts.filter((p) => p.stock === 0).length

  const stockMovements = [
    {
      id: "1",
      sku: "BRM-FD-320",
      product: "Brembo Ön Fren Diski",
      type: "in",
      qty: 50,
      date: "2024-01-15",
      note: "Tedarikçi siparişi",
    },
    {
      id: "2",
      sku: "NGK-IRD-01",
      product: "NGK Iridium Buji",
      type: "out",
      qty: 12,
      date: "2024-01-15",
      note: "Satış",
    },
    {
      id: "3",
      sku: "YMH-FILT-01",
      product: "Yamaha Hava Filtresi",
      type: "in",
      qty: 30,
      date: "2024-01-14",
      note: "Tedarikçi siparişi",
    },
    {
      id: "4",
      sku: "BRM-FD-320",
      product: "Brembo Ön Fren Diski",
      type: "out",
      qty: 5,
      date: "2024-01-14",
      note: "Satış",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Stok Yönetimi</h1>
          <p className="text-muted-foreground">Stok takibi ve envanter yönetimi</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Nova Stok Senkronize
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Toplam Stok</p>
              <p className="text-2xl font-bold">{totalStock.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-green-500/10 p-3">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stokta</p>
              <p className="text-2xl font-bold">{mockProducts.filter((p) => p.stock > 10).length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-yellow-500/10 p-3">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Düşük Stok</p>
              <p className="text-2xl font-bold">{lowStockCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-red-500/10 p-3">
              <TrendingDown className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tükenen</p>
              <p className="text-2xl font-bold">{outOfStockCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Stock Table */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Ürün adı veya SKU ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="ok">Stokta</SelectItem>
                <SelectItem value="low">Düşük Stok</SelectItem>
                <SelectItem value="out">Tükenen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Ürün</TableHead>
                  <TableHead className="text-center">Stok</TableHead>
                  <TableHead className="text-center">Min.</TableHead>
                  <TableHead className="text-right">İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    <TableCell>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.brand.name}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      {product.stock === 0 ? (
                        <Badge variant="destructive">0</Badge>
                      ) : product.stock <= 10 ? (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          {product.stock}
                        </Badge>
                      ) : (
                        <Badge variant="secondary">{product.stock}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center text-muted-foreground">10</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product.id)}>
                            Güncelle
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Stok Güncelle</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                              <p className="text-sm text-muted-foreground">Mevcut Stok: {product.stock}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant={adjustmentType === "add" ? "default" : "outline"}
                                className="flex-1"
                                onClick={() => setAdjustmentType("add")}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Ekle
                              </Button>
                              <Button
                                variant={adjustmentType === "remove" ? "default" : "outline"}
                                className="flex-1"
                                onClick={() => setAdjustmentType("remove")}
                              >
                                <Minus className="mr-2 h-4 w-4" />
                                Çıkar
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Label>Miktar</Label>
                              <Input
                                type="number"
                                value={adjustmentQty}
                                onChange={(e) => setAdjustmentQty(e.target.value)}
                                placeholder="0"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Not</Label>
                              <Textarea placeholder="İşlem notu..." />
                            </div>
                            <Button className="w-full">Güncelle</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recent Movements */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Son Stok Hareketleri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stockMovements.map((movement) => (
                <div
                  key={movement.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${movement.type === "in" ? "bg-green-500/10" : "bg-red-500/10"}`}>
                      {movement.type === "in" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{movement.product}</p>
                      <p className="text-xs text-muted-foreground">{movement.note}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${movement.type === "in" ? "text-green-500" : "text-red-500"}`}>
                      {movement.type === "in" ? "+" : "-"}
                      {movement.qty}
                    </p>
                    <p className="text-xs text-muted-foreground">{movement.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kritik Stok Uyarıları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockProducts
                .filter((p) => p.stock <= 10)
                .slice(0, 5)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                    <Badge
                      variant={product.stock === 0 ? "destructive" : "outline"}
                      className={product.stock > 0 ? "border-yellow-500 text-yellow-500" : ""}
                    >
                      {product.stock} adet
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
