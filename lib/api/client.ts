/**
 * API Client for frontend components
 */

export interface QueryRequest {
  query: string
}

export interface QueryResponse {
  queryId: string
  answer: string
  sources: Array<{
    id: string
    title: string
    snippet: string
    score: number
  }>
  reasoning: string[]
  executionTime: number
}

export interface MetricsResponse {
  metrics: {
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
  recentQueries: Array<{
    id: string
    query: string
    timestamp: string
    executionTime: number
    success: boolean
  }>
  timeSeriesData: Array<{
    timestamp: string
    queries: number
    avgResponseTime: number
  }>
}

export class APIClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  /**
   * Submit a query
   */
  async query(request: QueryRequest): Promise<QueryResponse> {
    const response = await fetch(`${this.baseUrl}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new Error(`Query failed: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get metrics
   */
  async getMetrics(): Promise<MetricsResponse> {
    const response = await fetch(`${this.baseUrl}/metrics`)

    if (!response.ok) {
      throw new Error(`Failed to fetch metrics: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Check health
   */
  async checkHealth(): Promise<{ status: string; timestamp: string; agents: any; version: string }> {
    const response = await fetch(`${this.baseUrl}/health`)

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`)
    }

    return response.json()
  }
}
