/**
 * RAG System Integration
 * Brings together all components into a unified system
 */

import { HybridSearch } from "./search/hybrid"
import { AgentOrchestrator } from "./agent/orchestrator"
import { MetricsCollector } from "./analytics/metrics"
import { QueryLogger } from "./analytics/logger"

export class RAGSystem {
  private hybridSearch: HybridSearch
  private orchestrator: AgentOrchestrator
  private metricsCollector: MetricsCollector
  private logger: QueryLogger

  constructor() {
    this.hybridSearch = new HybridSearch()
    this.orchestrator = new AgentOrchestrator()
    this.metricsCollector = new MetricsCollector()
    this.logger = new QueryLogger()
  }

  /**
   * Initialize the system with documents
   */
  async initialize(documents: any[]) {
    await this.hybridSearch.initialize(documents)
    this.logger.info("RAG system initialized", { documentCount: documents.length })
  }

  /**
   * Process a query through the complete RAG pipeline
   */
  async query(query: string) {
    const startTime = Date.now()
    const queryId = crypto.randomUUID()

    try {
      this.logger.info("Processing query", { queryId, query })

      // Execute query through agent orchestrator
      const result = await this.orchestrator.routeQuery(query)

      const executionTime = Date.now() - startTime

      // Record metrics
      this.metricsCollector.recordQuery({
        queryId,
        query,
        timestamp: new Date(),
        executionTime,
        resultsCount: result.sources.length,
        success: true,
        agentSteps: result.steps.length,
        tokensUsed: 0, // Would be populated by LLM
      })

      return result
    } catch (error) {
      this.logger.error("Query failed", {
        queryId,
        error: error instanceof Error ? error.message : "Unknown error",
      })
      throw error
    }
  }

  /**
   * Get system metrics
   */
  getMetrics() {
    return this.metricsCollector.getSystemMetrics()
  }

  /**
   * Get recent queries
   */
  getRecentQueries(limit = 10) {
    return this.metricsCollector.getRecentQueries(limit)
  }
}
