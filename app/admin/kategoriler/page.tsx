"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Plus, MoreHorizontal, Pencil, Trash2, GripVertical, FolderTree, Upload } from "lucide-react"
import Image from "next/image"
import { categories } from "@/lib/mock-data"

export default function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Kategori Yönetimi</h1>
          <p className="text-muted-foreground">Ürün kategorilerini düzenleyin</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Kategori
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yeni Kategori Ekle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Kategori Adı *</Label>
                <Input placeholder="Örn: Fren Sistemleri" />
              </div>
              <div className="space-y-2">
                <Label>URL (Slug)</Label>
                <Input placeholder="fren-sistemleri" />
              </div>
              <div className="space-y-2">
                <Label>Üst Kategori</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Ana kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Ana Kategori</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Açıklama</Label>
                <Textarea placeholder="Kategori açıklaması..." />
              </div>
              <div className="space-y-2">
                <Label>Görsel</Label>
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-lg border-2 border-dashed">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="sm">
                    Görsel Yükle
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Aktif</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Menüde Göster</Label>
                <Switch defaultChecked />
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Kaydet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderTree className="h-5 w-5" />
                Kategoriler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead className="w-16">Görsel</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead className="text-center">Ürün Sayısı</TableHead>
                    <TableHead className="text-center">Sıra</TableHead>
                    <TableHead className="text-center">Durum</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg border bg-muted">
                          <Image
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">/{category.slug}</p>
                      </TableCell>
                      <TableCell className="text-center">{category.productCount}</TableCell>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">
                        <Switch defaultChecked />
                      </TableCell>
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
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">İstatistikler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Toplam Kategori</span>
                <span className="font-semibold">{categories.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Aktif Kategori</span>
                <span className="font-semibold">{categories.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Alt Kategori</span>
                <span className="font-semibold">24</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SEO İpuçları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Her kategoriye benzersiz bir açıklama ekleyin</p>
              <p>• Kategori adlarını SEO dostu tutun</p>
              <p>• Görselleri optimize edin</p>
              <p>• Alt kategorileri mantıklı gruplandırın</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
