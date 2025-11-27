"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Tag,
  Truck,
  BarChart3,
  Settings,
  FileText,
  Percent,
  Building2,
  MessageSquare,
  ImageIcon,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const menuItems = [
  {
    title: "Ana Menü",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/siparisler", label: "Siparişler", icon: ShoppingCart, badge: 5 },
    ],
  },
  {
    title: "Ürün Yönetimi",
    items: [
      { href: "/admin/urunler", label: "Ürünler", icon: Package },
      { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderTree },
      { href: "/admin/markalar", label: "Markalar", icon: Tag },
      { href: "/admin/stok", label: "Stok Yönetimi", icon: BarChart3 },
    ],
  },
  {
    title: "Müşteriler",
    items: [
      { href: "/admin/musteriler", label: "Müşteriler", icon: Users },
      { href: "/admin/b2b", label: "B2B Bayiler", icon: Building2 },
    ],
  },
  {
    title: "Pazarlama",
    items: [
      { href: "/admin/kampanyalar", label: "Kampanyalar", icon: Percent },
      { href: "/admin/kuponlar", label: "Kuponlar", icon: Tag },
    ],
  },
  {
    title: "İçerik",
    items: [
      { href: "/admin/blog", label: "Blog", icon: FileText },
      { href: "/admin/gorseller", label: "Görseller", icon: ImageIcon },
      { href: "/admin/yorumlar", label: "Yorumlar", icon: MessageSquare },
    ],
  },
  {
    title: "Entegrasyonlar",
    items: [
      { href: "/admin/kargo", label: "Kargo", icon: Truck },
      { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-sidebar-border">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-xl font-bold text-sidebar-foreground">
                Moto<span className="text-sidebar-primary">Parça</span>
              </span>
              <span className="text-xs bg-sidebar-primary text-sidebar-primary-foreground px-2 py-0.5 rounded">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {menuItems.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-2 px-3">
                  {section.title}
                </p>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon
                    const isActive =
                      pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent",
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <Link
              href="/"
              className="text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
            >
              ← Siteye Dön
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
