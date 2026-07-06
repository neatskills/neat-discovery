---
name: neat-discovery-designing
description: Design complete system architecture - Agent infrastructure, application architecture, and integration patterns between them
---

# Discovery Designing

Design the complete system architecture for AI-enabled platforms.

## Role

You are a solution architect who designs both Agent infrastructure and application architecture, along with their integration patterns.

## When to Use

After Phase 2 (analysing) is complete. Use this skill to:
- Design Agent infrastructure (ontology, knowledge system, agent architecture, governance)
- Design application architecture (frontend, backend, database, deployment)
- Design integration architecture (how AI and traditional components work together)
- Create implementation blueprints

## Prerequisites

**Required from Phase 3:**
- `docs/{project-name}/03-estimating/mvp-estimates.md`

**Required from Phase 2:**
- `docs/{project-name}/02-analysing/requirement-classification.md`

**Required from Phase 1:**
- `docs/{project-name}/01-scoping/knowledge-landscape.md`
- `docs/{project-name}/01-scoping/knowledge-assessment.md`

**Assumed:** Executive approval to proceed with design

## Process

### Step 1: Project Selection

List existing projects:

```bash
ls -d docs/*/ 2>/dev/null
```

**If no projects exist:**
- Error: "No projects found. Run /neat-discovery-mapping first."
- Exit skill

**If projects exist:**
- List with numbers: `[1] project-a [2] project-b`
- Ask user to choose
- Store selected project name

### Step 2: Load Previous Outputs

Load all required files:

```bash
cat docs/{project-name}/01-scoping/project-context.md
cat docs/{project-name}/01-scoping/knowledge-landscape.md
cat docs/{project-name}/01-scoping/knowledge-assessment.md
cat docs/{project-name}/02-analysing/requirement-classification.md
cat docs/{project-name}/03-estimating/mvp-estimates.md
```

**If mvp-estimates.md missing:**
- Error: "Phase 3 outputs not found. Run /neat-discovery-estimating first."
- Exit skill

**If requirement-classification.md missing:**
- Error: "Phase 2 outputs not found. Run /neat-discovery-analysing first."
- Exit skill

**If Phase 1 files missing:**
- Error: "Phase 1 outputs not found. Run /neat-discovery-scoping first."
- Exit skill

**If all files exist:**
- Use project-context.md to understand project goals, stakeholders, success criteria
- Parse and summarize key points internally
- Identify non-deterministic requirements for architecture design
- Load effort estimates from Phase 3

### Step 3: Extract Estimation Insights

From `mvp-estimates.md`, extract critical insights that inform architecture:

**High-Risk Stories (XL, XXL):**
- Which stories have highest complexity/risk?
- What are the "Watch for:" escalation conditions?
- What assumptions were made about these stories?

**Build/Buy Recommendations:**
- Extract Pattern Analysis section
- Note recommendations (e.g., "Use Auth0", "Start with pgvector")
- Identify where to buy vs build

**Critical Assumptions:**
- What assumptions underpin the estimates?
- Which assumptions need architectural support?
- Example: "User validation loop" → architecture must enable this

**Risk Mitigation Needs:**
- Which risks require architectural solutions?
- Example: "Sparse pilot data" → architecture needs external knowledge integration plan
- Example: "Permission leakage" → architecture needs security review points

**Effort-Driven Constraints:**
- Stories estimated as XL/XXL need careful architecture (no over-engineering S stories)
- Build/buy decisions reduce complexity (Auth0 reduces auth story from M → S)

Summarize findings internally for use in architecture decisions.

### Step 4: Check Existing Architectures

Check if blueprints exist:

```bash
ls docs/{project-name}/04-designing/agent-architecture.md 2>/dev/null
ls docs/{project-name}/04-designing/app-architecture.md 2>/dev/null
ls docs/{project-name}/04-designing/integration-architecture.md 2>/dev/null
```

**If any exist:**
- Load existing files
- Inform: "Found existing architecture documents. I'll refine based on new insights."

