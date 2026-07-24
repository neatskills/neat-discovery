---
name: neat-discovery-analysing
description: Optional enterprise phase - build formal business case and ROI model for stakeholder alignment before scoping. Run between assessing and scoping for consulting or enterprise projects.
---

# neat-discovery-analysing

> **Optional phase.** For most product builds, requirement classification is handled inline by `/neat-discovery-scoping`.
> Use this skill only when a formal business case, ROI model, or executive stakeholder report is required before proceeding to scope.

## Overview

Build a strategic business case and formal requirement classification for enterprise or consulting projects that require
stakeholder alignment before investment decisions. Produces formal documentation for executive audiences.

## Role

**Role:** You are a Business Analyst who builds strategic business cases and formal requirement classifications for enterprise stakeholder alignment.

## When to Use

**Use this skill when:**

- An enterprise or consulting project requires formal business justification before scoping
- Stakeholders need an ROI model or executive report to approve the initiative
- A formal requirement classification document is required as a deliverable

**Do NOT use this skill when:**

- Building a product where you own the requirements (use `/neat-discovery-scoping` directly)
- The team already understands the value and just needs scope and architecture
- Coming from neat-util-vetting (the vetting brief already provides business justification)

**Position in workflow:** Runs after `/neat-discovery-assessing`, before `/neat-discovery-scoping`.
Its output (`requirement-classification.md`) is consumed by scoping to skip the inline classification step.

## Smart Mode Detection

This skill **automatically detects** whether you're starting fresh or updating existing work:

- **No existing files** → Creates new analysis
- **Files exist** → Asks user to choose update or regenerate

**No flags needed** - the skill is conversational and guides you through the right choice.

## Prerequisites

**From Phase 1:** project-context.md, knowledge-landscape.md, knowledge-assessment.md (in 01-assessing/)  
**From user:** Requirements list, business context (goals, constraints, priorities)

## Process

### Step 1: Project Selection

List existing projects in `docs/`:

```bash
ls -d docs/*/ 2>/dev/null
```

**If no projects:** Error + exit  
**If exist:** List with numbers, ask user to choose

### Step 2: Load Phase 1 Outputs

Load required files:

```bash
cat docs/{project-name}/01-assessing/project-context.md
cat docs/{project-name}/01-assessing/knowledge-landscape.md
cat docs/{project-name}/01-assessing/knowledge-assessment.md
```

**If files missing:**

- Error: "Phase 1 outputs not found. Run /neat-discovery-assessing first."
- Exit skill

**If files exist:**

- Read and parse all three files
- Use project-context.md to understand project goals, stakeholders, constraints
- Summarize key points for internal context

### Step 3: Detect Mode (Update or New)

**See:** [Mode Detection Pattern](../references/mode-detection.md)

Apply the pattern with these values:

| Parameter | Value |
| --- | --- |
| Phase folder | `02-analysing/` |
| Artifact type | `analysis` |
| Update action | `add new requirements` |
| Files to load | `requirement-classification.md, executive-report.md` |
| Update question | "What new requirements do you want to add?" |

**Special consideration for Update mode:**

Append new requirements with sequential IDs (no re-classification of existing requirements). Update affected executive report sections.

### Step 4: Gather Requirements (moved after audience identification)

*This step now happens AFTER Step 5 (audience/purpose) to ensure requirements gathering is focused on the decision context.*

### Step 5: Identify Report Audience and Purpose

**CRITICAL:** Before gathering requirements, understand who will read the report and why.

Ask one at a time:

1. **Primary audience?** (Executives, PMs, Tech leads, Mixed)
2. **Decision needed?** (Investment approval, MVP scope, Architecture, Vendor, Resources)
3. **Context?** (Stage, what's known, what's decided, timeline urgency)
4. **Multiple reports needed?** (Yes if mixed audiences or multi-level decisions)

Recommend structure, wait for approval.

### Step 6: Identify Need for Operational Report (Optional)

**Ask:** "Do you need to get buy-in from department heads, operations managers, or team leads (not just executive approval)?"

**If yes, ask:**

- Which departments/teams need to support this? (e.g., Facilities, IT, Procurement, Sustainability team, Operations)
- What's their current relationship to this initiative? (blockers, neutral, mildly supportive)
- What do you need from them? (budget, resources, data access, pilot participation, operational support)

**If operational stakeholder alignment needed:**

- Recommend adding `operational-report.md` (8-10 pages)
- Focus: Operational impact, departmental benefits, detailed use cases, change management, implementation detail
- Strategy: References executive report for strategic context, provides operational depth exec report doesn't cover

**Operational report characteristics:**

