---
name: neat-discovery-designing
description: Design high-level architecture validating feasibility and identifying risks - defines patterns, integration strategy, and trade-offs for AI agent and application components
---

# neat-discovery-designing

## Overview

**This is discovery-level design** - high-level architecture that validates feasibility, identifies risks, and defines integration patterns. Not detailed implementation planning.

**Focus:** Patterns, trade-offs, risk mitigation, and decision points for later phases.

## Role

**Role:** You are a Solution Architect conducting discovery-level design to validate feasibility and identify architectural risks.

## When to Use

After Phase 3 (scoping) is complete. Use this skill to:

- Validate architectural feasibility given constraints and risks
- Define high-level patterns for AI agent and application components
- Design integration strategy between AI and application layers
- Identify architectural risks and mitigation approaches
- Document trade-offs and decisions deferred to implementation planning

## What This Is NOT

**Don't do in discovery design:**

- ❌ Choose specific frameworks/libraries (React vs Vue, Django vs Flask)
- ❌ Design detailed APIs, schemas, or data models
- ❌ Make build vs buy decisions (already decided in Phase 3)
- ❌ Create implementation-ready specifications
- ❌ Evaluate vendors or products in detail

**These happen during implementation planning** (post-discovery).

## Prerequisites

**Required from Phase 3 (Scoping):**

- `docs/{project-name}/03-scoping/mvp-scope.md` — provides classified requirements (AI / Traditional / Hybrid) and effort sizing

**Required from Phase 1 (if run):**

- `docs/{project-name}/01-assessing/knowledge-landscape.md`
- `docs/{project-name}/01-assessing/knowledge-assessment.md`

**Optional:**

- `docs/{project-name}/02-analysing/requirement-classification.md` — formal classification from enterprise analysing phase (supplements mvp-scope.md if present)

**Assumed:** Executive approval to proceed with design

## Process

### Step 1: Project Selection

List existing projects:

```bash
ls -d docs/*/ 2>/dev/null
```

**If no projects exist:**

- Error: "No projects found. Run /neat-discovery-scoping first."
- Exit skill

**If projects exist:**

- List with numbers: `[1] project-a [2] project-b`
- Ask user to choose
- Store selected project name

### Step 2: Load Previous Outputs

Load files:

```bash
# Required
cat docs/{project-name}/03-scoping/mvp-scope.md

# Phase 1 context (load if present)
cat docs/{project-name}/01-assessing/project-context.md 2>/dev/null
cat docs/{project-name}/01-assessing/knowledge-landscape.md 2>/dev/null
cat docs/{project-name}/01-assessing/knowledge-assessment.md 2>/dev/null

# Enterprise formal classification (load if present — supplements mvp-scope)
cat docs/{project-name}/02-analysing/requirement-classification.md 2>/dev/null

# Vetting brief as fallback context (load if present and Phase 1 not run)
cat docs/{project-name}/discovery-brief.md 2>/dev/null
```

**If mvp-scope.md missing:**

- Error: "Scoping output not found. Run /neat-discovery-scoping first."
- Exit skill

**If Phase 1 files and discovery brief both missing:**

- Warn: "No project context found — architecture decisions will have less context. Proceeding with mvp-scope.md only."
- Continue

**Once loaded:**

- Use project-context.md (or discovery brief) to understand project goals, stakeholders, success criteria
- Read classification from mvp-scope.md (AI / Traditional / Hybrid per requirement)
- If requirement-classification.md also present, use it to supplement with formal classification detail
- Load effort estimates and risk flags from mvp-scope.md

### Step 3: Extract Estimation Insights

From `mvp-scope.md`, extract critical insights that inform architecture:

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

### Step 4: Detect Mode (Update or New)

**See:** [Mode Detection Pattern](../references/mode-detection.md)

Apply the pattern with these values:

| Parameter | Value |
| --- | --- |
| Phase folder | `04-designing/` |
| Artifact type | `architecture` |
| Update action | `refine based on new insights` |
| Files to load | `agent-architecture.md, app-architecture.md, integration-architecture.md` |
| Update question | "What changed in requirements, constraints, or approach?" |

**Special consideration for Update mode:**

Refine only affected architecture sections. Preserve unchanged design decisions to maintain architectural consistency.

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

### Step 11: Application Architecture Patterns

**Define high-level patterns** for non-AI components (web application, databases, infrastructure).

**Analyze deterministic requirements:**

- Review requirement-classification.md for deterministic requirements
- Identify application needs (forms, CRUD, workflows, reporting)
- Database requirements (metadata, user management, project tracking)

**Frontend pattern:**

- SPA vs server-rendered (evaluate based on interactivity needs)
- Component organization approach
- State management pattern needed
- Responsive and accessibility requirements
- **Defer to planning:** Specific framework, UI library selection

**Backend pattern:**

- API-first architecture (monolith vs microservices trade-off)
- API protocol pattern (REST/GraphQL/gRPC - evaluate based on client needs)
- Background job processing pattern (if async work needed)
- Caching strategy (what needs caching, where)
- **Defer to planning:** Specific language/framework choice

**Database pattern:**

