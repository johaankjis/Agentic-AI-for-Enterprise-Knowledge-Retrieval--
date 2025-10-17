/**
 * Hybrid Search Implementation
 * Combines BM25 (sparse) and FAISS (dense) retrieval with reciprocal rank fusion
 */

import { BM25 } from "./bm25"
import { VectorSearch } from "./faiss"
import type { SearchResult } from "./types"

export interface HybridSearchConfig {
  bm25Weight: number
  vectorWeight: number
  rrfK: number
}

export class HybridSearch {
  private bm25: BM25
  private vectorSearch: VectorSearch
  private config: HybridSearchConfig

  constructor(config: Partial<HybridSearchConfig> = {}) {
    this.bm25 = new BM25()
    this.vectorSearch = new VectorSearch()
    this.config = {
      bm25Weight: config.bm25Weight ?? 0.5,
      vectorWeight: config.vectorWeight ?? 0.5,
      rrfK: config.rrfK ?? 60,
    }
  }

  /**
   * Initialize the search indices
   */
  async initialize(documents: any[]) {
    // Prepare BM25 documents
    const bm25Docs = documents.map((doc) => ({
      id: doc.id,
      tokens: this.tokenize(doc.content),
      metadata: doc.metadata,
    }))
    this.bm25.addDocuments(bm25Docs)

    // Prepare vector documents (in production, generate embeddings using a model)
    const vectorDocs = documents.map((doc) => ({
      id: doc.id,
      embedding: this.generateMockEmbedding(doc.content),
      metadata: doc.metadata,
    }))
    this.vectorSearch.addDocuments(vectorDocs)
  }

  /**
   * Perform hybrid search combining BM25 and vector search
   */
  async search(query: string, limit = 10): Promise<SearchResult[]> {
    // Get BM25 results
    const bm25Results = this.bm25.search(query, limit * 2)

    // Get vector search results (in production, generate query embedding)
    const queryEmbedding = this.generateMockEmbedding(query)
    const vectorResults = this.vectorSearch.search(queryEmbedding, limit * 2)

    // Combine results using Reciprocal Rank Fusion
    const fusedResults = this.reciprocalRankFusion(bm25Results, vectorResults)

    // Return top results
    return fusedResults.slice(0, limit)
  }

  /**
   * Reciprocal Rank Fusion (RRF) for combining ranked lists
   */
  private reciprocalRankFusion(
    bm25Results: Array<{ id: string; score: number; metadata: any }>,
    vectorResults: Array<{ id: string; score: number; metadata: any }>,
  ): SearchResult[] {
    const scores = new Map<string, number>()
    const metadata = new Map<string, any>()

    // Calculate RRF scores for BM25 results
    bm25Results.forEach((result, rank) => {
      const rrfScore = this.config.bm25Weight / (this.config.rrfK + rank + 1)
      scores.set(result.id, (scores.get(result.id) || 0) + rrfScore)
      metadata.set(result.id, result.metadata)
    })

    // Calculate RRF scores for vector results
    vectorResults.forEach((result, rank) => {
      const rrfScore = this.config.vectorWeight / (this.config.rrfK + rank + 1)
      scores.set(result.id, (scores.get(result.id) || 0) + rrfScore)
      if (!metadata.has(result.id)) {
        metadata.set(result.id, result.metadata)
      }
    })

    // Convert to SearchResult format and sort
    const results: SearchResult[] = Array.from(scores.entries()).map(([id, score]) => ({
      id,
      title: metadata.get(id)?.title || "Untitled",
      content: metadata.get(id)?.content || "",
      score,
      metadata: metadata.get(id) || {},
    }))

    return results.sort((a, b) => b.score - a.score)
  }

  /**
   * Simple tokenization
   */
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 0)
  }

  /**
   * Generate mock embedding (in production, use a real embedding model)
   */
  private generateMockEmbedding(text: string): number[] {
    // Simple hash-based mock embedding for demonstration
    const dimension = 384
    const embedding = new Array(dimension).fill(0)

    for (let i = 0; i < text.length; i++) {
      const charCode = text.charCodeAt(i)
      embedding[i % dimension] += charCode / 1000
    }

    // Normalize
    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
    return embedding.map((val) => val / norm)
  }
}
