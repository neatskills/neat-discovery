---
name: neat-discovery-scoping
description: Scope MVP boundaries from a requirements list - classifies each requirement as AI / Traditional / Hybrid, produces T-shirt size estimates (XS-XXL) for MVP core vs deferred features
---

# neat-discovery-scoping

**Role:** You are a Solutions Architect scoping MVP boundaries and sizing requirements for effort and feasibility.

## Overview

Take a requirements list from the user, classify each requirement as AI / Traditional / Hybrid, size them (XS-XXL), and draw MVP boundaries.
Account for technical complexity and risk. Make assumptions explicit, express estimates as ranges.

**This is solutioning, not implementation.** Assess feasibility, identify patterns, recommend build/buy, size effort, and draw MVP boundaries.

**Core principle:** Express risk explicitly rather than hiding it.

## When to Use

After Phase 1 (assessing) is complete — or directly if coming from a user-shared vetting handover with known requirements. Use this skill to:

- Classify requirements as AI / Traditional / Hybrid
- Scope MVP boundaries by sizing requirements
- Determine MVP Core vs Deferred features based on effort
- Provide total effort ranges for scoped buckets
- Inform executive decision-making on MVP scope and phasing

## Prerequisites

**Required from Phase 1 (if run):**

- `docs/{project-name}/01-assessing/project-context.md`
- `docs/{project-name}/01-assessing/knowledge-landscape.md`
- `docs/{project-name}/01-assessing/knowledge-assessment.md`

**Or:** A vetting handover shared by the user (paste contents or file path) as context substitute.

**From user:** Requirements list (provided in conversation).

**Optional — if enterprise analysing was run:**

- `docs/{project-name}/02-analysing/requirement-classification.md` (pre-classifies requirements; skip user classification step if present)

**Don't use for:**

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

- Ask: "No existing projects found. Do you have a vetting handover to share? If so, please share it and I'll proceed directly. Otherwise, run /neat-discovery-assessing first to establish project context."
- If handover shared → proceed with it as context substitute, skip to Step 2b
- If not → exit skill

**If projects exist:**

- List with numbers: `[1] project-a [2] project-b`
- Ask user to choose
- Store selected project name

### Step 2: Load Context

Load available context files:

```bash
# Phase 1 outputs (preferred)
cat docs/{project-name}/01-assessing/project-context.md 2>/dev/null
cat docs/{project-name}/01-assessing/knowledge-landscape.md 2>/dev/null
cat docs/{project-name}/01-assessing/knowledge-assessment.md 2>/dev/null

# Vetting handover: ask user to share if Phase 1 not run
# "Do you have a handover from neat-util-vetting? If so, please share it."

# Enterprise analysing output (optional — pre-classifies requirements)
cat docs/{project-name}/02-analysing/requirement-classification.md 2>/dev/null
```

**If none of the above exist:**

- Ask: "Can you describe the project context briefly? (What are we building and for whom?)"
- Proceed with user-provided context only

**If files exist, extract:**

- **From project-context.md / vetting handover (if shared):** Scope, constraints, stakeholders, strategic context
- **From knowledge-landscape.md:** Integration complexity, data availability
- **From knowledge-assessment.md:** Access constraints (affects risk), knowledge gaps (increases uncertainty)
- **From requirement-classification.md (if present):** Pre-classified requirements — skip Step 2b

**Why context matters for estimation:**

- **Integration complexity:** More systems → increases effort
- **Access constraints:** Permission barriers → adds risk
- **Knowledge gaps:** Missing data sources → increases uncertainty
- **Data quality issues:** Poor quality → AI stories become more complex

### Step 2b: Collect and Classify Requirements

**If requirement-classification.md was loaded:** Skip this step — use that classification directly.

**Otherwise:**

Ask the user:

> "Please list the requirements or capabilities you want to scope. You can use plain sentences, user stories, or bullet points — any format works."

Once received, classify each requirement as:

| Type | When to use |
| --- | --- |
| **AI** | Non-deterministic — needs reasoning, language understanding, judgment, or adaptive behaviour |
| **Traditional** | Deterministic — CRUD, workflows, forms, reporting, rule-based logic |
| **Hybrid** | Has both a deterministic shell and an AI-powered core (e.g., a form that triggers an AI analysis) |

