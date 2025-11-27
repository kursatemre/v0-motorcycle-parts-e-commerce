"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function ConfirmContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const confirmEmail = async () => {
      const token_hash = searchParams.get("token_hash")
      const type = searchParams.get("type")

      if (!token_hash || type !== "email") {
        setStatus("error")
        setMessage("Geçersiz onaylama linki")
        return
      }

      const supabase = createClient()

      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: "email",
        })

        if (error) throw error

        setStatus("success")
        setMessage("E-posta adresiniz başarıyla onaylandı!")

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/giris")
        }, 3000)
      } catch (error) {
        setStatus("error")
        setMessage("E-posta onaylanırken bir hata oluştu")
        console.error("Email confirmation error:", error)
      }
    }

    confirmEmail()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 text-center">
        {status === "loading" && (
          <>
            <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-foreground mb-2">E-posta Onaylanıyor...</h1>
            <p className="text-muted-foreground">Lütfen bekleyin</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Başarılı!</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <p className="text-sm text-muted-foreground">Giriş sayfasına yönlendiriliyorsunuz...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Bir Hata Oluştu</h1>
            <p className="text-muted-foreground mb-6">{message}</p>
            <Link href="/giris">
              <Button className="w-full">Giriş Sayfasına Dön</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md w-full bg-card border border-border rounded-xl p-8 text-center">
            <Loader2 className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Yükleniyor...</h1>
          </div>
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  )
}
