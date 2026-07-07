---
name: neat-discovery-scoping
description: Scope MVP boundaries from Phase 2 requirements - produces T-shirt size estimates (XS-XXL) to determine MVP core vs deferred features, accounting for technical complexity and risk
---

# neat-discovery-scoping

**Role:** You are a Solutions Architect scoping MVP boundaries and sizing requirements for effort and feasibility.

## Overview

Scope MVP boundaries by sizing requirements (XS-XXL) from Phase 2 analysis, determining what fits in MVP core vs what gets deferred. Account for technical complexity and risk. Make assumptions explicit, express estimates as ranges.

**This is solutioning, not implementation.** Assess feasibility, identify patterns, recommend build/buy, size effort, and draw MVP boundaries.

**Core principle:** Express risk explicitly rather than hiding it.

## When to Use

After Phase 2 (analysing) is complete. Use this skill to:

- Scope MVP boundaries by sizing requirements
- Determine MVP Core vs Deferred features based on effort
- Provide total effort ranges for scoped buckets
- Inform executive decision-making on MVP scope and phasing

## Prerequisites

**Required from Phase 1:**

- `docs/{project-name}/01-assessing/project-context.md`
- `docs/{project-name}/01-assessing/knowledge-landscape.md`
- `docs/{project-name}/01-assessing/knowledge-assessment.md`

**Required from Phase 2:**

- `docs/{project-name}/02-analysing/requirement-classification.md`

**Don't use for:**

- Raw unfiltered requirements (run Phase 2 first)
- Detailed spec estimation (use planning skills)
- Time-based estimates (this is relative sizing)
- Sprint planning with known velocity

## Process

### Step 1: Project Selection

List existing projects in `docs/`:

```bash
ls -d docs/*/ 2>/dev/null
```

**If no projects exist:**

- Error: "No projects found. Run /neat-discovery-assessing first."
- Exit skill

**If projects exist:**

- List with numbers: `[1] project-a [2] project-b`
- Ask user to choose
- Store selected project name

### Step 2: Load Phase 1 and Phase 2 Outputs

Load required files:

```bash
cat docs/{project-name}/01-assessing/project-context.md
cat docs/{project-name}/01-assessing/knowledge-landscape.md
cat docs/{project-name}/01-assessing/knowledge-assessment.md
cat docs/{project-name}/02-analysing/requirement-classification.md
```

**If files missing:**

- Error: "Required outputs not found. Run /neat-discovery-assessing and /neat-discovery-analysing first."
- Exit skill

**If files exist:**

- Read and parse all files
- **From project-context.md:** Scope, constraints, stakeholders, strategic context
- **From knowledge-landscape.md:** Integration complexity (how many systems?), data availability, knowledge source ownership
- **From knowledge-assessment.md:** Access constraints (affects risk), quality issues (affects AI complexity), knowledge gaps (increases uncertainty)
- **From requirement-classification.md:** MVP Core requirements (AI + traditional), Deferred requirements (Phase 2+)

**Why knowledge files matter for estimation:**

- **Integration complexity:** More systems to integrate → increases effort
- **Access constraints:** Permission barriers, technical barriers → adds risk
- **Knowledge gaps:** Missing data sources → increases uncertainty and risk
- **Data quality issues:** Poor quality → AI stories become more complex

### Step 3: Detect Mode (Update or New)

Check if scoping file exists:

```bash
ls docs/{project-name}/03-scoping/*.md 2>/dev/null
```

**If file exists:**

Ask user to choose approach:

```
Found existing MVP scope from [date].

[1] Update it (re-estimate based on refined requirements)
[2] Regenerate (start fresh)

Choose [1]:
```

- **User chooses [1] Update:**
  - Load existing mvp-scope.md
  - Ask: "What changed in requirements or constraints?"
  - Re-estimate affected requirements
  - Update scope document preserving unchanged estimates

- **User chooses [2] Regenerate:**
  - Inform: "Starting fresh MVP scoping."
  - Proceed with full estimation
  - Overwrite scope document

