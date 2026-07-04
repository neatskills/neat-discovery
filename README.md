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

## Iterative Discovery

Skills automatically detect and update existing files. Re-run any phase to merge new information:

- File exists → Load and update with new information
- File missing → Create fresh

## License

MIT
