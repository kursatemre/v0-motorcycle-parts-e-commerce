import Link from "next/link"
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CreditCard,
  Truck,
  Shield,
  Headphones,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border">
      {/* Features */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Ücretsiz Kargo</p>
                <p className="text-sm text-muted-foreground">500 TL üzeri siparişlerde</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Güvenli Alışveriş</p>
                <p className="text-sm text-muted-foreground">256-bit SSL güvenlik</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Esnek Ödeme</p>
                <p className="text-sm text-muted-foreground">Taksit seçenekleri</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">7/24 Destek</p>
                <p className="text-sm text-muted-foreground">Müşteri hizmetleri</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-foreground">
                Moto<span className="text-primary">Parça</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Türkiye'nin en kapsamlı motosiklet yedek parça platformu. Binlerce ürün, uygun fiyatlar ve hızlı teslimat.
            </p>
            <div className="space-y-3">
              <a
                href="tel:08501234567"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                0850 123 45 67
              </a>
              <a
                href="mailto:info@motoparca.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                info@motoparca.com
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Atatürk Mah. Motosiklet Cad. No:123 Kadıköy/İstanbul</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hızlı Erişim</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-muted-foreground hover:text-foreground transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/sss" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link href="/siparis-takip" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sipariş Takip
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Kategoriler</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/kategori/motor-parcalari"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Motor Parçaları
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/fren-sistemi"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Fren Sistemi
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/elektrik-aydinlatma"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Elektrik & Aydınlatma
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/filtreler"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Filtreler
                </Link>
              </li>
              <li>
                <Link
                  href="/kategori/aksesuar"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Aksesuar
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Bülten</h3>
            <p className="text-muted-foreground mb-4 text-sm">Kampanya ve yeni ürünlerden haberdar olun.</p>
            <div className="space-y-2">
              <Input type="email" placeholder="E-posta adresiniz" className="bg-background border-border" />
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Abone Ol</Button>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="p-2 bg-background rounded-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-background rounded-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-background rounded-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-background rounded-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 MotoParça. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/gizlilik" className="text-muted-foreground hover:text-foreground transition-colors">
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-kosullari"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Kullanım Koşulları
              </Link>
              <Link href="/iade-politikasi" className="text-muted-foreground hover:text-foreground transition-colors">
                İade Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