Show the classification to the user and ask for confirmation before sizing:

> "Here's how I've classified the requirements — does this look right before we estimate?"

Adjust based on feedback.

### Step 3: Detect Mode (Update or New)

**See:** [Mode Detection Pattern](../references/mode-detection.md)

Apply the pattern with these values:

| Parameter | Value |
| --- | --- |
| Phase folder | `03-scoping/` |
| Artifact type | `MVP scope` |
| Update action | `re-estimate based on refined requirements` |
| Files to load | `mvp-scope.md` |
| Update question | "What changed in requirements or constraints?" |

**Special consideration for Update mode:**

Re-estimate only affected requirements. Preserve unchanged estimates to maintain consistency.

### Step 4: Estimate MVP Core Requirements

For each MVP Core requirement:

1. Identify requirement details (include REQ-ID)
2. Note its classification: **AI / Traditional / Hybrid**
3. Estimate using 4-phase process (Parse → Complexity → Risk → Size)
4. Document assumptions
5. Note escalation conditions

**Group estimates by classification:**

- AI Requirements (non-deterministic)
- Traditional Requirements (deterministic)
- Hybrid Requirements (both)

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

### Step 5b: Sub-Agent Review — Size Estimates

After estimating all MVP Core and Deferred requirements, spawn a skeptical sub-agent (`run_in_background: false`) to independently challenge the estimates — not to confirm them.

**Blind review:** Pass requirement text, classifications, and sizes only — do NOT include the complexity reasoning,
risk reasoning, or assumptions that produced each size. The sub-agent must independently assess the estimates.

**Provide the sub-agent with:**

- The project domain, scale, and key constraints (context only)
- All requirements with their full text and classification (AI / Traditional / Hybrid)
- Each story's T-shirt size (XS/S/M/L/XL/XXL) and Watch-for conditions — but NOT the reasoning that produced the size
- The MVP Core / Deferred split (which requirements are in each bucket, not why)

**Ask the sub-agent to check:**

1. Are any XXL stories present that should have been flagged for decomposition instead of estimated whole?
2. Is each story's complexity and risk reasoning independent — no copy-paste reasoning between stories?
3. Do AI stories carry appropriately higher uncertainty than Traditional stories of similar apparent scope?
4. Are Watch-for conditions specific enough to trigger re-estimation if hit (e.g. "adds M" not just "scope may grow")?
5. Does the MVP / Deferred split make sense given dependencies — are any Deferred items actually blocking MVP features?

**The sub-agent should return:** A short critique (3–5 bullets). For each finding, name the requirement, the issue, and the suggested fix.

**After receiving results:** Show findings to user. If any estimates or split decisions need revision, update before proceeding to Step 6.

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

### Step 8b: Sub-Agent Review — ROM Cost Estimates

After calculating ROM estimates, spawn a skeptical sub-agent (`run_in_background: false`) to independently challenge the cost model — not to confirm it.

**Blind review:** Pass the numbers and structure only — do NOT include the methodology explanation or the reasoning
behind duration and buffer choices. The sub-agent must independently validate the cost model.

**Provide the sub-agent with:**

- Objective: "Challenge this ROM cost estimate — find what's wrong, missing, or understated"
- Team composition and rates (facts only)
- The story size distribution (XS/S/M/L/XL/XXL counts for MVP and Deferred)
- The dependency map / critical path (the sequence only — not how it was derived)
- Duration estimate (number only — no calculation explanation)
- Infrastructure cost breakdown by category (amounts only)
- Buffer percentage and the low/high ROM ranges (numbers only, no rationale)

**Ask the sub-agent to check:**

1. Does the duration assumption follow the critical path (not a sum of all story effort)? Sequential dependencies constrain duration regardless of team size.
2. Are LLM API and AI infrastructure costs (embeddings, vector DB if applicable) included — or only labour and hosting?
3. Is the buffer percentage justified by the proportion of XL/XXL stories? More high-risk stories warrant a higher buffer (30%+).
4. Are the low/high bounds wide enough to reflect genuine uncertainty, or are they suspiciously close together given the number of unknowns?

**The sub-agent should return:** A short critique (3–5 bullets). Flag any calculation errors, missing cost categories, or duration assumptions that don't align with the critical path.

