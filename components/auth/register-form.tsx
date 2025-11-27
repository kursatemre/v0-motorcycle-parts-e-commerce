"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.passwordConfirm) {
      setError("Şifreler eşleşmiyor")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır")
      setIsLoading(false)
      return
    }

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/hesabim`,
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          },
        },
      })

      if (error) throw error

      router.push("/kayit-basarili")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Kayıt olurken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Kayıt Ol</h1>
        <p className="text-muted-foreground mt-2">Yeni hesap oluşturun</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Ad</label>
            <div className="relative">
              <Input
                type="text"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                placeholder="Ad"
                className="pl-10 bg-secondary border-border"
                required
                disabled={isLoading}
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Soyad</label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              placeholder="Soyad"
              className="bg-secondary border-border"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">E-posta</label>
          <div className="relative">
            <Input
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="ornek@email.com"
              className="pl-10 bg-secondary border-border"
              required
              disabled={isLoading}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Telefon</label>
          <div className="relative">
            <Input
              type="tel"
              value={formData.phone}
              onChange={handleChange("phone")}
              placeholder="0555 555 55 55"
              className="pl-10 bg-secondary border-border"
              disabled={isLoading}
            />
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Şifre</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange("password")}
              placeholder="••••••••"
              className="pl-10 pr-10 bg-secondary border-border"
              required
              disabled={isLoading}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Şifre Tekrar</label>
          <div className="relative">
            <Input
              type="password"
              value={formData.passwordConfirm}
              onChange={handleChange("passwordConfirm")}
              placeholder="••••••••"
              className="pl-10 bg-secondary border-border"
              required
              disabled={isLoading}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              <Link href="/kullanim-kosullari" className="text-primary hover:underline">
                Kullanım Koşulları
              </Link>
              &apos;nı ve{" "}
              <Link href="/gizlilik" className="text-primary hover:underline">
                Gizlilik Politikası
              </Link>
              &apos;nı okudum, kabul ediyorum.
            </label>
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="marketing"
              checked={acceptMarketing}
              onCheckedChange={(checked) => setAcceptMarketing(checked as boolean)}
              className="mt-0.5"
            />
            <label htmlFor="marketing" className="text-sm text-muted-foreground cursor-pointer">
              Kampanya ve fırsatlardan haberdar olmak istiyorum.
            </label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
          disabled={!acceptTerms || isLoading}
        >
          {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Zaten hesabınız var mı?{" "}
          <Link href="/giris" className="text-primary hover:underline font-medium">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  )
}
