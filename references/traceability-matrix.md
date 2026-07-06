# Traceability Matrix: {Project Name}

**Purpose:** Track requirements from classification through estimation to architecture implementation.

**Last Updated:** {date}

---

## Requirement Traceability

| Req ID | Requirement | Classification | Est Story | Estimate | Architecture Reference | Status |
|--------|-------------|----------------|-----------|----------|----------------------|--------|
| REQ-001 | {requirement title} | Non-deterministic | Story 1 | XL | agent-architecture.md § 4.2 | Designed |
| REQ-002 | {requirement title} | Deterministic | Story 5 | M | app-architecture.md § 3.1 | Designed |
| REQ-003 | {requirement title} | Non-deterministic | Story 2 | L | agent-architecture.md § 4.3, integration § 2.1 | Designed |
| REQ-004 | {requirement title} | Deterministic | - | - | Deferred to Phase 2 | Deferred |

---

## Traceability by Phase

### Phase 2 (Analysing) → Phase 3 (Estimating)

Requirements classified in `requirement-classification.md` are mapped to estimation stories in `mvp-estimates.md`:

- **MVP Core (AI):** REQ-001, REQ-003, REQ-007 → Stories 1, 2, 4
- **MVP Core (Traditional):** REQ-002, REQ-005, REQ-006 → Stories 5, 6, 7
- **Deferred:** REQ-004, REQ-008-020 → Documented in Deferred section

### Phase 3 (Estimating) → Phase 4 (Designing)

Estimation stories are implemented in architecture blueprints:

**agent-architecture.md:**

- § 4.2 Agent Architecture → Implements REQ-001 (Story 1: Knowledge extraction)
- § 4.3 Agent Architecture → Implements REQ-003 (Story 2: Calculation inference)

**app-architecture.md:**

- § 3.1 Backend Architecture → Implements REQ-002 (Story 5: Approval workflow)
- § 5.2 Auth & Authorization → Implements REQ-005 (Story 6: SSO integration)

**integration-architecture.md:**

- § 2.1 Document Upload Flow → Implements REQ-001, REQ-003

---

## Change Impact Analysis

Use this matrix to assess impact of requirement changes:

**Example:** If REQ-001 (Knowledge extraction) changes:

- **Affects Estimate:** Story 1 (XL) - may need re-sizing
- **Affects Architecture:** agent-architecture.md § 4.2, integration § 2.1
- **Action:** Review and update affected sections

---

## How to Maintain

**Phase 2 (Analysing):**

- Assign unique IDs to all requirements (REQ-001, REQ-002, etc.)
- Create initial traceability matrix with Req ID + Classification columns

**Phase 3 (Estimating):**

- Map requirements to estimation stories
- Add Est Story + Estimate columns
- Reference requirement IDs in mvp-estimates.md

**Phase 4 (Designing):**

- Document which architecture sections implement which requirements
- Add Architecture Reference column
- Mark status as Designed

**During Changes:**

- If requirement changes, trace to estimates and architecture
- Update affected documents
- Log change in traceability matrix notes