**If file doesn't exist:**

- Inform: "Creating new MVP scope document."
- Proceed with full estimation

### Step 4: Estimate MVP Core Requirements

For each MVP Core requirement (from requirement-classification.md):

1. Identify requirement details (include REQ-ID from classification)
2. Estimate using 4-phase process (Parse → Complexity → Risk → Size)
3. Document assumptions
4. Note escalation conditions

**Group estimates:**

- AI Capabilities (non-deterministic requirements)
- Supporting Layer (deterministic requirements)

**IMPORTANT:** Reference requirement IDs in story titles for traceability:

- Story 1 (REQ-001): Knowledge Extraction from Documents
- Story 2 (REQ-003): Calculation Inference

### Step 5: Estimate Deferred Requirements

For each Deferred requirement:

1. Estimate using same 4-phase process
2. Note why deferred (from Phase 2 analysis)
3. Document assumptions

**If no deferred requirements:**

- Document in mvp-scope.md: "Deferred Features: None - full scope fits in MVP"
- In Effort Summary table: Show "Deferred: 0 stories | N/A | None"

### Step 6: Detect Patterns

Detect patterns across all requirements (MVP + Deferred):

**Patterns to detect:**

- Auth (3+): Auth0, Firebase
- Payment (2+): Stripe, PayPal
- Email (3+): Shared infrastructure
- File storage (3+): Shared solution
- Search (2+): Algolia, Elasticsearch

Offer pattern notes when detected with build/buy recommendations.

### Step 7: Synthesize Effort Summary

Calculate totals:

**MVP Core Total:**

- Count by size: X stories at S, Y at M, Z at L
- Overall assessment: "Medium project" / "Large project" / etc.

**Deferred Total:**

- Count by size
- Overall assessment

**Full Scope Total (if all built):**

- MVP + Deferred combined estimate

### Step 8: Calculate ROM Cost Estimates

After sizing effort, provide rough order of magnitude (ROM) cost estimates.

**Ask user for team composition assumptions:**

- "What team composition should I assume? (e.g., 2 AI/ML engineers, 2 full-stack, 1 DevOps)"
- "What hourly/yearly rates should I use? Or should I use industry averages?"
- "Any infrastructure costs to account for? (LLM API, hosting, third-party services)"

**Calculate ROM based on T-shirt sizes:**

**Rough conversion (story points to weeks):**

- XS: 0.5-1 week
- S: 1-2 weeks
- M: 2-4 weeks
- L: 4-8 weeks
- XL: 8-16 weeks
- XXL: 16+ weeks (flag as needing breakdown)

**Team cost calculation:**

- Weekly burn rate = (sum of all salaries/52) or (sum of hourly rates × 40)
- Project duration = max(parallelizable effort) + sequential dependencies
- Total labor cost = Weekly burn rate × Project duration

**Infrastructure cost:**

- LLM API: estimate requests/month × cost/request
- Hosting: cloud compute for AI inference + database + app server
- Third-party services: Auth, storage, monitoring

**Add buffers:**

- 20-30% for unknowns (higher if more XXL stories or high-risk items)
- 10-15% for overhead (meetings, planning, deployment)

**Output ROM ranges:**

- **Low estimate:** Assumes all stories hit lower bound, no significant blockers
- **High estimate:** Assumes stories hit upper bound, some scope creep

**CRITICAL - Assumptions documentation:**

- Document ALL assumptions in ROM section
- Make it clear this is NOT a formal quote
- Reference what's excluded (ongoing maintenance, support, change requests)
- Note that Phase 4 architecture design may reveal cost adjustments

### Step 9: Analyze Dependencies

Identify blocking relationships between requirements.

**Document dependencies in two places:**

1. **traceability-matrix.md** - For requirement tracking (Req ID → Blocks → Blocked By columns)
2. **mvp-scope.md** - For estimation context (Dependency Map section)

**Look for technical dependencies:**

