# GARY Cloudflare Computer LAB — remote deployment attempt

- Experiment: `GARY-CLOUDFLARE-COMPUTER-LAB-001`
- Date: `2026-08-24`
- Lane: `LAB`
- Outcome: `BLOCKED`
- GARY STABLE changed: `false`
- Source recovered from: `origin/lab/cloudflare-computer-001@f315c6e1a258d61b5996e6722477f076649f1b6e`

## Prepared-project verification

- Recovered the remote LAB branch without changing `main`.
- Historical evidence on the branch records a 25/25 Linux/Vercel local-runtime pass.
- Pinned the deployment trial to `@cloudflare/computer@0.2.1`, Wrangler `4.125.0`, and Workers types `5.20260823.1`; generated a lockfile in the isolated trial worktree.
- TypeScript typecheck passed.
- Wrangler deployment dry run passed and produced a 4,123.87 KiB bundle (917.36 KiB gzip) with the `GaryLab`, `LAB_TOKEN`, and `LOADER` bindings.
- Added a bearer-token gate to all file and execution routes in the isolated trial; unauthenticated access returned HTTP 401. The public `/health` contract returned HTTP 200.

## Connection and deployment evidence

- Wrangler OAuth succeeded for account `e1435036d50a2bad5521e1947bd28566`.
- Temporary preview-account deployment reached Cloudflare but was rejected.
- Authenticated-account deployment reached Cloudflare but was rejected with the same platform response:

  `In order to use Dynamic Workers, you must switch to a paid plan. [code: 10195]`

- Because activation failed, Cloudflare issued no `workers.dev` endpoint, no deployment version, and no runtime invocation logs.
- The remote smoke test could not run. Bundle upload is not counted as deployment success.

## Local runtime observation

- On the current Windows local runtime, `/health` returned 200 and the authorization gate returned 401 as designed.
- Workspace operations failed inside `@cloudflare/computer` at `getWorkspace()` with HTTP 500/internal error references. This differs from the earlier 25/25 Linux/Vercel result and is recorded as an environment-specific regression signal, not as a remote-product verdict.

## Why the experiment did not pass

The required remote acceptance criteria were a deployed endpoint, runtime logs, and at least one real remote smoke test. None can exist until the account is entitled to Dynamic Workers. The experiment is therefore `BLOCKED`, not failed and not promoted.

## Lessons

1. Cloudflare Computer's Worker-shell backend depends on Dynamic Workers, which is plan-gated.
2. A successful bundle build/upload does not prove activation or runtime availability.
3. Preview dependencies must be locked before evidence is considered reproducible.
4. A remote execution surface must be authenticated before exposure.
5. Local evidence should record the operating system because current behavior differs between Windows and the earlier Linux runner.

## Regression rule

Before any Cloudflare Computer remote trial, verify account entitlement for Dynamic Workers, lock the dependency graph, require an authorization gate, and require all four evidence objects before PASS: activation record, reachable endpoint, successful authenticated smoke test, and runtime logs. Never infer deployment success from upload output alone.

## Next action

Enable a paid Workers plan with Dynamic Workers on the authenticated account, or provide another entitled Cloudflare account. Then redeploy the isolated LAB payload, verify `/health`, run the authenticated workspace/exec/Git smoke gate, inspect runtime logs, and update this ledger. Do not promote automatically.
