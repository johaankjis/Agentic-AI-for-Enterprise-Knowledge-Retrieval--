"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Search, Loader2 } from "lucide-react"
import { QueryResults } from "./query-results"
import { APIClient } from "@/lib/api/client"

const apiClient = new APIClient()

export function QueryInterface() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.query({ query })

      setResults({
        answer: response.answer,
        sources: response.sources.map((source) => ({
          id: source.id,
          title: source.title,
          snippet: source.snippet || "No preview available",
          score: source.score,
        })),
        reasoning: response.reasoning,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process query")
      console.error("Query error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="query" className="text-sm font-medium">
              Ask a Question
            </label>
            <Textarea
              id="query"
              placeholder="Enter your query about the enterprise documentation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          {error && <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <Button type="submit" disabled={isLoading || !query.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Processing Query...
              </>
            ) : (
              <>
                <Search className="mr-2 size-4" />
                Search Knowledge Base
              </>
            )}
          </Button>
        </form>
      </Card>

      {results && <QueryResults results={results} />}
    </div>
  )
}
