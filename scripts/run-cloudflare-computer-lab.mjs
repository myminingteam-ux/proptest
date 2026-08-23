import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const cwd = new URL("../gary-cloudflare-computer-lab/", import.meta.url).pathname;
const base = "http://127.0.0.1:8787";

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

function startWrangler(label) {
  console.log(`Starting Wrangler local runtime (${label})...`);
  const child = spawn("npm", ["run", "dev", "--", "--port", "8787"], {
    cwd,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  child.stdout.on("data", (chunk) => { logs += chunk.toString(); process.stdout.write(chunk); });
  child.stderr.on("data", (chunk) => { logs += chunk.toString(); process.stderr.write(chunk); });
  return { child, getLogs: () => logs };
}

async function waitForHealth(runtime) {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`${base}/health`);
      if (res.ok) {
        console.log("LAB worker health:", await res.text());
        return;
      }
    } catch {}
    await sleep(1000);
  }
  throw new Error(`Wrangler LAB worker did not become healthy.\n${runtime.getLogs().slice(-8000)}`);
}

async function stopWrangler(child) {
  if (child.exitCode !== null) return;
  const exited = new Promise((resolve) => child.once("exit", resolve));
  child.kill("SIGTERM");
  await Promise.race([exited, sleep(5000)]);
  if (child.exitCode === null) child.kill("SIGKILL");
}

async function put(path, body) {
  const res = await fetch(`${base}${path}`, { method: "PUT", body });
  if (!res.ok) throw new Error(`PUT ${path} failed ${res.status}: ${await res.text()}`);
}

async function get(path) {
  const res = await fetch(`${base}${path}`);
  const text = await res.text();
  if (!res.ok) throw new Error(`GET ${path} failed ${res.status}: ${text}`);
  return text;
}

async function exec(name, command) {
  const res = await fetch(`${base}/lab/${name}/exec`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ command, cwd: "/workspace" }),
  });
  const body = await res.json();
  if (!res.ok || Number(body.exitCode) !== 0) {
    throw new Error(`exec failed: ${JSON.stringify(body)}`);
  }
  return body;
}

console.log("\n=== GARY × Cloudflare Computer LAB: Vercel build runner ===");
console.log("Installing LAB dependencies...");
await run("npm", ["install"], { cwd });

console.log("Typechecking LAB worker...");
await run("npm", ["run", "typecheck"], { cwd });

let runtime = startWrangler("initial");
try {
  await waitForHealth(runtime);
  console.log("Running automated smoke gate...");
  await run("npm", ["run", "lab:test:local"], { cwd });

  const restartName = "gary-restart-test";
  const restartMarker = "GARY-RESTART-PERSISTENCE-001";
  await put(`/lab/${restartName}/file/workspace/restart.txt`, restartMarker);
  console.log("PASS  restart sentinel written");

  await stopWrangler(runtime.child);
  runtime = startWrangler("restart");
  await waitForHealth(runtime);

  const afterRestart = await get(`/lab/${restartName}/file/workspace/restart.txt`);
  if (afterRestart !== restartMarker) {
    throw new Error(`restart persistence mismatch: ${afterRestart}`);
  }
  console.log("PASS  workspace survives Wrangler restart");

  const shellAfterRestart = await exec(restartName, "cat restart.txt");
  if (String(shellAfterRestart.stdout || "").trim() !== restartMarker) {
    throw new Error(`shell restart persistence mismatch: ${JSON.stringify(shellAfterRestart)}`);
  }
  console.log("PASS  shell sees persisted file after restart");

  const gitAfterRestart = await exec("gary-git-test", "git log -1 --oneline");
  if (!String(gitAfterRestart.stdout || "").includes("lab commit")) {
    throw new Error(`git repository restart persistence mismatch: ${JSON.stringify(gitAfterRestart)}`);
  }
  console.log("PASS  Git repository survives Wrangler restart");

  console.log("=== GARY Cloudflare Computer LAB PASS: 22 smoke + 3 restart checks = 25/25 ===\n");
} finally {
  await stopWrangler(runtime.child);
}
