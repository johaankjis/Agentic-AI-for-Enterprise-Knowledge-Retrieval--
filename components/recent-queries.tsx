"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const recentQueries = [
  {
    id: "1",
    query: "How do I configure the authentication system?",
    timestamp: "2 minutes ago",
    status: "success",
  },
  {
    id: "2",
    query: "What are the deployment best practices?",
    timestamp: "15 minutes ago",
    status: "success",
  },
  {
    id: "3",
    query: "How to optimize database queries?",
    timestamp: "1 hour ago",
    status: "success",
  },
  {
    id: "4",
    query: "API rate limiting configuration",
    timestamp: "2 hours ago",
    status: "success",
  },
]

export function RecentQueries() {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Queries</h3>
        <div className="space-y-3">
          {recentQueries.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium leading-relaxed">{item.query}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="size-3" />
                  <span>{item.timestamp}</span>
                </div>
              </div>
              <Badge variant={item.status === "success" ? "default" : "secondary"}>{item.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
