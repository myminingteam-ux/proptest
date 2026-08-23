import { DurableObject } from "cloudflare:workers";
import {
  type DurableObjectStorageLike,
  getWorkspace,
  WorkspaceServiceProxy,
  withWorkspace,
} from "@cloudflare/computer";
import { WorkerShellBackend } from "@cloudflare/computer/backends/worker-shell";
import { createGitClient } from "@cloudflare/computer/git";
import jq from "@cloudflare/computer/shell/jq";

export { WorkspaceServiceProxy };

export class GaryLab extends withWorkspace(
  class extends DurableObject<Env> {},
  (self) => {
    const { ctx, env } = self as unknown as {
      ctx: DurableObjectState;
      env: Env;
    };

    return {
      storage: ctx.storage as unknown as DurableObjectStorageLike,
      git: createGitClient(),
      backends: [
        new WorkerShellBackend({
          loader: env.LOADER,
          workspace: { binding: "GaryLab", id: ctx.id.toString() },
          ctx,
          commands: [jq],
        }),
      ],
    };
  },
) {}

interface ExecRequest {
  command?: string;
  argv?: string[];
  cwd?: string;
}

const ROOT = "/workspace";

function safePath(rest: string): string | null {
  const path = `/${rest}`;
  if (path !== ROOT && !path.startsWith(`${ROOT}/`)) return null;
  if (path.split("/").includes("..")) return null;
  return path;
}

async function workspaceFor(env: Env, name: string) {
  const stub = env.GaryLab.get(env.GaryLab.idFromName(name));
  const ws = await getWorkspace(
    stub as unknown as Parameters<typeof getWorkspace>[0],
  );
  await ws.fs.mkdir(ROOT, { recursive: true });
  return ws;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function errorJSON(error: unknown, status = 500): Response {
  return json(
    {
      error: error instanceof Error ? error.message : String(error),
      code: (error as { code?: string })?.code,
    },
    status,
  );
}

function shellQuote(arg: string): string {
  if (/^[A-Za-z0-9_\-+=:,./@%]+$/.test(arg)) return arg;
  return `'${arg.replace(/'/g, "'\\''")}'`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return json({
        ok: true,
        lab: "GARY-CLOUDFLARE-COMPUTER-LAB",
        backend: "worker-shell",
        stableGaryChanged: false,
      });
    }

    const fileMatch = url.pathname.match(/^\/lab\/([^/]+)\/file\/(.+)$/);
    if (fileMatch) {
      const name = fileMatch[1];
      const path = safePath(fileMatch[2]);
      if (!path) return errorJSON(new Error("Path must remain under /workspace"), 400);

      const ws = await workspaceFor(env, name);

      if (request.method === "PUT") {
        try {
          await ws.fs.writeFile(path, new Uint8Array(await request.arrayBuffer()));
          return new Response(null, { status: 204 });
        } catch (error) {
          return errorJSON(error);
        }
      }

      if (request.method === "GET") {
        try {
          const stream = await ws.fs.readFile(path, {});
          return new Response(stream, {
            headers: { "content-type": "application/octet-stream" },
          });
        } catch (error) {
          const code = (error as { code?: string }).code;
          return errorJSON(error, code === "ENOENT" ? 404 : 500);
        }
      }

      return new Response("method not allowed", {
        status: 405,
        headers: { allow: "GET, PUT" },
      });
    }

    const execMatch = url.pathname.match(/^\/lab\/([^/]+)\/exec\/?$/);
    if (execMatch) {
      if (request.method !== "POST") {
        return new Response("method not allowed", {
          status: 405,
          headers: { allow: "POST" },
        });
      }

      let body: ExecRequest;
      try {
        body = (await request.json()) as ExecRequest;
      } catch {
        return errorJSON(new Error("invalid JSON body"), 400);
      }

      let command = "";
      if (typeof body.command === "string" && body.command) {
        command = body.command;
      } else if (Array.isArray(body.argv) && body.argv.length) {
        command = body.argv.map(shellQuote).join(" ");
      } else {
        return errorJSON(new Error("provide command or argv"), 400);
      }

      try {
        const ws = await workspaceFor(env, execMatch[1]);
        const handle = await ws.runtime.exec(command, {
          cwd: body.cwd,
          encoding: "utf8",
        });
        return json(await handle.result());
      } catch (error) {
        return errorJSON(error);
      }
    }

    return new Response(
      [
        "GARY Cloudflare Computer LAB",
        "",
        "GET  /health",
        "PUT  /lab/<name>/file/workspace/<path>",
        "GET  /lab/<name>/file/workspace/<path>",
        "POST /lab/<name>/exec",
        "",
        "STABLE GARY is not modified by this harness.",
      ].join("\n"),
      { headers: { "content-type": "text/plain" } },
    );
  },
} satisfies ExportedHandler<Env>;
