# GARY × Cloudflare Computer LAB — Status

## Experiment

- ID: `GARY-CLOUDFLARE-COMPUTER-LAB-001`
- Lane: `LAB`
- GARY STABLE: **UNCHANGED**
- Backend tested: `WorkerShellBackend`
- Runtime: Wrangler 4.125.0 local Workers runtime on Vercel build infrastructure
- Node: 22.23.2
- Final Vercel deployment: `dpl_7YZo5twychmfLdXJNsekez7HqVyJ`
- Final deployment state: `READY`

## Result

**PASS — 19/19 checks.**

### Base smoke gate — 17/17

- Worker health endpoint
- LAB contract / STABLE unchanged marker
- Workspace A write
- Workspace A read
- Workspace A content integrity
- Worker shell execution
- Shell sees file written through filesystem API
- Workspace B write
- Workspace B read
- Workspace B content integrity
- Workspace A reread
- Cross-workspace isolation
- Missing-file semantics
- Shell mutation request
- Shell mutation exit code
- Mutated file read
- Shell ↔ filesystem coherence

### Restart persistence gate — 2/2

- Workspace file survived a full Wrangler runtime process restart
- Worker shell could read the same persisted file after restart

## Compatibility findings fixed during the trial

1. Current Wrangler 4.125.0 requires `@cloudflare/workers-types` 5.x; the older 4.x example range caused npm `ERESOLVE`.
2. The minimal harness initially omitted the generated/hand-written `Env` binding type used by Cloudflare's worker-shell example.
3. A bare Workspace does not automatically create `/workspace`; the harness now initializes it with `fs.mkdir('/workspace', { recursive: true })`.

## Observed behavior

- Durable Object and Worker Loader bindings started successfully in local mode.
- `WorkerShellBackend` executed commands against the same filesystem state written through `Workspace.fs`.
- Two named Durable Object workspaces remained isolated from each other.
- Local Durable Object state survived terminating Wrangler and starting a new Wrangler process in the same build workspace.
- The missing-file test returns the expected 404 but Wrangler also prints the caught `WorkspaceFsError` in its development log; this is noisy but did not fail the test.

## Not yet tested

- Remote deployment to a real Cloudflare account / `workers.dev`
- Persistence across a real Cloudflare Durable Object eviction or production redeploy
- Container backend
- Multiple-backend routing (Worker → Container)
- Git operations inside the Workspace
- Isolate JavaScript backend
- Cost/latency comparison against existing GARY execution paths

## Decision

Keep Cloudflare Computer **LAB-only**. The Worker backend has earned a second-stage remote Cloudflare trial, but the package remains preview software and should not be promoted into GARY STABLE yet.
