/**
 * Dashboard Data Provider
 * Aggregates metrics for dashboard display
 */

import type { MetricsCollector, SystemMetrics } from "./metrics"

export interface DashboardMetrics {
  overview: {
    totalQueries: string
    avgResponseTime: string
    successRate: string
    activeAgents: string
  }
  trends: {
    queriesChange: string
    responseTimeChange: string
    successRateChange: string
  }
  performance: {
    p50: number
    p90: number
    p95: number
    p99: number
  }
}

export class DashboardDataProvider {
  private metricsCollector: MetricsCollector

  constructor(metricsCollector: MetricsCollector) {
    this.metricsCollector = metricsCollector
  }

  /**
   * Get formatted dashboard metrics
   */
  getDashboardMetrics(): DashboardMetrics {
    const systemMetrics = this.metricsCollector.getSystemMetrics()
    const percentiles = this.metricsCollector.getPerformancePercentiles()

    // Calculate trends (mock data for now)
    const trends = this.calculateTrends(systemMetrics)

    return {
      overview: {
        totalQueries: this.formatNumber(systemMetrics.totalQueries),
        avgResponseTime: `${(systemMetrics.avgResponseTime / 1000).toFixed(1)}s`,
        successRate: `${((systemMetrics.successfulQueries / systemMetrics.totalQueries) * 100).toFixed(1)}%`,
        activeAgents: "3",
      },
      trends,
      performance: percentiles,
    }
  }

  /**
   * Calculate trend percentages
   */
  private calculateTrends(current: SystemMetrics): {
    queriesChange: string
    responseTimeChange: string
    successRateChange: string
  } {
    // In production, compare with previous period
    // For now, return mock trends
    return {
      queriesChange: "+12.5%",
      responseTimeChange: "-8.3%",
      successRateChange: "+2.1%",
    }
  }

  /**
   * Format numbers for display
   */
  private formatNumber(num: number): string {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  /**
   * Get time series data for charts
   */
  getTimeSeriesData(hours = 24): Array<{ timestamp: Date; queries: number; avgResponseTime: number }> {
    const now = new Date()
    const startDate = new Date(now.getTime() - hours * 60 * 60 * 1000)

    const queries = this.metricsCollector.getQueriesByTimeRange(startDate, now)

    // Group by hour
    const hourlyData = new Map<number, { count: number; totalTime: number }>()

    for (const query of queries) {
      const hour = Math.floor(query.timestamp.getTime() / (60 * 60 * 1000))
      const existing = hourlyData.get(hour) || { count: 0, totalTime: 0 }
      hourlyData.set(hour, {
        count: existing.count + 1,
        totalTime: existing.totalTime + query.executionTime,
      })
    }

    // Convert to array
    return Array.from(hourlyData.entries()).map(([hour, data]) => ({
      timestamp: new Date(hour * 60 * 60 * 1000),
      queries: data.count,
      avgResponseTime: data.totalTime / data.count,
    }))
  }
}
