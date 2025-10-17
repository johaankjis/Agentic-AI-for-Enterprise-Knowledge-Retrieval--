import { NextResponse } from "next/server"
import { MetricsCollector } from "@/lib/analytics/metrics"
import { DashboardDataProvider } from "@/lib/analytics/dashboard-data"

// Shared metrics collector instance
const metricsCollector = new MetricsCollector()
const dashboardProvider = new DashboardDataProvider(metricsCollector)

export async function GET() {
  try {
    const metrics = dashboardProvider.getDashboardMetrics()
    const recentQueries = metricsCollector.getRecentQueries(10)
    const timeSeriesData = dashboardProvider.getTimeSeriesData(24)

    return NextResponse.json({
      metrics,
      recentQueries: recentQueries.map((q) => ({
        id: q.queryId,
        query: q.query,
        timestamp: q.timestamp.toISOString(),
        executionTime: q.executionTime,
        success: q.success,
      })),
      timeSeriesData: timeSeriesData.map((d) => ({
        timestamp: d.timestamp.toISOString(),
        queries: d.queries,
        avgResponseTime: d.avgResponseTime,
      })),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 })
  }
}
