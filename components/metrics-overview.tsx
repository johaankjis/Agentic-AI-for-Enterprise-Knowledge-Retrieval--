"use client"

import { Card } from "@/components/ui/card"
import { Activity, Clock, Search, Zap } from "lucide-react"

const metrics = [
  {
    label: "Total Queries",
    value: "1,247",
    change: "+12.5%",
    icon: Search,
    color: "text-chart-1",
  },
  {
    label: "Avg Response Time",
    value: "1.2s",
    change: "-8.3%",
    icon: Clock,
    color: "text-chart-2",
  },
  {
    label: "Success Rate",
    value: "94.8%",
    change: "+2.1%",
    icon: Activity,
    color: "text-chart-3",
  },
  {
    label: "Active Agents",
    value: "3",
    change: "0%",
    icon: Zap,
    color: "text-chart-4",
  },
]

export function MetricsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.label} className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className={`text-xs ${metric.change.startsWith("+") ? "text-chart-3" : "text-chart-2"}`}>
                  {metric.change} from last week
                </p>
              </div>
              <div className={`rounded-lg bg-muted p-3 ${metric.color}`}>
                <Icon className="size-5" />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
