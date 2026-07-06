# Risk Register: {Project Name}

**Purpose:** Track risks from identification through mitigation to closure across all discovery phases.

**Last Updated:** {date}

---

## Active Risks

| ID | Phase | Risk | Impact | Likelihood | Mitigation | Owner | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-001 | Scoping | No SMEs available for sustainability metrics | High | High | AI infers from documents, user validation workflow | PM | Mitigated in Phase 4 |
| R-002 | Analysing | Real-time knowledge access may not be feasible | Medium | Medium | Batch processing fallback | Tech Lead | Open - validate in spike |
| R-003 | Estimating | Calculation inference could 3x scope if sparse data | High | Medium | Seed pilot with examples, external knowledge | AI/ML Lead | Mitigated in Phase 4 |
| R-004 | Designing | pgvector may not scale beyond 100k docs | Medium | Low | Monitor performance, migration plan to Pinecone | DevOps | Accepted - monitor |

---

## Closed Risks

| ID | Phase | Risk | Resolution | Closed Date |
| --- | --- | --- | --- | --- |
| R-005 | Analysing | Uncertainty about document formats | Confirmed PDF, Word, Excel, PowerPoint | 2026-07-04 |

---

## Risk Impact Levels

**High:** Could cause project failure or require major scope reduction  
**Medium:** Could delay timeline or increase cost significantly  
**Low:** Minor impact, can be addressed without major changes

---

## Risk Likelihood

**High:** >50% probability of occurring  
**Medium:** 20-50% probability  
**Low:** <20% probability

---

## Risk Status

**Open:** Risk identified, no mitigation yet  
**Mitigated:** Mitigation plan in place, risk reduced  
**Accepted:** Risk accepted, no further action  
**Closed:** Risk no longer applies (resolved or invalidated)

---

## How to Maintain

**Phase 1 (Scoping):**

- Identify risks from knowledge-assessment.md:
  - Access constraints → risks
  - Knowledge gaps → risks
  - Quality issues → risks
- Add to risk register with ID, description, impact assessment

**Phase 2 (Analysing):**

- Identify feasibility risks for non-deterministic requirements
- Add risks from executive-report.md "Tradeoffs and Risks" section
- Update risk register

**Phase 3 (Estimating):**

- Identify complexity/effort risks from estimates
- Document "Watch for:" escalation conditions as risks
- High-risk stories (XL, XXL) → risk register entries
- Update mitigation plans

**Phase 4 (Designing):**

- Document how architecture mitigates identified risks
- Update risk register status (Open → Mitigated)
- Identify new implementation risks
- Mark risks as Closed if architecture eliminates them

---

## Risk Review Checkpoints

**After Phase 1:** Review knowledge-related risks with stakeholders  
**After Phase 2:** Review feasibility risks, decide on risk acceptance  
**After Phase 3:** Review high-risk stories (XL/XXL), validate mitigation approach  
**After Phase 4:** Review residual risks, plan for implementation risk management

---

## Example Risk Entries

### From Phase 1 (Scoping)

**R-001:** No SMEs available

- **Source:** knowledge-assessment.md (no standardized metrics)
- **Impact:** High (can't validate AI-generated calculations)
- **Mitigation:** AI inference from documents + user validation workflow

### From Phase 2 (Analysing)

**R-002:** AI feasibility uncertain for calculation inference

- **Source:** Feasibility assessment (medium-high with caveats)
- **Impact:** High (core value proposition)
- **Mitigation:** Seed pilot with high-quality examples, external knowledge augmentation

### From Phase 3 (Estimating)

**R-003:** Story 2 (Calculation inference) Watch for: sparse pilot data

- **Source:** mvp-estimates.md
- **Impact:** High (could increase from XL to XXL)
- **Mitigation:** Seed with 20-30 examples, plan external knowledge integration

### From Phase 4 (Designing)

**R-004:** pgvector may not scale beyond 100k documents

- **Source:** Technology stack decision
- **Impact:** Medium (performance degradation)
- **Mitigation:** Monitor performance, migration plan to Pinecone if needed
