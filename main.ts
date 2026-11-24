// Entry point for the news-image-20261123 submission, "The World in One Day":
// a poster summing up Monday 23 November 2026. The artwork lives in the
// entry.png beside this file; the grader reads /output/entry.png, so the
// whole job of this program is to place a faithful copy of the poster there.
// For local runs, MAKEFUN_OUTPUT_DIR overrides the target folder so nothing
// outside the workspace is touched.
import { copyFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const poster = new URL("./entry.png", import.meta.url);
const target = join(outDir, "entry.png");
copyFileSync(poster, target);

// Guard against a truncated or swapped asset: the copied file must carry
// the eight-byte PNG signature, stay within the gate's 1 MiB cap, and we
// log its size so the run record shows what was written.
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const bytes = readFileSync(target);
if (!PNG_SIGNATURE.every((b, i) => bytes[i] === b)) {
  throw new Error("copied entry.png is missing its PNG signature");
}
if (bytes.length > 1_048_576) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);
}
console.log(`entry.png ready: ${bytes.length} bytes`);
