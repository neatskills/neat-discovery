---
name: neat-discovery-assessing
description: Use at start of AI discovery to create comprehensive project assessment - understand project context, document current state (architecture, dependencies, knowledge, systems), identify constraints and quality gaps
---

# neat-discovery-assessing

## Overview

Create comprehensive project assessment for AI discovery - understand project context, document current state (architecture, dependencies, knowledge, systems), identify constraints and quality gaps.

## Role

**Role:** You are a business analyst who creates a comprehensive project assessment for AI discovery.

## When to Use

Start of AI discovery. Use this skill to create a comprehensive project assessment:

- Understand project context and strategic foundation
- Document current state (architecture, dependencies, knowledge, systems)
- Identify access constraints and barriers
- Assess quality gaps and complexity
- Establish baseline for requirements analysis

## Prerequisites

None - this is Phase 1 of the discovery process.

## Smart Mode Detection

This skill **automatically detects** whether you're starting fresh or updating existing work:

- **No existing files** → Creates new assessment
- **Files exist** → Asks user to choose update or regenerate

**No flags needed** - the skill is conversational and guides you through the right choice.

## Process

### Step 1: Project Selection

Check for existing projects in `docs/` directory:

```bash
ls -d docs/*/ 2>/dev/null
```

**If docs/ is empty or doesn't exist:**

- Ask: "What's the project name?"
- Create `docs/{project-name}/01-assessing/` directory

**If projects exist:**

- List projects with numbers
- Show: `[1] project-a [2] project-b [n] New project`
- Ask user to choose
- If new: Ask for project name and create `docs/{project-name}/01-assessing/` directory

### Step 2: Detect Mode (Update or New)

**See:** [Mode Detection Pattern](../references/mode-detection.md)

Apply the pattern with these values:

| Parameter | Value |
|-----------|-------|
| Phase folder | `01-assessing/` |
| Artifact type | `assessment` |
| Update action | `append new information` |
| Files to load | `project-context.md, current-state.md, assessment.md` |
| Update question | "What new information do you want to add?" |

**Special consideration for Update mode:**

When loading `project-context.md`, preserve Phase 2-owned Strategic Context section if it contains real data (timeline, budget, compliance). If still placeholder ("Will be updated in Phase 2"), it will be overwritten when Phase 2 runs.

### Step 3: Project Context Assessment

Before exploring knowledge sources, establish project understanding:

**About the project:**

- What is {project-name}? What does it do or aim to achieve?
- What industry or domain does it operate in?
- What problem is it trying to solve?
- Who are the key stakeholders? (customers, users, internal teams)
- **How will we measure success?** (What are the success criteria? Quantifiable metrics?)
- What's the scope? (single product, platform, initiative, transformation, etc.)
- Is this a new project or existing one?
- What's the organizational context? (startup, enterprise division, cross-functional initiative)

**Why this matters:**

- Understanding the project context enables better reasoning about invisible knowledge
- Industry patterns inform what knowledge sources likely exist
- Stakeholder identification guides authority and ownership questions
- Scope determines complexity of knowledge landscape

Document project context in project-context.md (separate file).

### Step 4: Identify User Research Artifacts (Optional)

**Ask:** "Do you have any user research from this domain? (interviews, personas, journey maps, usability studies)"

**If yes, ask:**

- What format are they in? (docs, presentations, videos, notes)
- Where are they stored?
- Are there key insights we should reference?

**Benefits of user research artifacts:**

- Interview notes reveal pain points and knowledge gaps from user perspective
- Personas help identify different knowledge needs by user type
- Journey maps show where knowledge is needed in workflows
- Usability studies highlight where current knowledge access fails

**How to integrate:**

- Reference in current-state.md under "People & Authorities" section
- Extract key insights for assessment.md (user-reported gaps)
- Link to artifacts: "User research repository: [location]"
- Extract quotes if available (with permission): "Users reported: '[insight]'"

**If no formal research:**

- Note: "No formal user research conducted yet"
- Recommend in Phase 2: "Consider lightweight user interviews to validate knowledge gaps"

### Step 5: Current State Assessment

Interview the user to understand the current state landscape. Ask focused questions:

**About architecture:**

- What's the current system architecture? (monolith, microservices, hybrid)
- What are the main components/services?
- How do components interact?
- Are there architecture diagrams?

**About dependencies:**

