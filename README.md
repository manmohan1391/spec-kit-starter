<p align="center"><img src="assets/banner.svg" alt="Stop vibe coding. Spec it first. GitHub Spec Kit with Claude Code" width="100%"></p>

<p align="center">
  <a href="https://manmohan1391.github.io/spec-kit-starter/"><b>Open the interactive guide</b></a>
  &nbsp;|&nbsp;
  <a href="#install">Install</a>
  &nbsp;|&nbsp;
  <a href="#the-workflow">The workflow</a>
  &nbsp;|&nbsp;
  <a href="#try-it-build-photo-albums-in-6-steps">Try the example</a>
  &nbsp;|&nbsp;
  <a href="CHEATSHEET.md">Cheat sheet</a>
</p>

Vibe coding with AI feels like catching an egg that rolls off the desk: you catch the bug at the last second, until one day you don't. **[GitHub Spec Kit](https://github.com/github/spec-kit)** puts your project in a box first. Your AI agent writes down the rules, the spec, the plan and the tasks *before* it writes code, then builds against them.

This repo shows you how to set it up with Claude Code and walks you through a small, complete example.

From the reel by [@whats.ai.with.manu](https://www.instagram.com/whats.ai.with.manu/).

## What is Spec Kit?

Spec Kit is GitHub's open-source toolkit for **spec-driven development** (MIT licence). You install a small CLI called `specify`, run it once in your project, and it adds a set of skills to your AI coding agent. Each skill produces one written artifact, and each artifact feeds the next:

```
constitution  →  spec  →  plan  →  tasks  →  code  →  converge
 project rules    what &     tech       small      the AI     checks code
                  why        choices    steps      builds     against spec
```

Because every step is a file in your repo, you can review it, change it, and keep it for the next feature.

It works with Claude Code, GitHub Copilot, Gemini CLI and many other agents. This guide uses **Claude Code**.

## Install

You need **Python 3.11+**, **[uv](https://docs.astral.sh/uv/)** and **[Claude Code](https://docs.claude.com/en/docs/claude-code/overview)**.

```bash
uv tool install specify-cli
```

Check it worked:

```bash
specify version
specify check
```

## Create a project

```bash
specify init my-project --integration claude
cd my-project
```

Already have a project? Run it inside the folder instead:

```bash
specify init --here --integration claude
```

`specify init` adds:

```
my-project/
├── .claude/skills/        the Spec Kit skills for Claude Code (speckit-specify, speckit-plan, …)
└── .specify/
    ├── memory/constitution.md   your project rules (filled in by the first step)
    ├── templates/               spec, plan, tasks and checklist templates
    └── scripts/                 helper scripts the skills use
```

> [!TIP]
> Spec Kit itself warns that agent folders can hold credentials or private files. Check what's in `.claude/` before you commit it, and add anything private to `.gitignore`.

Now start Claude Code in the project folder:

```bash
claude
```

## The workflow

Run these **inside Claude Code**, not in your terminal. Read each result before you go on to the next step.

| Step | Command | What it does | File it writes |
|---|---|---|---|
| 1 | `/speckit-constitution` | Sets your project's rules (once per project) | `.specify/memory/constitution.md` |
| 2 | `/speckit-specify` | Describes **what** you're building and **why**, no tech yet | `specs/001-…/spec.md` |
| 3 | `/speckit-plan` | Picks the tech stack and design | `specs/001-…/plan.md` |
| 4 | `/speckit-tasks` | Breaks the plan into small, ordered tasks | `specs/001-…/tasks.md` |
| 5 | `/speckit-implement` | Works through the tasks and writes the code | your source files |
| 6 | `/speckit-converge` | Checks the code against the spec, plan and tasks, and adds any missing work as new tasks | `tasks.md` |

Repeat **implement → converge** until converge reports **Converged**.

**Optional quality steps:**

| Command | When | What it does |
|---|---|---|
| `/speckit-clarify` | after specify, before plan | Asks up to 5 targeted questions about gaps in the spec and writes the answers back into it |
| `/speckit-checklist` | after plan | Generates a checklist to check the requirements are complete and clear |
| `/speckit-analyze` | after tasks, before implement | Read-only consistency check across spec, plan and tasks |

> [!NOTE]
> For Claude Code the commands use a **hyphen**: `/speckit-specify`. Some docs show `/speckit.specify`, which is the form used by other agents. Type `/speckit` in Claude Code and pick from the menu if you're unsure.

## Try it: build "photo albums" in 6 steps

A tiny feature that groups photos into albums by date. The finished result is in [`example/photo-albums`](example/photo-albums), so you can compare yours with it.

```bash
specify init photo-albums --integration claude
cd photo-albums
claude
```

Then paste these one at a time in Claude Code, reading each file before the next step.

<details open>
<summary><b>1. Constitution</b>: the project rules</summary>

```
/speckit-constitution privacy first, test before code, keep it simple
```

You get `.specify/memory/constitution.md` with principles like "Photos never leave the device" and "Every feature starts with a failing test". [See the example](example/photo-albums/.specify/memory/constitution.md).
</details>

<details>
<summary><b>2. Specify</b>: what and why</summary>

```
/speckit-specify a photo app that groups photos into albums by date, and lets me move a photo to another album
```

You get `specs/001-photo-albums/spec.md` with user stories, acceptance scenarios ("Given 3 photos from 2 days, when I open Albums, then I see 2 albums") and requirements (FR-001, FR-002). No tech choices yet. [See the example](example/photo-albums/specs/001-photo-albums/spec.md).
</details>

<details>
<summary><b>3. Plan</b>: the tech choices</summary>

```
/speckit-plan plain JavaScript on Node, no framework, local JSON file, tests with node --test
```

You get `plan.md` with the technical context and a **Constitution Check** that confirms the plan follows your rules. [See the example](example/photo-albums/specs/001-photo-albums/plan.md).
</details>

<details>
<summary><b>4. Tasks</b>: small steps</summary>

```
/speckit-tasks
```

You get `tasks.md`: numbered tasks (T001, T002…) grouped by user story, tests before code. [See the example](example/photo-albums/specs/001-photo-albums/tasks.md).
</details>

<details>
<summary><b>5. Implement</b>: the AI builds it</summary>

```
/speckit-implement
```

Claude works through the tasks, ticking each one `[x]` in `tasks.md`, and writes [`src/albums.js`](example/photo-albums/src/albums.js) and [`tests/albums.test.js`](example/photo-albums/tests/albums.test.js).

```bash
npm test
# pass 2
# fail 0
```
</details>

<details>
<summary><b>6. Converge</b>: does the code match the spec?</summary>

```
/speckit-converge
```

If anything from the spec isn't built yet, it's added to `tasks.md` as new tasks. Run `/speckit-implement` again, then converge again, until it reports **Converged**.
</details>

## Tips

- **Review every file before moving on.** The point is that you agree with the spec and plan before any code exists. Edit them by hand if something's wrong.
- **Keep the spec free of tech.** "Group photos by date" belongs in the spec; "use SQLite" belongs in the plan.
- **One feature at a time.** Each `/speckit-specify` starts a new numbered folder under `specs/`.
- **Commit the `specs/` folder.** It documents why the code looks the way it does.
- **Small change? Skip it.** For a one-line fix, plain prompting is faster. Spec Kit pays off on features that span several files.

## Keep it up to date

```bash
specify self check      # is there a newer version?
specify self upgrade    # upgrade in place
```

## Other agents

Swap the `--integration` value, e.g. `--integration copilot` or `--integration gemini`. Run `specify init --help` for the full list.

## Links

- [github/spec-kit](https://github.com/github/spec-kit) (source and README)
- [Spec Kit docs: installation](https://github.github.com/spec-kit/installation.html)
- [Claude Code docs](https://docs.claude.com/en/docs/claude-code/overview)
- More starter guides: [claude-skills-starter](https://github.com/manmohan1391/claude-skills-starter)

## License

MIT for this guide and the example code, see [LICENSE](LICENSE). Spec Kit belongs to GitHub under its own MIT licence.

*Checked against specify-cli 1.2.3 on 25 Oct 2026.*