- Authentication before user features
- Database schema before data operations
- Knowledge base before AI features
- API before integrations
- Infrastructure before services

**Document prerequisites:**

- "REQ-XXX must be completed before REQ-YYY can start"
- Use requirement IDs from Phase 2 classification

**Identify parallelizable work:**

- Which requirements have no dependencies and can be built concurrently?
- Helps inform team sizing and timeline

**Find critical path:**

- Longest sequence of dependent requirements
- Determines minimum project duration even with infinite team size

**Phasing implications:**

- Foundation requirements (no dependencies) → Phase 1
- Dependent requirements → Phase 2 or later
- Helps validate MVP scope from Phase 2

**Add to traceability matrix:**

- Update `docs/{project-name}/traceability-matrix.md` with dependency column
- Shows: Req ID → Blocks → Blocked By

### Step 10: Propose Document Structure

Show structure:

```markdown
mvp-scope.md:
# MVP Scoping: {Project Name}

**Date:** {date}
**Source:** requirement-classification.md (Phase 2)

## Executive Summary
- MVP Core: [count] stories → [size assessment]
- Deferred: [count] stories → [size assessment]
- Full Scope: [count] stories → [size assessment]

## MVP Core Estimation

### AI Capabilities (Non-Deterministic)
- Story X: [Size] - [reasoning]
...

### Supporting Layer Requirements
- Story Y: [Size] - [reasoning]
...

**MVP Core Total:** [synthesis]

## Deferred Features
- Story Z: [Size] - [why deferred] - [reasoning]
...

**Deferred Total:** [synthesis]

## Pattern Analysis
[Build/buy recommendations]

## Effort Summary
[Table: MVP vs Deferred vs Full Scope]

## Dependency Map

**Prerequisites (must be built first):**
- REQ-001 → REQ-005 (authentication before user profile)
- REQ-003 → REQ-007, REQ-009 (knowledge base before AI features)

**Blocked relationships:**
- REQ-012 blocked by REQ-003, REQ-005
- REQ-015 blocked by REQ-007

**Parallelizable work:**
- REQ-002, REQ-004, REQ-006 can be built concurrently

**Critical path:**
- REQ-001 → REQ-003 → REQ-007 → REQ-012 (longest sequence)

**Phasing implications:**
- Phase 1 must include: [foundation requirements]
- Phase 2 can add: [dependent features]

## ROM Cost Estimates

**Assumptions:**
- Team composition: [list roles and rough rates]
- Timeline: [estimated duration based on effort sizing]
- Infrastructure costs: [LLM API, hosting, third-party services]
- Buffers: [overhead, unknowns, contingency]

**MVP Cost Range:** $[low]k - $[high]k
- Rationale: [explanation of calculation]

**Full Scope Cost Range:** $[low]k - $[high]k (if all deferred features built)
- Rationale: [explanation]

**Caveats:**
- Rough Order of Magnitude (ROM) only - NOT a formal quote
- Assumes team composition as stated above
- Does not include [what's excluded: e.g., ongoing maintenance, change requests]
- Subject to validation in Phase 4 (architecture design)
```

Confirm with user: "Does this structure work?"

Wait for approval.

### Pattern Detection & Build vs Buy Analysis

**Patterns to detect:**

Scan requirements for common patterns that have mature SaaS/open-source solutions:

**Infrastructure patterns:**

- **Auth/Identity** (3+ stories): Auth0, Firebase Auth, AWS Cognito, Clerk
- **Payment** (2+ stories): Stripe, PayPal, Square
- **Email** (3+ stories): SendGrid, AWS SES, Postmark
- **File storage** (3+ stories): AWS S3, Cloudinary, Uploadcare
- **Search** (2+ stories): Algolia, Elasticsearch, Typesense
- **Monitoring/Analytics** (2+ stories): Datadog, Mixpanel, Amplitude
- **CMS** (4+ stories): Contentful, Sanity, Strapi

**AI-specific patterns:**

