"use client"

import { Bell, Search, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search */}
        <div className="flex-1 max-w-md ml-12 lg:ml-0">
          <div className="relative">
            <Input type="search" placeholder="Ara..." className="pl-10 bg-secondary border-border" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card border-border">
              <div className="p-3 border-b border-border">
                <h3 className="font-semibold">Bildirimler</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <p className="text-sm font-medium">Yeni sipariş geldi</p>
                  <p className="text-xs text-muted-foreground">Sipariş #SP-2024-156 - 2 dk önce</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <p className="text-sm font-medium">Stok uyarısı</p>
                  <p className="text-xs text-muted-foreground">Honda CBR Balata - Son 3 adet</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                  <p className="text-sm font-medium">Yeni yorum</p>
                  <p className="text-xs text-muted-foreground">Ürün yorumu onay bekliyor</p>
                </DropdownMenuItem>
              </div>
              <div className="p-2 border-t border-border">
                <Button variant="ghost" size="sm" className="w-full text-primary">
                  Tüm Bildirimleri Gör
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="hidden md:inline text-sm">Admin</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Ayarlar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Çıkış Yap</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
