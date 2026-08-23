// Hand-written env shape for the LAB Worker, mirroring Cloudflare's worker-shell example.
// Run `wrangler types` to regenerate if bindings change.

interface Env {
  GaryLab: DurableObjectNamespace<import("./src/index.js").GaryLab>;
  LOADER: WorkerLoader;
}
