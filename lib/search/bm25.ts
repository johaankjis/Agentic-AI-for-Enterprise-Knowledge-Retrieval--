/**
 * BM25 Implementation
 * Sparse retrieval using BM25 algorithm for keyword-based search
 */

export interface BM25Document {
  id: string
  tokens: string[]
  metadata: Record<string, any>
}

export class BM25 {
  private documents: BM25Document[]
  private idf: Map<string, number>
  private avgDocLength: number
  private k1: number
  private b: number

  constructor(k1 = 1.5, b = 0.75) {
    this.documents = []
    this.idf = new Map()
    this.avgDocLength = 0
    this.k1 = k1
    this.b = b
  }

  /**
   * Add documents to the index
   */
  addDocuments(documents: BM25Document[]) {
    this.documents = documents
    this.calculateIDF()
    this.calculateAvgDocLength()
  }

  /**
   * Calculate IDF (Inverse Document Frequency) for all terms
   */
  private calculateIDF() {
    const docCount = this.documents.length
    const termDocCount = new Map<string, number>()

    // Count documents containing each term
    for (const doc of this.documents) {
      const uniqueTerms = new Set(doc.tokens)
      for (const term of uniqueTerms) {
        termDocCount.set(term, (termDocCount.get(term) || 0) + 1)
      }
    }

    // Calculate IDF for each term
    for (const [term, count] of termDocCount) {
      this.idf.set(term, Math.log((docCount - count + 0.5) / (count + 0.5) + 1))
    }
  }

  /**
   * Calculate average document length
   */
  private calculateAvgDocLength() {
    const totalLength = this.documents.reduce((sum, doc) => sum + doc.tokens.length, 0)
    this.avgDocLength = totalLength / this.documents.length
  }

  /**
   * Calculate BM25 score for a document given a query
   */
  private calculateScore(queryTokens: string[], doc: BM25Document): number {
    let score = 0
    const docLength = doc.tokens.length

    // Count term frequencies in document
    const termFreq = new Map<string, number>()
    for (const token of doc.tokens) {
      termFreq.set(token, (termFreq.get(token) || 0) + 1)
    }

    // Calculate score for each query term
    for (const term of queryTokens) {
      const tf = termFreq.get(term) || 0
      const idf = this.idf.get(term) || 0

      const numerator = tf * (this.k1 + 1)
      const denominator = tf + this.k1 * (1 - this.b + this.b * (docLength / this.avgDocLength))

      score += idf * (numerator / denominator)
    }

    return score
  }

  /**
   * Search for documents matching the query
   */
  search(query: string, limit = 10): Array<{ id: string; score: number; metadata: Record<string, any> }> {
    const queryTokens = this.tokenize(query)
    const scores = this.documents.map((doc) => ({
      id: doc.id,
      score: this.calculateScore(queryTokens, doc),
      metadata: doc.metadata,
    }))

    return scores.sort((a, b) => b.score - a.score).slice(0, limit)
  }

  /**
   * Simple tokenization (in production, use a proper tokenizer)
   */
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((token) => token.length > 0)
  }
}
