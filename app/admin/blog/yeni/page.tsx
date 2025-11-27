"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Eye, ImageIcon } from "lucide-react"
import Link from "next/link"

export default function NewBlogPostPage() {
  const [featuredImage, setFeaturedImage] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Yeni Blog Yazısı</h1>
            <p className="text-muted-foreground">İçerik oluştur ve yayınla</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Önizle
          </Button>
          <Button variant="outline">Taslak Kaydet</Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Yayınla
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>İçerik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Başlık *</Label>
                <Input placeholder="Yazı başlığı..." />
              </div>
              <div className="space-y-2">
                <Label>URL (Slug)</Label>
                <Input placeholder="yazi-basligi" />
              </div>
              <div className="space-y-2">
                <Label>Özet</Label>
                <Textarea placeholder="Yazının kısa özeti..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>İçerik *</Label>
                <Textarea placeholder="Yazı içeriği..." rows={15} className="font-mono" />
                <p className="text-sm text-muted-foreground">Markdown formatı desteklenmektedir.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Meta Başlık</Label>
                <Input placeholder="SEO başlığı" />
              </div>
              <div className="space-y-2">
                <Label>Meta Açıklama</Label>
                <Textarea placeholder="SEO açıklaması" rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Anahtar Kelimeler</Label>
                <Input placeholder="motosiklet, bakım, yedek parça (virgülle ayırın)" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Öne Çıkan Görsel</CardTitle>
            </CardHeader>
            <CardContent>
              {featuredImage ? (
                <div className="relative aspect-video rounded-lg border bg-muted">
                  <img
                    src={featuredImage || "/placeholder.svg"}
                    alt="Featured"
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() => setFeaturedImage(null)}
                  >
                    Kaldır
                  </Button>
                </div>
              ) : (
                <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:border-primary hover:bg-muted">
                  <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Görsel yükle</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFeaturedImage(URL.createObjectURL(file))
                      }
                    }}
                  />
                </label>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Yayın Ayarları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bakim">Bakım</SelectItem>
                    <SelectItem value="inceleme">İnceleme</SelectItem>
                    <SelectItem value="rehber">Rehber</SelectItem>
                    <SelectItem value="haber">Haber</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Yayın Tarihi</Label>
                <Input type="datetime-local" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Yorumlara İzin Ver</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label>Öne Çıkan Yazı</Label>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Etiketler</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Etiket ekle (Enter ile)" />
              <p className="mt-2 text-sm text-muted-foreground">Yazıyla ilgili etiketler ekleyin</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
