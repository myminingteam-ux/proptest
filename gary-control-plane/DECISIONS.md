# GARY decisions

Control-plane revision: `3`
Updated: `2026-08-24T16:39:41+02:00`

## D-001 — Persisted continuity is authoritative

- Status: superseded by D-007
- Date: 2026-08-24
- Decision: Chat history and memory are convenience layers. The checked-in control plane is the durable authority for global GARY state, decisions, benchmark evidence, and project pointers.

## D-002 — Use a minimal file protocol

- Status: accepted
- Date: 2026-08-24
- Decision: Use Markdown plus one small JSON state file. Do not add a vector database, synchronization daemon, or extra MCP layer.

## D-003 — Separate global and project state

- Status: accepted
- Date: 2026-08-24
- Decision: Global state lives in `gary-control-plane/`. Project-specific state and handoffs live in each repository's `.gary/` directory.

## D-004 — Control-plane placement

- Status: accepted with migration option
- Date: 2026-08-24
- Decision: Until a dedicated repository can be created, `myminingteam-ux/proptest/gary-control-plane` is the canonical control-plane location. A future move changes the canonical URI and revision; it does not fork the state.

## D-005 — Promotion boundary

- Status: superseded by D-008
- Date: 2026-08-24
- Decision: STABLE is GARY v2.6.5 + ER1.1 + ER1.2. NEXT and LAB remain non-canonical. Only explicit, evidence-backed promotion may change STABLE.

## D-006 — Cloudflare Computer remote trial remains LAB/BLOCKED

- Status: blocked
- Date: 2026-08-24
- Decision: Do not promote or describe the Cloudflare Computer trial as remotely validated. Cloudflare rejected activation with API error `10195` because the account lacks the paid Dynamic Workers entitlement. Resume only after entitlement preflight; require activation, endpoint, authenticated smoke, and runtime logs before PASS.

## D-007 — Pointer and ledger are authoritative

- Status: accepted
- Date: 2026-08-24
- Decision: `C:\Users\codex\.gary\CURRENT.json` is the sole boot authority and `C:\Users\codex\.gary\state\gary.sqlite3` is the hash-chained evolution authority. This repository control plane is a verified projection and must fail closed on drift.

## D-008 — Promote GARY v2.7.1 coherence repair

- Status: accepted
- Date: 2026-08-24
- Decision: Promote GARY v2.7.1 State Coherence & Complexity Repair with no behavioral authority expansion. Keep MEM5.x proposal-only, SCD/DVR shadow, SEF1/SRG1 LAB, and Alpha9 excluded. Direct rollback is v2.7.0 SHA-256 `22d2b907bbd3dec29beb55163b4e5a00a56a001cf3b2b76db32f410e9c249e63`.
