# neat-discovery

Discovery framework for understanding what to build, scoping the effort, and designing the architecture — before implementation begins.

## Overview

Three phases, each feeding the next:

1. **neat-discovery-assessing** - Understand the project: context, current state, constraints
2. **neat-discovery-scoping** - Scope MVP boundaries with T-shirt estimates and AI vs traditional classification
3. **neat-discovery-designing** - Design high-level architecture for AI agent and application components

Each skill produces markdown artifacts in `docs/{project-name}/` organized by phase.

### Optional: Business Case Phase

For enterprise or consulting projects that require formal stakeholder alignment before proceeding:

- **neat-discovery-analysing** - Build strategic business case and ROI model (runs between assessing and scoping)

### Entry Points

| Starting point | Begin at |
| --- | --- |
| Coming from neat-util-vetting | **Scoping** — skip assessing and analysing entirely |
| New consulting or enterprise project | **Assessing** — full context + current-state interview |
| Known requirements, no prior vetting | **Scoping** — provide context in conversation |

## Installation

```bash
cd neat-discovery/scripts
./manage-skills.sh install
```

This creates symlinks in `~/.claude/skills/`:

- `neat-discovery-assessing`
- `neat-discovery-scoping`
- `neat-discovery-designing`
- `neat-discovery-analysing` (optional — enterprise business case)

## Usage

### Phase 1: Assessing

```text
/neat-discovery-assessing
```

**Skip if:** Coming from neat-util-vetting (discovery brief pre-populates context) and no existing codebase to map.

**Outputs:**

- `docs/{project-name}/01-assessing/project-context.md` - Project overview, stakeholders, scope, strategic rationale
- `docs/{project-name}/01-assessing/knowledge-landscape.md` - Architecture, dependencies, knowledge sources, systems
- `docs/{project-name}/01-assessing/knowledge-assessment.md` - Constraints, quality gaps, complexity analysis

### Phase 2: Scoping

```text
/neat-discovery-scoping
```

**Prerequisites:** Phase 1 outputs (or discovery brief from vetting)  
**Inputs:** Requirements list from user

**Outputs:**

- `docs/{project-name}/03-scoping/mvp-scope.md` - Requirements classified (AI / Traditional / Hybrid) with T-shirt size estimates (XS-XXL) for MVP core vs deferred

### Phase 3: Designing

```text
/neat-discovery-designing
```

**Prerequisites:** Phase 1 and Phase 2 outputs

**Outputs:**

- `docs/{project-name}/04-designing/agent-architecture.md` - AI agent infrastructure design
- `docs/{project-name}/04-designing/app-architecture.md` - Application architecture
- `docs/{project-name}/04-designing/integration-architecture.md` - Integration strategy

### Optional: Analysing (Enterprise Business Case)

```text
/neat-discovery-analysing
```

**When to use:** Enterprise or consulting projects requiring formal business justification before scoping.  
**Run between:** Assessing and Scoping.

**Outputs:**

- `docs/{project-name}/02-analysing/requirement-classification.md` - Formal AI vs app classification
- `docs/{project-name}/02-analysing/executive-report.md` - Strategic business justification and ROI model
- `docs/{project-name}/02-analysing/stakeholder-brief.md` - Stakeholder alignment (optional)

## Output Structure

Each project creates a phase-based directory structure under `docs/`:

```text
docs/
  {project-name}/
    01-assessing/
      project-context.md
      knowledge-landscape.md
      knowledge-assessment.md
    02-analysing/          # optional — enterprise business case only
      requirement-classification.md
      executive-report.md
      stakeholder-brief.md (optional)
    03-scoping/
      mvp-scope.md
    04-designing/
      agent-architecture.md
      app-architecture.md
      integration-architecture.md
```

**Phase folders:**

- `01-assessing/` - Project context, current state, and constraints
- `02-analysing/` - Enterprise business case (optional, runs after assessing)
- `03-scoping/` - Requirements classified and sized; MVP vs deferred
- `04-designing/` - AI agent and application architecture blueprints

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
