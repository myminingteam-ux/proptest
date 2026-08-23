# GARY × Cloudflare Computer LAB — Status

## Experiment

- ID: `GARY-CLOUDFLARE-COMPUTER-LAB-001`
- Lane: `LAB`
- GARY STABLE: **UNCHANGED**
- Backend tested: `WorkerShellBackend`
- Git surface: `createGitClient()` / shell `git`
- Runtime: Wrangler 4.125.0 local Workers runtime on Vercel build infrastructure
- Node: 22.23.2
- Final passing Vercel deployment: `dpl_B6Rs6rUfGRJHv7JnxShE7gmBpmq6`
- Final deployment state: `READY`

## Result

**PASS — 25/25 checks.**

### Base smoke gate — 22/22

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
- Git workflow request
- `git init` / `add` / `commit` / `log`
- Git log contains expected commit
- Git-created working-tree file readable via `Workspace.fs`
- Git working tree and Workspace filesystem are coherent

### Restart persistence gate — 3/3

- Workspace file survived a full Wrangler runtime process restart
- Worker shell could read the same persisted file after restart
- Git repository, refs, and commit history survived restart; `git log` still returned the expected commit

## Compatibility findings fixed during the trial

1. Current Wrangler 4.125.0 requires `@cloudflare/workers-types` 5.x; the older 4.x example range caused npm `ERESOLVE`.
2. The minimal harness initially omitted the generated/hand-written `Env` binding type used by Cloudflare's worker-shell example.
3. A bare Workspace does not automatically create `/workspace`; the harness now initializes it with `fs.mkdir('/workspace', { recursive: true })`.
4. The optional Git surface requires the optional peer `@platformatic/vfs`; the LAB installs the upstream-compatible `^0.4.0` range.

## Observed behavior

- Durable Object and Worker Loader bindings started successfully in local mode.
- `WorkerShellBackend` executed commands against the same filesystem state written through `Workspace.fs`.
- Two named Durable Object workspaces remained isolated from each other.
- Local Durable Object state survived terminating Wrangler and starting a new Wrangler process in the same build workspace.
- Cloudflare Computer's Git layer successfully initialized and committed a repository without a Linux container or system Git binary.
- Git state persisted across the runtime restart and remained accessible through the Worker shell.
- The missing-file test returns the expected 404 but Wrangler also prints the caught `WorkspaceFsError` in its development log; this is noisy but did not fail the test.

## Not yet tested

- Remote deployment to a real Cloudflare account / `workers.dev`
- Persistence across a real Cloudflare Durable Object eviction or production redeploy
- Container backend
- Multiple-backend routing (Worker → Container)
- Remote Git clone/fetch/push and authenticated Git
- Worker JavaScript backend
- Cost/latency comparison against existing GARY execution paths

## Decision

Keep Cloudflare Computer **LAB-only**. The Worker backend has passed the local execution, persistence, isolation, mutation, and Git gates and has earned a second-stage remote Cloudflare trial. The package remains preview software and should not be promoted into GARY STABLE yet.
