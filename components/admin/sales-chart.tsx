"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

const data = [
  { name: "Pzt", sales: 4500 },
  { name: "Sal", sales: 3800 },
  { name: "Çar", sales: 5200 },
  { name: "Per", sales: 4100 },
  { name: "Cum", sales: 6300 },
  { name: "Cmt", sales: 7800 },
  { name: "Paz", sales: 5600 },
]

export function SalesChart() {
  const [period, setPeriod] = useState("week")

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground">Satış Grafiği</h2>
        <div className="flex gap-1">
          <Button variant={period === "week" ? "secondary" : "ghost"} size="sm" onClick={() => setPeriod("week")}>
            Hafta
          </Button>
          <Button variant={period === "month" ? "secondary" : "ghost"} size="sm" onClick={() => setPeriod("month")}>
            Ay
          </Button>
          <Button variant={period === "year" ? "secondary" : "ghost"} size="sm" onClick={() => setPeriod("year")}>
            Yıl
          </Button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [`₺${value.toLocaleString("tr-TR")}`, "Satış"]}
            />
            <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
