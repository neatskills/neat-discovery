# Assumptions Register

**Project:** {project-name}  
**Last Updated:** {date}

---

## Purpose

This register tracks assumptions made across all discovery phases. Each assumption includes its validation status and impact if proven incorrect.

**Key principle:** Assumptions must be validated before proceeding to implementation. Unvalidated high-impact assumptions are blockers.

---

## Assumptions

| ID | Phase | Assumption | Validation Status | Impact if Wrong | Notes |
|----|-------|------------|-------------------|-----------------|-------|
| A-001 | Scoping | 5 SMEs available for knowledge interviews | ✅ Validated (2026-XX-XX) | High - would delay knowledge mapping by 2-3 weeks | Confirmed via stakeholder meeting |
| A-002 | Analysing | Real-time API access to knowledge base is feasible | ⏳ Pending validation | Medium - may require batch processing instead | Waiting for IT architecture review |
| A-003 | Estimating | Team has Python ML/NLP experience | ⚠️ Unvalidated | Medium - may need training or external hiring | Assumption based on job descriptions |
| A-004 | Designing | LLM API costs ~$0.002/request | ✅ Validated (2026-XX-XX) | Low - budget includes buffer | Confirmed via OpenAI pricing, Claude pricing |

---

## Validation Status Legend

- ✅ **Validated:** Assumption confirmed through evidence (meeting, test, research)
- ⏳ **Pending:** Validation in progress or scheduled
- ⚠️ **Unvalidated:** Not yet checked - flagged as risk
- ❌ **Invalidated:** Assumption proven incorrect - requires mitigation

---

## Impact Levels

- **High:** Could block project, requires major scope/timeline change
- **Medium:** Affects approach or resources but project continues
- **Low:** Minor adjustment needed

---

## Instructions for Each Phase

### Phase 1 (Scoping)

Add assumptions about:

- Stakeholder availability
- Knowledge source accessibility
- Organizational constraints
- Timeline expectations

### Phase 2 (Analysing)

Add assumptions about:

- Feasibility of AI approach
- Integration complexity
- User adoption
- Regulatory/compliance requirements

### Phase 3 (Estimating)

Add assumptions about:

- Team composition and skills
- Third-party service availability
- Infrastructure requirements
- Development timeline

### Phase 4 (Designing)

Add assumptions about:

- Technology choices
- Architecture scalability
- Performance requirements
- Security/privacy constraints

---

## When to Update This Register

**Add new assumption:**

- Whenever you state "Assuming X" in any phase
- When making a decision based on uncertain information
- When stakeholders provide constraints that aren't yet validated

**Validate assumption:**

- After stakeholder confirmation
- After technical spike/proof-of-concept
- After researching alternatives
- After pilot/test results

**Invalidate assumption:**

- When evidence contradicts the assumption
- When stakeholder changes requirements
- When technical test fails
- Document mitigation plan in Notes column

---

## Example Workflow

1. **Phase 2:** "Assuming we can access customer support tickets via API" → Add A-005 (Pending, High impact)
2. **Phase 3:** IT confirms API exists but rate-limited → Update A-005 (Validated, add note: "500 requests/hour limit")
3. **Phase 4:** Architecture must include request batching to stay within limit → Reference A-005 in architecture docs

---

## Cross-References

- **Risk Register:** High-impact unvalidated assumptions should also appear as risks
- **Traceability Matrix:** Assumptions affecting specific requirements should be cross-referenced
- **Decision Gates:** Validate critical assumptions before gate approval
