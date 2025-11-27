import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MotoParça - Motosiklet Yedek Parça",
  description:
    "Türkiye'nin en kapsamlı motosiklet yedek parça e-ticaret platformu. Binlerce ürün, uygun fiyatlar ve hızlı kargo.",
  keywords: "motosiklet, yedek parça, motor parçası, motosiklet aksesuarları",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={`font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
