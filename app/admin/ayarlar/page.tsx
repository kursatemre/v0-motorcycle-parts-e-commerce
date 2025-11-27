"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Store, Mail, Truck, Bell, Shield, Globe } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Ayarlar</h1>
          <p className="text-muted-foreground">Site ve mağaza ayarlarını yönetin</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Değişiklikleri Kaydet
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none">
          <TabsTrigger value="general">Genel</TabsTrigger>
          <TabsTrigger value="shipping">Kargo</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Mağaza Bilgileri
              </CardTitle>
              <CardDescription>Temel mağaza bilgilerini düzenleyin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Mağaza Adı</Label>
                  <Input defaultValue="MotoParça" />
                </div>
                <div className="space-y-2">
                  <Label>E-posta</Label>
                  <Input type="email" defaultValue="info@motoparca.com" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Telefon</Label>
                  <Input defaultValue="0850 123 4567" />
                </div>
                <div className="space-y-2">
                  <Label>WhatsApp</Label>
                  <Input defaultValue="+90 532 000 0000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Adres</Label>
                <Textarea defaultValue="Sanayi Mahallesi, Motor Caddesi No: 123, Kadıköy / İstanbul" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                SEO Ayarları
              </CardTitle>
              <CardDescription>Arama motoru optimizasyonu ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Site Başlığı</Label>
                <Input defaultValue="MotoParça - Motosiklet Yedek Parça" />
              </div>
              <div className="space-y-2">
                <Label>Meta Açıklama</Label>
                <Textarea defaultValue="Türkiye'nin en geniş motosiklet yedek parça mağazası. Tüm markalar için orijinal ve muadil parçalar." />
              </div>
              <div className="space-y-2">
                <Label>Anahtar Kelimeler</Label>
                <Input defaultValue="motosiklet, yedek parça, fren balata, motor parça" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Güvenlik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>İki Faktörlü Doğrulama</Label>
                  <p className="text-sm text-muted-foreground">Admin girişlerinde ek güvenlik</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>SSL Zorunlu</Label>
                  <p className="text-sm text-muted-foreground">HTTPS kullanımını zorunlu kıl</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Kargo Ayarları
              </CardTitle>
              <CardDescription>Kargo firması ve ücret ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Varsayılan Kargo Firması</Label>
                <Select defaultValue="yurtici">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yurtici">Yurtiçi Kargo</SelectItem>
                    <SelectItem value="mng">MNG Kargo</SelectItem>
                    <SelectItem value="ptt">PTT Kargo</SelectItem>
                    <SelectItem value="aras">Aras Kargo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Standart Kargo Ücreti (TL)</Label>
                  <Input type="number" defaultValue="49.90" />
                </div>
                <div className="space-y-2">
                  <Label>Ücretsiz Kargo Limiti (TL)</Label>
                  <Input type="number" defaultValue="500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Kapıda Ödeme</Label>
                  <p className="text-sm text-muted-foreground">Kapıda ödeme seçeneğini aktifleştir</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Kapıda Ödeme Ek Ücreti (TL)</Label>
                <Input type="number" defaultValue="19.90" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Desi Hesaplama</CardTitle>
              <CardDescription>Kargo desi hesaplama parametreleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Desi Çarpanı</Label>
                  <Input type="number" defaultValue="3000" />
                </div>
                <div className="space-y-2">
                  <Label>Desi Başına Ücret (TL)</Label>
                  <Input type="number" defaultValue="5.00" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                E-posta Bildirimleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Yeni Sipariş</Label>
                  <p className="text-sm text-muted-foreground">Yeni sipariş geldiğinde bildirim al</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Düşük Stok Uyarısı</Label>
                  <p className="text-sm text-muted-foreground">Stok kritik seviyeye düştüğünde</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Yeni Üye Kaydı</Label>
                  <p className="text-sm text-muted-foreground">Yeni kullanıcı kaydolduğunda</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Bayi Başvurusu</Label>
                  <p className="text-sm text-muted-foreground">Yeni bayi başvurusu geldiğinde</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                SMS Bildirimleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sipariş Onayı</Label>
                  <p className="text-sm text-muted-foreground">Müşteriye sipariş onay SMS'i</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Kargo Bildirimi</Label>
                  <p className="text-sm text-muted-foreground">Kargo çıkışında müşteriye SMS</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nova Stok API</CardTitle>
              <CardDescription>Stok senkronizasyonu için API ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API URL</Label>
                <Input placeholder="https://api.novastok.com/v1" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Otomatik Senkronizasyon</Label>
                  <p className="text-sm text-muted-foreground">Stokları otomatik güncelle</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Senkronizasyon Sıklığı</Label>
                <Select defaultValue="1h">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15m">Her 15 dakika</SelectItem>
                    <SelectItem value="30m">Her 30 dakika</SelectItem>
                    <SelectItem value="1h">Her saat</SelectItem>
                    <SelectItem value="6h">Her 6 saat</SelectItem>
                    <SelectItem value="24h">Günde bir</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kargonomi API</CardTitle>
              <CardDescription>Kargo entegrasyonu ayarları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Gönderici Kodu</Label>
                <Input placeholder="ABC123" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pazaryeri Entegrasyonları</CardTitle>
              <CardDescription>Fiyat karşılaştırma siteleri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Çimri</Label>
                  <p className="text-sm text-muted-foreground">XML feed aktif</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Akakçe</Label>
                  <p className="text-sm text-muted-foreground">XML feed aktif</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Google Merchant</Label>
                  <p className="text-sm text-muted-foreground">Ürün feed'i aktif</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
