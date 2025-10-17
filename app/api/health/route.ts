import { NextResponse } from "next/server"
import { AgentOrchestrator } from "@/lib/agent/orchestrator"

const orchestrator = new AgentOrchestrator()

export async function GET() {
  try {
    const stats = orchestrator.getAgentStats()

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      agents: stats,
      version: "1.0.0",
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
