"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle, Percent, Truck, CreditCard } from "lucide-react"

export default function DealerApplicationPage() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16">
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className="mb-4 rounded-full bg-green-500/10 p-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Başvurunuz Alındı!</h2>
            <p className="mb-6 text-muted-foreground">
              Bayi başvurunuz başarıyla alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <Button asChild>
              <a href="/">Ana Sayfaya Dön</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Bayi Başvurusu</h1>
        <p className="mt-2 text-muted-foreground">MotoParça ailesine katılın, özel avantajlardan yararlanın</p>
      </div>

      {/* Benefits */}
      <div className="mb-8 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Percent className="mb-2 h-8 w-8 text-primary" />
            <p className="font-semibold">%20'ye varan indirim</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <CreditCard className="mb-2 h-8 w-8 text-primary" />
            <p className="font-semibold">Vadeli ödeme imkanı</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Truck className="mb-2 h-8 w-8 text-primary" />
            <p className="font-semibold">Ücretsiz kargo</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <Building2 className="mb-2 h-8 w-8 text-primary" />
            <p className="font-semibold">Özel temsilci</p>
          </CardContent>
        </Card>
      </div>

      {/* Application Form */}
      <Card>
        <CardHeader>
          <CardTitle>Başvuru Formu</CardTitle>
          <CardDescription>
            Tüm alanları eksiksiz doldurun. Başvurunuz 1-3 iş günü içinde değerlendirilecektir.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-semibold">Firma Bilgileri</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Firma Adı *</Label>
                  <Input placeholder="Firma adı" required />
                </div>
                <div className="space-y-2">
                  <Label>Vergi Dairesi *</Label>
                  <Input placeholder="Vergi dairesi" required />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Vergi Numarası *</Label>
                  <Input placeholder="1234567890" required />
                </div>
                <div className="space-y-2">
                  <Label>Faaliyet Alanı *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Perakende Satış</SelectItem>
                      <SelectItem value="wholesale">Toptan Satış</SelectItem>
                      <SelectItem value="service">Servis/Tamir</SelectItem>
                      <SelectItem value="both">Satış + Servis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Yetkili Kişi Bilgileri</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ad Soyad *</Label>
                  <Input placeholder="Ad Soyad" required />
                </div>
                <div className="space-y-2">
                  <Label>Ünvan</Label>
                  <Input placeholder="Örn: Satış Müdürü" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>E-posta *</Label>
                  <Input type="email" placeholder="info@firma.com" required />
                </div>
                <div className="space-y-2">
                  <Label>Telefon *</Label>
                  <Input placeholder="0532 000 0000" required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Adres Bilgileri</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>İl *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="İl seçin" />
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
                  <Label>İlçe *</Label>
                  <Input placeholder="İlçe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Açık Adres *</Label>
                <Textarea placeholder="Açık adres..." required />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Ek Bilgiler</h3>
              <div className="space-y-2">
                <Label>Referanslar / Notlar</Label>
                <Textarea placeholder="Varsa referanslarınız veya eklemek istediğiniz notlar..." />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm">
                  <a href="/kvkk" className="text-primary hover:underline">
                    KVKK Aydınlatma Metni
                  </a>
                  'ni okudum, kabul ediyorum. *
                </label>
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="marketing" />
                <label htmlFor="marketing" className="text-sm">
                  Kampanya ve fırsatlardan haberdar olmak istiyorum.
                </label>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Başvuruyu Gönder
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
