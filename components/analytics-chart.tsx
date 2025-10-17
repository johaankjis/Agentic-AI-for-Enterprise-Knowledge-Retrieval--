"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsChartProps {
  data: Array<{ timestamp: Date; queries: number; avgResponseTime: number }>
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  const chartData = data.map((item) => ({
    time: item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    queries: item.queries,
    responseTime: (item.avgResponseTime / 1000).toFixed(2),
  }))

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Query Volume & Response Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="time" className="text-xs" />
            <YAxis yAxisId="left" className="text-xs" />
            <YAxis yAxisId="right" orientation="right" className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Line yAxisId="left" type="monotone" dataKey="queries" stroke="hsl(var(--chart-1))" strokeWidth={2} />
            <Line yAxisId="right" type="monotone" dataKey="responseTime" stroke="hsl(var(--chart-2))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
