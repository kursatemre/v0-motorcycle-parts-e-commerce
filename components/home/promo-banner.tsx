import { Button } from "@/components/ui/button"
import { ArrowRight, Percent, Clock } from "lucide-react"

export function PromoBanner() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Discount Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6 lg:p-8">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Percent className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Haftalık Kampanya</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Fren Sistemlerinde %20 İndirim</h3>
              <p className="text-muted-foreground mb-4">Tüm fren balatası ve disklerinde geçerli.</p>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Kampanyayı Gör
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Percent className="h-48 w-48 text-primary" />
            </div>
          </div>

          {/* Flash Sale Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-6 lg:p-8">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Sınırlı Süre</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Flash Sale: Filtreler</h3>
              <p className="text-muted-foreground mb-4">Hava ve yağ filtrelerinde kaçırılmayacak fiyatlar.</p>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Hemen Al
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-10">
              <Clock className="h-48 w-48 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