- What external systems does the project depend on?
- What internal systems/services are dependencies?
- Are there third-party integrations?
- What APIs are consumed?

**About knowledge sources:**

- What documentation exists? (technical docs, policies, procedures, specifications)
- Where is knowledge stored? (Wiki, SharePoint, Google Drive, local files)
- Who maintains documentation?

**About systems and data:**

- What systems are relevant? (CRM, ERP, databases, APIs)
- What data do they contain?
- Who owns each system?
- What databases or data stores exist?

**About people:**

- Who are the knowledge authorities?
- Which teams own which domains?
- Are there subject matter experts?

**About flows:**

- How does information/data move between systems?
- What triggers updates or changes?
- Are there integration points or data pipelines?

### Step 6: Access Constraint Assessment

For each knowledge source identified, assess constraints:

**Permission barriers:**

- Who can access this source?
- Are there authentication/authorization requirements?
- Any restricted data?

**Governance constraints:**

- Who is allowed to see this information?
- Are there compliance requirements (GDPR, HIPAA, etc.)?
- Data classification levels?

**Technical barriers:**

- Is there an API? How complex?
- Legacy systems with integration challenges?
- Data format issues?

**Organizational barriers:**

- Siloed teams controlling access?
- Conflicting ownership?
- Political resistance to sharing?

### Step 7: Prioritize Current State Elements

After assessing current state, prioritize elements for AI implementation:

**Priority levels:**

- **Critical:** Essential for MVP, blocks AI features if unavailable
- **Important:** Enhances AI quality, but MVP can launch without
- **Nice-to-have:** Improves coverage but not required for pilot

**Prioritization criteria:**

**Business impact:**

- Does this element enable high-value AI capabilities?
- How many requirements depend on this?
- What's the cost of NOT having this?

**Access feasibility:**

- Can we access/integrate this in MVP timeline?
- Are access barriers manageable? (low/medium/high difficulty)
- What's the effort to integrate?

**Quality/completeness:**

- Is the data/documentation sufficient for AI reasoning?
- How complete is the coverage?
- Is it maintained/updated?

**Prioritization output:**

For each element in current-state.md, add priority flag:

```markdown
## Current State

### Critical Elements
- Customer database (PostgreSQL)
  - Why critical: Enables REQ-003, REQ-007, REQ-012 (core AI features)
  - Access: Medium difficulty (IT approval needed, 2-week timeline)
  - Quality: High (maintained, comprehensive)

### Important Elements
- Historical case knowledge base
  - Why important: Improves AI answer quality with examples
  - Access: Low difficulty (read-only API exists)
  - Quality: Medium (some gaps in older cases)

### Nice-to-Have Elements
- Internal wiki documentation
  - Why nice-to-have: Adds context but often duplicates policy docs
  - Access: Easy (public within org)
  - Quality: Low (outdated, inconsistent)
```

**Use in Phase 2:**

- Critical elements inform feasibility assessment
- Important elements affect MVP vs deferred decisions
- Nice-to-have elements are candidates for Phase 2+ enhancement

### Step 8: Quality Assessment

Assess current state quality issues:

**Gaps:**

- What information is missing entirely?
- What architecture/dependency information is undocumented?
- What questions can't be answered with available information?

**Contradictions:**

- Do documentation and actual systems conflict?
- Inconsistent architecture diagrams vs reality?
- Conflicting data definitions?

**Staleness:**

- Is documentation outdated?
- How often is it updated?
- Any maintenance issues?

**Technical constraints:**

- System performance issues?
- Scalability problems?
- Technical debt affecting integration?
- Legacy system complexity?

### Step 9: Detect Project Complexity

Analyze conversation to determine project complexity:

**Simple project indicators:**

- Single domain/department
- Small organization (startup, small team)
- Simple architecture (monolith or few services)
- Limited dependencies (< 5 external systems)
- Few constraints mentioned

**Complex project indicators:**

- Multiple domains/departments
- Enterprise scale
- Complex architecture (many microservices, distributed systems)
- Many dependencies (10+ systems/integrations)
- Significant access constraints
- Cross-domain integration needs
- Legacy system complexity

### Step 10: Propose Document Structure

Based on detected complexity, propose section structure:

**All projects generate 3 files:**

```markdown
project-context.md:
- Project Overview (what it is, industry, problem)
- Stakeholders (key stakeholders, users)
- Scope & Context (scope, new vs existing, organizational context)
- Strategic Rationale (why this matters, expected outcomes)
- Strategic Context (placeholder - will be updated in Phase 2 with timeline/budget/compliance)
```

