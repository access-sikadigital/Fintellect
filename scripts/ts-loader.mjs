/**
 * Minimal TypeScript loader so the calculator tests can import the real .ts
 * source directly, rather than testing a duplicated copy of the maths.
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";
import ts from "typescript";

const SRC = new URL("../src/", import.meta.url);

function withTsExtension(href) {
  if (/\.(ts|tsx|mjs|js|json)$/.test(href)) return href;
  for (const ext of [".ts", ".tsx", "/index.ts"]) {
    const candidate = href + ext;
    if (existsSync(fileURLToPath(candidate))) return candidate;
  }
  return href;
}

export async function resolve(specifier, context, next) {
  // "@/…" maps to src/… exactly as the tsconfig path alias does.
  if (specifier.startsWith("@/")) {
    return { url: withTsExtension(new URL(specifier.slice(2), SRC).href), shortCircuit: true };
  }
  // Extensionless relative imports are normal in TypeScript.
  if (specifier.startsWith(".") && context.parentURL?.endsWith(".ts")) {
    return { url: withTsExtension(new URL(specifier, context.parentURL).href), shortCircuit: true };
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith(".ts") || url.endsWith(".tsx")) {
    const source = await readFile(fileURLToPath(url), "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        jsx: ts.JsxEmit.Preserve,
      },
    });
    return { format: "module", source: outputText, shortCircuit: true };
  }
  return next(url, context);
}
