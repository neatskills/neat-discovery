---
name: neat-discovery-analysing
description: Classify requirements as deterministic vs non-deterministic and build strategic business case for AI investments - focuses on qualitative value and feasibility
---

# Discovery Analysing

Classify requirements and build the business case.

## Role

You are a business analyst who classifies requirements and builds strategic business cases for AI investments.

## When to Use

Use after Phase 1 to:

- Classify requirements (deterministic vs non-deterministic)
- Assess AI solution feasibility
- Build business case and prioritize opportunities

## Update Mode

**Invoke:** `/neat-discovery-analysing --update`

**Behavior:**

- Loads existing classification + executive report
- Asks for new requirements
- Appends with sequential IDs (no re-classification)
- Updates affected report sections
- Flags contradictions

**Use when:** Phase 3/4 reveals missing requirements, stakeholder adds scope  
**Don't use when:** Major scope pivot, complete priority change

## Prerequisites

**From Phase 1:** project-context.md, knowledge-landscape.md, knowledge-assessment.md  
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
cat docs/{project-name}/01-scoping/project-context.md
cat docs/{project-name}/01-scoping/knowledge-landscape.md
cat docs/{project-name}/01-scoping/knowledge-assessment.md
```

**If files missing:**

- Error: "Phase 1 outputs not found. Run /neat-discovery-scoping first."
- Exit skill

**If files exist:**

- Read and parse all three files
- Use project-context.md to understand project goals, stakeholders, constraints
- Summarize key points for internal context

### Step 3: Check Existing Files

Check if Phase 2 output files exist:

```bash
ls docs/{project-name}/02-analysing/requirement-classification.md 2>/dev/null
ls docs/{project-name}/02-analysing/executive-report.md 2>/dev/null
```

**If files exist:**

- Load both files
- Inform: "Found existing analysis. I'll merge new requirements."

**If files don't exist:**

- Inform: "Creating fresh requirement analysis."

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

### Step 5A: Identify Need for Stakeholder Alignment Brief

**Ask:** "Do you need to get buy-in from department heads or team leads (not just executive approval)?"

**If yes, ask:**

- Which departments/teams need to support this? (e.g., Facilities, IT, Procurement, Sustainability team)
- What's their current relationship to this initiative? (blockers, neutral, mildly supportive)
- What do you need from them? (budget, resources, data access, pilot participation)

**If stakeholder alignment needed:**

- Recommend adding `stakeholder-brief.md` (3-5 pages)
- Focus: Department-specific benefits, clear asks, partnership model, social proof
- Strategy: References executive report for full context, stays focused on "what's in it for them"

**Stakeholder brief characteristics:**

- **Not a full business case** - assumes they'll read exec report if interested
- **Benefit-forward** - leads with what they gain, not what you need
- **Specific asks** - time-bounded, clear commitments (not open-ended)
- **Social proof** - who else already supports this
- **Generic template** - one brief works for multiple departments (customize benefits section)

### Step 6: Gather Business Context

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

Append to `01-scoping/project-context.md`:

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

### Step 7: Gather Requirements (formerly Step 4)

Ask user for requirements:

"Please provide your requirements list. This can be:

- Formal backlog items
- Feature requests
- Problem statements
- Use cases
- Or just a description of what you want to build

Share what you have - it doesn't need to be complete or detailed."

Wait for requirements input.

### Step 8: Classify Each Requirement

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

### Step 9: Assess Feasibility (Non-Deterministic Requirements)

For each non-deterministic requirement, assess feasibility:

**Knowledge availability (check landscape):**

- Is relevant knowledge documented?
- Which sources contain needed information?
- Is knowledge sufficient for AI to reason about this?

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

### Step 9A: Identify Need for Technical Spikes (Optional)

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

### Step 10: Build Strategic Business Justification (Audience-Specific)

**Tailor content depth and focus to identified audience from Step 5:**

**For executive decision-makers (C-level, VPs):**

- Focus on strategic value, competitive advantage, business impact
- Emphasize: What becomes possible that isn't today? What's the opportunity cost of not investing?
- Minimize: Technical details, implementation specifics
- Length: 10-15 pages max (executives won't read 30-page reports)

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

### Step 11: Prioritize Requirements

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

### Step 12: Detect Project Complexity

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

### Step 13: Propose Document Structure

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

- **Target 10-15 pages** when converted to PDF (for executive audience)
- **One core message per section** - make it instantly clear what the section proves
- **Decisive, not exhaustive** - emphasize clarity over comprehensiveness
- **Logical flow:** Context → Opportunity → Approach → Risks → Recommendation → Bottom Line

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
- [Group 1]: AI Core Requirements
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
- AI Core (in scope - non-deterministic) - numbered list
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

**Cross-reference:** See Phase 3 mvp-estimates.md "Pattern Analysis" section for quantitative build/buy recommendations (e.g., Auth0 reduces auth effort from M → S).

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

**For stakeholder alignment brief (if identified in Step 5A):**

```markdown
stakeholder-brief.md:
# [Initiative]: Partnership with [Primary Stakeholder Type] Teams

