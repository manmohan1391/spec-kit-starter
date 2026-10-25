# Spec Kit cheat sheet (Claude Code)

## Setup (terminal)

| Do | Command |
|---|---|
| Install | `uv tool install specify-cli` |
| Check tools | `specify check` |
| New project | `specify init my-project --integration claude` |
| Existing project | `specify init --here --integration claude` |
| Check for update | `specify self check` |
| Upgrade | `specify self upgrade` |

Needs Python 3.11+, uv and Claude Code.

## Workflow (inside Claude Code)

| # | Command | Output |
|---|---|---|
| 1 | `/speckit-constitution <your rules>` | `.specify/memory/constitution.md` |
| 2 | `/speckit-specify <what and why>` | `specs/NNN-name/spec.md` |
| 3 | `/speckit-plan <tech choices>` | `specs/NNN-name/plan.md` |
| 4 | `/speckit-tasks` | `specs/NNN-name/tasks.md` |
| 5 | `/speckit-implement` | code, tasks ticked `[x]` |
| 6 | `/speckit-converge` | missing work added to `tasks.md` |

Loop **5 → 6** until converge says **Converged**.

## Optional

| Command | When |
|---|---|
| `/speckit-clarify` | after specify: up to 5 questions about gaps |
| `/speckit-checklist` | after plan: requirements checklist |
| `/speckit-analyze` | after tasks: read-only consistency check |

## Rules of thumb

- Spec = **what & why**. Plan = **how**.
- Read each file before the next step.
- Commit `specs/`; check `.claude/` for anything private first.
- Tiny fix? Just prompt. Multi-file feature? Spec it.
