"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { createClient } from "@/lib/supabase/client"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push("/hesabim")
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Giriş yapılırken bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Giriş Yap</h1>
        <p className="text-muted-foreground mt-2">Hesabınıza giriş yapın</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">E-posta</label>
          <div className="relative">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              className="pl-10 bg-secondary border-border"
              required
              disabled={isLoading}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Şifre</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
              Beni hatırla
            </label>
          </div>
          <Link href="/sifremi-unuttum" className="text-sm text-primary hover:underline">
            Şifremi Unuttum
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11"
          disabled={isLoading}
        >
          {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Hesabınız yok mu?{" "}
          <Link href="/kayit" className="text-primary hover:underline font-medium">
            Kayıt Ol
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-card text-muted-foreground">veya</span>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <Link href="/b2b/giris">
            <Button variant="outline" className="w-full border-border bg-transparent">
              B2B Bayi Girişi
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
