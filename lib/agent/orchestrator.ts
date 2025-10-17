/**
 * Agent Orchestrator
 * Manages multiple agents and coordinates their execution
 */

import { ReActAgent } from "./react-agent"
import { searchTool, synthesisTool, rerankTool } from "./tools"
import type { AgentResult } from "./react-agent"

export class AgentOrchestrator {
  private agents: Map<string, ReActAgent>

  constructor() {
    this.agents = new Map()
    this.initializeAgents()
  }

  /**
   * Initialize the available agents
   */
  private initializeAgents() {
    // Create a general-purpose agent
    const generalAgent = new ReActAgent(5)
    generalAgent.registerTool("search", searchTool)
    generalAgent.registerTool("synthesize", synthesisTool)
    generalAgent.registerTool("rerank", rerankTool)

    this.agents.set("general", generalAgent)

    // Could add specialized agents here
    // e.g., technical agent, business agent, etc.
  }

  /**
   * Route a query to the appropriate agent
   */
  async routeQuery(query: string): Promise<AgentResult> {
    // Simple routing logic - use general agent for all queries
    // In a real system, this would analyze the query and route to specialized agents
    const agent = this.agents.get("general")
    if (!agent) {
      throw new Error("No agent available")
    }

    return await agent.execute(query)
  }

  /**
   * Get agent statistics
   */
  getAgentStats() {
    return {
      totalAgents: this.agents.size,
      activeAgents: Array.from(this.agents.keys()),
    }
  }
}
