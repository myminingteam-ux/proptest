# GARY benchmark ledger

Control-plane revision: `2`
Updated: `2026-08-24T15:47:41+02:00`

| ID | Date | Scope | State | Evidence | Result |
|---|---|---|---|---|---|
| YFA-QA-2026-08-21 | 2026-08-21 | YourFundedAccount production candidate | STABLE evidence | `QA_RESULTS.md` | Build, tests, syntax, generated-page checks, guarded-claim scans, assets, initial server-rendered facts, and local route smoke tests passed. Browser interaction verification remains required on preview. |
| GARY-CONTINUITY-2026-08-24 | 2026-08-24 | Cross-device/cross-runtime continuity | STABLE baseline | `GARY_STATE.md`, `state.json`, project `.gary` files | Protocol installed at revision 1; cross-runtime consumption is not yet independently observed. |
| CLOUDFLARE-COMPUTER-LAB | 2026-08-24 | Remote Cloudflare Computer Worker-shell trial | LAB, BLOCKED | `evidence/CLOUDFLARE-COMPUTER-LAB-2026-08-24.md`; source `f315c6e1a258d61b5996e6722477f076649f1b6e` | Project recovered and validated; dry run passed; temporary and authenticated deployments were rejected by Cloudflare API error 10195 because Dynamic Workers require a paid plan. No endpoint or runtime logs were created, so the remote smoke gate remains unverified. GARY STABLE is unchanged. |

Regression rule: preflight Dynamic Workers entitlement, lock preview dependencies, require authorization, and require activation + endpoint + authenticated smoke + runtime logs before PASS. Add results only with a reproducible evidence pointer.
