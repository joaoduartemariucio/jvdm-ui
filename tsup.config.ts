import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { defineConfig, type Options } from "tsup";

/**
 * Modulos que dependem de hooks do React. Cada um sai como um bundle proprio sob
 * dist/client, marcado com "use client", para que atoms/molecules/organisms
 * continuem podendo ser importados de dentro de um React Server Component.
 *
 * Sem isso o esbuild junta tudo num chunk por camada, o chunk inteiro passa a
 * depender de useState, e o consumidor quebra ao importar ate um Badge puro.
 * A diretiva na fonte nao resolve sozinha: o esbuild a descarta ao empacotar.
 *
 * A chave e o nome do bundle; as camadas publicas seguem reexportando estes
 * componentes, entao o subpath e uma fronteira interna, nao uma API nova.
 */
const CLIENT_MODULES: Record<string, string> = {
  gallery: "src/molecules/gallery/index.tsx",
  menu: "src/molecules/menu/menu/index.tsx",
  "password-input": "src/atoms/input/password-input/index.tsx",
  theme: "src/tokens/theme.ts",
  "theme-toggle": "src/atoms/theme-toggle/index.tsx",
};

const CLIENT_ENTRY = Object.fromEntries(
  Object.entries(CLIENT_MODULES).map(([name, source]) => [
    resolve(source),
    `jvdm-ui/client/${name}`,
  ]),
);

const SUFFIXES = [".ts", ".tsx", "/index.ts", "/index.tsx"];

function resolveSource(path: string): string | null {
  for (const suffix of SUFFIXES) {
    const candidate = `${path}${suffix}`;
    if (existsSync(candidate)) return candidate;
  }
  return existsSync(path) ? path : null;
}

/**
 * Reescreve os imports relativos que apontam para um CLIENT_MODULE, trocando-os
 * pelo subpath publico do proprio pacote. O import sobrevive no bundle em vez de
 * ser inlinado, e a fronteira "use client" fica preservada para o consumidor.
 */
const clientBoundary: NonNullable<Options["esbuildPlugins"]>[number] = {
  name: "client-boundary",
  setup(build) {
    build.onResolve({ filter: /^\.\.?\// }, (args) => {
      if (!args.importer) return null;
      const source = resolveSource(resolve(dirname(args.importer), args.path));
      const entry = source ? CLIENT_ENTRY[source] : undefined;
      return entry ? { path: entry, external: true } : null;
    });
  },
};

const shared = {
  format: ["esm"],
  target: "es2022",
  dts: true,
  sourcemap: true,
  external: ["react", "react-dom", "react/jsx-runtime"],
} satisfies Options;

export default defineConfig([
  {
    ...shared,
    entry: Object.fromEntries(
      Object.entries(CLIENT_MODULES).map(([name, source]) => [`client/${name}`, source]),
    ),
    banner: { js: '"use client";' },
    // O passe de treeshake do tsup reemite o arquivo pelo rollup e descarta o
    // banner do esbuild junto. Sem ele a diretiva sobrevive.
    treeshake: false,
    splitting: false,
    clean: true,
  },
  {
    ...shared,
    entry: {
      index: "src/index.ts",
      "tokens/index": "src/tokens/index.ts",
      "atoms/index": "src/atoms/index.ts",
      "molecules/index": "src/molecules/index.ts",
      "organisms/index": "src/organisms/index.ts",
      "theme/index": "src/theme/index.ts",
    },
    external: [...shared.external, /^jvdm-ui\/client\//],
    esbuildPlugins: [clientBoundary],
    treeshake: true,
    splitting: true,
    clean: false,
  },
]);