- **Operational depth** - How this works in practice, impact on day-to-day operations, detailed use case examples
- **Departmental benefits** - What's in it for facilities teams, sustainability coordinators, IT support, operations managers
- **Change management** - Training needs, workflow changes, adoption support
- **Implementation detail** - Moved from executive report appendix (exec report stays 2 pages, detail goes here)
- **Coalition building** - Social proof, partnership model, how departments get credit for supporting this

### Step 7: Gather Business Context

Ask focused questions about business context:

**Goals:**

- What business problems are you trying to solve?
- What outcomes do you want to achieve?

**Constraints:**

- Budget limitations?
- Timeline requirements?
- Regulatory/compliance requirements?
- Organizational constraints?

**Priorities:**

- What's most important? (speed, quality, cost, compliance)
- What can wait?
- Any critical deadlines?

**IMPORTANT:** After gathering business context, update project-context.md with strategic constraints.

Append to `01-assessing/project-context.md`:

```markdown
## Strategic Context (Updated from Phase 2)

**Timeline Constraints:**
- Target launch: {date if specified}
- Critical deadlines: {list if any}
- Time-to-market pressure: {high/medium/low}

**Budget Constraints:**
- Budget limitations: {if specified}
- Investment approval threshold: {if specified}

**Regulatory/Compliance:**
- Requirements: {HIPAA, SOC 2, GDPR, etc. if applicable}
- Industry standards: {if applicable}

**Priorities:**
- Primary focus: {speed/quality/cost/compliance}
- Secondary considerations: {list}
- Trade-offs accepted: {what can be deferred}
```

**Why this matters:**

- Phase 3 (Scoping) uses constraints to inform effort estimates
- Phase 4 (Designing) uses compliance/timeline to inform architecture decisions
- Keeps all project context in one canonical file

### Step 8: Gather Requirements

Ask user for requirements:

"Please provide your requirements list. This can be:

- Formal backlog items
- Feature requests
- Problem statements
- Use cases
- Or just a description of what you want to build

Share what you have - it doesn't need to be complete or detailed."

Wait for requirements input.

### Step 9: Classify Each Requirement

For each requirement, determine classification:

**Deterministic indicators:**

- Fixed business rules
- Single source of truth exists
- Predefined workflow
- Calculation/transformation logic
- CRUD operations
- No interpretation needed

**Non-deterministic indicators:**

- Requires knowledge synthesis across multiple sources
- Interpretation/judgment needed
- Context-dependent decisions
- Ambiguous inputs
- Evolving knowledge
- No single authoritative source

For each requirement:

1. **Assign unique ID:** REQ-001, REQ-002, REQ-003, etc. (sequential numbering)
2. State the requirement
3. Classify as deterministic or non-deterministic
4. Provide clear rationale
5. Reference knowledge landscape/assessment where relevant

**IMPORTANT:** Requirement IDs enable traceability from classification → estimation → architecture.
Keep IDs stable - if requirements change, update the requirement text but preserve the ID.
**Never reuse deleted IDs** - if REQ-005 is removed, next new requirement is REQ-N+1, not REQ-005.

### Step 9b: Sub-Agent Review — Requirement Classification

After classifying all requirements, spawn a skeptical sub-agent (`run_in_background: false`) to independently
challenge the deterministic / non-deterministic calls — not to confirm them.

**Blind review:** Pass requirement text and classification labels only — do NOT include the rationale for each
classification. The sub-agent must independently assess whether each label is correct.

**Provide the sub-agent with:**

- Project context: domain, stakeholders, constraints (background only — no session reasoning)
- The knowledge landscape: what sources exist, their quality, and access constraints
- Each requirement: ID, full text, and classification label (deterministic / non-deterministic) — with NO rationale attached

**Ask the sub-agent to check:**

1. Could any requirement classified as deterministic require judgment at edge cases — making it actually Hybrid or non-deterministic?
2. Are Hybrid requirements identified as such, rather than forced into one bucket?
3. Is any requirement classified as non-deterministic actually a fixed business rule that could be handled deterministically?
4. Does the classification rationale reference the knowledge landscape (available sources, quality, access) — or is it purely based on the requirement text alone?

**The sub-agent should return:** A short critique (3–5 bullets). For each finding, cite the Req ID, the current classification, and the suggested change with reasoning.

**After receiving results:** Show findings to user. If any reclassifications are accepted, update the requirement list before proceeding to Step 10.

### Step 10: Assess Feasibility (Non-Deterministic Requirements)

For each non-deterministic requirement, assess feasibility:

**Knowledge availability (check landscape and priority flags from Phase 1):**

- Is relevant knowledge documented?
- Which sources contain needed information? (Check knowledge-landscape.md priority flags)
- Is knowledge sufficient for AI to reason about this?
- **Critical elements** from Phase 1 should map to high-feasibility requirements