**After receiving results:** Show findings to user. Adjust ROM if needed before proceeding to Step 9.

### Step 9: Analyze Dependencies

Identify blocking relationships between requirements.

**Document dependencies in mvp-scope.md** (Dependency Map section):

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
**With [chosen auth service]:** S (integration) = 1-2 weeks
**Effort Savings:** 6-12 weeks

**Cost Comparison:**
- Build: $60k-$100k labor (ROM from estimates)
- [chosen auth service]: [verify current pricing]
- Breakeven: [calculate based on current pricing]

**Recommendation:** Buy ([chosen auth service])
**Rationale:** Auth is commodity, not our differentiator. SaaS reduces security risk, faster time-to-market, proven at scale.

### Vector Database Pattern Detected (1 story: RAG Knowledge Store)

**Current Estimate:** L = 4-8 weeks
**With [chosen vector service]:** M (integration + migration) = 2-4 weeks
**Effort Savings:** 2-4 weeks

**Cost Comparison:**
- Build: $40k-$60k labor + hosting
- [chosen vector service]: [verify current pricing]
- Breakeven: [calculate based on current pricing and scale projections]

**Recommendation:** Buy for MVP, re-evaluate after pilot
**Rationale:** Fast to market, proven performance. Re-evaluate at scale if operational costs exceed build alternative.
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

## Edge Cases

**All requirements are deterministic:**

- Classify all as Traditional, still generate mvp-scope.md
- Conclude: "No AI infrastructure needed — traditional development is sufficient"
- Proceed with sizing and MVP boundaries as normal

**No deferred requirements:**

- Document: "Deferred Features: None — full scope fits in MVP"
- Effort Summary table: Show "Deferred: 0 stories | N/A | None"

**Single XXL requirement:**

- Flag as needing decomposition before estimating
- Ask user to break it into smaller capabilities
- Provide a rough XXL estimate with caveat: "Needs spike or breakdown before commitment"

**No context files exist:**

- If neither Phase 1 outputs nor a user-shared vetting handover are available, ask for a brief project description
- Proceed with user-provided context only; note in mvp-scope.md that estimates carry higher uncertainty

**Coming from analysing with pre-classified requirements:**

- Skip Step 2b — use requirement-classification.md directly
- Reference Req IDs in story titles for traceability

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
# (Use Write tool for mvp-scope.md with REQ-IDs in story titles and classification column)

```

### Step 13: Confirm Completion and Validation Gate

```text
MVP scoping complete

Generated:
- docs/{project-name}/03-scoping/mvp-scope.md

---

VALIDATION GATE 3: Review Scope vs Effort

Review the MVP effort estimate before proceeding to Phase 3 (Designing):

MVP Assessment: {size} project ({timeline estimate})
Critical Path: {longest dependency chain}
ROM Cost: ${low}k - ${high}k

Decision Options:
1. PROCEED: MVP scope and effort are acceptable → Run /neat-discovery-designing
2. RE-SCOPE: MVP too large → Revisit requirements list and tighten scope
3. DEFER: Effort exceeds capacity → Pause discovery, revisit later

Recommendation: If MVP estimate > 9 months, consider tightening scope before designing architecture.

Next step (if approved): Run /neat-discovery-designing to create architecture blueprint
```

## Output Specifications

### mvp-scope.md (in 03-scoping/)

- Requirement classification table (AI / Traditional / Hybrid per requirement)
- Executive summary (MVP vs Deferred vs Full Scope totals)
- MVP Core sizing (grouped by classification: AI, Traditional, Hybrid)
- Deferred feature sizing
- Pattern analysis (build/buy recommendations)
- Effort summary table
- **Purpose:** Classify and size requirements for MVP scoping and architecture input

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
- Recommendation: Use [chosen auth service]
- Impact: Reduces M→S across 3 stories
- Build/Buy: Buy ([chosen auth service])

---

## Effort Summary

| Scope | Stories | Size Distribution | Assessment |
|-------|---------|-------------------|------------|
| MVP Core | X | 3S + 2M + 2L | Medium-Large |
| Deferred | Y | 1L + 2XL | Large |
| Full Scope | Z | 3S + 2M + 3L + 2XL | XL |

**Recommendation:** Phased approach - MVP first, evaluate, then deferred features.
```