- **Vector database** (1+ story): Pinecone, Weaviate, pgvector, Qdrant
- **LLM API** (1+ story): OpenAI, Anthropic, Together AI, Fireworks
- **Document processing** (2+ stories): Unstructured.io, Azure Document Intelligence, AWS Textract
- **Embedding models** (1+ story): OpenAI, Cohere, SentenceTransformers (OSS)

**Build vs Buy Decision Framework:**

For each detected pattern, analyze:

**1. Effort Impact:**

- Build: {current estimate} (e.g., L + M + M = 3 stories, ~8-14 weeks)
- Buy: {reduced estimate} (e.g., S for integration = 1-2 weeks)
- **Savings:** {X weeks reduction}

**2. Cost Comparison:**

- Build: {ROM from labor estimate} (e.g., $50k-$80k for auth system)
- Buy: {SaaS pricing} (e.g., Auth0 $240/month + $0.05/MAU = ~$5k/year)
- **Breakeven:** {when build pays off} (e.g., "10+ years at current scale")

**3. Risk Assessment:**

- Build risks: {security, maintenance, expertise, time-to-market}
- Buy risks: {vendor lock-in, pricing changes, feature limitations}
- **Recommendation:** {build or buy with rationale}

**4. Strategic Alignment:**

- Is this core to our value proposition? (Build favored)
- Is this commodity infrastructure? (Buy favored)
- Do we have unique requirements? (May need build)

**Pattern Analysis Output:**

```markdown
## Pattern Analysis

### Auth Pattern Detected (3 stories: Login, MFA, User Roles)

**Current Estimate:** L + M + M = 8-14 weeks
**With Auth0:** S (integration) = 1-2 weeks
**Effort Savings:** 6-12 weeks

**Cost Comparison:**
- Build: $60k-$100k labor (ROM from estimates)
- Auth0: $240/month base + $0.05/MAU ≈ $5k/year
- Breakeven: 12+ years (not realistic)

**Recommendation:** Buy (Auth0 or similar)
**Rationale:** Auth is commodity, not our differentiator. SaaS reduces security risk, faster time-to-market, proven at scale.

### Vector Database Pattern Detected (1 story: RAG Knowledge Store)

**Current Estimate:** L = 4-8 weeks
**With Pinecone:** M (integration + migration) = 2-4 weeks
**Effort Savings:** 2-4 weeks

**Cost Comparison:**
- Build: $40k-$60k labor + hosting ($200/month)
- Pinecone: $70/month starter, scales to $599+/month production
- Breakeven: ~6 months (reasonable for pilot)

**Recommendation:** Buy for MVP, re-evaluate after pilot
**Rationale:** Fast to market, proven RAG performance. If scale becomes expensive (>$1k/month), consider pgvector migration in Phase 2.
```

Offer pattern notes when detected with specific build/buy recommendations and effort impact.

## T-Shirt Size Scale

| Size | Scope | Indicators |
| ---- | ----- | ---------- |
| XS | Trivial | Config, copy, single field |
| S | Small | Simple CRUD, basic form |
| M | Medium | Multi-component, standard integration |
| L | Large | Complex feature, multiple subsystems |
| XL | Very Large | Major cross-system, high risk |
| XXL | Epic | Multi-team, architectural changes |

Sizes are relative, not time-based.

## The Estimation Process

### Phase 1: Parse Story

Extract: Role, Goal, Benefit (if provided), Implied technical work.

### Phase 2: Assess Technical Complexity

**Low:** Established patterns, single system, minimal logic, standard
libraries

**High:** Novel algorithms, cross-system coordination, complex rules,
migrations, performance-critical

Complexity = what needs to be built, independent of team experience.

### Phase 3: Assess Risk

How likely is this story to explode in scope (3x)?

**Low risk:** Well-bounded scope, familiar pattern, clear "done", minimal
dependencies

**High risk:** Vague requirements, words like
"integrate/migrate/refactor" without specifics, new tech, external
dependencies, undefined edge cases/performance/security

**Key questions:**

