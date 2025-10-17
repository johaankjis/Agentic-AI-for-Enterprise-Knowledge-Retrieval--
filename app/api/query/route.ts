import { NextResponse } from "next/server"
import { AgentOrchestrator } from "@/lib/agent/orchestrator"
import { MetricsCollector } from "@/lib/analytics/metrics"
import { QueryLogger } from "@/lib/analytics/logger"

// Initialize singletons
const orchestrator = new AgentOrchestrator()
const metricsCollector = new MetricsCollector()
const logger = new QueryLogger()

export async function POST(request: Request) {
  const startTime = Date.now()
  const queryId = crypto.randomUUID()

  try {
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 })
    }

    logger.info("Processing query", { queryId, query })

    // Execute the query using the agent orchestrator
    const result = await orchestrator.routeQuery(query)

    const executionTime = Date.now() - startTime

    // Record metrics
    metricsCollector.recordQuery({
      queryId,
      query,
      timestamp: new Date(),
      executionTime,
      resultsCount: result.sources.length,
      success: true,
      agentSteps: result.steps.length,
      tokensUsed: Math.floor(Math.random() * 1000) + 500, // Mock token count
    })

    logger.info("Query completed successfully", {
      queryId,
      executionTime,
      resultsCount: result.sources.length,
    })

    return NextResponse.json({
      queryId,
      answer: result.answer,
      sources: result.sources,
      reasoning: result.steps.map((step) => step.thought),
      executionTime,
    })
  } catch (error) {
    const executionTime = Date.now() - startTime

    logger.error("Query failed", {
      queryId,
      error: error instanceof Error ? error.message : "Unknown error",
    })

    // Record failed query
    metricsCollector.recordQuery({
      queryId,
      query: "",
      timestamp: new Date(),
      executionTime,
      resultsCount: 0,
      success: false,
      agentSteps: 0,
      tokensUsed: 0,
    })

    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}
