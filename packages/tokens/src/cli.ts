import { readFileSync, writeFileSync } from "node:fs";

import { emitStylesheet } from "./emit";
import { source } from "./source";

const WEB_TOKENS = new URL("../../web/src/tokens/", import.meta.url);

const runtime = readFileSync(new URL("runtime.css", WEB_TOKENS), "utf8");
const target = new URL("tokens.css", WEB_TOKENS);

writeFileSync(target, emitStylesheet(source, runtime));

process.stdout.write("tokens: packages/web/src/tokens/tokens.css\n");
