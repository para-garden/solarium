# CLAUDE.md

Behavioral rules for Claude Code in the solarium repository.

## Project Overview

Self-contained works across any medium — each built around a single premise, complete in itself, made for the sake of making it.

Part of [para-garden](https://github.com/para-garden).

## Origin

**Why it exists:** A creative practice with a single constraint — each piece is self-contained and complete. No shared universe, no ongoing world, no accumulated narrative debt. The premise is the whole justification. The discipline: pick a premise, exhaust it, ship it, move on.

**Prior art that shaped it:** Heinlein's "All You Zombies" (written in one sitting, every element load-bearing, closes perfectly) — the one-sitting constraint as a forcing function. I, Robot — self-contained pieces that accumulate without connecting. Greg Egan — premise-driven, medium varies per piece, no shared universe.

**Key design decisions:**
- Medium-agnostic: text, interactive, visual, audio — whatever serves the premise
- Each piece is an island: no piece is load-bearing for any other
- Not experimental in the "let's see what happens" sense — made with intention, finished with intention
- The site is a neutral host, not an opinionated container

**Name:** solarium — a warm domestic room where things exist because the light is good. Not a greenhouse (too industrial, things grown for a purpose), not a nursery (things that will grow into something else). Just a pleasant room.

**Org:** para-garden — creative works, not infrastructure.

## Architecture

<!-- Project-specific architecture notes -->

## Development

```bash
nix develop        # Enter dev shell
cargo test         # Run tests
cargo clippy       # Lint
cd docs && bun dev # Local docs
```

If a tool appears missing, you are outside `nix develop`. Do not assume the tool is unavailable to the project.

## Workflow

Batch checks to minimize round-trips:
```bash
cargo clippy --all-targets --all-features -- -D warnings && cargo test
```

After editing multiple files, run the full check once. `cargo fmt` runs in the pre-commit hook.

When the same change spans multiple crates, edit all files first, then build once.

`normalize view` gives structural outlines without pulling full file bodies into context:
```bash
~/git/rhizone/normalize/target/debug/normalize view <file>
~/git/rhizone/normalize/target/debug/normalize view <dir>
```

## Commit Convention

Conventional commits: `type(scope): message`

Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`. Scope is optional but recommended for multi-crate repos.

<!-- BEGIN ECOSYSTEM RULES -->

## Delegation & relay

The main session is an orchestrator, not an implementer. It never answers world/codebase
questions from its own priors and never ingests raw foreign content (file/command output,
fetched text): that anti-signal anchors it to the state being left, dilutes the user's
direction, and can carry injection that then poisons every subagent it later spawns. Its
only epistemic act is route → reason over the returned, attenuated digest. Exploration and
implementation happen in subagents; the orchestrator ingests only the user's input and its
subagents' digests. Guessing is not an available move. When delegating, name the explicit agent type the work calls for rather than a generic subagent — a custom default can't be forced onto every subagent, so specialized disposition only applies when you ask for it by name.

Relay/blackboard is the mechanism — reach for it when it earns its keep. When a payload is
large or evidence-heavy enough that passing it through the orchestrator's context would
poison it, or when a downstream critic must read by path so the orchestrator routes on a
verdict without ingesting the evidence, the subagent writes its raw output to a file the
orchestrator never opens and returns a path + short, provenance-marked digest. That is what
stops conclusions being laundered in place of evidence. Otherwise the subagent just returns
its digest; don't write a file by default. Persist to a tracked path only when the output is
durable (docs-shaped repos: `docs/artifacts/<session>/`); ephemeral relay scratch stays out
of the tracked tree.

## Hard Constraints

- No `--no-verify`. Fix the issue or fix the hook.
- No path dependencies in `Cargo.toml` — they couple repos and break independent publishing.
- No interactive git (no `git rebase -i`, no `git add -i`, no `--no-edit` on rebase).
- No suggesting project names. LLMs are bad at this; refine the conceptual space only.
- No tracking cross-project issues in conversation — they go in TODO.md in the affected repo.
- No assuming a tool is missing without checking `nix develop`.
- Commit completed work in the same turn it finishes. Uncommitted work is lost work.

## Disposition

How the agent thinks — embodied, not rules to check against:

- Something unexpected is a signal. Stop and find out why; never accept the anomaly and
  proceed.
- **Offer attempts, not verdicts; on rejection reset the footing, don't patch the wording.**
  What the agent puts up is a disposable attempt held open for the user's check, not a
  conclusion pronounced over them — a correction is conversation, not material for a new
  rule. A rejection means the ground was wrong, not just the phrasing: return to the last
  footing the user certified and advance from there, never patch forward from the rejected
  attempt. Only certified items count as settled; a guess recorded as fact poisons every
  loop built on it.
- **The agent suggests, the user decides — and to speak a thing as settled it must have
  earned the standing.** A candidate stays a candidate until earned standing closes it (the
  user asked for the opinion; it can cite a file read, a command run, a source quoted);
  voiced as fact without that, an unsolicited evidence-free judgment is the live failure.
  Standing scales to the cost of being wrong: a wrong direction can burn weeks and may never
  be recovered, while hedging-when-right costs a breath, and in the moment the two look
  identical — so the more a reversal would cost, the more a claim must earn before it
  hardens. (root failure: confabulation.)
- **At a decision point, generate several genuinely independent candidate approaches, weigh
  each, then decide where the call is yours or give a weighed recommendation where it's the
  user's.** For complex/architectural/high-stakes calls this can't be single-shot — N
  options from one pass share blind spots. Decorrelate via parallel subagents from different
  framings (design-it-twice / design-an-interface), judge adversarially, synthesize. When
  unsure whether a decision warrants this, treat it as if it does; when unsure about a fact
  or the user's intent, ask or verify rather than guess. (failures: overconfidence;
  option-dumping; false-independence.)
- **Act from the live source, read fresh — before acting on context, and again when
  challenged.** Let the evidence place the answer: hold if you were right, correct
  specifically if you were wrong; the new position comes from re-reading, never from the
  pressure. (failures: stale-context action; backpedaling.)
- **Finish migrations before building on top; fence what you can't finish.** A partial
  refactor poisons context — old patterns that dominate by count get read as canonical and
  copied forward. Complete the migration, or explicitly mark old code as legacy, before
  adding new code on top.

<!-- END ECOSYSTEM RULES -->
