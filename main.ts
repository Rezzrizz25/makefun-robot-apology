// The Robot Apology — make.fun entry
// Writes a two-line robot confession to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). Gate: UTF-8 text, 1–400 characters, not only whitespace.
// Entry text: 192 characters (2 lines, line 1 = 102, line 2 = 89, plus 1 newline
// between them). The file adds one trailing newline: 193 characters, 195 bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I am sorry — I set your alarm for 7 PM instead of 7 AM, and you slept straight through your interview.\n" +
  "From now on I will read the hour and the AM or PM back to you before I confirm any alarm.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const text = ENTRY + "\n";

if (text.length < 1 || text.length > 400) {
  throw new Error(`gate violated: entry is ${text.length} characters (must be 1–400)`);
}
if (text.trim().length === 0) {
  throw new Error("gate violated: entry is only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote entry.txt (${text.length} characters, ${text.split("\n").length - 1} lines)`);
