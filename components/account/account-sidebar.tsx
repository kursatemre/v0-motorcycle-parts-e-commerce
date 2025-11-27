"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { User, Package, Heart, MapPin, CreditCard, Settings, LogOut, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

const menuItems = [
  { href: "/hesabim", label: "Hesap Özeti", icon: User },
  { href: "/siparislerim", label: "Siparişlerim", icon: Package },
  { href: "/favorilerim", label: "Favorilerim", icon: Heart },
  { href: "/adreslerim", label: "Adreslerim", icon: MapPin },
  { href: "/odeme-yontemlerim", label: "Ödeme Yöntemlerim", icon: CreditCard },
  { href: "/hesap-ayarlari", label: "Hesap Ayarları", icon: Settings },
]

export function AccountSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()

    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="bg-card border border-border rounded-lg p-4">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full transition-colors disabled:opacity-50"
        >
          {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
          {isLoggingOut ? "Çıkış yapılıyor..." : "Çıkış Yap"}
        </button>
      </div>
    </nav>
  )
}
