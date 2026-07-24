---
name: neat-discovery-analysing
description: Optional enterprise phase - build formal business case and ROI model for stakeholder alignment before scoping. Run between assessing and scoping for consulting or enterprise projects.
---

# neat-discovery-analysing

> **Optional phase.** For most product builds, requirement classification is handled inline by `/neat-discovery-scoping`. Use this skill only when a formal business case, ROI model, or executive stakeholder report is required before proceeding to scope.

## Overview

Build a strategic business case and formal requirement classification for enterprise or consulting projects that require stakeholder alignment before investment decisions. Produces formal documentation for executive audiences.

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

**Position in workflow:** Runs after `/neat-discovery-assessing`, before `/neat-discovery-scoping`. Its output (`requirement-classification.md`) is consumed by scoping to skip the inline classification step.

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
|-----------|-------|
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

- Phase 3 (Estimating) uses constraints to inform effort estimates
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

- If spikes approved: Pause before Phase 3 (Estimating), run spikes, update feasibility
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
- Phase 3 (Estimating) will produce detailed T-shirt sizing and ROM cost estimates (see Step 7A)
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

When writing for C-suite/VPs/Global leadership, use these framing patterns:

**1. Two-Page Executive Summary Structure (REQUIRED for Enterprise Audiences):**

Based on 2026 best practices: executives judge documents by visual density before reading a word. Keep to 2 pages maximum.

```markdown
# [Project] Executive Report: [Title]

**Date:** [Date]  
**Organization:** [Org]  
**Strategic Goal:** [One-line org mandate]  
**Prepared For:** [C-suite titles]  
**Decision Requested:** [Investment approval / Pilot authorization / Budget allocation]

---

## Executive Summary

**Recommendation:** Invest in [Platform] [MVP/pilot]. [One sentence: why this addresses strategic goal]

**Strategic Problem:** [2-3 sentences: Enterprise-level failure mode—what's broken at organizational scale]

**Solution:** [Platform] is an AI-powered [intelligence layer/knowledge synthesis platform] that [how it removes organizational friction in 2-3 sentences].

**Business Case:**

| Enterprise Metric | Old Way | AI-First Way | Strategic Benefit |
|-------------------|---------|--------------|-------------------|
| **Speed to Value** | [Blocked/slow] | [Enabled/fast] | [Capability unlock] |
| **OpEx Avoidance** | [Hire specialists] | [AI scales without headcount] | Capital Efficiency |
| **Asset Utilization** | [Duplicate spending] | [Discover & reuse] | Accelerated Execution |

**Scope (Lean Execution):**

We are avoiding bloated IT programs. [Platform] is a lean, high-impact intelligence layer.

**Building (MVP):**
- ✅ [AI capability 1] (CRITICAL - [value])
- ✅ [AI capability 2] (CRITICAL - [value])
- ✅ [Minimal infrastructure] (ESSENTIAL)

**Deferring (Rapid deployment):**
- ⏸️ [Complex feature type] (contradicts lean approach)

**Pilot Proposal:**

- **Duration:** [90 days typical]
- **Scope:** [Deploy to N sites/teams]
- **Prove:** [AI quality metric - e.g., >85% extraction accuracy]
- **Measure:** [Adoption metric, reuse instances]
- **Decision Gate:** Validate quality + adoption → Scale / iterate / cancel

**Risk Mitigation:**

- **If pilot fails:** [Minimal sunk cost, decision gate limits exposure]
- **Data quality dependency:** [Seed with curated examples, user validation workflow]
- **Technical delivery:** [Use managed services, proven patterns]

**Next Step:** Approve seed funding for 90-day pilot. [Specific $ if known, or "budget TBD pending Phase 3 estimation"]

---

**For full analysis:** See Appendix (supporting detail for stakeholders who need depth)

---

## Appendix

[Full sections for those who need detail - this is where 8-10 pages of supporting content goes]

### A. The Enterprise Bottleneck (Detail)
[Full problem analysis]

### B. The [Solution] Approach (Detail)
[Technical approach, how it works]

### C. Enterprise Use Case Examples
[Concrete examples with before/after]

### D. Risk Assessment (Scenarios)
[Full scenario analysis]

### E. Alternatives Considered
[Why other approaches won't work]

### F. Technical Feasibility
[Architecture considerations, if needed for technical stakeholders]
```

