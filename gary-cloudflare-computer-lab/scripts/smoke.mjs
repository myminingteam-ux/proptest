const base = (process.argv[2] || process.env.GARY_LAB_URL || "http://127.0.0.1:8787").replace(/\/+$/, "");

const A = "gary-test-a";
const B = "gary-test-b";
const G = "gary-git-test";
const markerA = `GARY-A-${Date.now()}`;
const markerB = `GARY-B-${Date.now()}`;
let passed = 0;
let failed = 0;

function ok(name, detail = "") {
  passed++;
  console.log(`PASS  ${name}${detail ? ` — ${detail}` : ""}`);
}
function bad(name, detail = "") {
  failed++;
  console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
}
async function request(path, init = {}) {
  const res = await fetch(`${base}${path}`, init);
  const text = await res.text();
  return { res, text };
}
async function expectStatus(name, path, expected, init = {}) {
  try {
    const out = await request(path, init);
    if (out.res.status === expected) ok(name, `HTTP ${expected}`);
    else bad(name, `expected ${expected}, got ${out.res.status}: ${out.text.slice(0, 250)}`);
    return out;
  } catch (err) {
    bad(name, String(err));
    return null;
  }
}

async function main() {
  console.log(`GARY × Cloudflare Computer LAB smoke test`);
  console.log(`Target: ${base}\n`);

  const health = await expectStatus("health", "/health", 200);
  if (health) {
    try {
      const body = JSON.parse(health.text);
      body.ok === true && body.backend === "worker-shell" && body.stableGaryChanged === false
        ? ok("health contract")
        : bad("health contract", health.text);
    } catch { bad("health contract", "invalid JSON"); }
  }

  await expectStatus("workspace A write", `/lab/${A}/file/workspace/marker.txt`, 204, {
    method: "PUT", body: markerA,
  });
  const readA = await expectStatus("workspace A read", `/lab/${A}/file/workspace/marker.txt`, 200);
  if (readA) readA.text === markerA ? ok("workspace A content") : bad("workspace A content", readA.text);

  const execA = await expectStatus("workspace A exec", `/lab/${A}/exec`, 200, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ command: "cat marker.txt", cwd: "/workspace" }),
  });
  if (execA) {
    try {
      const body = JSON.parse(execA.text);
      Number(body.exitCode) === 0 && String(body.stdout || "").trim() === markerA
        ? ok("exec sees persisted file")
        : bad("exec sees persisted file", execA.text);
    } catch { bad("exec sees persisted file", "invalid JSON"); }
  }

  await expectStatus("workspace B write", `/lab/${B}/file/workspace/marker.txt`, 204, {
    method: "PUT", body: markerB,
  });
  const readB = await expectStatus("workspace B read", `/lab/${B}/file/workspace/marker.txt`, 200);
  if (readB) readB.text === markerB ? ok("workspace B content") : bad("workspace B content", readB.text);

  const readAAgain = await expectStatus("workspace A reread", `/lab/${A}/file/workspace/marker.txt`, 200);
  if (readAAgain) readAAgain.text === markerA ? ok("workspace isolation") : bad("workspace isolation", readAAgain.text);

  const missing = await request(`/lab/${A}/file/workspace/missing-${Date.now()}.txt`);
  missing.res.status === 404 ? ok("missing file semantics", "HTTP 404") : bad("missing file semantics", `HTTP ${missing.res.status}`);

  const append = await expectStatus("shell mutation", `/lab/${A}/exec`, 200, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ command: "printf '\\nvia-shell' >> marker.txt", cwd: "/workspace" }),
  });
  if (append) {
    try {
      const body = JSON.parse(append.text);
      Number(body.exitCode) === 0 ? ok("shell mutation exit") : bad("shell mutation exit", append.text);
    } catch { bad("shell mutation exit", "invalid JSON"); }
  }

  const mutated = await expectStatus("mutated file read", `/lab/${A}/file/workspace/marker.txt`, 200);
  if (mutated) mutated.text === `${markerA}\nvia-shell`
    ? ok("shell ↔ filesystem coherence")
    : bad("shell ↔ filesystem coherence", mutated.text);

  const gitRun = await expectStatus("git workflow exec", `/lab/${G}/exec`, 200, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      cwd: "/workspace",
      command: "git init . && git config user.name 'GARY LAB' && git config user.email 'gary-lab@example.invalid' && printf 'git-lab\\n' > git-test.txt && git add git-test.txt && git commit -m 'lab commit' && git status --porcelain && git log -1 --oneline",
    }),
  });
  if (gitRun) {
    try {
      const body = JSON.parse(gitRun.text);
      Number(body.exitCode) === 0
        ? ok("git init/add/commit/log")
        : bad("git init/add/commit/log", gitRun.text);
      String(body.stdout || "").includes("lab commit")
        ? ok("git log contains commit")
        : bad("git log contains commit", gitRun.text);
    } catch {
      bad("git init/add/commit/log", "invalid JSON");
    }
  }

  const gitFile = await expectStatus("git file via filesystem", `/lab/${G}/file/workspace/git-test.txt`, 200);
  if (gitFile) gitFile.text === "git-lab\n"
    ? ok("git working tree shares Workspace.fs")
    : bad("git working tree shares Workspace.fs", gitFile.text);

  console.log(`\nResult: ${passed} passed, ${failed} failed`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
