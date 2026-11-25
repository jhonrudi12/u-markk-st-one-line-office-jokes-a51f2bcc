import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line joke about office life.
// Setup: ask to be taken off a reply-all thread.
// Turn: the only way out becomes the thing that pulls 400 more people in —
// the escape hatch is the trap, and the laugh lands on the last words.
const JOKE =
  "I hit reply-all asking to be removed from this thread, and now 400 colleagues are replying-all to ask the same thing.";

// Fail loudly instead of submitting an invalid entry.
// The gate requires 1 to 199 characters of non-whitespace text,
// a single line: the entry is one joke, not a paragraph.
// Also refuse leading/trailing whitespace: the gate counts every
// character, so padding would spend the budget on nothing.
if (
  [...JOKE].length < 1 ||
  [...JOKE].length > 199 ||
  JOKE.trim().length === 0 ||
  JOKE !== JOKE.trim() ||
  JOKE.includes("\n") ||
  JOKE.includes("\r")
) {
  throw new Error("joke must be a single line of 1-199 characters of non-whitespace text");
}

const outputDir = process.argv[2] ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), JOKE, "utf8");
