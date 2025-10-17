/**
 * Type definitions for the agent system
 */

export interface AgentConfig {
  maxIterations: number
  temperature: number
  model: string
}

export interface AgentContext {
  query: string
  history: AgentStep[]
  sources: any[]
}

export interface AgentStep {
  thought: string
  action: string
  actionInput: any
  observation: string
  timestamp: Date
}

export interface AgentMetrics {
  totalSteps: number
  executionTime: number
  tokensUsed: number
  successRate: number
}
