/**
 * Search system type definitions
 */

export interface SearchResult {
  id: string
  title: string
  content: string
  score: number
  metadata: {
    category: string
    lastUpdated: string
    [key: string]: any
  }
}

export interface SearchQuery {
  query: string
  filters?: Record<string, any>
  limit?: number
}

export interface SearchResponse {
  results: SearchResult[]
  totalResults: number
  executionTime: number
}
