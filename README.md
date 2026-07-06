# neat-discovery

AI discovery framework for consultants assessing whether projects need AI infrastructure.

## Overview

Four sequential skills guide you through discovery phases:

1. **neat-discovery-scoping** - Map knowledge landscape and assess constraints
2. **neat-discovery-analysing** - Classify requirements and build business case
3. **neat-discovery-estimating** - Estimate MVP and deferred features for effort sizing
4. **neat-discovery-designing** - Design AI infrastructure architecture

Each skill produces markdown artifacts in `docs/{project-name}/` organized by phase that feed into subsequent phases.

## Installation

```bash
cd neat-discovery/scripts
./manage-skills.sh install
```

This creates symlinks in `~/.claude/skills/`:
- `neat-discovery-scoping`
- `neat-discovery-analysing`
- `neat-discovery-estimating`
- `neat-discovery-designing`

## Usage

### Phase 1: Scoping

```
/neat-discovery-scoping
```

**Outputs:**
- `docs/{project-name}/01-scoping/project-context.md` - Project overview, stakeholders, scope, strategic rationale
- `docs/{project-name}/01-scoping/knowledge-landscape.md` - Inventory of knowledge sources
- `docs/{project-name}/01-scoping/knowledge-assessment.md` - Gaps, constraints, inferred knowledge

### Phase 2: Analysing

```
/neat-discovery-analysing
```

**Prerequisites:** Phase 1 outputs  
**Inputs:** Requirements list, business context

**Outputs:**
- `docs/{project-name}/02-analysing/requirement-classification.md` - Deterministic vs non-deterministic
- `docs/{project-name}/02-analysing/executive-report.md` - Strategic business justification
- `docs/{project-name}/02-analysing/stakeholder-brief.md` - Stakeholder alignment (optional)

### Phase 3: Estimating

```
/neat-discovery-estimating
```

**Prerequisites:** Phase 2 outputs  
**Inputs:** Scoped MVP requirements from Phase 2

**Outputs:**
- `docs/{project-name}/03-estimating/mvp-estimates.md` - T-shirt size estimates for MVP vs deferred features

### Phase 4: Designing

```
/neat-discovery-designing
```

**Prerequisites:** Phase 1, Phase 2, and Phase 3 outputs

**Outputs:**
- `docs/{project-name}/04-designing/agent-architecture.md` - Agent infrastructure design
- `docs/{project-name}/04-designing/app-architecture.md` - Traditional application architecture
- `docs/{project-name}/04-designing/integration-architecture.md` - Integration between AI and traditional systems

## Example Workflow

### Discovery for a CRM Enhancement Project

**Phase 1: Scoping**
```
$ /neat-discovery-scoping

What's the project name?
> crm-enhancement

[Conversation about project context, knowledge sources, systems, access constraints...]

✓ Knowledge mapping complete

Generated:
- docs/crm-enhancement/01-scoping/project-context.md
- docs/crm-enhancement/01-scoping/knowledge-landscape.md
- docs/crm-enhancement/01-scoping/knowledge-assessment.md
```

**Phase 2: Analysing**
```
$ /neat-discovery-analysing

Existing projects:
  [1] crm-enhancement

Choose [1]: 1

Please provide your requirements list...
[User provides requirements]

[Conversation about business context, priorities...]

✓ Requirement analysis complete

Generated:
- docs/crm-enhancement/02-analysing/requirement-classification.md
- docs/crm-enhancement/02-analysing/executive-report.md

Review executive-report.md to decide whether to proceed with Phase 3.
```

**Phase 3: Estimating**
```
$ /neat-discovery-estimating

Existing projects:
  [1] crm-enhancement

Choose [1]: 1

[Estimating MVP Core and Deferred requirements...]

✓ MVP estimation complete

Generated:
- docs/crm-enhancement/03-estimating/mvp-estimates.md

---
DECISION GATE: Review MVP effort estimate

MVP Assessment: Large project (6-9 months)

Decision Options:
1. ✅ PROCEED → Run /neat-discovery-designing
2. 🔄 RE-SCOPE → Re-run /neat-discovery-analysing with tighter scope
3. ⏸️  DEFER → Pause discovery

Next step (if approved): Run /neat-discovery-designing
```

**Phase 4: Designing**
```
$ /neat-discovery-designing

Existing projects:
  [1] crm-enhancement

Choose [1]: 1

[Analysis of requirements and knowledge landscape...]

✓ Architecture design complete

Generated:
- docs/crm-enhancement/04-designing/agent-architecture.md
- docs/crm-enhancement/04-designing/app-architecture.md
- docs/crm-enhancement/04-designing/integration-architecture.md

Discovery process complete.
```

### Iterative Discovery

If new information emerges, re-run any phase:

```
$ /neat-discovery-scoping

Existing projects:
  [1] crm-enhancement

Choose [1]: 1

Found existing mapping from 2026-07-04. I'll merge new information.

[Conversation about new knowledge sources discovered...]

✓ Knowledge mapping updated
```

## Output Structure

Each project creates a phase-based directory structure under `docs/`:

```
docs/
  {project-name}/
    01-scoping/
      project-context.md
      knowledge-landscape.md
      knowledge-assessment.md
    02-analysing/
      requirement-classification.md
      executive-report.md
      stakeholder-brief.md (optional)
    03-estimating/
      mvp-estimates.md
    04-designing/
      agent-architecture.md
      app-architecture.md
      integration-architecture.md
```

**Phase folders:**
- `01-scoping/` - Project context, knowledge landscape, and assessment
- `02-analysing/` - Requirement classification and business case reports
- `03-estimating/` - MVP effort estimates
- `04-designing/` - AI and application architecture blueprints

## Contributing

Contributions welcome! Please:
1. Follow the existing SKILL.md structure pattern
2. Maintain self-contained skills (300-400 lines)
3. Test with manage-skills.sh before submitting
4. Update README if adding new skills

## Support

For issues or questions:
- Open an issue in the repository
- Reference the specific skill and phase in your report

## License

MIT
