# Mode Detection Pattern

Reusable pattern for detecting whether to update existing work or start fresh.

## When to Use

Any skill that produces output files that might need updating in later phases.

## How It Works

Auto-detect existing files → Ask user to choose → Execute chosen mode

## Implementation

### Detection Step

Check if output files exist in the phase directory:

```bash
ls docs/{project-name}/{phase-folder}/*.md 2>/dev/null
```

### User Choice

**If files exist:**

Ask user to choose approach:

```text
Found existing {artifact-type} from [date].

[1] Update it ({update-action})
[2] Regenerate (start fresh)

Choose [1]:
```

**User chooses [1] Update:**

- Load existing files
- Ask: "What new information do you want to add?" (or phase-specific question)
- **Append/refine** new information to appropriate sections
- **Preserve** existing content
- Flag contradictions if detected (don't auto-resolve)

**User chooses [2] Regenerate:**

- Inform: "Starting fresh {artifact-type}."
- Proceed with full process
- Overwrite all files

**If files don't exist:**

- Inform: "Creating new {artifact-type}."
- Proceed with full process

## Customization Per Skill

Replace placeholders with skill-specific values:

| Placeholder | Example (Assessing) | Example (Analysing) | Example (Scoping) |
| --- | --- | --- | --- |
| `{phase-folder}` | `01-assessing` | `02-analysing` | `03-scoping` |
| `{artifact-type}` | `assessment` | `analysis` | `MVP scope` |
| `{update-action}` | `append new information` | `add new requirements` | `re-estimate based on refined requirements` |
| Files to load | `project-context.md, current-state.md, assessment.md` | `requirement-classification.md, executive-report.md` | `mvp-scope.md` |
| Update question | "What new information do you want to add?" | "What new requirements do you want to add?" | "What changed in requirements or constraints?" |

## Benefits

- **No flags to remember** - conversational instead of CLI flags
- **User stays in control** - explicit choice between update and regenerate
- **Smart detection** - automatically knows when files exist
- **Safe default** - suggests update `[1]` as default choice
- **Consistent UX** - same pattern across all skills

## Anti-patterns to Avoid

❌ **Auto-merge without asking** - removes user control  
❌ **Require `--update` flag** - forces users to remember syntax  
❌ **Silent overwrite** - destroys existing work  
❌ **Complex detection logic** - keep it simple: files exist or they don't

## Example Usage in Skills

```markdown
### Step N: Detect Mode (Update or New)

See [Mode Detection Pattern](../references/mode-detection.md) for full implementation.

**Phase folder:** `0X-{skill-name}/`  
**Artifact type:** "assessment" | "analysis" | "MVP scope" | "architecture"  
**Update action:** {what user will do in update mode}  
**Files to load:** {list specific files}  
**Update question:** "{phase-specific question}"
```
