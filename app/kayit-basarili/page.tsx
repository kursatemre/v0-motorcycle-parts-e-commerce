import Link from "next/link"
import { CheckCircle, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegisterSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Kayıt Başarılı!</h1>
          <p className="text-muted-foreground mb-6">
            Hesabınız başarıyla oluşturuldu. E-posta adresinize bir doğrulama bağlantısı gönderdik.
          </p>

          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground text-left">
                Lütfen e-posta kutunuzu kontrol edin ve hesabınızı doğrulamak için gönderdiğimiz bağlantıya tıklayın.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/giris">Giriş Sayfasına Git</Link>
            </Button>
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