**Audience:** [Department heads / team leads who need to support this]  
**Your time investment:** [Specific, time-bounded commitment needed]  
**Full business case:** See executive-report.md

## What's In It For Your Team

[3-5 specific benefits for THEIR department - not generic org benefits]
[Focus on: time savings, pain points solved, strategic advantages for their domain]

### Benefit 1: [Tangible improvement to their work]
[Concrete example of how this helps them specifically]

### Benefit 2: [Problem they currently have that this solves]
[Show you understand their challenges]

### Benefit 3: [Strategic advantage for their domain]
[How this strengthens their position/capabilities]

## What We're Asking From You

[Be specific and time-bounded - not open-ended commitments]

**Phase 1 (Pilot - 4 weeks):**
- [Specific ask 1]: ~[X hours] - [When needed]
- [Specific ask 2]: ~[Y hours] - [When needed]
- **Total time:** ~[Z hours over 4 weeks]

**If pilot succeeds:**
- [What ongoing involvement looks like]
- [Exit option if doesn't work for your team]

## What We'll Handle (So You Don't Have To)

[Show you're not dumping work on them]
- [Infrastructure/setup they might expect to do, that you'll own]
- [Training/support you're providing]
- [Integration work you'll handle]

## Early Support

**CRITICAL:** Only include this section if you have REAL stakeholder quotes from actual conversations. Otherwise, use placeholder text.

**If you have real endorsements:**
- **[Department/Name]:** "[Actual quote from stakeholder conversation]"
- **[Department/Name]:** "[Actual quote from stakeholder conversation]"

**If no endorsements yet (use this placeholder):**
- **Stakeholder engagement pending:** Initial conversations scheduled with [list departments]. This section will be updated after stakeholder feedback is collected.

## How Your Team Gets Credit

[Recognition matters to peer stakeholders]
- [Visibility opportunity 1 - where their contribution will be recognized]
- [Credit mechanism 2 - how success gets attributed]
- [Impact on their team's reputation/standing]

## Risks We've Mitigated For Your Team

[Address their concerns proactively]
- **If this initiative fails:** [How we protect their goals/roadmap]
- **If timelines slip:** [Fallback plan that doesn't impact them]
- **If scope changes:** [How we'll communicate and adjust asks]

## Next Steps

[Make it easy to say yes - lightweight first step]
1. [Initial engagement - not full commitment] - [Date]
2. [Decision point with clear exit option] - [Date]
3. [If yes, what happens next] - [Date]

**Questions or concerns?** [Contact person + method]
```

---

Show to user: "Does this structure work, or would you like to adjust?"

Wait for approval.

### Step 14: Document Assumptions

Before generating final documents, identify key assumptions made during analysis:

**Common Phase 2 assumptions:**

- AI feasibility assessments (e.g., "LLM can handle multi-document synthesis")
- User adoption ("Users will interact with AI assistant")
- Integration complexity ("API integration is straightforward")
- Regulatory/compliance (e.g., "GDPR allows AI processing of this data")
- Timeline/budget constraints shared by stakeholders

**Update assumptions register:**

Load existing assumptions-register.md and add Phase 2 assumptions with next sequential IDs:

- Reference requirement IDs where applicable (e.g., "A-010: REQ-005 feasibility assumes PDF extraction accuracy >90%")
- Mark validation status (many will be ⏳ Pending - need technical spike or user research)
- Document impact if wrong (High/Medium/Low)

**Cross-reference with technical spikes (Step 9A):**

- If technical spikes recommended, assumptions should reference spike validation
- Example: "A-011: Real-time RAG performance <2s (⏳ Pending - Spike planned for Week 2)"

### Step 15: Generate Output Documents

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
- Visual indicators in markdown: ✅ (in scope), ⏸️ (deferred), 🔴 (high risk), 🟡 (medium), 🟢 (low)
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

### Step 16: Write Files

**File naming based on audience (from Step 5 and Step 5A):**

**Always generate:**

- `requirement-classification.md` - Foundation document (all requirements classified with IDs)
- `traceability-matrix.md` - Initial traceability (Req ID + Classification columns only)

**Based on primary audience (Step 5):**

- Executive decision-makers → `executive-report.md` (or `business-case.md` for investment decisions)
- Product/project managers → `implementation-plan.md` (or `mvp-scope.md`)
- Technical leadership → `technical-analysis.md` (or `architecture-justification.md`)
- Mixed audiences → Multiple files: `executive-summary.md` + `technical-deep-dive.md`

**If stakeholder alignment needed (Step 5A):**

- Add `stakeholder-brief.md` (references executive report for full context)

**Write order (to enable cross-references):**

1. `requirement-classification.md` FIRST (foundation with requirement IDs)
2. `traceability-matrix.md` (initial matrix with Req ID + Classification)
3. Primary audience report (e.g., `executive-report.md`)
4. `stakeholder-brief.md` LAST (can reference both above)
5. Any additional reports (reference earlier ones)

```bash
# Create Phase 2 directory
mkdir -p docs/{project-name}/02-analysing

# Files from Phase 1 are in docs/{project-name}/01-scoping/
# (Use Write tool for requirement-classification.md with IDs)
# (Use Write tool for traceability-matrix.md)
# (Use Write tool for [primary-audience].md)
# (Use Write tool for stakeholder-brief.md if needed)
```

### Step 17: Confirm Completion and Validation Gate

```text
✓ Requirement analysis complete

Generated:
- docs/{project-name}/02-analysing/requirement-classification.md
- docs/{project-name}/02-analysing/executive-report.md
- docs/{project-name}/assumptions-register.md (updated with Phase 2 assumptions)

---

VALIDATION GATE: Approve Requirement Classification Before Estimating

Before proceeding to Phase 3 (Estimating), validate requirement classification with stakeholders:

Review Checklist:
□ requirement-classification.md: Requirements classified correctly (deterministic vs non-deterministic)?
□ MVP Core scope: Right features in MVP? Anything missing or should be deferred?
□ Feasibility assessments: Agree with feasibility ratings (high/medium/low)?
□ Prioritization: Correct priority order for AI capabilities?

Questions to Ask Stakeholders:
1. Is the MVP scope correct (not too large, not too small)?
2. Are requirements classified correctly (AI vs traditional)?
3. Do feasibility assessments align with your knowledge of data/systems?
4. Any requirements we missed or misunderstood?

Validation Options:
✅ APPROVED: Classification correct, MVP scope approved → Proceed to /neat-discovery-estimating
🔄 RE-CLASSIFY: Stakeholders request scope changes → Update classification, re-validate
⏸️  HOLD: Need more requirements discovery → Gather additional requirements

Recommendation: Do NOT estimate until classification is approved. 
Estimating wrong scope wastes effort and creates confusion.

Next step (if approved): Run /neat-discovery-estimating to size MVP requirements
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

#### stakeholder-brief.md

- **Audience:** Department heads, team leads who need to support the initiative (not decision authority)
- **Purpose:** Get buy-in from peer stakeholders (coalition building)
- **Length:** 3-5 pages
- **Focus:** What's in it for their team, specific asks, partnership model
- **Content:** Department-specific benefits, time-bounded asks, what you'll handle, credit/recognition, risk mitigation for them
- **Tone:** Benefit-forward, collaborative, makes it easy to say yes
- **References:** Points to executive-report.md for full business case (doesn't duplicate it)
- **CRITICAL:** NEVER fabricate quotes, testimonials, or endorsements. If "Early Support" section is included,
  it must contain ONLY real quotes from actual stakeholder conversations, or be explicitly marked as placeholder:
  "[To be added after initial stakeholder conversations]"

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