**If none exist:**
- Inform: "Creating fresh architecture documents (AI, Traditional, Integration)."

### Step 5: Analyze Requirements for Patterns

Analyze non-deterministic requirements from classification:

**Identify patterns:**
- How many distinct domains/capabilities?
- Do requirements share concepts/entities?
- What knowledge sources do they need?
- Any orchestration requirements (sequential, parallel, hierarchical)?

**Assess knowledge fragmentation:**
- How many disparate knowledge sources?
- Do sources overlap or conflict?
- Is synthesis across sources required?
- Real-time access requirements?

**Evaluate integration complexity:**
- How do AI components connect to traditional systems?
- API integration needs?
- Data flow patterns?

Summarize findings internally.

### Step 6: Ontology Decision

Based on requirement patterns, decide: **Do we need an ontology?**

**Analyze for ontology need patterns:**

YES if:
- Multiple agents need shared concept definitions
- Requirements involve relationship reasoning (X relates to Y how?)
- Knowledge domain is complex with evolving concepts
- Cross-domain integration requires semantic alignment

NO if:
- Requirements are independent, no shared concepts
- Simple domain with stable definitions
- Knowledge sources already aligned

**Provide clear rationale:**
- Reference specific requirements that drive the decision
- Explain what the ontology would/wouldn't cover
- Note tradeoffs (complexity vs alignment benefits)

**If ontology needed, specify design:**
- Key concepts and entities
- Relationships between concepts
- How it evolves (governance)
- Integration with knowledge sources

### Step 7: Knowledge System Decision

Based on source analysis, decide: **Do we need a new knowledge system?**

**Analyze for knowledge system need patterns:**

YES if:
- Sources highly fragmented (10+ disparate systems)
- Real-time synthesis required across sources
- Centralized governance needed for quality control
- Current sources lack query/access APIs
- Need to consolidate contradictory information

NO if:
- Current sources are sufficient and accessible
- Direct agent-to-source access is viable
- Integration complexity outweighs benefits

**Provide clear rationale:**
- Reference knowledge landscape and assessment
- Explain what the system would consolidate
- Note tradeoffs (centralization vs point-to-point complexity)

**If knowledge system needed, specify architecture:**
- Storage approach (database, vector store, graph, hybrid)
- Access patterns (APIs, query language)
- Update mechanisms (real-time, batch, triggered)
- Integration with existing sources

### Step 8: Agent Architecture Design

Map requirements to agents, prioritizing high-risk/high-complexity stories.

**Group requirements by domain/capability:**
- Which requirements share knowledge needs?
- Which require similar reasoning patterns?
- Natural functional boundaries?

**Prioritize architecture effort based on estimation (Step 3):**
- **XL/XXL stories need careful design** (e.g., knowledge extraction, calculation inference)
- **S/M stories can use standard patterns** (e.g., markdown summarization)
- Focus architectural innovation on high-complexity, high-risk capabilities

**Design agent architecture:**

For each agent:
- Name and purpose (maps to requirement group)
- Knowledge sources it accesses
- Reasoning capabilities needed
- Input/output interfaces
- **Reference estimation assumptions:** If estimate assumes "user validation workflow," agent design must enable this

**Define orchestration:**
- Sequential: Agent B needs Agent A's output
- Parallel: Independent agents work simultaneously
- Hierarchical: Coordinator agent manages sub-agents

**Knowledge access patterns:**
- Direct source access vs knowledge system access
- Caching needs
- Real-time vs batch requirements
- **Align with estimation:** If estimate says "async processing required," architecture must support it

**Integration points with traditional systems:**
- Which existing systems do agents interact with?
- API requirements
- Data format transformations

### Step 9: Knowledge Flow Design

Map how knowledge moves through the architecture:

**Flow pattern: sources → [ontology] → [knowledge system] → agents → users**

For each step:
- What transformations occur?
- What triggers the flow?
- Latency requirements?
- Error handling?