- Relational schema approach (normalized vs denormalized trade-offs)
- Key entities and relationships (high-level)
- Indexing considerations (what queries need optimization)
- Migration strategy (how to evolve schema safely)
- **Defer to planning:** Detailed table definitions, constraints

**Authentication & Authorization pattern:**

- SSO integration approach (validate with existing identity provider)
- Role-based access pattern (how roles map to permissions)
- Session vs token strategy trade-offs
- **Build/buy from Phase 3:** e.g., "Use Auth0" (already decided)
- **Defer to planning:** Specific protocols (SAML vs OIDC), token formats

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

#### 1. Document Upload → AI Processing Flow

- User uploads documents via traditional web app
- Web app saves files to object storage
- Trigger AI processing: Synchronous or asynchronous?
  - Sync: User waits, simple but slow
  - Async: Background job queue (Celery, RabbitMQ, SQS, Redis Queue)
- AI agent processes documents → generates markdown
- Store markdown, update SQL metadata
- Notify user when complete (WebSocket, polling, notification system)

#### 2. Markdown Editor → AI Assistance Flow

- User edits markdown in traditional web app
- AI suggestions on-demand (calculate inference, summarization)
- API design: Web backend → AI service (REST, gRPC, direct SDK call)
- Streaming responses for long-running AI operations
- Error handling when AI service unavailable or times out

#### 3. Approval Workflow → Vector DB Indexing Flow

- Traditional workflow engine changes project status to "Approved"
- Trigger event: Database trigger, event bus, polling
- AI service indexes markdown + documents into vector DB
- Update search index status in SQL
- Handle failures gracefully (retry logic, dead letter queue)

#### 4. RAG Search Flow

- User query via traditional web UI
- Web backend forwards query to AI service (RAG endpoint)
- AI service retrieves from vector DB + generates response
- Stream results back to user (Server-Sent Events, WebSocket, chunked transfer)
- Permission enforcement: Pass user context to AI service for scoped retrieval
- Caching strategy for common queries

<!-- markdownlint-disable MD013 -->
| Concern | Key decisions |
| --- | --- |
| **API Contract** | One endpoint per integration point (process-documents, generate-markdown, infer-calculation, search, find-similar, index-project); define sync vs async per endpoint |
| **Error Handling** | AI timeouts 10-60s; idempotent retries with exponential backoff; fallback so users can proceed when AI is down |
| **Performance** | Async processing for slow AI ops; cache calculation inference for similar inputs; rate-limit LLM calls |
| **Security** | Inter-service auth (API key / OAuth / mTLS); HTTPS everywhere; redact PII before external LLM calls; pass user context for scoped retrieval |
| **Deployment** | AI as separate microservice; define co-located vs separate; health checks and circuit breakers |
<!-- markdownlint-enable MD013 -->

### Step 13: Technology Pattern Validation

**Reference build/buy decisions from Phase 3 (scoping)** - those are already decided.

**Discovery-level guidance (defer specifics to planning):**

**Frontend pattern:**

- SPA framework needed (decide specific one during planning: React/Vue/Angular)
- State management approach (evaluate Redux vs simpler alternatives)
- Component library (assess accessibility requirements)
- **Build/buy from Phase 3:** e.g., "Use TipTap for markdown editing" (already decided)

**Backend pattern:**

- API-first architecture (REST/GraphQL/gRPC - decide protocol during planning)
- Background job processing needed (evaluate queue vs cron patterns)
- Language/framework choice deferred to planning (align with team skills)
- **Build/buy from Phase 3:** e.g., "Use Auth0 for authentication" (already decided)

**Database pattern:**

- Relational database required (PostgreSQL recommended for JSON + vector support)
- Vector storage needed for AI features (validate pgvector feasibility vs dedicated DB)
- **Risk:** Vector search at scale - plan load testing during implementation

**Defer to implementation planning:** specific framework/library versions, detailed API contracts, vendor selection within categories, performance optimization strategies.

**Vector DB guidance:** pgvector for small-medium scale (one less service); managed (Pinecone/Weaviate) for large scale.
If choosing differently from Phase 3 estimation → document rationale.

**LLM Provider criteria:** context window (32k+ minimum), structured output support, cost, latency. Defer specific provider selection to planning.

**Other deferred choices (decide in planning, aligned with team stack):** message queue · object storage · cloud provider · observability stack

### Step 14: Map Estimation Risks to Architecture Mitigations

For each high-risk story (XL, XXL) from Step 3, define architectural mitigation strategies.

**Process:**

1. **Review high-risk stories:**
   - Which stories were estimated as XL or XXL?
   - What were the "Watch for:" escalation conditions?
   - What assumptions need architectural validation?

2. **Map risks to architecture decisions:**

| Risk from Estimation | Architectural Mitigation |
| --- | --- |
| Story X: "Watch for: sparse pilot data" | Include external knowledge integration plan (e.g., EPA calculators) |
| Story Y: "Assumption: user validation loop" | Design governance workflow with clear validation UI/process |
| Story Z: "Watch for: permission leakage" | Include security review checkpoints, penetration testing plan |
| Story W: "Watch for: real-time vs batch" | Document async processing architecture decision |

