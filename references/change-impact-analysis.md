# Change Impact Analysis

**Project:** {project-name}  
**Change Request:** {description}  
**Requested By:** {stakeholder}  
**Date:** {date}

---

## Purpose

This template assesses the ripple effects of a requirement change across all discovery phases. Use it when:
- A requirement is added, removed, or significantly modified
- Scope changes after Phase 2 (Analysing)
- Stakeholder priorities shift
- Technical feasibility changes (e.g., after spike)

**Goal:** Understand what needs to be updated before proceeding.

---

## Change Summary

**What changed:**
- {Brief description of the change}

**Why it changed:**
- {Rationale: new information, stakeholder feedback, technical constraint, etc.}

**Affected requirement(s):**
- REQ-XXX: {previous state} → {new state}

---

## Impact Assessment

### Phase 1 (Scoping) Impact

**Knowledge landscape:**
- [ ] No impact
- [ ] New knowledge sources needed: {list}
- [ ] Access constraints changed: {describe}

**Knowledge assessment:**
- [ ] No impact
- [ ] New gaps identified: {list}
- [ ] Quality issues affected: {describe}

**Actions required:**
- [ ] Update knowledge-landscape.md
- [ ] Update knowledge-assessment.md
- [ ] Re-run /neat-discovery-scoping --update

---

### Phase 2 (Analysing) Impact

**Requirement classification:**
- [ ] No impact
- [ ] New requirements added: {list with IDs}
- [ ] Classification changed: {REQ-XXX: deterministic → non-deterministic, or vice versa}
- [ ] Feasibility changed: {REQ-XXX: high → medium, etc.}

**Executive report / Business case:**
- [ ] No impact
- [ ] MVP scope affected: {what's now in/out}
- [ ] Strategic justification changed: {which section}
- [ ] Business value affected: {how}

**Actions required:**
- [ ] Update requirement-classification.md (add/modify requirements)
- [ ] Update executive-report.md (affected sections)
- [ ] Update traceability-matrix.md (new requirement IDs)
- [ ] Re-validate with stakeholders (Gate B)

---

### Phase 3 (Estimating) Impact

**Effort estimates:**
- [ ] No impact
- [ ] New stories to estimate: {count}
- [ ] Existing story effort changed: {Story X: M → L, etc.}
- [ ] Total MVP effort changed: {previous} → {new}

**Dependencies:**
- [ ] No impact
- [ ] New blocking relationships: {REQ-XXX blocks REQ-YYY}
- [ ] Critical path changed: {previous} → {new}

**ROM costs:**
- [ ] No impact
- [ ] Cost estimate changed: {previous range} → {new range}
- [ ] Timeline affected: {how}

**Actions required:**
- [ ] Update mvp-estimates.md (affected stories)
- [ ] Update traceability-matrix.md (estimates and dependencies)
- [ ] Re-calculate ROM costs
- [ ] Re-validate at Decision Gate

---

### Phase 4 (Designing) Impact

**Architecture:**
- [ ] No impact
- [ ] AI architecture affected: {which component}
- [ ] Application architecture affected: {which component}
- [ ] Integration architecture affected: {which system}

**Technology choices:**
- [ ] No impact
- [ ] New technology needed: {what and why}
- [ ] Existing choice invalidated: {what and why}

**Actions required:**
- [ ] Update architecture-design.md (affected sections)
- [ ] Update traceability-matrix.md (architecture references)
- [ ] Re-validate technical feasibility

---

## Cross-Cutting Impacts

### Assumptions Register
- [ ] New assumptions added: {list}
- [ ] Existing assumptions invalidated: {which ones}
- [ ] Validation status changed: {which assumptions}

### Risk Register
- [ ] New risks identified: {list}
- [ ] Existing risks mitigated: {which ones}
- [ ] Risk severity changed: {which risks}

### Traceability Matrix
- [ ] New requirement IDs assigned
- [ ] Requirement → Story mappings changed
- [ ] Story → Architecture mappings changed

---

## Affected Stakeholders

**Who needs to be informed:**
- {Stakeholder 1}: {why they care}
- {Stakeholder 2}: {why they care}

**Approval needed from:**
- {Decision maker}: {what decision}

---

## Recommendation

**Severity of change:**
- [ ] **Minor:** Update files, no re-validation needed
- [ ] **Moderate:** Update files, inform stakeholders, soft re-validation
- [ ] **Major:** Re-run affected phase(s), formal gate re-approval

**Suggested action:**
1. {First step}
2. {Second step}
3. {Third step}

**Timeline impact:**
- {Estimate of delay or additional work}

**Cost impact:**
- {ROM adjustment if applicable}

---

## Workflow

1. **Detect change:** Requirement added/modified/removed
2. **Fill this template:** Assess impact across all phases
3. **Identify actions:** Check boxes for what needs updating
4. **Execute updates:** Run --update mode on affected skills, or regenerate if major
5. **Validate:** Re-check gates if moderate/major change
6. **Communicate:** Inform affected stakeholders

---

## Example: Adding a New Requirement

**Change:** Add REQ-015: "AI assistant must support Spanish language"

**Phase 1 Impact:** No impact (knowledge sources already include Spanish content)

**Phase 2 Impact:**
- Add REQ-015 to requirement-classification.md (non-deterministic, medium feasibility)
- Update executive-report.md "What Becomes Possible" section (multilingual capability)
- Update traceability-matrix.md (add REQ-015 row)

**Phase 3 Impact:**
- Add Story 12: "Multilingual AI support (Spanish)" - Size: L
- Update MVP effort: 38 stories → 39 stories, Large project → Large project (no change)
- Update ROM costs: add $15k-$25k for translation, testing, LLM prompt tuning

**Phase 4 Impact:**
- Update AI architecture: LLM selection must support Spanish
- Update application architecture: UI must support locale switching
- Add integration: translation service for user input/output

**Severity:** Moderate (affects all phases but doesn't invalidate existing work)

**Actions:**
1. Run /neat-discovery-analysing --update (add REQ-015)
2. Re-estimate Story 12 in Phase 3
3. Update architecture design for multilingual support
4. Inform stakeholders: $20k additional cost, 3-week timeline extension