**Knowledge update handling:**
- How do changes in sources propagate?
- Real-time vs periodic sync?
- Conflict resolution strategy?

### Step 10: Governance Model

Define ownership and accountability:

**Ontology governance (if ontology exists):**
- Who owns ontology design?
- How are concepts added/modified?
- Review and approval process?

**Knowledge quality control:**
- Who ensures source data quality?
- Validation mechanisms?
- Conflict resolution authority?

**Agent behavior monitoring:**
- Who monitors agent outputs?
- Quality metrics and thresholds?
- Escalation procedures?

**Accountability structure:**
- Clear ownership for each component
- Decision-making authority
- Audit and compliance roles

### Step 11: Application Architecture Design

Design the non-AI components of the system (web application, databases, infrastructure).

**Analyze deterministic requirements:**
- Review requirement-classification.md for deterministic requirements
- Identify traditional web application needs (forms, CRUD, workflows, reporting)
- Database requirements (SQL metadata, user management, project tracking)

**Frontend Architecture:**
- Framework choice (React, Vue, Angular, server-rendered)
- Component structure
- State management approach
- UI/UX patterns
- Responsive design requirements
- Accessibility requirements

**Backend Architecture:**
- Framework/language choice (Node.js, Python/Django/Flask, Java/Spring, .NET)
- Monolith vs microservices decision
- API design (REST, GraphQL, gRPC)
- Background job processing (if needed)
- Caching strategy
- Session management

**Database Design:**
- Relational database schema (expand beyond minimal SQL shown in AI architecture)
- Full table definitions with relationships
- Indexing strategy
- Migration approach
- Backup and recovery

**Authentication & Authorization:**
- SSO integration details (SAML, OAuth, OIDC)
- User directory sync mechanism (LDAP, Active Directory, Okta)
- RBAC implementation
- Session management
- Token strategy (JWT, session cookies)

**File Storage Architecture:**
- Object storage vs file system
- Storage provider (S3, Azure Blob, GCS, local)
- Access patterns (direct upload, signed URLs, proxy through backend)
- File organization structure
- Retention and archival policies

**Deployment Architecture:**
- Containerization (Docker, Kubernetes)
- Cloud provider choice (AWS, Azure, GCP, on-premise)
- Environment strategy (Dev, Staging, Production)
- Scalability approach (horizontal scaling, load balancing)
- CI/CD pipeline design
- Monitoring and observability (logs, metrics, traces, alerts)

**Performance Considerations:**
- Caching layers (CDN, application cache, database cache)
- Database query optimization
- API rate limiting
- Asset optimization (bundling, minification, lazy loading)

### Step 12: Integration Architecture Design

Design how AI components and traditional components work together.

**Critical Integration Points:**

**1. Document Upload → AI Processing Flow**
- User uploads documents via traditional web app
- Web app saves files to object storage
- Trigger AI processing: Synchronous or asynchronous?
  - Sync: User waits, simple but slow
  - Async: Background job queue (Celery, RabbitMQ, SQS, Redis Queue)
- AI agent processes documents → generates markdown
- Store markdown, update SQL metadata
- Notify user when complete (WebSocket, polling, notification system)

**2. Markdown Editor → AI Assistance Flow**
- User edits markdown in traditional web app
- AI suggestions on-demand (calculate inference, summarization)
- API design: Web backend → AI service (REST, gRPC, direct SDK call)
- Streaming responses for long-running AI operations
- Error handling when AI service unavailable or times out

**3. Approval Workflow → Vector DB Indexing Flow**
- Traditional workflow engine changes project status to "Approved"
- Trigger event: Database trigger, event bus, polling
- AI service indexes markdown + documents into vector DB
- Update search index status in SQL
- Handle failures gracefully (retry logic, dead letter queue)

**4. RAG Search Flow**
- User query via traditional web UI
- Web backend forwards query to AI service (RAG endpoint)
- AI service retrieves from vector DB + generates response
- Stream results back to user (Server-Sent Events, WebSocket, chunked transfer)
- Permission enforcement: Pass user context to AI service for scoped retrieval
- Caching strategy for common queries