**Key Pattern Changes from Research:**

- **Lead with recommendation** (first sentence of Executive Summary)
- **Visual density matters** (use tables, bullets, white space)
- **2 pages for decision** (executives won't read 10+ pages)
- **Appendix for depth** (those who need detail can dive in)
- **Clear ask** (specific pilot scope, metrics, budget)

**2. Problem Statement Pattern (Enterprise Framing):**

Use this for "Why This Matters" / "The Strategic Disconnect" sections:

```markdown
## [Number]. The [Strategic Disconnect / Enterprise Bottleneck]

[Organization-level description - what's broken at scale]

**The Core Problem:** [Enterprise is blind to X / Cannot scale Y without Z / Knowledge trapped and lost]

**This is not** a technology problem, budget constraint, or individual pain point.
**This is** an organizational capability gap / systemic scaling bottleneck.

**Without AI (Enterprise-Level Consequences):**
- [Global blindness - enterprise can't see local wins]
- [Reinventing the wheel - sites solve same problem independently]
- [SME bottleneck - can't validate/scale without hiring expensive specialists]
- [Capital waste - paying twice for same solution]

**With AI (Enterprise Capability Unlock):**
- [Global knowledge sharing - local wins become enterprise intelligence]
- [Scales without headcount - AI validates, no SME army needed]
- [Transforms isolated work → enterprise standards]

### Enterprise Use Case: [Concrete Domain Example]

[Show GLOBAL impact across sites/regions, NOT individual efficiency]

**Before (Old Way):**
- [Site A achieves optimization win]
- [Knowledge stays in local documents]
- [Site B tackles same problem 6 months later, starts from scratch]
- [Enterprise pays twice - duplicate vendor research, duplicate implementation]

**After ([Platform] Way):**
- [Site A uploads project documents]
- [AI extracts methodology, validates approach]
- [Globally searchable - any site queries platform]
- [Site B discovers proven solution, replicates with exact blueprint]
```

**3. Business Case Structure (Enterprise Metrics):**

```markdown
## [Number]. The Business Case & Strategic ROI

| Enterprise Metric | The "Old Way" (Form-Based/Manual) | The [Platform] Way (AI-First) | Strategic Benefit |
|-------------------|-----------------------------------|-------------------------------|-------------------|
| **Speed to Value** | [Manual entry → low adoption → incomplete data] | [Document upload → AI validation → integrates with workflow] | **High Compliance**: Captures real-time data with zero pushback |
| **OpEx Avoidance** | [Hire ESG analysts/SMEs per site] | [AI infers calculations; validated projects become templates] | **Capital Efficiency**: Scales global ESG intelligence without expanding specialized payroll |
| **Asset Utilization** | [Knowledge localized; wasted capital on duplicate research] | [AI-powered semantic search connects users to proven solutions] | **Accelerated Execution**: Stop paying to solve same problem twice |
```

**4. Scope Framing (Lean Execution Pattern):**

```markdown
## [Number]. Scope & Lean Execution Plan

We are avoiding the trap of building a bloated, multi-year IT implementation.

**[Platform] is designed as:** A lean, high-impact [intelligence layer / knowledge synthesis platform / institutional memory system].

### What We Are Building (MVP Focus)

**[AI Core / Intelligence Engine / Synthesis Capability]:**
1. ✅ **[Capability 1]:** [Description] (CRITICAL - [strategic value])
2. ✅ **[Capability 2]:** [Description] (HIGH - [strategic value])

**[Thin Supporting Layer / Minimal Infrastructure]:**
1. ✅ **[Infrastructure 1]:** [What's needed] (ESSENTIAL - [why])

### What We Are Deliberately Deferring (To Ensure Rapid Deployment)

- ⏸️ **Complex [feature type]:** [Why this contradicts lean approach / bloats timeline]
- ⏸️ **[Another feature]:** [Why defer to post-pilot]

**Why defer:** Contradicts AI-first lean approach. Can be captured in [flexible format] initially. Add iteratively based on pilot feedback—don't build until users ask.
```

**5. Recommendation Structure (Enterprise Action Pattern):**

```markdown
## [Number]. Executive Recommendation

[One-sentence investment ask - be direct]

**Why This Matters:**

[Connect to strategic org goal - ESG targets, competitive position, governance. 2-3 sentences.]

**Proposed Next Step:**

Greenlight [seed funding / pilot program / MVP development] for [duration - typically 90 days].

**Pilot Scope:**
- **Deploy to:** [Cross-functional group of N sites / specific business unit / targeted use case]
- **Prove:** [Data extraction accuracy / AI quality metric / methodology inference capability]
- **Measure:** [User adoption rate / knowledge reuse instances / efficiency gain]
- **Demonstrate:** [Immediate ROI metric / strategic unlock / capability proof to Executive Committee]

**Decision Gate:** [When complete, what gets decided - scale globally / iterate scope / cancel if pilot fails]
```

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
- Strategic Direction (AI-first architectural decision if applicable)
- Requirements Overview (summary stats: X deterministic, Y non-deterministic)
- [Group 1]: AI Capabilities (Non-Deterministic Requirements)
  - Each capability with classification, priority, feasibility
- [Group 2]: Essential Supporting Features
  - Deterministic requirements grouped by function
- [Group 3]: Deferred Features
  - Deferred to Phase 2+ based on MVP prioritization
- Feasibility Assessment (consolidated, not per-requirement)
- Prioritization Matrix (tiered: MVP / Phase 2 / Deferred)
- Dependencies
- Recommendations

executive-report.md:
# [Project] Executive Report: [Title]
**Metadata block**

## Executive Summary
- Strategic Decision statement (what this project IS and IS NOT)
- Core Insight (the fundamental problem)
- Proposed Approach (high-level solution)
- Why This Matters (comparison: without AI vs with AI)
- Scope Recommendation (MVP focus + what's deferred)
- Business Value bullets
- Final Recommendation

## Why [Specific Problem/Approach] Is Needed
[Use project-specific title that captures the core problem/insight]
[Examples: "Why Document Extraction Solves the Knowledge Gap", "Why Rules-Based Systems Can't Handle This"]
[Consolidate 2-3 challenges into ONE cohesive narrative]
- Challenge 1: [Core problem with comparison: traditional vs AI-enabled]
- Challenge 2: [Secondary problem]
- Challenge 3: [Tertiary problem]
[Each challenge: problem → why traditional fails → what AI enables]

## What Becomes Possible
[Consolidate capabilities + competitive advantages + efficiency gains]
- Capability 1: [Transformation description with before/after comparison]
- Capability 2: [Another capability]
- Competitive Advantages (2-3 bullets max)
- Efficiency Gains (table: metric, without AI, with AI, impact)

## Competitive Landscape (Optional)

**Note:** Include this section only if competitive intelligence is available or relevant to the decision.

**What competitors are doing:**
- Competitor A: [Their AI approach, if known]
- Competitor B: [Their AI approach, if known]
- Industry trend: [General market movement toward AI in this domain]

**Our position:**
- First-mover advantage: [If we're ahead]
- Fast-follower opportunity: [If we're catching up]
- Differentiation: [How our approach differs]

**Risk of inaction:**
- Competitive gap: [What happens if we don't invest while competitors do]
- Market expectation: [Customer/partner expectations shifting toward AI capabilities]

**Sources:** [Cite where competitive intel came from - user research, public announcements, industry reports]

## Scope of AI Opportunity
- [Solution] MVP: ~X of Y Requirements
- Strategic decision explanation
- AI Capabilities (in scope - non-deterministic requirements) - numbered list
- [Supporting layer] (in scope - deterministic) - numbered list  
- Deferred (Phase 2+ - Z requirements) - bulleted with why defer
- Phased Rollout Recommendation
  - Phase 1 (MVP): scope, capabilities, why this scope, success criteria
  - Phase 2 (Post-Pilot): iterative enhancements, principle

## Tradeoffs and Risks
[Decision-focused, not exhaustive scenarios]
- Tradeoff 1: [AI complexity vs traditional simplicity - why AI worth it]
- Tradeoff 2: [Another key tradeoff]
- Risk: [Primary risk + impact + mitigation]
- Risk: [Secondary risk + mitigation]
[Keep to 2-3 pages max]

## Risk Assessment
[3 scenarios, but CONCISE - not multi-paragraph each]
- Scenario 1: Do Nothing / Traditional Approach
  - What happens (consequences bullets)
  - When this makes sense (one sentence)
- Scenario 2: [Solution] Investment Fails
  - What could go wrong (bullets)
  - Mitigation (bullets)
- Scenario 3: [Solution] Investment Succeeds
  - Strategic outcomes (bullets)
  - Business impact (bullets)

## Alternatives Considered

**Note:** This is a preliminary qualitative analysis. Phase 3 (Estimating) will provide quantitative build/buy recommendations based on effort impact and pattern analysis.

[Brief - 1 page max. Show you considered them, don't deep-dive]
- Alternative 1: [Name] - Why it won't work (3-4 bullets)
- Alternative 2: [Name] - Why incomplete
- Alternative 3: [Name] - When to consider
[3-4 alternatives max]

**Cross-reference:** See Phase 3 mvp-scope.md "Pattern Analysis" section for quantitative build/buy recommendations (e.g., Auth0 reduces auth effort from M → S).

## Recommended Scope and Phasing
- Phase 1 (MVP): [Scope, AI core, supporting layer, success criteria, decision gate]
- Phase 2: [Add based on feedback - bulleted conditions, principle]
- Long-Term: [Enhancement areas]

## Conclusion
- The core insight (summary box)
- [Solution] solves this (how)
- Recommended scope (MVP + defer)
- Why this is the right approach (5 numbered reasons)
- The strategic unlock (highlight box)
- Decision point (3 options: invest / alternative / do nothing)
- Recommendation (highlight box with next steps)
```

**Key differences from previous approach:**

- **Consolidate subsections:** "Why AI Is Needed" has 3 challenges in ONE section, not 3 separate sections
- **Cut redundancy:** Don't repeat same examples across "Capabilities" and "Competitive Advantages" and "Efficiency"—merge into "What Becomes Possible"
- **Tighten risk analysis:** Risk Assessment is 3 scenarios in bullets, not multi-paragraph narratives
- **Briefer alternatives:** Show you considered them (1 page), don't analyze each exhaustively
- **Bottom Line:** Single-page decision summary (optional but powerful)

---

**For operational stakeholder report (if identified in Step 6):**

```markdown
operational-report.md:
# [Project] Operational Report: [Title]

**Date:** [Date]  
**Audience:** Department Heads, Operations Managers, Team Leads  
**Purpose:** Operational impact, departmental benefits, implementation guidance  
**Strategic Context:** See executive-report.md for business case and investment decision

---

## Overview

[2-3 paragraphs: What this platform does, why it matters operationally, who it affects]

**For strategic business case and investment decision:** See executive-report.md

This report focuses on operational impact: how [Platform] works in practice, what changes for your teams, benefits by department, and implementation support.

---

## How It Works (Operational Detail)

[Moved from executive report appendix - detailed operational flow]

### Step 1: [Process step]
[What users do, what happens, screenshots/examples if helpful]

### Step 2: [Process step]
[Detailed workflow, edge cases, what to expect]

### Step 3: [Process step]
[Validation, approval, how knowledge becomes discoverable]

---

## Operational Use Cases

### Use Case 1: [Concrete example - specific department/workflow]

**Current state (before [Platform]):**
- [Pain point 1 - operational friction]
- [Pain point 2 - duplicate work, knowledge loss]
- [Impact on department]

**Future state (with [Platform]):**
- [How workflow changes]
- [Operational improvement]
- [Time/effort saved, quality improvement]

### Use Case 2: [Another department/workflow]
[Same structure]

---

## Departmental Benefits

### For [Department 1 - e.g., Facilities Operations]

**Benefits:**
1. [Specific operational improvement for facilities teams]
2. [Pain point solved - e.g., reduce duplicate vendor research]
3. [Strategic advantage - e.g., share best practices globally]

**What changes for your team:**
- [Workflow change 1]
- [New responsibility/capability]

**Support provided:**
- [Training, tools, help we'll provide]

### For [Department 2 - e.g., Sustainability Coordinators]

[Same structure - 3-5 benefits, what changes, support]

### For [Department 3 - e.g., IT/Digital]

[Same structure]

---

## Change Management & Adoption

### Training & Onboarding

**For pilot participants:**
- [Training timeline, duration, format]
- [What they'll learn]
- [Ongoing support available]

**For broader rollout (post-pilot):**
- [Scaled training approach]
- [Self-service resources]

### Workflow Changes

**What stays the same:**
- [Reassure - document creation process unchanged]
- [No disruption to existing tools]

**What's new:**
- [Upload step - how long it takes]
- [Validation step - what users review]
- [Discovery capability - how teams search]

**Time investment:**
- **Pilot phase:** [X hours for initial training, Y hours ongoing per month]
- **Steady state:** [Z minutes per project submission]

---

## Implementation Support

### What We'll Handle (So Departments Don't Have To)

- [Infrastructure setup, integration work]
- [SSO configuration, RBAC setup]
- [Training material creation]
- [Help desk support during pilot]

### What We Need From Departments

**Phase 1 (Pilot - 90 days):**

**[Department 1]:**
- [Specific ask 1]: ~[X hours] - [When needed]
- [Specific ask 2]: ~[Y hours] - [When needed]

**[Department 2]:**
- [Specific asks with time bounds]

**If pilot succeeds → Phase 2:**
- [What ongoing involvement looks like]
- [Exit option if doesn't work for a department]

---

## Coalition Building

### Early Support

**CRITICAL:** Only include if you have REAL stakeholder quotes from actual conversations. Otherwise, use placeholder.

**If you have real endorsements:**
- **[Department/Name]:** "[Actual quote from stakeholder conversation]"

**If no endorsements yet:**
- **Stakeholder engagement pending:** Initial conversations scheduled with [list departments]. This section will be updated after feedback is collected.

### How Departments Get Credit

[Recognition matters to operational leaders]
- [Where contributions will be visible - exec presentations, company-wide comms]
- [How success gets attributed to participating teams]
- [Impact on department reputation/standing]

---

## Risk Mitigation (For Operational Stakeholders)

### If This Initiative Fails

[How we protect department goals/roadmaps]
- [Pilot bounded at 90 days - limited exposure]
- [No disruption to existing workflows during pilot]
- [Decision gate - departments can exit if not working]

### If Timelines Slip

[Fallback plan that doesn't impact departments]

### If Scope Changes

[How we'll communicate and adjust asks from departments]

---

## Next Steps

1. **[Date]:** [Initial engagement - lightweight, not full commitment]
2. **[Date]:** [Decision point with clear exit option]
3. **[Date]:** [If yes, what happens next - pilot kickoff]

**Questions or concerns?** [Contact person + method]

---

**For strategic business case:** See executive-report.md  
**For technical architecture:** See technical-analysis.md (if applicable)
```

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
- `traceability-matrix.md` - Initial traceability (Req ID + Classification columns only)

**Based on primary audience (Step 5):**

- Executive decision-makers → `executive-report.md` (2-page summary + appendix for investment decisions)
- Product/project managers → `implementation-plan.md` (or `mvp-scope.md`)
- Technical leadership → `technical-analysis.md` (or `architecture-justification.md`)
- Mixed audiences → Multiple files: `executive-report.md` + `technical-analysis.md`

**If operational stakeholder alignment needed (Step 6):**

- Add `operational-report.md` (8-10 pages: operational impact, departmental benefits, implementation detail)

**Write order (to enable cross-references):**

1. `requirement-classification.md` FIRST (foundation with requirement IDs)
2. `traceability-matrix.md` (initial matrix with Req ID + Classification)
3. Primary audience report (e.g., `executive-report.md` - 2 pages + appendix)
4. `operational-report.md` LAST if needed (can reference executive-report.md for strategic context, includes operational depth)
5. Any additional reports (e.g., `technical-analysis.md` if technical stakeholders need architecture detail)

```bash
# Create Phase 2 directory
mkdir -p docs/{project-name}/02-analysing

# Files from Phase 1 are in docs/{project-name}/01-assessing/
# (Use Write tool for requirement-classification.md with IDs)
# (Use Write tool for traceability-matrix.md)
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

Before proceeding to Phase 3 (Estimating), validate requirement classification with stakeholders:

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
- **Content:** How it works in practice, detailed use cases, workflow changes, training needs, what you'll handle vs what departments provide, credit/recognition, risk mitigation for operational teams
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