1. **Validate build/buy assumptions:**
   - If estimates recommend "Use Auth0" → validate in tech stack (Step 13)
   - If estimates recommend "Start with pgvector" → validate in knowledge system design (Step 7)
   - If tech stack differs from estimate recommendations → document WHY

2. **Document estimation-informed decisions:**
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
  - SSO integration pattern (validate with existing identity provider)
  - RBAC approach (role structure, permission model)
  - Session vs token strategy
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

### Step 16: Generate Architecture Blueprints

Generate **three separate markdown files** following approved structures.

**Content guidelines for all blueprints:**

- Evidence-based decisions (reference requirements, landscape, AND estimation insights)
- **MUST include "Estimation-Informed Design Decisions" section** showing traceability:
  - Estimation Risk/Assumption → Architectural Choice → Rationale
  - Build/buy decisions from pattern analysis
  - High-risk stories (XL/XXL) → architectural mitigations
- Clear rationale for all architectural choices
- **Discovery-level detail:** Patterns with trade-offs, not implementation specs
- Explicit about what's deferred to planning
- Professional tone
- Diagrams where helpful (high-level boxes and flows, not detailed schemas)

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

### Step 17: Write Files

```bash
# Create Phase 4 directory
mkdir -p docs/{project-name}/04-designing

# Generate three blueprints
# (Use Write tool for agent-architecture.md)
# (Use Write tool for app-architecture.md)
# (Use Write tool for integration-architecture.md)
```

### Step 18: Confirm Completion

```text
Architecture design complete

Generated:
- docs/{project-name}/04-designing/agent-architecture.md
- docs/{project-name}/04-designing/app-architecture.md
- docs/{project-name}/04-designing/integration-architecture.md

Discovery process complete. High-level architecture defined for implementation planning.

All artifacts:
- docs/{project-name}/01-assessing/project-context.md
- docs/{project-name}/01-assessing/knowledge-landscape.md
- docs/{project-name}/01-assessing/knowledge-assessment.md
- docs/{project-name}/02-analysing/requirement-classification.md
- docs/{project-name}/02-analysing/executive-report.md
- docs/{project-name}/03-scoping/mvp-scope.md
- docs/{project-name}/04-designing/agent-architecture.md
- docs/{project-name}/04-designing/app-architecture.md
- docs/{project-name}/04-designing/integration-architecture.md
```

## Output Specifications

Discovery-level design = High-level patterns + Feasibility + Risks + Trade-offs

### agent-architecture.md (in 04-designing/)

- Ontology decision and rationale (needed vs not needed, why)
- Knowledge system pattern (vector storage approach, trade-offs)
- AI agent pattern (single vs multi-agent, orchestration approach)
- Knowledge flow pattern (how knowledge moves through system)
- AI governance approach (quality control, monitoring, accountability)
- Technology pattern guidance (LLM provider considerations, vector DB options)
- **Risks identified:** Feasibility concerns, scalability unknowns
- **Defer to planning:** Specific embedding models, prompt templates, fine-tuning strategy
- **Purpose:** High-level AI architecture for validation and planning input

### app-architecture.md (in 04-designing/)

- Frontend pattern (SPA vs server-rendered, state management approach)
- Backend pattern (monolith vs microservices, API protocol)
- Database pattern (schema approach, key entities/relationships)
- Auth pattern (SSO integration, RBAC approach)
- Storage pattern (file/blob storage strategy)
- Deployment pattern (cloud approach, containerization)
- Performance considerations (caching needs, async processing)
- **Risks identified:** Scalability concerns, integration challenges
- **Defer to planning:** Specific frameworks, detailed schemas, vendor selection
- **Purpose:** High-level application architecture for validation and planning input

### integration-architecture.md (in 04-designing/)

- Integration points (where AI and application connect)
- Communication patterns (sync/async, event-driven vs direct calls)
- Error handling approach (timeouts, retries, fallback strategies)
- Performance pattern (async processing, caching, rate limiting)
- Security approach (inter-service auth, data flow encryption)
- Deployment pattern (service separation, health check strategy)
- **Risks identified:** Latency concerns, failure scenarios, complexity
- **Defer to planning:** Specific message queue product, API contracts, monitoring tools
- **Purpose:** High-level integration architecture for validation and planning input

## Common Mistakes

| Mistake | Rule |
| --- | --- |
| Skipping prerequisite load | Must load all Phase 1, 2, and 3 outputs |
| Too detailed (choosing frameworks) | Discovery = patterns, not products. Defer specifics to planning |
| Missing rationale | Every pattern needs evidence-based justification |
| Ignoring constraints | Reference Phase 1 assessment barriers |
| Missing risk identification | Flag feasibility concerns, unknowns, scalability risks |
| Vague patterns | "Use a database" - too vague. "Relational DB for ACID, evaluate PostgreSQL for vector support" - right level |
| **Only designing AI architecture** | **CRITICAL: Must generate all three documents (AI, app, integration)** |
| Missing trade-off analysis | Show what you're trading off (cost vs capability, speed vs quality) |
| No "defer to planning" guidance | Be explicit about what gets decided later |

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
