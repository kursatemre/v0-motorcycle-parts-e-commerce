"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, ShoppingCart, User, Menu, ChevronDown, Phone, Heart, LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { SearchDialog } from "@/components/search/search-dialog"
import { VehicleSelector } from "@/components/search/vehicle-selector"
import { useCart } from "@/lib/cart-context"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const defaultCategories = [
  { id: "1", name: "Motor Parçaları", slug: "motor-parcalari" },
  { id: "2", name: "Fren Sistemi", slug: "fren-sistemi" },
  { id: "3", name: "Elektrik & Aydınlatma", slug: "elektrik-aydinlatma" },
  { id: "4", name: "Süspansiyon", slug: "suspansiyon" },
  { id: "5", name: "Şanzıman & Debriyaj", slug: "sanziman-debriyaj" },
  { id: "6", name: "Kaporta & Plastik", slug: "kaporta-plastik" },
  { id: "7", name: "Lastik & Jant", slug: "lastik-jant" },
  { id: "8", name: "Yağ & Bakım", slug: "yag-bakim" },
]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [categories, setCategories] = useState(defaultCategories)
  const { cart } = useCart()
  const router = useRouter()

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setIsLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    // Fetch categories
    supabase
      .from("categories")
      .select("id, name, slug")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => {
        if (data && data.length > 0) setCategories(data)
      })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
    setIsLoggingOut(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Top bar */}
        <div className="bg-secondary border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center gap-4">
                <a
                  href="tel:08501234567"
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  <span>0850 123 45 67</span>
                </a>
                <span className="text-muted-foreground hidden sm:inline">|</span>
                <span className="text-muted-foreground hidden sm:inline">Ücretsiz Kargo: 500 TL ve Üzeri</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/b2b" className="text-muted-foreground hover:text-primary transition-colors">
                  B2B Bayi Girişi
                </Link>
                <Link href="/siparis-takip" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sipariş Takip
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-background">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      Ana Sayfa
                    </Link>
                    <div className="space-y-2">
                      <span className="text-sm font-medium text-muted-foreground">Kategoriler</span>
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/kategori/${category.slug}`}
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <Link href="/kampanyalar" className="text-lg font-semibold text-primary">
                      Kampanyalar
                    </Link>
                    <Link
                      href="/iletisim"
                      className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      İletişim
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-2xl lg:text-3xl font-bold text-foreground">
                    Moto<span className="text-primary">Parça</span>
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1 text-foreground">
                      Kategoriler
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-card border-border">
                    {categories.map((category) => (
                      <DropdownMenuItem key={category.id} asChild>
                        <Link href={`/kategori/${category.slug}`} className="cursor-pointer">
                          {category.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/markalar" className="text-foreground hover:text-primary transition-colors">
                  Markalar
                </Link>
                <Link href="/kampanyalar" className="text-primary font-medium">
                  Kampanyalar
                </Link>
                <Link href="/blog" className="text-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
                <Link href="/iletisim" className="text-foreground hover:text-primary transition-colors">
                  İletişim
                </Link>
              </nav>

              {/* Search, Vehicle Selector, User, Cart */}
              <div className="flex items-center gap-2">
                {/* Vehicle Selector - Desktop */}
                <div className="hidden xl:block">
                  <VehicleSelector />
                </div>

                {/* Search Button */}
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="relative">
                  <Search className="h-5 w-5" />
                </Button>

                {/* Favorites */}
                <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                  <Link href="/favorilerim">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>

                {/* User - Show different menu based on auth state */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <User className="h-5 w-5" />}
                      {user && <span className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full" />}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border w-48">
                    {user ? (
                      <>
                        <div className="px-2 py-1.5 text-sm">
                          <p className="font-medium text-foreground truncate">{user.email}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/hesabim">Hesabım</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/siparislerim">Siparişlerim</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/favorilerim">Favorilerim</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/adreslerim">Adreslerim</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="text-destructive focus:text-destructive"
                        >
                          {isLoggingOut ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <LogOut className="mr-2 h-4 w-4" />
                          )}
                          Çıkış Yap
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/giris">Giriş Yap</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/kayit">Kayıt Ol</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Cart */}
                <Link href="/sepet">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                        {cartItemCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  )
}
