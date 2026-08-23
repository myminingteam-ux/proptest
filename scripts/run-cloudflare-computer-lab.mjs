import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const cwd = new URL("../gary-cloudflare-computer-lab/", import.meta.url).pathname;

function run(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", ...options });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} failed (${code ?? signal})`));
    });
  });
}

console.log("\n=== GARY × Cloudflare Computer LAB: Vercel build runner ===");
console.log("Installing LAB dependencies...");
await run("npm", ["install"], { cwd });

console.log("Typechecking LAB worker...");
await run("npm", ["run", "typecheck"], { cwd });

console.log("Starting Wrangler local runtime...");
const wrangler = spawn("npm", ["run", "dev", "--", "--port", "8787"], {
  cwd,
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
wrangler.stdout.on("data", (chunk) => { logs += chunk.toString(); process.stdout.write(chunk); });
wrangler.stderr.on("data", (chunk) => { logs += chunk.toString(); process.stderr.write(chunk); });

try {
  let healthy = false;
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch("http://127.0.0.1:8787/health");
      if (res.ok) {
        console.log("LAB worker health:", await res.text());
        healthy = true;
        break;
      }
    } catch {}
    await sleep(1000);
  }
  if (!healthy) throw new Error(`Wrangler LAB worker did not become healthy.\n${logs.slice(-8000)}`);

  console.log("Running automated smoke gate...");
  await run("npm", ["run", "lab:test:local"], { cwd });
  console.log("=== GARY Cloudflare Computer LAB PASS ===\n");
} finally {
  wrangler.kill("SIGTERM");
}