- Could this be 3x bigger?
- Hidden dependencies?
- "Done" clearly defined?

### Phase 4: Synthesize Size & Document

**Decision framework:**

```text
High Complexity + High Risk → L, XL, or XXL
High Complexity + Low Risk → M or L  
Low Complexity + High Risk → M or L
Low Complexity + Low Risk → XS, S, or M
```

**Output format:**

```markdown
## Story N: [Title]

**Size:** M (could be L if scope expands)

**Complexity:** [2-3 sentences]

**Risk:** [2-3 sentences on scope explosion]

**Assumptions:**
- [key assumption 1]
- [key assumption 2]
- [key assumption 3]

**Watch for:** [1-2 specific escalation conditions]
```

## Quick Reference

| Factor | Impact | Question |
| ------ | ------ | -------- |
| Complexity | Base size | How hard is the work? |
| Risk | Inflates size | How likely is 3x scope expansion? |
| Scope | Scales size | How many components? |
| Dependencies | Adds risk | External factors? |

**When info missing:** Make assumptions (document them), express risk,
identify what would change estimate.

**Quality:** Maintain rigor for each story, don't copy-paste, monitor
patterns, be concise (2-3 sentences).

## Common Mistakes

| Mistake | Rule |
| ----- | --- |
| Skipping Phase 2 load | Must load requirement-classification.md |
| Estimating raw requirements | Work from scoped MVP/Deferred buckets |
| Estimate time | Use relative sizing |
| Ignore risk | Make it explicit, size up |
| Over-precision | Express as range |
| Skip assumptions | List 3-5 key items |
| Conflate complexity/risk | Separate them |
| Write paragraphs | 2-3 sentences per section |
| Copy-paste reasoning | Fresh analysis each story |
| "This is definitely [size]" | Express risk |
| "Can't estimate without info" | Make assumptions + caveats |

## Key Principles

1. Risk inflates estimates
2. Separate complexity from risk
3. Assumptions = documentation
4. Express risk in size
5. Be concise (2-3 sentences)

## Examples

### Example 1: Clear, Bounded Story

**Story:** "As a user, I want to log out of my account"

**Size:** XS

**Complexity:** Clearing session/token, redirect to login. Standard pattern.

**Risk:** Well-bounded scope, pattern rarely surprises, clear "done".

**Assumptions:** Session management exists, simple redirect, no multi-system coordination.

**Watch for:** SSO integration → S.

---

### Example 2: Vague, High Risk

**Story:** "As an admin, I want to generate monthly reports"

**Size:** L (could be M-XL)

**Complexity:** Data aggregation, formatting, async processing. Scales
with report types and calculations.

**Risk:** Vague—could 3x. "Generate reports" hides edge cases. Missing:
data, format, calculations, how many types.

**Assumptions:** 5-10 pre-defined types, queryable data, PDF/CSV, async,
basic calculations.

**Watch for:** User-configurable builder or complex transforms → XL.
Single simple report → M.

---

### Example 3: New Tech, External Dependency

**Story:** "As a developer, I want to integrate Stripe for payments"

**Size:** L

**Complexity:** Frontend + backend + webhooks. Well-documented but
requires checkout UI, server processing, webhook handling.

**Risk:** "Integrate" hides scope. Team unfamiliar with Stripe. External
API adds unknowns. Edge cases (failed payments, webhooks, testing) could
3x.

**Assumptions:** One-time payments, Stripe Checkout, single currency,
basic errors, test mode.

**Watch for:** Subscriptions, multi-currency, custom UI,
refunds/disputes → XL. Consider spike story.

---

### Step 11: Generate Estimation Document

Generate markdown file following approved structure.

**Content guidelines:**

- Clear size with rationale (2-3 sentences per section)
- Explicit assumptions
- Risk expressed as size ranges
- Pattern recommendations with build/buy guidance
- Professional tone
- Executive summary for quick scanning

**If updating existing file:**

