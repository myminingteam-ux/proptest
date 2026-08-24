# GARY decisions

Control-plane revision: `2`
Updated: `2026-08-24T15:47:41+02:00`

## D-001 — Persisted continuity is authoritative

- Status: accepted
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

- Status: locked
- Date: 2026-08-24
- Decision: STABLE is GARY v2.6.5 + ER1.1 + ER1.2. NEXT and LAB remain non-canonical. Only explicit, evidence-backed promotion may change STABLE.

## D-006 — Cloudflare Computer remote trial remains LAB/BLOCKED

- Status: blocked
- Date: 2026-08-24
- Decision: Do not promote or describe the Cloudflare Computer trial as remotely validated. Cloudflare rejected activation with API error `10195` because the account lacks the paid Dynamic Workers entitlement. Resume only after entitlement preflight; require activation, endpoint, authenticated smoke, and runtime logs before PASS.
