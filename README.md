# Agentic AI for Enterprise Knowledge Retrieval

An advanced AI-powered knowledge retrieval system designed for enterprise documentation, featuring hybrid search, ReAct reasoning agents, and real-time analytics. Built with Next.js 15, TypeScript, and modern UI components.

## 🌟 Key Features

### Intelligent Search
- **Hybrid Search System**: Combines BM25 sparse retrieval and FAISS dense vector search using Reciprocal Rank Fusion (RRF)
- **Semantic Understanding**: Leverages vector embeddings for context-aware document retrieval
- **Keyword Matching**: Traditional BM25 algorithm for precise keyword-based search

### ReAct Agent System
- **Reasoning + Acting**: Implements the ReAct pattern for iterative reasoning and action execution
- **Multi-Step Queries**: Handles complex queries through iterative thought-action-observation loops
- **Tool Integration**: Extensible tool system for search, synthesis, and reranking operations
- **Agent Orchestration**: Manages multiple specialized agents for different query types

### Real-Time Analytics
- **Performance Metrics**: Track query execution time, success rates, and token usage
- **Query Analytics**: Monitor recent queries and system performance
- **Visual Dashboards**: Interactive charts and metrics overview
- **System Monitoring**: Real-time insights into agent behavior and search performance

### Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Seamless theme switching with next-themes
- **Component Library**: Built with Radix UI primitives and custom components
- **Interactive Interface**: Real-time query processing with loading states and error handling

## 🏗️ Architecture

The system is built on a modular architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (Next.js)                      │
│  ┌────────────┐  ┌────────────┐  ┌─────────────────────┐   │
│  │   Query    │  │  Metrics   │  │   Recent Queries    │   │
│  │ Interface  │  │  Overview  │  │                     │   │
│  └────────────┘  └────────────┘  └─────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Layer (Next.js API)                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐    │
│  │   Query    │  │  Metrics   │  │      Health        │    │
│  │  Endpoint  │  │  Endpoint  │  │     Endpoint       │    │
│  └────────────┘  └────────────┘  └────────────────────┘    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Core RAG System                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Agent Orchestrator                      │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │   ReAct     │  │    Tools     │  │  Routing  │  │   │
│  │  │   Agent     │  │   Registry   │  │   Logic   │  │   │
│  │  └─────────────┘  └──────────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Hybrid Search System                    │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │    BM25     │  │    FAISS     │  │    RRF    │  │   │
│  │  │   Search    │  │    Vector    │  │  Fusion   │  │   │
│  │  └─────────────┘  └──────────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Analytics & Monitoring                    │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │  Metrics    │  │    Logger    │  │ Dashboard │  │   │
│  │  │ Collector   │  │              │  │   Data    │  │   │
│  │  └─────────────┘  └──────────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Core Components

#### 1. RAG System (`lib/rag-system.ts`)
Central orchestration layer that integrates all components into a unified system for query processing and document retrieval.

#### 2. Agent System (`lib/agent/`)
- **ReAct Agent**: Implements reasoning-action loops for complex query handling
- **Orchestrator**: Routes queries to appropriate agents
- **Tools**: Extensible tool system for search, synthesis, and reranking

#### 3. Hybrid Search (`lib/search/`)
- **BM25**: Sparse retrieval for keyword-based search
- **FAISS**: Dense vector search for semantic retrieval
- **RRF**: Reciprocal Rank Fusion for combining search results

#### 4. Analytics (`lib/analytics/`)
- **Metrics Collector**: Tracks query performance and system metrics
- **Query Logger**: Structured logging for debugging and monitoring
- **Dashboard Data**: Aggregates metrics for visualization

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Theme**: next-themes for dark mode

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Language**: TypeScript
- **Search**: Custom BM25 and FAISS implementations
- **Analytics**: Built-in metrics collection and logging

### Development
- **Package Manager**: pnpm
- **Build Tool**: Next.js built-in bundler
- **Linter**: ESLint
- **Type Checking**: TypeScript

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/johaankjis/Agentic-AI-for-Enterprise-Knowledge-Retrieval--.git
cd Agentic-AI-for-Enterprise-Knowledge-Retrieval--
```

2. **Install dependencies**
```bash
pnpm install
# or
npm install
```

3. **Run the development server**
```bash
pnpm dev
# or
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
pnpm build
pnpm start
```

## 🚀 Usage

### Query Interface

1. **Navigate to the homepage** where you'll find the query interface
2. **Enter your question** in the text area
3. **Click "Search Knowledge Base"** to process your query
4. **View results** including:
   - AI-generated answer
   - Source documents with relevance scores
   - Agent reasoning steps

### API Endpoints

#### POST `/api/query`
Process a knowledge retrieval query.

**Request:**
```json
{
  "query": "How do I configure authentication?"
}
```

**Response:**
```json
{
  "queryId": "uuid",
  "answer": "To configure authentication...",
  "sources": [
    {
      "id": "doc-1",
      "title": "Authentication Guide",
      "snippet": "...",
      "score": 0.95
    }
  ],
  "reasoning": [
    "I need to search for information about authentication configuration",
    "I should analyze the search results..."
  ],
  "executionTime": 1250
}
```

#### GET `/api/metrics`
Retrieve system performance metrics.

**Response:**
```json
{
  "totalQueries": 150,
  "successfulQueries": 145,
  "failedQueries": 5,
  "avgResponseTime": 1200,
  "avgTokensUsed": 750,
  "avgAgentSteps": 2.5,
  "queriesPerHour": 12.5
}
```

#### GET `/api/health`
Check system health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-10-19T03:43:36.141Z",
  "version": "0.1.0"
}
```