- Merge new requirements into structure
- Update estimates based on refined information
- Flag changes: "Updated: [previous estimate] → [new estimate]. Reason: [rationale]"

### Step 12: Write Files

```bash
# Create Phase 3 directory
mkdir -p docs/{project-name}/03-scoping

# Write MVP scope file
# (Use Write tool for mvp-scope.md with REQ-IDs in story titles)

# Update traceability matrix
# (Use Edit tool to add columns to docs/{project-name}/traceability-matrix.md)
# Add: Scoped Story + Size Estimate + Dependencies columns
# Map: REQ-001 → Story 1 → XL → Blocks: REQ-005, REQ-007
```

### Step 13: Confirm Completion and Validation Gate

```text
MVP scoping complete

Generated:
- docs/{project-name}/03-scoping/mvp-scope.md
- docs/{project-name}/traceability-matrix.md (updated with sizing and dependencies)

---

VALIDATION GATE 3: Review Scope vs Effort

Review the MVP effort estimate before proceeding to Phase 4 (Designing):

MVP Assessment: {size} project ({timeline estimate})
Critical Path: {longest dependency chain}
ROM Cost: ${low}k - ${high}k

Decision Options:
1. PROCEED: MVP scope and effort are acceptable → Run /neat-discovery-designing
2. RE-SCOPE: MVP too large → Re-run /neat-discovery-analysing with tighter boundaries
3. DEFER: Effort exceeds capacity → Pause discovery, revisit later

Recommendation: If MVP estimate > 9 months, consider tightening scope in Phase 2 before designing architecture.

Next step (if approved): Run /neat-discovery-designing to create architecture blueprint
```

## Output Specifications

### mvp-scope.md (in 03-scoping/)

- Executive summary (MVP vs Deferred vs Full Scope totals)
- MVP Core sizing (AI + traditional, grouped)
- Deferred feature sizing
- Pattern analysis (build/buy recommendations)
- Effort summary table
- **Purpose:** Scope MVP boundaries and size requirements for executive decision-making on phasing

## File Format

**Location:** `docs/{project-name}/03-scoping/mvp-scope.md`

**Structure:**

```markdown
# MVP Scoping: {Project Name}

**Date:** {date}
**Source:** requirement-classification.md (Phase 2)

## Executive Summary

**MVP Core:** X stories (Y AI, Z traditional) → Medium-Large project
**Deferred:** A stories → Large additional scope  
**Full Scope:** B stories → XL total effort

---

## MVP Core Estimation

### AI Capabilities (Non-Deterministic)

#### Story 1: {Title}

**Size:** {size with risk}

**Complexity:** {2-3 sentences}

**Risk:** {2-3 sentences on scope explosion}

**Assumptions:**
- {key assumption 1}
- {key assumption 2}

**Watch for:** {1-2 escalation conditions}

---

### Supporting Layer Requirements

#### Story 5: {Title}

**Size:** {size}
**Complexity:** {2-3 sentences}
**Risk:** {2-3 sentences}
**Assumptions:** [list]

---

**MVP Core Total:** 3S + 2M + 2L = Medium-Large project

---

## Deferred Features

#### Story 10: {Title}

**Size:** {size}
**Why Deferred:** {from Phase 2}
**Complexity:** {2-3 sentences}
**Risk:** {2-3 sentences}
**Assumptions:** [list]

---

**Deferred Total:** 1L + 2XL = Large additional scope

---

## Pattern Analysis

**Auth Pattern** (Stories 1, 3, 5)
- Recommendation: Use Auth0
- Impact: Reduces M→S across 3 stories
- Build/Buy: Buy (Auth0)

---

## Effort Summary

| Scope | Stories | Size Distribution | Assessment |
|-------|---------|-------------------|------------|
| MVP Core | X | 3S + 2M + 2L | Medium-Large |
| Deferred | Y | 1L + 2XL | Large |
| Full Scope | Z | 3S + 2M + 3L + 2XL | XL |

**Recommendation:** Phased approach - MVP first, evaluate, then deferred features.
```