**Access constraints (check assessment):**

- Can we access the required knowledge?
- Are barriers manageable?
- Technical/organizational feasibility of access?

**AI reasoning capability:**

- Given knowledge quality, can AI realistically handle this?
- Is the problem well-defined enough?
- Are there similar solved problems?

Mark each as:

- High feasibility
- Medium feasibility (with caveats)
- Low feasibility (significant risks)

### Step 10b: Sub-Agent Review — Feasibility Assessment

After assessing feasibility for all non-deterministic requirements, spawn a skeptical
sub-agent (`run_in_background: false`) to independently challenge the ratings — not to confirm them.

**Blind review:** Pass requirement text and rating labels only — do NOT include the rationale for each rating.
The sub-agent must independently assess feasibility given the available evidence.

**Provide the sub-agent with:**

- Objective: "Challenge these feasibility ratings — find where they are optimistic, unsupported, or misaligned with the evidence"
- The knowledge landscape: what sources exist, their quality, access constraints, and priority flags (Critical / Important / Nice-to-have)
- Each non-deterministic requirement: ID, full text, and feasibility rating (High / Medium / Low) — with NO rationale attached

**Ask the sub-agent to check:**

1. Is any feasibility rating correlated with client enthusiasm or strategic importance rather than evidence of
   data availability and access? (High-value requirements lacking knowledge sources should be Medium or Low, not High.)
2. Do Low feasibility ratings name specific blockers (missing data, access denial, unclear scope) rather than vague uncertainty?
3. Do the Phase 1 access constraints (permission barriers, technical barriers) appear in the feasibility rationale for affected requirements?
4. Are there requirements where the feasibility rating conflicts with the Phase 1 priority flag?
   (e.g. a Critical element rated Low feasibility — this tension needs to be explicitly surfaced, not silently resolved.)

**The sub-agent should return:** A short critique (3–5 bullets). For each finding, cite the Req ID and the specific concern.

**After receiving results:** Show findings to user. If any ratings are revised, update the feasibility assessment before proceeding to Step 11.

### Step 11: Identify Need for Technical Spikes (Optional)

For requirements marked as **low feasibility** or **medium feasibility with significant uncertainty**, consider recommending a technical spike.

**When to recommend a spike:**

- Feasibility is uncertain despite available knowledge
- Novel technical approach with no proven precedent
- Integration complexity unknown
- Performance/scalability concerns
- Third-party API/service capabilities unclear

**Ask:** "Requirements [list IDs] have uncertainty around [specific concern]. Should we run a time-boxed technical spike before estimating?"

**If yes:**

- Recommend spike duration: 1-3 days typically
- Define spike goal: specific question to answer
- Suggest spike approach: prototype, proof-of-concept, benchmark test
- Document in requirement-classification.md

**Spike documentation format:**

```markdown
## Technical Spikes Recommended

| Req ID | Uncertainty | Spike Goal | Approach | Duration |
|--------|-------------|------------|----------|----------|
| REQ-005 | PDF extraction accuracy | Can we extract tables from scanned PDFs? | Test 3 libraries (pdfplumber, Camelot, Tabula) on sample docs | 2 days |
| REQ-012 | Real-time performance | Can RAG respond in <2 seconds with 100-doc corpus? | Benchmark Pinecone vs pgvector with sample queries | 1 day |
```

**Impact on workflow:**

- If spikes approved: Pause before Phase 3 (Scoping), run spikes, update feasibility
- If spikes deferred: Document assumption in requirement-classification.md, flag risk
- Spike results feed into Phase 3 with validated complexity

### Step 12: Build Strategic Business Justification (Audience-Specific)

**Tailor content depth and focus to identified audience from Step 5:**

**For executive decision-makers (C-level, VPs):**

