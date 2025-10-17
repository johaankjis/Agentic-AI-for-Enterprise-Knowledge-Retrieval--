"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle2 } from "lucide-react"

interface Source {
  id: string
  title: string
  snippet: string
  score: number
}

interface QueryResultsProps {
  results: {
    answer: string
    sources: Source[]
    reasoning: string[]
  }
}

export function QueryResults({ results }: QueryResultsProps) {
  return (
    <div className="space-y-6">
      {/* Answer Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-chart-3" />
            <h3 className="text-lg font-semibold">Answer</h3>
          </div>
          <p className="text-pretty leading-relaxed">{results.answer}</p>
        </div>
      </Card>

      {/* Reasoning Steps */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Reasoning Steps</h3>
          <ol className="space-y-2">
            {results.reasoning.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                  {index + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Card>

      {/* Sources */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sources</h3>
          <div className="space-y-3">
            {results.sources.map((source) => (
              <div key={source.id} className="flex gap-4 rounded-lg border border-border p-4">
                <FileText className="size-5 shrink-0 text-muted-foreground" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium">{source.title}</h4>
                    <Badge variant="secondary">{(source.score * 100).toFixed(0)}% match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{source.snippet}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
