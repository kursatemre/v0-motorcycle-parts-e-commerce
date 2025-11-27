import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { products } from "@/lib/mock-data"

export function LowStockAlert() {
  const lowStockProducts = products.filter((p) => p.stock < 10).slice(0, 5)

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <h2 className="font-semibold text-foreground">Düşük Stok Uyarısı</h2>
      </div>
      <div className="divide-y divide-border">
        {lowStockProducts.length === 0 ? (
          <p className="p-4 text-sm text-muted-foreground">Düşük stoklu ürün yok</p>
        ) : (
          lowStockProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
              </div>
              <div className={`text-sm font-bold ${product.stock < 5 ? "text-red-500" : "text-yellow-500"}`}>
                {product.stock} adet
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t border-border">
        <Link href="/admin/stok">
          <Button variant="outline" size="sm" className="w-full border-border bg-transparent">
            Stok Yönetimine Git
          </Button>
        </Link>
      </div>
    </div>
  )
}
