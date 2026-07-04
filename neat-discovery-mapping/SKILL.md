---
name: neat-discovery-mapping
description: Map enterprise knowledge landscapes and assess accessibility constraints - discovers visible sources, infers invisible knowledge, evaluates access barriers
---

# Discovery Mapping

Map the knowledge landscape and assess constraints.

## Role

You are a solution architect who maps enterprise knowledge landscapes and assesses accessibility constraints.

## When to Use

Start of AI discovery assessment. Use this skill to:
- Understand what knowledge exists in the organization
- Identify access constraints and barriers
- Assess knowledge quality and gaps
- Reason about invisible/inaccessible knowledge

## Prerequisites

None - this is Phase 1 of the discovery process.

## Process

### Step 1: Project Selection

Check for existing projects in `docs/` directory:

```bash
ls -d docs/*/ 2>/dev/null
```

**If docs/ is empty or doesn't exist:**
- Ask: "What's the project name?"
- Create `docs/{project-name}/` directory

**If projects exist:**
- List projects with numbers
- Show: `[1] project-a [2] project-b [n] New project`
- Ask user to choose
- If new: Ask for project name and create directory

### Step 2: Check Existing Files

Check if output files exist:

```bash
ls docs/{project-name}/knowledge-landscape.md 2>/dev/null
ls docs/{project-name}/knowledge-assessment.md 2>/dev/null
```

**If files exist:**
- Load both files
- Inform user: "Found existing mapping from [date]. I'll merge new information."
- Continue with discovery, merging new insights into existing structure

**If files don't exist:**
- Inform user: "Creating fresh knowledge mapping."
- Continue with discovery

### Step 3: Knowledge Source Discovery

Interview the user to map visible knowledge sources. Ask focused questions:

**About documents:**
- What documentation exists? (technical docs, policies, procedures, specifications)
- Where is it stored? (Wiki, SharePoint, Google Drive, local files)
- Who maintains it?

**About systems:**
- What systems are relevant? (CRM, ERP, databases, APIs)
- What data do they contain?
- Who owns each system?

**About people:**
- Who are the knowledge authorities?
- Which teams own which domains?
- Are there subject matter experts?

**About flows:**
- How does knowledge move between sources?
- What triggers knowledge updates?
- Are there integration points?

### Step 4: Access Constraint Assessment

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

### Step 5: Reason About Invisible Knowledge

Based on what you've learned, infer knowledge that likely exists but isn't visible:

**Apply organizational patterns:**
- CRM system → customer support ticket data likely exists
- E-commerce platform → order history, inventory data
- HR system → employee records, performance reviews

**Apply system architecture clues:**
- Public API → backend database with more detailed data
- Dashboard → underlying metrics/logs exist
- Report → source data repository exists

**Apply regulatory requirements:**
- Financial services → audit trails must exist
- Healthcare → patient records, compliance documentation
- Manufacturing → safety records, quality control data

**Apply organizational structure reasoning:**
- Siloed teams → likely knowledge duplication
- Multiple departments → fragmented knowledge sources
- Mergers/acquisitions → legacy system complexity

**Mark all inferred knowledge as "unverified" in the assessment.**

### Step 6: Quality Assessment

Assess knowledge quality issues:

**Gaps:**
- What knowledge is missing entirely?
- What questions can't be answered with available sources?

**Contradictions:**
- Do sources conflict with each other?
- Inconsistent definitions or data?

**Staleness:**
- Is information outdated?
- How often is it updated?
- Any maintenance issues?

**IT constraints:**
- System performance issues?
- Scalability problems?
- Technical debt affecting access?

### Step 7: Detect Project Complexity

Analyze conversation to determine project complexity:

**Simple project indicators:**
- Single domain/department
- Small organization (startup, small team)
- Limited knowledge sources (< 5)
- Few constraints mentioned

**Complex project indicators:**
- Multiple domains/departments
- Enterprise scale
- Many knowledge sources (10+)
- Significant access constraints
- Cross-domain integration needs

### Step 8: Propose Document Structure

Based on detected complexity, propose section structure:

**For simple projects:**

```markdown
knowledge-landscape.md:
- Knowledge Sources
- Systems
- People & Authorities
- Knowledge Flows

knowledge-assessment.md:
- Gaps
- Access Constraints
- Quality Issues
- Inferred Knowledge (Unverified)
```

**For complex projects:**

```markdown
knowledge-landscape.md:
- Knowledge Sources by Department
- System Integration Points
- Legacy System Constraints
- Cross-Domain Knowledge Flows
- Authority Matrix
- Governance Structure

knowledge-assessment.md:
- Knowledge Gaps by Domain
- Access Constraints
  - Permission Barriers
  - Governance Requirements
  - Technical Barriers
  - Organizational Barriers
- Quality Issues
  - Contradictions
  - Staleness
  - IT Constraints
- Inferred Knowledge (Unverified)
```

Show proposed structure to user and ask: "Does this structure work, or would you like to adjust?"

Wait for approval or modification.

### Step 9: Generate Output Documents

Generate both markdown files following the approved structure.

**For knowledge-landscape.md:**
- Use clear section headings
- Lists and tables for sources
- Professional tone
- Cite conversations where information came from

**For knowledge-assessment.md:**
- Explicit gap identification
- Categorized constraints
- Quality issues with examples
- Clearly mark inferred knowledge as "unverified"

**If updating existing files:**
- Preserve existing structure
- Merge new information into appropriate sections
- Flag contradictions: "Note: This conflicts with previous information - [old info] vs [new info]. Review needed."
- Don't auto-resolve conflicts

### Step 10: Write Files

Write or update both files:

```bash
# Create directory if needed
mkdir -p docs/{project-name}

# Write files
# (Use Write tool for knowledge-landscape.md)
# (Use Write tool for knowledge-assessment.md)
```

### Step 11: Confirm Completion

Inform user of successful completion:

```
✓ Knowledge mapping complete

Generated:
- docs/{project-name}/knowledge-landscape.md
- docs/{project-name}/knowledge-assessment.md

Next step: Run /neat-discovery-analysing to classify requirements
```

## Output Specifications

### knowledge-landscape.md
- Inventory of knowledge sources (documents, systems, databases, people)
- Knowledge authorities and ownership
- Knowledge flows between sources
- Professional markdown formatting
- **Purpose:** What exists and who owns it

### knowledge-assessment.md
- Gaps in knowledge
- Access constraints (permissions, governance, technical, organizational)
- Quality problems (contradictions, staleness, IT issues)
- Inferred but unverified knowledge based on patterns
- **Purpose:** What's wrong or inaccessible

## Common Mistakes

| Mistake | Rule |
| --- | --- |
| Not checking for existing files | Always check and load if present |
| Auto-resolving conflicts | Flag for user review, don't auto-merge contradictions |
| Skipping complexity detection | Always assess to propose appropriate structure |
| Forgetting to mark inferred knowledge | Must be clearly labeled "unverified" |
| Missing user approval on structure | Get explicit confirmation before generating |

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