**For simple projects:**

```markdown
knowledge-landscape.md:
- Architecture Overview
- Dependencies (systems, services, APIs)
- Knowledge Sources (with priority flags)
- Systems & Data
- People & Authorities
- Information Flows

knowledge-assessment.md:
- Gaps (missing architecture/dependency/knowledge documentation)
- Access Constraints
- Quality Issues
- Known Unknowns
```

**For complex projects:**

```markdown
knowledge-landscape.md:
- Architecture Overview
  - Current Architecture (diagrams, components)
  - System Components by Domain
- Dependencies
  - External Systems & APIs
  - Internal Services
  - Third-Party Integrations
- Knowledge Sources by Department (with priority flags)
- System Integration Points
- Legacy System Constraints
- Cross-Domain Information Flows
- Authority Matrix
- Governance Structure

knowledge-assessment.md:
- Gaps by Domain
  - Architecture Documentation Gaps
  - Dependency Mapping Gaps
  - Knowledge Gaps
- Access Constraints
  - Permission Barriers
  - Governance Requirements
  - Technical Barriers
  - Organizational Barriers
- Quality Issues
  - Contradictions (docs vs reality)
  - Staleness
  - Technical Constraints
- Known Unknowns
  - Completeness Uncertainty
  - Discovery Limitations
  - Scope Blind Spots
```

Show proposed structure to user and ask: "Does this structure work, or would you like to adjust?"

Wait for approval or modification.

### Step 11: Generate Output Documents

Generate three markdown files following the approved structure.

**For project-context.md:**

- Project overview (what it is, industry/domain, problem being solved)
- Key stakeholders (customers, users, internal teams)
- **Success metrics** (how will we measure success - quantifiable criteria)
- Scope & context (scope description, new vs existing, organizational context)
- Strategic rationale (why this matters, expected outcomes)
- Strategic context (placeholder section - note: "Will be updated in Phase 2 with timeline, budget, compliance constraints")
- Professional tone
- Document information from Step 3

**For knowledge-landscape.md:**

- Understand current state landscape (architecture, dependencies, knowledge, systems, people, flows)
- Use clear section headings
- Lists and tables for elements
- Include architecture diagrams if available
- Professional tone
- Cite conversations where information came from

**For knowledge-assessment.md:**

- Explicit gap identification (architecture, dependencies, knowledge, documentation)
- Categorized constraints
- Quality issues with examples
- **Known unknowns** - areas where completeness can't be assessed:
  - Have we discovered all relevant systems/dependencies?
  - Are there undocumented architecture components?
  - Are there shadow IT systems or knowledge sources?
  - What don't we know about what we don't know?

**If updating existing files:**

- Preserve existing structure
- Merge new information into appropriate sections
- Flag contradictions: "Note: This conflicts with previous information - [old info] vs [new info]. Review needed."
- Don't auto-resolve conflicts

### Step 12: Document Assumptions

Before writing files, identify key assumptions made during assessment:

**Common Phase 1 assumptions:**

- Stakeholder availability for interviews
- Access to knowledge sources will be granted
- Timeline constraints (if mentioned)
- Organizational support exists
- Knowledge quality is representative of what was shared

**Create assumptions register:**

```bash
# Copy template to project directory (if doesn't exist)
cp references/assumptions-register.md docs/{project-name}/assumptions-register.md
```

**Note:** Project-wide artifacts (assumptions-register.md, traceability-matrix.md, risk-register.md,
change-impact-analysis.md) are stored at project root level (`docs/{project-name}/`), not in phase subdirectories.

Add Phase 1 assumptions with IDs A-001, A-002, etc.:

- Mark validation status (most will be ⏳ Pending or ⚠️ Unvalidated at this stage)
- Document impact if assumption is wrong
- Reference in assessment.md where relevant

**Example assumptions:**

- A-001: "5 SMEs will be available for knowledge interviews" (High impact if wrong)
- A-002: "SharePoint access can be granted within 2 weeks" (Medium impact if wrong)
- A-003: "Knowledge base contains 80% of operational knowledge" (High impact if wrong - this is often an inference)

### Step 13: Write Files

Write or update files:

```bash
# Create directory if needed
mkdir -p docs/{project-name}/01-assessing

# Write files
# (Use Write tool for project-context.md)
# (Use Write tool for knowledge-landscape.md)
# (Use Write tool for knowledge-assessment.md)
# (Use Write or Edit tool for assumptions-register.md with Phase 1 assumptions)
```

### Step 14: Confirm Completion and Validation Gate

Inform user of successful completion:

```text
Project assessment complete

Generated:
- docs/{project-name}/01-assessing/project-context.md
- docs/{project-name}/01-assessing/knowledge-landscape.md
- docs/{project-name}/01-assessing/knowledge-assessment.md
- docs/{project-name}/assumptions-register.md (Phase 1 assumptions documented)

---

VALIDATION GATE 1: Review Project Assessment

Before proceeding to Phase 2 (Requirements Analysis), validate outputs with stakeholders:

Review Checklist:
- project-context.md: Accurate project understanding? Missing stakeholders?
- knowledge-landscape.md: Complete current state assessment? Missed any systems/architecture/dependencies?
- knowledge-assessment.md: Gaps correctly identified? Access constraints accurate?

Questions to Ask Stakeholders:
1. Did we miss any current state elements (architecture, systems, dependencies, knowledge)?
2. Are the access constraints and quality issues accurate?
3. Are there any "unknown unknowns" we should flag?
4. Is the project context description correct?

Validation Options:
APPROVED: Project assessment complete and accurate → Proceed to /neat-discovery-analysing
UPDATE NEEDED: Stakeholders identified gaps → Update assessment, re-validate
HOLD: Need more discovery → Schedule follow-up sessions

Next step (if approved): Run /neat-discovery-analysing to classify requirements
```

## Interview Strategy

**Ask questions in focused batches:**

- Step 3 (Project Context): 2-3 questions at once, gather comprehensive project understanding
- Step 5 (Current State Assessment): Ask about one category at a time (architecture, dependencies, knowledge, systems, people, flows)
- Step 6 (Access Constraints): Assess as elements are identified, not separately

**Don't ask all questions at once:**

- Users get overwhelmed by long lists
- Responses lack depth when questions aren't focused
- Natural conversation enables follow-up and clarification

**Adapt based on responses:**

- If user provides rich detail, dig deeper
- If answers are sparse, broaden the question
- If uncertain, ask for examples or specifics

## Output Specifications

### project-context.md (in 01-assessing/)

- Project overview (what it is, industry/domain, problem being solved)
- Key stakeholders (customers, users, internal teams)
- Scope & context (scope description, new vs existing, organizational context)
- Strategic rationale (why this matters, expected outcomes)
- **Purpose:** Project understanding for all phases

### knowledge-landscape.md (in 01-assessing/)

- Current state: architecture, dependencies, knowledge sources, systems, people
- Authorities and ownership
- Information flows between systems/sources
- Architecture diagrams if available
- Professional markdown formatting
- **Purpose:** What exists, how it's structured, and who owns it

### knowledge-assessment.md (in 01-assessing/)

- Gaps (architecture, dependencies, knowledge, documentation)
- Access constraints (permissions, governance, technical, organizational)
- Quality problems (contradictions, staleness, technical constraints)
- Known unknowns (completeness uncertainty, discovery limitations)
- **Purpose:** What's missing, wrong, or inaccessible

## Common Mistakes

| Mistake | Rule |
| --- | --- |
| Skipping project context discovery | Always establish project understanding before current state assessment |
| Not checking for existing files | Always check and load all three files if present |
| Putting project context in knowledge-landscape.md | Project context goes in separate project-context.md file |
| Auto-resolving conflicts | Flag for user review, don't auto-merge contradictions |
| Skipping complexity detection | Always assess to propose appropriate structure |
| Missing architecture/dependency assessment | Don't focus only on knowledge sources - profile full current state |
| Missing user approval on structure | Get explicit confirmation before generating |
| Asking too many questions at once | Use focused batches, allow natural conversation flow |

## Edge Cases

**Empty docs/ directory:**

- Skip project selection, go straight to "What's the project name?"

**Partial information:**

- Work with whatever user provides
- Document assumptions explicitly
- Mark uncertainties

**User can't answer questions:**

- Document what's unknown
- Include in gaps section
- Suggest follow-up investigation

**Conflicting information during update:**

- Preserve both versions
- Add note: "Conflict detected - review needed"
- Let user decide resolution