## 📁 Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── query/            # Query processing endpoint
│   │   ├── metrics/          # Metrics endpoint
│   │   └── health/           # Health check endpoint
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Homepage
├── components/               # React components
│   ├── ui/                   # Base UI components (Radix UI)
│   ├── analytics-chart.tsx   # Analytics visualization
│   ├── header.tsx            # Application header
│   ├── metrics-overview.tsx  # Metrics dashboard
│   ├── query-interface.tsx   # Query input form
│   ├── query-results.tsx     # Search results display
│   ├── recent-queries.tsx    # Recent queries list
│   ├── theme-provider.tsx    # Theme management
│   └── theme-toggle.tsx      # Dark mode toggle
├── lib/                      # Core business logic
│   ├── agent/                # Agent system
│   │   ├── orchestrator.ts   # Agent routing and coordination
│   │   ├── react-agent.ts    # ReAct agent implementation
│   │   ├── tools.ts          # Agent tools (search, synthesis)
│   │   └── types.ts          # Type definitions
│   ├── analytics/            # Analytics and monitoring
│   │   ├── metrics.ts        # Metrics collection
│   │   ├── logger.ts         # Structured logging
│   │   ├── dashboard-data.ts # Dashboard data aggregation
│   │   └── index.ts          # Analytics exports
│   ├── api/                  # API client
│   │   └── client.ts         # API client wrapper
│   ├── search/               # Search implementations
│   │   ├── bm25.ts           # BM25 sparse search
│   │   ├── faiss.ts          # FAISS vector search
│   │   ├── hybrid.ts         # Hybrid search with RRF
│   │   ├── types.ts          # Search type definitions
│   │   └── index.ts          # Search exports
│   ├── rag-system.ts         # Main RAG system orchestration
│   └── utils.ts              # Utility functions
├── hooks/                    # Custom React hooks
│   ├── use-mobile.ts         # Mobile detection hook
│   └── use-toast.ts          # Toast notification hook
├── public/                   # Static assets
├── styles/                   # Additional styles
├── components.json           # Shadcn/UI config
├── next.config.mjs           # Next.js configuration
├── package.json              # Dependencies and scripts
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🔧 Development

### Key Concepts

#### ReAct Agent Pattern
The ReAct (Reasoning + Acting) pattern enables the agent to:
1. **Think**: Reason about the current state and next action
2. **Act**: Execute tools to gather information
3. **Observe**: Process the results of actions
4. **Iterate**: Repeat until sufficient information is gathered

Example agent execution flow:
```typescript
Thought: "I need to search for authentication documentation"
Action: search({ query: "authentication configuration" })
Observation: [5 relevant documents found]

Thought: "I should analyze these results for specific configuration steps"
Action: synthesize({ documents: [...] })
Observation: "Authentication requires OAuth 2.0 setup..."

Thought: "I have enough information to answer"
Action: finish({ answer: "..." })
```

#### Hybrid Search
Combines two complementary search approaches:
- **BM25 (Sparse)**: Excellent for exact keyword matches
- **FAISS (Dense)**: Strong semantic understanding
- **RRF Fusion**: Balances both approaches using reciprocal rank fusion

#### Metrics Collection
The system tracks comprehensive metrics:
- Query execution time
- Success/failure rates
- Token usage (for LLM calls)
- Agent reasoning steps
- Source document counts

### Adding New Features

#### 1. Add a New Tool
```typescript
// lib/agent/tools.ts
export const myNewTool = async (input: any) => {
  // Tool implementation
  return result;
};

// Register in orchestrator
generalAgent.registerTool("myTool", myNewTool);
```

#### 2. Create a Specialized Agent
```typescript
// lib/agent/orchestrator.ts
const technicalAgent = new ReActAgent(5);
technicalAgent.registerTool("search", searchTool);
this.agents.set("technical", technicalAgent);
```

#### 3. Extend Search Capabilities
```typescript
// lib/search/hybrid.ts
async search(query: string, filters?: SearchFilters) {
  // Add filtering logic
  const results = await this.hybridSearch.search(query);
  return this.applyFilters(results, filters);
}
```

### Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🎯 Use Cases

- **Enterprise Documentation Search**: Quick access to internal docs
- **Technical Support**: Automated answer generation from knowledge bases
- **Research & Development**: Semantic search across research papers
- **Customer Support**: AI-powered knowledge base queries
- **Compliance & Legal**: Document retrieval with reasoning trails

## 🔒 Security Considerations

- All API endpoints validate input data
- Query sanitization prevents injection attacks
- Rate limiting recommended for production deployment
- Sensitive data handling follows enterprise security standards

## 🚧 Future Enhancements

- [ ] Integration with real LLM APIs (OpenAI, Anthropic, etc.)
- [ ] Real embedding model integration (sentence-transformers, OpenAI embeddings)
- [ ] Advanced agent routing based on query classification
- [ ] Multi-modal search (images, PDFs, code)
- [ ] User authentication and personalization
- [ ] Query history and saved searches
- [ ] Advanced filtering and faceted search
- [ ] Batch processing for large document sets
- [ ] A/B testing framework for search optimization
- [ ] GraphQL API support

## 📄 License

This project is private and proprietary. All rights reserved.

## 🤝 Contributing

This is a private repository. For contribution guidelines, please contact the repository owner.

## 📧 Support

For issues, questions, or support requests, please create an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, TypeScript, and modern AI techniques**
