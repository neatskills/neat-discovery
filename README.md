# neat-discovery

AI discovery framework for consultants assessing whether projects need AI infrastructure.

## Overview

Three sequential skills guide you through discovery phases:

1. **neat-discovery-mapping** - Map knowledge landscape and assess constraints
2. **neat-discovery-analysing** - Classify requirements and build business case  
3. **neat-discovery-designing** - Design AI infrastructure architecture

Each skill produces markdown artifacts in `docs/{project-name}/` that feed into subsequent phases.

## Installation

```bash
cd neat-discovery/scripts
./manage-skills.sh install
```

This creates symlinks in `~/.claude/skills/`:
- `neat-discovery-mapping`
- `neat-discovery-analysing`
- `neat-discovery-designing`

## Usage

### Phase 1: Mapping

```
/neat-discovery-mapping
```

**Outputs:**
- `docs/{project-name}/knowledge-landscape.md` - Inventory of knowledge sources
- `docs/{project-name}/knowledge-assessment.md` - Gaps, constraints, inferred knowledge

### Phase 2: Analysing

```
/neat-discovery-analysing
```

**Prerequisites:** Phase 1 outputs  
**Inputs:** Requirements list, business context

**Outputs:**
- `docs/{project-name}/requirement-classification.md` - Deterministic vs non-deterministic
- `docs/{project-name}/executive-report.md` - Strategic business justification

### Phase 3: Designing

```
/neat-discovery-designing
```

**Prerequisites:** Phase 1 and Phase 2 outputs

**Outputs:**
- `docs/{project-name}/ai-architecture-blueprint.md` - Complete architecture design

## Example Workflow

### Discovery for a CRM Enhancement Project

**Phase 1: Mapping**
```
$ /neat-discovery-mapping

What's the project name?
> crm-enhancement

[Conversation about knowledge sources, systems, access constraints...]

✓ Knowledge mapping complete

Generated:
- docs/crm-enhancement/knowledge-landscape.md
- docs/crm-enhancement/knowledge-assessment.md
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
- docs/crm-enhancement/requirement-classification.md
- docs/crm-enhancement/executive-report.md

Review executive-report.md to decide whether to proceed with Phase 3.
```

**Phase 3: Designing**
```
$ /neat-discovery-designing

Existing projects:
  [1] crm-enhancement

Choose [1]: 1

[Analysis of requirements and knowledge landscape...]

✓ Architecture design complete

Generated:
- docs/crm-enhancement/ai-architecture-blueprint.md

Discovery process complete.
```

### Iterative Discovery

If new information emerges, re-run any phase:

```
$ /neat-discovery-mapping

Existing projects:
  [1] crm-enhancement

Choose [1]: 1

Found existing mapping from 2026-07-04. I'll merge new information.

[Conversation about new knowledge sources discovered...]

✓ Knowledge mapping updated
```

## Output Structure

Each project creates a directory under `docs/` with all artifacts:

```
docs/
  crm-enhancement/
    knowledge-landscape.md
    knowledge-assessment.md
    requirement-classification.md
    executive-report.md
    ai-architecture-blueprint.md
```

## Iterative Discovery

Skills automatically detect and update existing files. Re-run any phase to merge new information:

- File exists → Load and update with new information
- File missing → Create fresh

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
