# GARY continuity gate

This repository is the YourFundedAccount project and currently hosts the canonical GARY control plane at [`gary-control-plane/`](gary-control-plane/).

Before consequential work, read in order:

1. `gary-control-plane/state.json`
2. `gary-control-plane/GARY_STATE.md`
3. `gary-control-plane/CONTINUITY_PROTOCOL.md`
4. `.gary/PROJECT_STATE.md`
5. `.gary/HANDOFF.md`

The canonical control-plane revision is the value in `state.json`. The required revision in `.gary/PROJECT_STATE.md`, project revision in `.gary/PROJECT_STATE.md`, handoff revision, and matching `PROJECT_INDEX.md` entry must agree.

If a required file is missing or inaccessible, repository identity differs, or any local/project revision is stale, report:

`CONTINUITY_MISMATCH — expected <revision/identity>; observed <revision/identity>`

Do not perform consequential state-changing work until the mismatch is reconciled. Read-only diagnosis is allowed. Chat history and memory are not substitutes for persisted state.

GARY STABLE is v2.7.6 P0-1 Canonical Memory-State Contract, with runtime compatibility release 2.7.3 and protocol ABI 2.6.5. Its scope is the exact qualified read-only memory-state/retrieval contract; no new storage, persistence, provider, graph, vector, authority, agent, skill, dependency, or routing surface is active; SBK1 remains non-canonical in its NEXT/LAB-origin lane and the Experience Compiler remains LAB; P0-2 has not started. NEXT and LAB are non-canonical; use only STABLE/NEXT/LAB/ARCHIVED-REJECTED status names. Existing higher-level GARY governance and promotion evidence remain authoritative.