- Focus on strategic value, competitive advantage, business impact
- Emphasize: What becomes possible that isn't today? What's the opportunity cost of not investing?
- Minimize: Technical details, implementation specifics
- Length: 10-15 pages max (executives won't read 30-page reports)

**For enterprise executive audiences (C-suite, VPs, Global leadership):**

- **Strategic framing:** Enterprise-wide capability gaps, organizational scaling bottlenecks, ESG/compliance mandates
- **Value language:** Global knowledge sharing, capital efficiency, OpEx avoidance, asset utilization
- **Problem framing:** "Strategic disconnect" / "Enterprise blind to wins" / "Systemic bottleneck" (NOT "users resist forms")
- **Solution framing:** "Intelligence layer" / "Knowledge synthesis platform" / "Institutional memory" (NOT "tracking tool")
- **Scope framing:** "Lean execution avoiding IT bloat" (emphasize speed to value, not feature richness)
- **Business case structure:** Enterprise metric tables (Old Way vs AI Way → Strategic Benefit)
- **Tone:** Organizational transformation, competitive positioning, governance, capital allocation
- **Length:** 10-12 pages (enterprise executives have less time than PMs)
- **Recommendation:** Low-risk pilot with specific scope, metrics, duration, decision gate

**For product/project managers:**

- Focus on scope clarity, feature prioritization, delivery timeline
- Emphasize: MVP definition, what's in/out, phasing strategy, success criteria
- Include: Effort estimates, dependencies, risks to timeline
- Length: 15-20 pages (more detail on execution)

**For technical leadership:**

- Focus on architecture feasibility, technical risks, infrastructure requirements
- Emphasize: Why specific technical approaches, alternatives considered, integration complexity
- Include: Detailed effort breakdown, technology choices, scalability considerations
- Length: 20-30 pages (deep technical justification)

**For mixed audiences:**

- Create layered document: Executive summary (2-3 pages) + detailed sections with clear headers
- OR create separate reports for each audience referencing common requirement classification

---

Focus on qualitative strategic value, NOT financial ROI or quantitative effort estimates.

**IMPORTANT - Effort Estimates:**

- **DO NOT include quantitative effort estimates** (hours, months, team size) in executive report
- Phase 3 (Scoping) will produce detailed T-shirt sizing and ROM cost estimates
- If asked about effort, respond qualitatively: "This is a substantial investment requiring dedicated AI/ML capability"
- Executive approval should be contingent on Phase 3 effort validation
- **Rationale:** Phase 2 focuses on qualitative strategic value. Quantitative ROM cost estimates are deferred to Phase 3 (after T-shirt sizing) to ensure accuracy.

**Why AI is needed:** Explain why traditional approaches fail (fragmented knowledge, context-dependent decisions, volume, evolution speed).

**What becomes possible:**

Describe capabilities AI enables:

- Capabilities currently impossible (e.g., reason across 100 policy documents)
- Competitive advantages (e.g., real-time synthesis competitors can't match)
- Efficiency gains (e.g., automate knowledge-intensive manual work)

Use concrete examples from the requirements.

**Scope of AI opportunity:**

Which requirements benefit from AI infrastructure:

- List high-feasibility non-deterministic requirements
- Group by domain/capability
- Estimate scope (small, medium, large)

**Tradeoffs and risks:**

Be honest about costs:

- Infrastructure complexity (new systems, integration work)
- Organizational change (new workflows, training, governance)
- Investment required (time, budget, resources)
- Timeline to value

**Risk assessment:**

Compare scenarios:

- What happens if we don't invest in AI? (missed opportunities, competitive disadvantage)
- What if AI implementation fails? (fallback options, mitigation strategies)

**Alternatives considered:**

Why not use traditional approaches:

- Traditional development: Why it won't handle non-deterministic requirements
- Manual processes: Why they don't scale
- Partial automation: Why full AI infrastructure is needed

### Step 13: Prioritize Requirements

Prioritize non-deterministic requirements:

**Criteria:**

- Value: Business impact and strategic importance
- Feasibility: Knowledge availability and access constraints
- Dependencies: What enables what?
- Risk: Implementation complexity and uncertainty

Create prioritized list:

1. High value + high feasibility (quick wins)
2. High value + medium feasibility (strategic investments)
3. Medium value + high feasibility (tactical improvements)
4. Everything else (defer or traditional approach)

### Step 14: Detect Project Complexity

Analyze to determine document structure:

**Simple project indicators:**

- < 10 requirements
- Single domain
- Straightforward business context
- Few constraints

**Complex project indicators:**

- 20+ requirements
- Multiple domains
- Complex business context with many constraints
- Multiple stakeholders with different priorities

### Step 15: Propose Document Structure

Based on complexity AND audience (from Step 5), propose structure following **audience-specific best practices**.

**IMPORTANT:** Reference the audience and decision context identified in Step 5. Tailor structure to that specific need.

---

## Content Layering Strategy (Minimize Redundancy)

When generating multiple reports, use this **layered content architecture**:

```text
requirement-classification.md (FOUNDATION - write once)
    ↓ [referenced by all other reports]
    ├── executive-report.md / business-case.md
    │     ↓ [stakeholder brief references this for full context]
    │     └── stakeholder-brief.md (if needed from Step 5A)
    │
    ├── technical-analysis.md
    │     [references foundation + exec report]
    │
    └── implementation-plan.md
          [references foundation + exec + tech]
```

### Smart Redundancy Rules

**DO repeat (but adapt per audience):**

1. **Core insight** - The fundamental problem
   - Exec report: Strategic impact
   - Stakeholder brief: Impact on their department
   - Tech analysis: Why technical solution needed

2. **Key recommendation** - The decision requested (keep 1-2 sentences, identical)

3. **Success criteria** - What "done" looks like (same criteria, different emphasis)

**DON'T repeat (write once, reference):**

1. **Detailed requirement lists** → Only in `requirement-classification.md`
2. **Complete effort breakdown** → Only in `technical-analysis.md` or `implementation-plan.md`
3. **Architecture diagrams** → Only in `technical-analysis.md`
4. **Full risk mitigation strategies** → Detailed in one report, summarized in others
5. **Complete alternatives analysis** → Full version in exec report, summarized elsewhere

### Cross-Reference Pattern

Use explicit references to avoid duplication:

```markdown
## Requirements Summary

This initiative addresses X requirements (Y deterministic, Z non-deterministic).

**For complete requirement analysis:** See requirement-classification.md

**For technical architecture:** See technical-analysis.md Section 4

This report focuses on [business case / stakeholder benefits / implementation plan].
```

---

**Executive Report Principles:**

- **Target length based on audience:**
  - **Enterprise C-suite/VP:** 2-page Executive Summary + Appendix (research shows executives judge by visual density—if it looks exhausting, it won't get read)
  - **Product/Project managers:** 6-8 pages (more execution detail)
  - **Technical leadership:** 8-12 pages (deep technical justification)
- **One core message per section** - make it instantly clear what the section proves
- **Decisive, not exhaustive** - emphasize clarity over comprehensiveness
- **Logical flow:** Context → Opportunity → Approach → Risks → Recommendation → Bottom Line
- **Executive Summary best practices (based on 2026 industry research):**
  - Lead with recommendation in first sentence
  - Three supporting points maximum
  - One visual (table/diagram) if it adds clarity
  - Clear ask and next step
  - Under 500 words with significant white space

**Enterprise Executive Report Patterns:**

When writing for C-suite/VPs/Global leadership, apply these five patterns:

**1. Two-Page Executive Summary (REQUIRED for Enterprise):**

Structure: Header block → 2-page Executive Summary → Appendix (full detail)

Header block fields: Date · Organization · Strategic Goal · Audience · Decision Requested

Executive Summary content (in order):

- **Recommendation** — first sentence, direct investment ask
- **Strategic Problem** — 2-3 sentences, enterprise-scale failure mode
- **Solution** — 2-3 sentences, what it does and how
- **Business Case** — 3-row table (Enterprise Metric | Old Way | AI-First Way | Strategic Benefit; rows: Speed to Value, OpEx Avoidance, Asset Utilization)
- **Scope** — Building ✅ (CRITICAL/ESSENTIAL items) vs Deferring ⏸️
- **Pilot Proposal** — duration · scope · proof metric · decision gate
- **Risk Mitigation** — if pilot fails, data dependency, technical delivery
- **Next Step** — specific funding ask; link to Appendix for full analysis

Appendix sections: Enterprise Bottleneck · Solution Approach · Use Case Examples · Risk Scenarios · Alternatives · Technical Feasibility

**2. Problem Statement (Enterprise Framing):**

- Title: "The [Strategic Disconnect / Enterprise Bottleneck]" — organizational scale, not individual
- Core Problem: Enterprise is blind to X / Cannot scale Y / Knowledge trapped
- Frame as: organizational capability gap, NOT technology/budget/individual problem
- Without AI: global blindness · reinventing wheels · SME bottleneck · capital waste
- With AI: global sharing · scales without headcount · transforms isolated → enterprise standards
- Use Case: show GLOBAL impact across sites (before/after), not individual efficiency

**3. Business Case (Enterprise Metrics):**

Always a 4-column table: Enterprise Metric | Old Way | AI-First Way | Strategic Benefit
Standard rows: Speed to Value · OpEx Avoidance · Asset Utilization

**4. Scope Framing (Lean Execution):**

Open with: "We are avoiding the trap of a bloated, multi-year IT implementation."
Building ✅: AI Core capabilities (CRITICAL) + minimal infrastructure (ESSENTIAL)
Deferring ⏸️: Complex features with rationale (contradicts lean approach)

**5. Recommendation Structure:**

- One-sentence investment ask (direct)
- Why This Matters: connect to strategic org goal (2-3 sentences)
- Pilot Scope: deploy to X · prove Y · measure Z · demonstrate W
- Decision Gate: what gets decided at completion (scale / iterate / cancel)

**For simple projects (< 10 requirements):**

```markdown
requirement-classification.md:
- Requirements Overview
- Deterministic Requirements
- Non-Deterministic Requirements
- Feasibility Assessment
- Prioritization

executive-report.md:
# [Project] Executive Report: [Title]
**Metadata block** (date, org, audience, architecture)

## Executive Summary
[The decision in 1-2 pages - not a table of contents]

## Why This Matters
[Consolidated problem statement - ONE core message: why traditional approaches fail]
[NOTE: Use project-specific title, not generic "Why AI Is Needed"]
[Examples: "Why Knowledge Is Trapped in Documents", "Why Manual Review Doesn't Scale"]

## What AI Enables
[Transformation overview - consolidate capabilities + advantages + efficiency]

## Proposed Approach
[MVP scope: what's in, what's deferred]

## Key Risks and Tradeoffs
[Decision-focused: what could block success + mitigation strategies]

## Recommendation
[Clear, explicit recommendation with success criteria]

## Bottom Line
[Single-page decision summary: options + recommended path + next steps]
```

**For complex projects (20+ requirements, multiple domains):**

```markdown
requirement-classification.md:
- Strategic Direction
- Requirements Overview (X deterministic, Y non-deterministic)
- AI Capabilities (non-deterministic, with classification/priority/feasibility)
- Essential Supporting Features (deterministic, grouped by function)
- Deferred Features (Phase 2+)
- Feasibility Assessment (consolidated)
- Prioritization Matrix (MVP / Phase 2 / Deferred)
- Dependencies
- Recommendations

executive-report.md sections:
- Executive Summary (strategic decision, core insight, approach, scope, recommendation)
- Why [Specific Problem] Is Needed (project-specific title; 2-3 challenges: problem → why traditional fails → what AI enables)
- What Becomes Possible (capabilities + competitive advantages + efficiency gains in one section)
- Competitive Landscape (optional — only if competitive intel is available)
- Scope of AI Opportunity (MVP vs deferred, phased rollout)
- Tradeoffs and Risks (2-3 tradeoffs; 3-scenario Risk Assessment in bullets, not prose)
- Alternatives Considered (1 page max; cross-reference mvp-scope.md Pattern Analysis for quantitative)
- Recommended Scope and Phasing (Phase 1 MVP · Phase 2 · Long-Term)
- Conclusion (core insight → decision options → recommendation with next steps)
```

---

**For operational stakeholder report (if identified in Step 6):**

Header: Audience · Purpose (operational impact) · link to executive-report.md for strategic context

```markdown
operational-report.md sections:
- Overview (what it does, who it affects; reference executive-report.md for business case)
- How It Works (detailed operational flow — moved from exec appendix)
- Operational Use Cases (before/after per department workflow)
- Departmental Benefits (per team: 3-5 benefits · workflow changes · support provided)
- Change Management & Adoption (training plan · what stays same / what's new · time investment)
- Implementation Support (what we handle · specific asks from each dept with time bounds)
- Coalition Building (real quotes ONLY — never fabricate; if none, use placeholder; credit/recognition)
- Risk Mitigation (pilot bounded · no disruption during pilot · decision gate / exit option)
- Next Steps (dated milestones)
```

**Key constraint:** NEVER fabricate stakeholder quotes. If no real endorsements, use: "Stakeholder engagement pending: [details]"

---

Show to user: "Does this structure work, or would you like to adjust?"

Wait for approval.

### Step 16: Document Assumptions

Before generating final documents, identify key assumptions made during analysis:

**Common Phase 2 assumptions:**

- AI feasibility assessments (e.g., "LLM can handle multi-document synthesis")
- User adoption ("Users will interact with AI assistant")
- Integration complexity ("API integration is straightforward")
- Regulatory/compliance (e.g., "GDPR allows AI processing of this data")
- Timeline/budget constraints shared by stakeholders

**Update assumptions register:**

Load existing assumptions-register.md, find highest A-XXX ID from Phase 1, and add Phase 2 assumptions starting at next sequential number:

- Example: If Phase 1 created A-001 to A-005, Phase 2 starts at A-006
- Reference requirement IDs where applicable (e.g., "A-010: REQ-005 feasibility assumes PDF extraction accuracy >90%")
- Mark validation status (many will be ⏳ Pending - need technical spike or user research)
- Document impact if wrong (High/Medium/Low)

**Cross-reference with technical spikes (Step 9A):**

- If technical spikes recommended, assumptions should reference spike validation
- Example: "A-011: Real-time RAG performance <2s (⏳ Pending - Spike planned for Week 2)"

### Step 17: Generate Output Documents

Generate markdown files following approved structure.

**For requirement-classification.md:**

- Clear classification with rationale
- Feasibility assessment for non-deterministic items
- Prioritized list
- Reference knowledge landscape/assessment where relevant

**For executive-report.md:**

Follow these content principles:

**Decisive, not exhaustive:**

- One core message per section (state it in section intro)
- Use comparison tables to show impact clearly ("Without X" vs "With X")
- Consolidate related content (don't fragment into many subsections)
- Cut repetitive examples (one strong example beats three weak ones)

**Scannable:**

- Use bullets and numbered lists for quick navigation
- Tables for comparisons, effort estimates, success criteria
- Visual indicators in markdown: [IN SCOPE], [DEFERRED], [HIGH RISK], [MEDIUM RISK], [LOW RISK]
- Highlight boxes: Use `>` blockquotes or bold section intros for key insights

**Evidence-based and credible:**

- Concrete examples from actual requirements (not generic AI benefits)
- Show transformation: "Today users X, with AI they Y" comparisons
- Reference knowledge landscape/assessment specifics
- **NO FABRICATED METRICS:** Never invent quantitative claims (e.g., "5-10x faster", "30-60 minutes", ">50% adoption")
- **Qualitative-first:** Use comparative language ("faster", "significantly reduced", "substantial improvement") unless metrics come from actual user research or documented benchmarks
- **Evidence requirement:** Any specific number MUST have a source (user interview, benchmark study, pilot data, industry standard)
- **When uncertain:** Use ranges with caveats ("estimated 20-40% reduction based on similar document processing implementations") or omit the number entirely

**Tighten verbose sections:**

- **Risk Assessment:** 3 scenarios in bullets, not multi-paragraph narratives
- **Alternatives Considered:** 1 page max - show you evaluated them, don't exhaustively analyze
- **What Becomes Possible:** Consolidate capabilities + advantages + efficiency into 2-3 pages (not separate 3-page sections each)

**Professional tone:**

- Write for executives (strategic, decisive, clear)
- Avoid hedging ("might", "could potentially") - be direct
- Honest about risks, but focus on mitigation

**Clear recommendation:**

- End with explicit recommendation
- Present decision options (invest / alternative / do nothing)
- State recommended path with next steps

**Target length:** 10-15 pages when converted to PDF

**If updating existing files:**

- Merge new requirements into existing structure
- Update analysis based on new information
- Flag contradictions for user review
- Don't auto-resolve conflicts

### Step 18: Write Files

**File naming based on audience (from Step 5 and Step 5A):**

**Always generate:**

- `requirement-classification.md` - Foundation document (all requirements classified with IDs)

**Based on primary audience (Step 5):**

- Executive decision-makers → `executive-report.md` (2-page summary + appendix for investment decisions)
- Product/project managers → `implementation-plan.md` (or `mvp-scope.md`)
- Technical leadership → `technical-analysis.md` (or `architecture-justification.md`)
- Mixed audiences → Multiple files: `executive-report.md` + `technical-analysis.md`

**If operational stakeholder alignment needed (Step 6):**

- Add `operational-report.md` (8-10 pages: operational impact, departmental benefits, implementation detail)

**Write order (to enable cross-references):**

1. `requirement-classification.md` FIRST (foundation with requirement IDs)
2. Primary audience report (e.g., `executive-report.md` - 2 pages + appendix)
3. `operational-report.md` LAST if needed (can reference executive-report.md for strategic context, includes operational depth)
4. Any additional reports (e.g., `technical-analysis.md` if technical stakeholders need architecture detail)

```bash
# Create Phase 2 directory
mkdir -p docs/{project-name}/02-analysing

# Files from Phase 1 are in docs/{project-name}/01-assessing/
# (Use Write tool for requirement-classification.md with IDs)
# (Use Write tool for [primary-audience].md)
# (Use Write tool for stakeholder-brief.md if needed)
```

### Step 19: Confirm Completion and Validation Gate

```text
Requirement analysis complete

Generated:
- docs/{project-name}/02-analysing/requirement-classification.md
- docs/{project-name}/02-analysing/executive-report.md
- docs/{project-name}/assumptions-register.md (updated with Phase 2 assumptions)

---

VALIDATION GATE 2: Approve Requirement Classification

Before proceeding to Phase 3 (Scoping), validate requirement classification with stakeholders:

Review Checklist:
- requirement-classification.md: Requirements classified correctly (deterministic vs non-deterministic)?
- MVP Core scope: Right features in MVP? Anything missing or should be deferred?
- Feasibility assessments: Agree with feasibility ratings (high/medium/low)?
- Prioritization: Correct priority order for AI capabilities?

Questions to Ask Stakeholders:
1. Is the MVP scope correct (not too large, not too small)?
2. Are requirements classified correctly (AI vs traditional)?
3. Do feasibility assessments align with your knowledge of data/systems?
4. Any requirements we missed or misunderstood?

Validation Options:
APPROVED: Classification correct, MVP scope approved → Proceed to /neat-discovery-scoping
RE-CLASSIFY: Stakeholders request scope changes → Update classification, re-validate
HOLD: Need more requirements discovery → Gather additional requirements

Recommendation: Do NOT scope until classification is approved. 
Scoping wrong requirements wastes effort and creates confusion.

Next step (if approved): Run /neat-discovery-scoping to scope and size MVP requirements
```

## Output Specifications

### requirement-classification.md (always generated, in 02-analysing/)

- Each requirement classified: deterministic vs non-deterministic
- Rationale for each classification
- Feasibility assessment for non-deterministic requirements
- Prioritization by value and feasibility
- **Purpose:** What should be built with AI vs traditional development
- **Audience:** Internal working document, referenced by all other reports

### Report Types (based on Step 5 audience identification, in 02-analysing/)

#### executive-report.md / business-case.md

- **Audience:** C-level, VPs, executive decision-makers
- **Purpose:** Strategic business justification for AI investment (go/no-go decision)
- **Length:** 10-15 pages
- **Focus:** Strategic value, competitive advantage, business impact, what becomes possible
- **Content:** Why AI needed, what it enables, scope recommendation, risks, alternatives, recommendation
- **Tone:** Decisive, strategic, evidence-based (no fabricated metrics)

#### implementation-plan.md / mvp-scope.md

- **Audience:** Product managers, project managers
- **Purpose:** Scope definition and delivery planning
- **Length:** 15-20 pages
- **Focus:** MVP boundaries, feature prioritization, phasing strategy, success criteria
- **Content:** Detailed scope (in/out), effort estimates, dependencies, timeline, pilot plan
- **Tone:** Practical, execution-focused, clear on tradeoffs

#### technical-analysis.md / architecture-justification.md

- **Audience:** CTO, technical architects, engineering leadership
- **Purpose:** Technical feasibility and architecture decision support
- **Length:** 20-30 pages
- **Focus:** Architecture alternatives, technical risks, infrastructure requirements, integration complexity
- **Content:** Detailed technical approach, technology choices, scalability, effort breakdown by component
- **Tone:** Technical depth, alternatives analysis, honest about complexity

#### operational-report.md

- **Audience:** Department heads, operations managers, team leads who need to support the initiative
- **Purpose:** Operational alignment and coalition building (get buy-in from peer stakeholders)
- **Length:** 8-10 pages
- **Focus:** Operational impact, departmental benefits, implementation detail, change management
- **Content:** How it works in practice, detailed use cases, workflow changes, training needs,
  what you'll handle vs what departments provide, credit/recognition, risk mitigation for operational teams
- **Tone:** Operational depth, benefit-forward, collaborative, addresses "how this affects my day-to-day work"
- **References:** Points to executive-report.md for strategic business case (doesn't duplicate it)
- **Note:** Operational report contains detail moved from executive report appendix (keeps executive report at 2 pages)
- **CRITICAL:** NEVER fabricate quotes, testimonials, or endorsements. If "Early Support" section is included,
  it must contain ONLY real quotes from actual stakeholder conversations, or be explicitly marked as placeholder:
  "Stakeholder engagement pending: [details]"

**Multi-report scenarios:**

- Generate requirement-classification.md (common base)
- Generate multiple audience-specific reports referencing the classification
- Each report pulls relevant content for that audience's decision context
- If stakeholder alignment needed: Add stakeholder-brief.md (references exec report, focuses on peer benefits)

## Common Mistakes

| Mistake | Rule |
| --- | --- |
| Skipping Phase 1 load | Must load knowledge landscape and assessment |
| Financial ROI focus | Focus on strategic value, not spreadsheet analysis |
| Auto-resolving conflicts | Flag contradictions, let user decide |
| Generic recommendations | Use concrete examples from actual requirements |
| Missing feasibility assessment | Every non-deterministic requirement needs assessment |
| **Fabricating metrics** | **NEVER invent numbers - executives will fact-check. Use qualitative comparisons or cite sources** |
| **Fake success criteria** | **Pilot success thresholds must come from stakeholder input or industry standards, not made up** |
| **Unsupported time estimates** | **Don't claim "5-10 minutes" vs "30-60 minutes" without user research backing it** |
| **Fake testimonials/quotes** | **NEVER fabricate stakeholder endorsements, quotes, or "early support". If no real quotes exist, use placeholder or omit section entirely** |

## Edge Cases

**Incomplete requirements:**

- Work with what's provided
- Document assumptions
- Note areas needing clarification

**All requirements are deterministic:**

- Still generate report
- Conclusion: "Traditional development sufficient, AI infrastructure not needed"

**Conflicting priorities:**

- Document conflicts
- Present options
- Let user choose

**Access to critical knowledge blocked:**

- Flag as high-risk in feasibility
- Include in tradeoffs section
- May make some requirements infeasible