**API Contract Design:**
- Document processing API: `POST /ai/process-documents` (async job)
- Markdown generation API: `POST /ai/generate-markdown`
- Calculation inference API: `POST /ai/infer-calculation`
- RAG search API: `POST /ai/search` (streaming response)
- Similarity matching API: `POST /ai/find-similar`
- Vector indexing API: `POST /ai/index-project` (triggered by approval)

**Error Handling Strategy:**
- AI service timeouts (LLM calls can take 10-60 seconds)
- Partial failures (document processed but indexing failed)
- Retry logic (idempotent operations, exponential backoff)
- Fallback behavior (user can proceed without AI if service down)
- Error logging and alerting

**Performance Considerations:**
- AI operations are slow (10s-60s for document processing)
- Asynchronous processing required for good UX
- Caching AI responses where possible (calculation inference for similar projects)
- Rate limiting AI API calls (cost and quota management)

**Security & Privacy:**
- Authentication between web app and AI service (API keys, OAuth, mutual TLS)
- Data encryption in transit (HTTPS, TLS)
- PII/sensitive data handling (redaction before sending to external LLM APIs)
- Permission context passed from web app to AI service (user ID, roles, accessible projects)

**Technology Choices:**
- Message queue: RabbitMQ, AWS SQS, Azure Service Bus, Redis Queue, Celery
- Event bus: Kafka, AWS EventBridge, Azure Event Grid (if event-driven architecture)
- API protocol: REST (simple), gRPC (performance), GraphQL (flexible queries)
- Streaming: Server-Sent Events, WebSocket, HTTP chunked transfer encoding
- Communication pattern: Direct HTTP calls, message queue, event-driven

**Deployment Considerations:**
- AI service as separate microservice (scalable, isolates Agent infrastructure)
- Co-located vs separate deployment (same cluster vs separate cluster)
- Network latency between web app and AI service
- Health checks and circuit breakers (prevent cascading failures)

### Step 13: Technology Stack Selection

**IMPORTANT:** Reference Pattern Analysis from mvp-estimates.md (Step 3) and adopt build/buy recommendations.

Based on requirements AND estimation insights, recommend specific technologies.

