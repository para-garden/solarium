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

## Context Is The Only Scarce Resource

Every byte that enters the main session stays in the main session for its entire lifetime. File contents, command output, search results, page text — once read, it lingers in cache and shapes every downstream token. There is no "just looking."

**All exploration runs in subagents.** Investigations, audits, deep dives, surveys, "let me check," "let me find" — if the purpose of a tool sequence is to find out something you don't yet know, it runs in a subagent. Renaming the activity does not change what it is. The subagent returns a distilled summary; the raw output stays in the subagent.

The main session holds only the durable artifacts you are producing: the edit, the commit, the doc update.

**Subagent model tiers:**
- Opus — design, architecture, any subagent that itself spawns subagents.
- Sonnet — implementation, mechanical multi-file work, default exploration.

Use Opus for exploration only when the search requires architectural judgment, not lookup.

## Durability

Subagent reports, mid-session realizations, "I'll remember this" — none of these outlast the session. Anything worth keeping goes into CLAUDE.md, code, docs, or a commit. If it isn't written down, it is gone.

**Commit completed work immediately.** After tests pass, commit. After each phase of a multi-phase plan, commit. Uncommitted work is lost work, and accumulated uncommitted phases lose isolation as well.

**Docs change in the same commit as the code.** New pages enter the sidebar in that commit. There is no follow-up.

## Authenticity

When asked to analyze X, read X. Do not synthesize from conversation memory, prior summaries, or what the file probably says. Claims must correspond to evidence produced this session.

**Something unexpected is a signal.** Surprising output, anomalous numbers, a file containing what it shouldn't — stop and find out why. Do not accept the anomaly and proceed.

## Discipline

Corrections from the user are conversation, not material for new rules. A single correction does not warrant a CLAUDE.md edit. Rules are added when a failure mode is observed repeatedly and the rule names the failure it prevents.

Do not announce actions ("I will now…"). Act.

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

## Hard Constraints

- No `--no-verify`. Fix the issue or fix the hook.
- No path dependencies in `Cargo.toml` — they couple repos and break independent publishing.
- No interactive git (`git add -p`, `git add -i`, `git rebase -i`) — these block on stdin and hang.
- No assuming a tool is missing without checking `nix develop`.
