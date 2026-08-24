# GARY continuity protocol

Protocol revision: `2`
Updated: `2026-08-24T16:39:41+02:00`

Before consequential work:

1. Identify the repository and read its `AGENTS.md`.
2. Resolve `C:\Users\codex\.gary\CURRENT.json`, verify its archive hash/persistence receipt, and verify the shared evolution ledger state hash. Then read repository `state.json` and `GARY_STATE.md` as projections.
3. Read `.gary/PROJECT_STATE.md` and `.gary/HANDOFF.md`.
4. Compare the local required control-plane revision with the canonical revision and compare project revisions across the index, project state, and handoff.
5. If any required file is unavailable, identity/hash differs, the ledger state drifts, or a local revision is behind, emit `CONTINUITY_MISMATCH` with expected and observed values. Do not silently rely on chat memory; pause consequential state changes until reconciled.
6. If revisions match, work under the canonical STABLE/NEXT/LAB/ARCHIVED-REJECTED boundaries.

After meaningful work, update the project handoff. Append global GARY evolution to the hash-chained ledger first, then regenerate repository projections when a global decision, benchmark, promotion boundary, or project index entry changed. Increase revision numbers monotonically and use an ISO 8601 timestamp with offset.
