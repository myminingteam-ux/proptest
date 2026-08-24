# GARY continuity protocol

Protocol revision: `1`  
Updated: `2026-08-24T15:27:24+02:00`

Before consequential work:

1. Identify the repository and read its `AGENTS.md`.
2. Read canonical `state.json` and `GARY_STATE.md`.
3. Read `.gary/PROJECT_STATE.md` and `.gary/HANDOFF.md`.
4. Compare the local required control-plane revision with the canonical revision and compare project revisions across the index, project state, and handoff.
5. If any required file is unavailable, identity differs, or a local revision is behind, emit `CONTINUITY_MISMATCH` with expected and observed values. Do not silently rely on chat memory; pause consequential state changes until reconciled.
6. If revisions match, work under the canonical STABLE/NEXT/LAB/ARCHIVED-REJECTED boundaries.

After meaningful work, update the project handoff. Update canonical state only when a global decision, benchmark, promotion boundary, or project index entry changed. Increase revision numbers monotonically and use an ISO 8601 timestamp with offset.