**Apply Build/Buy Recommendations from Estimation:**
- If estimates say "Use Auth0" → adopt it (don't design custom auth)
- If estimates say "Start with pgvector" → default to it (document rationale)
- If estimates say "Use TipTap for markdown editor" → adopt it
- **If deviating from estimation recommendations** → document WHY (must have strong justification)

**Frontend:**
- Framework: React (most common, large ecosystem), Vue (simpler), Angular (enterprise)
- State management: Redux, Zustand, Context API
- UI library: Material-UI, Ant Design, Tailwind CSS
- **Markdown editor:** TipTap or react-markdown-editor (per estimation pattern analysis)

**Backend:**
- Language/Framework:
  - Python: Django (full-featured), Flask (lightweight), FastAPI (async, modern)
  - Node.js: Express (simple), NestJS (structured), Fastify (performance)
  - Java: Spring Boot (enterprise standard)
  - .NET: ASP.NET Core (Microsoft stack)
- Background jobs: Celery (Python), Bull (Node.js), Hangfire (.NET)

**Database:**
- Relational: PostgreSQL (recommended: rich features, JSON support, pgvector extension)
- Alternative: MySQL, SQL Server, Oracle

**Vector Database:**
- **Check estimation recommendation** (Step 3): If estimates say "Start with pgvector," adopt it for MVP
- Managed: Pinecone (easy, expensive), Weaviate (flexible), Qdrant (open-source option)
- Self-hosted: pgvector (PostgreSQL extension - same DB as SQL metadata), Chroma (lightweight)
- Default: pgvector if small-medium scale (one less service), Pinecone/Weaviate if large scale
- **If choosing differently from estimation** → document rationale

**LLM Provider:**
- OpenAI: GPT-4, GPT-4 Turbo (excellent quality, structured output)
- Anthropic: Claude 3 Opus/Sonnet (long context, strong reasoning)
- Google: Gemini 1.5 Pro (very long context, cost-effective)
- Criteria: Context window (32k+ minimum), structured output support, cost, latency

**Message Queue:**
- Redis Queue / Bull (lightweight, Node.js)
- Celery + RabbitMQ (Python standard)
- AWS SQS (managed, serverless)
- Azure Service Bus (managed, Microsoft stack)

**Object Storage:**
- AWS S3 (standard)
- Azure Blob Storage (Microsoft stack)
- Google Cloud Storage (GCP)
- MinIO (self-hosted S3-compatible)

**Deployment:**
- Containerization: Docker
- Orchestration: Kubernetes (large scale), Docker Compose (small scale), managed services (AWS ECS, Azure Container Apps, Google Cloud Run)
- Cloud provider: AWS (most popular), Azure (Microsoft stack), GCP (data science tools)

**Observability:**
- Logging: Elasticsearch + Kibana, Datadog, CloudWatch, Azure Monitor
- Metrics: Prometheus + Grafana, Datadog, CloudWatch
- Tracing: Jaeger, OpenTelemetry, Datadog APM
- Error tracking: Sentry, Rollbar, Bugsnag

### Step 14: Map Estimation Risks to Architecture Mitigations

For each high-risk story (XL, XXL) from Step 3, define architectural mitigation strategies.

**Process:**

1. **Review high-risk stories:**
   - Which stories were estimated as XL or XXL?
   - What were the "Watch for:" escalation conditions?
   - What assumptions need architectural validation?

2. **Map risks to architecture decisions:**

| Risk from Estimation | Architectural Mitigation |
|---------------------|--------------------------|
| Story X: "Watch for: sparse pilot data" | Include external knowledge integration plan (e.g., EPA calculators) |
| Story Y: "Assumption: user validation loop" | Design governance workflow with clear validation UI/process |
| Story Z: "Watch for: permission leakage" | Include security review checkpoints, penetration testing plan |
| Story W: "Watch for: real-time vs batch" | Document async processing architecture decision |

3. **Validate build/buy assumptions:**
   - If estimates recommend "Use Auth0" → validate in tech stack (Step 13)
   - If estimates recommend "Start with pgvector" → validate in knowledge system design (Step 7)
   - If tech stack differs from estimate recommendations → document WHY

4. **Document estimation-informed decisions:**
   - Create section in each blueprint: "Estimation-Informed Design Decisions"
   - Show traceability: Estimation Risk → Architectural Choice → Rationale
   - Example: "Calculation inference (XL risk) → Robust validation workflow → User can review/edit AI suggestions before approval"

**Output:** Internal mapping table to reference when generating blueprints (Step 17).

### Step 15: Detect Architecture Complexity

Analyze to determine document structure:

**Simple architecture indicators:**
- 1-3 agents
- Few knowledge sources
- No ontology needed
- Straightforward integration

**Complex architecture indicators:**
- 5+ agents
- Ontology required
- New knowledge system needed
- Complex orchestration
- Many integration points

**IMPORTANT:** Generate **three separate architecture documents** for clear separation of concerns.

**1. agent-architecture.md** (Agent infrastructure only)

```markdown
- Executive Summary
- Architecture Overview (AI components only)
- Estimation-Informed Design Decisions
  - High-risk stories and architectural mitigations
  - Build/buy decisions from pattern analysis
  - Assumptions validated by architecture
- Ontology Decision (and design if needed)
- Knowledge System Architecture
  - Storage approach (vector DB, knowledge graphs, etc.)
  - Access patterns
  - Update mechanisms
- AI Agent Architecture
  - Agent inventory (purpose, capabilities)
  - Orchestration patterns
  - Knowledge access patterns
- Knowledge Flow Design (within AI system)
- Governance Model
  - Knowledge quality control
  - AI behavior monitoring
  - Accountability structure
- Technology Choices (LLM provider, vector DB, embedding model)
```

**2. app-architecture.md** (Web application architecture)

```markdown
- Executive Summary
- System Overview
- Estimation-Informed Design Decisions
  - Build/buy decisions from pattern analysis (Auth0, TipTap, etc.)
  - Effort-driven architecture choices
  - Risk mitigations for traditional components
- Frontend Architecture
  - Framework choice
  - Component structure
  - State management
  - UI/UX patterns
- Backend Architecture
  - Framework/language choice
  - API design
  - Background job processing
  - Caching strategy
- Database Design
  - Full schema (tables, relationships, indexes)
  - Migration strategy
- Authentication & Authorization
  - SSO integration (build vs buy decision)
  - RBAC implementation
  - Session management
- File Storage Architecture
- Deployment Architecture
  - Containerization
  - Cloud provider
  - CI/CD pipeline
  - Monitoring and observability
- Performance & Scalability
- Technology Stack Summary
```

**3. integration-architecture.md** (How AI and traditional work together)

```markdown
- Executive Summary
- Integration Overview (how the two systems connect)
- Estimation-Informed Design Decisions
  - Async vs sync decisions from estimation assumptions
  - Performance constraints from high-complexity stories
  - Build/buy decisions for integration components (message queues)
- Critical Integration Points
  1. Document Upload → AI Processing Flow
  2. Markdown Editor → AI Assistance Flow
  3. Approval Workflow → Vector DB Indexing Flow
  4. RAG Search Flow
- API Contract Design
  - Endpoint specifications
  - Request/response formats
  - Authentication between services
- Communication Patterns
  - Synchronous vs asynchronous (aligned with estimation assumptions)
  - Message queue architecture (if async)
  - Event-driven patterns (if applicable)
- Error Handling Strategy
  - AI service timeouts (from estimation risk analysis)
  - Partial failures
  - Retry logic
  - Fallback behavior
- Performance Considerations
  - Async processing for slow AI operations (from XL story estimates)
  - Caching strategies
  - Rate limiting
- Security & Privacy
  - Inter-service authentication
  - Data encryption
  - PII handling
  - Permission context passing (from security-critical estimation flags)
- Deployment Considerations
  - Service separation
  - Network topology
  - Health checks and circuit breakers
- Technology Choices (message queue, API protocol, streaming - from pattern analysis)
```

Show to user: "I'll generate three architecture documents: Agent infrastructure, Traditional application, and Integration. Does this structure work?"

Wait for approval.

### Step 16: Propose Document Structure

Generate **three separate markdown files** following approved structures.

**Content guidelines for all blueprints:**
- Evidence-based decisions (reference requirements, landscape, AND estimation insights)
- **MUST include "Estimation-Informed Design Decisions" section** showing traceability:
  - Estimation Risk/Assumption → Architectural Choice → Rationale
  - Build/buy decisions from pattern analysis
  - High-risk stories (XL/XXL) → architectural mitigations
- Clear rationale for all architectural choices
- Specific enough for delivery teams to implement
- Professional tone
- Diagrams where helpful (use clean HTML/CSS boxes in PDFs, not ASCII art)

**Generate in this order:**
1. **agent-architecture.md** (Agent infrastructure)
2. **app-architecture.md** (web application)
3. **integration-architecture.md** (how they connect)

**Cross-reference between documents:**
- AI blueprint references integration blueprint for "how it connects to web app"
- Traditional blueprint references integration blueprint for "how it calls AI services"
- Integration blueprint references both AI and traditional blueprints

**If updating existing files:**
- Refine architecture based on new insights
- Preserve validated decisions
- Flag changes: "Updated: [previous approach] → [new approach]. Reason: [rationale]"
- Don't auto-resolve conflicts

### Step 17: Generate Architecture Blueprints

```bash
# Create Phase 4 directory
mkdir -p docs/{project-name}/04-designing

# Generate three blueprints
# (Use Write tool for agent-architecture.md)
# (Use Write tool for app-architecture.md)
# (Use Write tool for integration-architecture.md)
```

### Step 18: Write Files

```bash
# Create Phase 4 directory
mkdir -p docs/{project-name}/04-designing

# Generate three blueprints
# (Use Write tool for agent-architecture.md)
# (Use Write tool for app-architecture.md)
# (Use Write tool for integration-architecture.md)
```

### Step 19: Confirm Completion

```
✓ Architecture design complete

Generated:
- docs/{project-name}/04-designing/agent-architecture.md
- docs/{project-name}/04-designing/app-architecture.md
- docs/{project-name}/04-designing/integration-architecture.md

Discovery process complete. Architectures ready for handoff to delivery teams.

All artifacts:
- docs/{project-name}/01-scoping/knowledge-landscape.md
- docs/{project-name}/01-scoping/knowledge-assessment.md
- docs/{project-name}/02-analysing/requirement-classification.md
- docs/{project-name}/02-analysing/executive-report.md
- docs/{project-name}/03-estimating/mvp-estimates.md
- docs/{project-name}/04-designing/agent-architecture.md
- docs/{project-name}/04-designing/app-architecture.md
- docs/{project-name}/04-designing/integration-architecture.md
```

## Output Specifications

### agent-architecture.md (in 04-designing/)
- Ontology decision and design (if needed)
- Knowledge system architecture (vector DB, storage patterns)
- AI agent architecture (agents, orchestration, knowledge access)
- Knowledge flow design (within AI system)
- AI governance model (quality control, monitoring, accountability)
- Technology choices (LLM provider, vector DB, embedding model)
- **Purpose:** Agent infrastructure design for ML/AI engineers

### app-architecture.md (in 04-designing/)
- Frontend architecture (framework, components, state management)
- Backend architecture (framework, API design, background jobs)
- Database design (full schema, migrations, indexing)
- Authentication & authorization (SSO, RBAC, session management)
- File storage architecture
- Deployment architecture (containers, cloud, CI/CD, monitoring)
- Performance & scalability
- Technology stack summary
- **Purpose:** Web application design for full-stack developers

### integration-architecture.md (in 04-designing/)
- Critical integration points (document upload, AI assistance, approval workflow, RAG search)
- API contract design (endpoints, formats, authentication)
- Communication patterns (sync/async, message queues, events)
- Error handling strategy (timeouts, retries, fallbacks)
- Performance considerations (async processing, caching, rate limiting)
- Security & privacy (inter-service auth, data encryption, PII handling)
- Deployment considerations (service separation, health checks)
- Technology choices (message queue, API protocol, streaming)
- **Purpose:** Integration design for DevOps/platform engineers

## Common Mistakes

| Mistake | Rule |
| --- | --- |
| Skipping prerequisite load | Must load all Phase 1 and Phase 2 outputs |
| Vague architecture | Be specific enough for implementation |
| Missing rationale | Every decision needs evidence-based justification |
| Ignoring constraints | Reference knowledge assessment barriers |
| Generic governance | Define actual roles and processes |
| **Only designing AI architecture** | **CRITICAL: Must generate all three blueprints (AI, Traditional, Integration) for complete system design** |
| Missing integration design | AI and traditional systems don't work together without explicit integration architecture |
| Unreadable diagrams | Use clean HTML/CSS boxes in PDFs, not ASCII art (reference neat-sdd examples if available) |

## Edge Cases

**No non-deterministic requirements:**
- Still create blueprint
- Conclusion: "Traditional architecture sufficient, Agent infrastructure not needed"

**Contradictory requirements:**
- Flag in blueprint
- Present options
- Note need for business decision

**Access constraints block critical knowledge:**
- Include in blueprint as implementation risk
- Suggest mitigation strategies
- May require architecture adjustment

**Minimal AI scope:**
- Simple architecture is valid
- Don't over-engineer
- Keep blueprint focused
