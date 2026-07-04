---
name: neat-discovery-designing
description: Design AI infrastructure architecture based on classified requirements - determines ontology needs, knowledge system design, agent architecture, and governance model
---

# Discovery Designing

Design the AI infrastructure architecture.

## Role

You are a solution architect who designs AI infrastructure based on requirement analysis.

## When to Use

After Phase 2 (analysing) is complete. Use this skill to:
- Decide if ontology is needed
- Design knowledge system architecture
- Design agent architecture
- Define governance model
- Create implementation blueprint

## Prerequisites

**Required from Phase 2:**
- `docs/{project-name}/requirement-classification.md`

**Required from Phase 1:**
- `docs/{project-name}/knowledge-landscape.md`
- `docs/{project-name}/knowledge-assessment.md`

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

Load all three required files:

```bash
cat docs/{project-name}/requirement-classification.md
cat docs/{project-name}/knowledge-landscape.md
cat docs/{project-name}/knowledge-assessment.md
```

**If requirement-classification.md missing:**
- Error: "Phase 2 outputs not found. Run /neat-discovery-analysing first."
- Exit skill

**If Phase 1 files missing:**
- Error: "Phase 1 outputs not found. Run /neat-discovery-mapping first."
- Exit skill

**If all files exist:**
- Parse and summarize key points internally
- Identify non-deterministic requirements for architecture design

### Step 3: Check Existing Blueprint

Check if blueprint exists:

```bash
ls docs/{project-name}/ai-architecture-blueprint.md 2>/dev/null
```

**If exists:**
- Load file
- Inform: "Found existing architecture blueprint. I'll refine based on new insights."

**If doesn't exist:**
- Inform: "Creating fresh architecture blueprint."

### Step 4: Analyze Requirements for Patterns

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

### Step 5: Ontology Decision

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

### Step 6: Knowledge System Decision

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

### Step 7: Agent Architecture Design

Map requirements to agents:

**Group requirements by domain/capability:**
- Which requirements share knowledge needs?
- Which require similar reasoning patterns?
- Natural functional boundaries?

**Design agent architecture:**

For each agent:
- Name and purpose (maps to requirement group)
- Knowledge sources it accesses
- Reasoning capabilities needed
- Input/output interfaces

**Define orchestration:**
- Sequential: Agent B needs Agent A's output
- Parallel: Independent agents work simultaneously
- Hierarchical: Coordinator agent manages sub-agents

**Knowledge access patterns:**
- Direct source access vs knowledge system access
- Caching needs
- Real-time vs batch requirements

**Integration points with traditional systems:**
- Which existing systems do agents interact with?
- API requirements
- Data format transformations

### Step 8: Knowledge Flow Design

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

### Step 9: Governance Model

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

### Step 10: Detect Architecture Complexity

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

### Step 11: Propose Document Structure

Based on complexity:

**For simple architecture:**

```markdown
ai-architecture-blueprint.md:
- Architecture Overview
- Ontology Decision (and design if needed)
- Knowledge System Decision (and architecture if needed)
- Agent Architecture
- Integration Points
- Governance Model
```

**For complex architecture:**

```markdown
ai-architecture-blueprint.md:
- Executive Summary
- Architecture Overview
- Ontology Design
  - Key Concepts and Entities
  - Relationships
  - Evolution and Governance
- Knowledge System Architecture
  - Storage and Access Patterns
  - Source Integration
  - Update Mechanisms
- Agent Architecture
  - Agent Inventory (purpose, knowledge access, interfaces)
  - Orchestration Patterns
  - Knowledge Access Patterns
- Integration Architecture
  - Traditional System Connections
  - API Requirements
  - Data Transformations
- Knowledge Flow Design
  - End-to-End Flows
  - Update Propagation
  - Error Handling
- Governance Model
  - Ontology Governance
  - Knowledge Quality Control
  - Agent Monitoring
  - Accountability Structure
```

Show to user: "Does this structure work, or would you like to adjust?"

Wait for approval.

### Step 12: Generate Architecture Blueprint

Generate markdown file following approved structure.

**Content guidelines:**
- Evidence-based decisions (reference requirements and landscape)
- Clear rationale for all architectural choices
- Specific enough for delivery teams to implement
- Professional tone
- Diagrams where helpful (Mermaid or ASCII)

**If updating existing file:**
- Refine architecture based on new insights
- Preserve validated decisions
- Flag changes: "Updated: [previous approach] → [new approach]. Reason: [rationale]"
- Don't auto-resolve conflicts

### Step 13: Write File

```bash
# (Use Write tool for ai-architecture-blueprint.md)
```

### Step 14: Confirm Completion

```
✓ Architecture design complete

Generated:
- docs/{project-name}/ai-architecture-blueprint.md

Discovery process complete. Blueprint ready for handoff to delivery teams.

All artifacts in docs/{project-name}/:
- knowledge-landscape.md
- knowledge-assessment.md
- requirement-classification.md
- executive-report.md
- ai-architecture-blueprint.md
```

## Output Specifications

### ai-architecture-blueprint.md
- Ontology decision and design (if needed)
- Knowledge system architecture (if needed)
- Agent architecture (what agents, orchestration, knowledge access patterns)
- Integration architecture (connections to traditional systems)
- Governance model (ownership, quality control, monitoring)
- **Purpose:** Complete architecture design for delivery teams

## Common Mistakes

| Mistake | Rule |
| --- | --- |
| Skipping prerequisite load | Must load all Phase 1 and Phase 2 outputs |
| Vague architecture | Be specific enough for implementation |
| Missing rationale | Every decision needs evidence-based justification |
| Ignoring constraints | Reference knowledge assessment barriers |
| Generic governance | Define actual roles and processes |

## Edge Cases

**No non-deterministic requirements:**
- Still create blueprint
- Conclusion: "Traditional architecture sufficient, AI infrastructure not needed"

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
