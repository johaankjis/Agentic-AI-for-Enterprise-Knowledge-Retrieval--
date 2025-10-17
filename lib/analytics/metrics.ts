/**
 * Metrics Collection and Tracking
 */

export interface QueryMetrics {
  queryId: string
  query: string
  timestamp: Date
  executionTime: number
  resultsCount: number
  success: boolean
  agentSteps: number
  tokensUsed: number
}

export interface SystemMetrics {
  totalQueries: number
  successfulQueries: number
  failedQueries: number
  avgResponseTime: number
  avgTokensUsed: number
  avgAgentSteps: number
  queriesPerHour: number
}

export class MetricsCollector {
  private queries: QueryMetrics[]
  private maxStoredQueries: number

  constructor(maxStoredQueries = 1000) {
    this.queries = []
    this.maxStoredQueries = maxStoredQueries
  }

  /**
   * Record a query execution
   */
  recordQuery(metrics: QueryMetrics) {
    this.queries.push(metrics)

    // Keep only the most recent queries
    if (this.queries.length > this.maxStoredQueries) {
      this.queries.shift()
    }
  }

  /**
   * Get system-wide metrics
   */
  getSystemMetrics(): SystemMetrics {
    if (this.queries.length === 0) {
      return {
        totalQueries: 0,
        successfulQueries: 0,
        failedQueries: 0,
        avgResponseTime: 0,
        avgTokensUsed: 0,
        avgAgentSteps: 0,
        queriesPerHour: 0,
      }
    }

    const successfulQueries = this.queries.filter((q) => q.success)
    const totalExecutionTime = this.queries.reduce((sum, q) => sum + q.executionTime, 0)
    const totalTokens = this.queries.reduce((sum, q) => sum + q.tokensUsed, 0)
    const totalSteps = this.queries.reduce((sum, q) => sum + q.agentSteps, 0)

    // Calculate queries per hour
    const oldestQuery = this.queries[0].timestamp
    const newestQuery = this.queries[this.queries.length - 1].timestamp
    const hoursDiff = (newestQuery.getTime() - oldestQuery.getTime()) / (1000 * 60 * 60)
    const queriesPerHour = hoursDiff > 0 ? this.queries.length / hoursDiff : 0

    return {
      totalQueries: this.queries.length,
      successfulQueries: successfulQueries.length,
      failedQueries: this.queries.length - successfulQueries.length,
      avgResponseTime: totalExecutionTime / this.queries.length,
      avgTokensUsed: totalTokens / this.queries.length,
      avgAgentSteps: totalSteps / this.queries.length,
      queriesPerHour,
    }
  }

  /**
   * Get recent queries
   */
  getRecentQueries(limit = 10): QueryMetrics[] {
    return this.queries.slice(-limit).reverse()
  }

  /**
   * Get queries within a time range
   */
  getQueriesByTimeRange(startDate: Date, endDate: Date): QueryMetrics[] {
    return this.queries.filter((q) => q.timestamp >= startDate && q.timestamp <= endDate)
  }

  /**
   * Get performance percentiles
   */
  getPerformancePercentiles(): { p50: number; p90: number; p95: number; p99: number } {
    const sortedTimes = this.queries.map((q) => q.executionTime).sort((a, b) => a - b)

    const getPercentile = (p: number) => {
      const index = Math.ceil((p / 100) * sortedTimes.length) - 1
      return sortedTimes[index] || 0
    }

    return {
      p50: getPercentile(50),
      p90: getPercentile(90),
      p95: getPercentile(95),
      p99: getPercentile(99),
    }
  }
}
