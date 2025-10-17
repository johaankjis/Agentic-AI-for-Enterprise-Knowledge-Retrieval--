import { QueryInterface } from "@/components/query-interface"
import { MetricsOverview } from "@/components/metrics-overview"
import { RecentQueries } from "@/components/recent-queries"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance">Enterprise Knowledge Retrieval</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-3xl">
              AI-powered agent system with hybrid search, ReAct reasoning, and optimized LLM inference for enterprise
              documentation.
            </p>
          </div>

          {/* Metrics Overview */}
          <MetricsOverview />

          {/* Query Interface */}
          <QueryInterface />

          {/* Recent Queries */}
          <RecentQueries />
        </div>
      </main>
    </div>
  )
}
