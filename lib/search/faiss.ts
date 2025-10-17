/**
 * FAISS-like Vector Search Implementation
 * Dense retrieval using vector embeddings and cosine similarity
 */

export interface VectorDocument {
  id: string
  embedding: number[]
  metadata: Record<string, any>
}

export class VectorSearch {
  private documents: VectorDocument[]
  private dimension: number

  constructor(dimension = 384) {
    this.documents = []
    this.dimension = dimension
  }

  /**
   * Add documents with embeddings to the index
   */
  addDocuments(documents: VectorDocument[]) {
    // Validate embedding dimensions
    for (const doc of documents) {
      if (doc.embedding.length !== this.dimension) {
        throw new Error(`Invalid embedding dimension: expected ${this.dimension}, got ${doc.embedding.length}`)
      }
    }
    this.documents = documents
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i]
      normA += a[i] * a[i]
      normB += b[i] * b[i]
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
  }

  /**
   * Search for documents similar to the query embedding
   */
  search(queryEmbedding: number[], limit = 10): Array<{ id: string; score: number; metadata: Record<string, any> }> {
    if (queryEmbedding.length !== this.dimension) {
      throw new Error(`Invalid query embedding dimension: expected ${this.dimension}, got ${queryEmbedding.length}`)
    }

    const scores = this.documents.map((doc) => ({
      id: doc.id,
      score: this.cosineSimilarity(queryEmbedding, doc.embedding),
      metadata: doc.metadata,
    }))

    return scores.sort((a, b) => b.score - a.score).slice(0, limit)
  }

  /**
   * Batch search for multiple queries
   */
  batchSearch(
    queryEmbeddings: number[][],
    limit = 10,
  ): Array<Array<{ id: string; score: number; metadata: Record<string, any> }>> {
    return queryEmbeddings.map((embedding) => this.search(embedding, limit))
  }
}
