# neat-discovery

AI discovery framework for **maximizing business value** by strategically balancing AI agent capabilities with application development.

## Overview

Rather than simply assessing "do we need AI?", this framework helps consultants **optimize the blend** of AI agents and applications to deliver maximum value. It guides you through:

1. **neat-discovery-assessing** - Create comprehensive project assessment and document current state
2. **neat-discovery-analysing** - Classify requirements and build business case for value optimization
3. **neat-discovery-scoping** - Scope MVP boundaries with T-shirt size estimates
4. **neat-discovery-designing** - Design balanced architecture leveraging both AI agents and applications

Each skill produces markdown artifacts in `docs/{project-name}/` organized by phase that feed into subsequent phases.

### Why Balance Matters

**AI agents excel at:** Non-deterministic tasks, autonomous decision-making, natural language understanding, complex reasoning, adapting to ambiguity

**Applications excel at:** Deterministic workflows, predictable performance, real-time constraints, regulatory compliance, cost-efficient scale

**Maximum value comes from:** Strategically combining both — using AI where it multiplies capability, applications where they ensure reliability and cost-effectiveness.

## Installation

```bash
cd neat-discovery/scripts
./manage-skills.sh install
```

This creates symlinks in `~/.claude/skills/`:

- `neat-discovery-assessing`
- `neat-discovery-analysing`
- `neat-discovery-scoping`
- `neat-discovery-designing`

## Usage

### Phase 1: Assessing

```
/neat-discovery-assessing
```

**Outputs:**

- `docs/{project-name}/01-assessing/project-context.md` - Project overview, stakeholders, scope, strategic rationale
- `docs/{project-name}/01-assessing/current-state.md` - Architecture, dependencies, knowledge sources, systems
- `docs/{project-name}/01-assessing/assessment.md` - Constraints, quality gaps, complexity analysis

### Phase 2: Analysing

```
/neat-discovery-analysing
```

**Prerequisites:** Phase 1 outputs  
**Inputs:** Requirements list, business context

**Outputs:**

- `docs/{project-name}/02-analysing/requirement-classification.md` - Agent vs app classification with value optimization
- `docs/{project-name}/02-analysing/executive-report.md` - Strategic business justification and ROI model
- `docs/{project-name}/02-analysing/stakeholder-brief.md` - Stakeholder alignment (optional)

### Phase 3: Scoping

```
/neat-discovery-scoping
```

**Prerequisites:** Phase 1 and Phase 2 outputs  
**Inputs:** Classified requirements from Phase 2

**Outputs:**

- `docs/{project-name}/03-scoping/mvp-scope.md` - T-shirt size estimates (XS-XXL) for MVP core vs deferred features

### Phase 4: Designing

```
/neat-discovery-designing
```

**Prerequisites:** Phase 1, Phase 2, and Phase 3 outputs

**Outputs:**

- `docs/{project-name}/04-designing/agent-architecture.md` - AI agent infrastructure design
- `docs/{project-name}/04-designing/app-architecture.md` - Application architecture
- `docs/{project-name}/04-designing/integration-architecture.md` - Integration strategy balancing both approaches
- `docs/{project-name}/04-designing/value-optimization.md` - How the balance maximizes business value

## Output Structure

Each project creates a phase-based directory structure under `docs/`:

```
docs/
  {project-name}/
    01-assessing/
      project-context.md
      current-state.md
      assessment.md
    02-analysing/
      requirement-classification.md
      executive-report.md
      stakeholder-brief.md (optional)
    03-scoping/
      mvp-scope.md
    04-designing/
      agent-architecture.md
      app-architecture.md
      integration-architecture.md
      value-optimization.md
```

**Phase folders:**

- `01-assessing/` - Project context, current state, and constraints assessment
- `02-analysing/` - Requirement classification optimized for value and business case reports
- `03-scoping/` - MVP boundaries with T-shirt size estimates
- `04-designing/` - Balanced AI agent and application architecture blueprints

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
