const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const TMP_DIR = path.join(ROOT, "tmp");
const OUTPUT = path.join(ROOT, "audio.js");
const EXCLUDE = new Set(["TODO.txt"]);

function buildAudioList() {
  const entries = fs.readdirSync(TMP_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && !EXCLUDE.has(entry.name))
    .map((entry) => entry.name)
    .sort();

  const lines = files.map((name) => `"tmp/${name}",`);
  const content = [
    "var audioSrc = [",
    ...lines,
    "];",
    "",
  ].join("\n");

  fs.writeFileSync(OUTPUT, content, "utf8");
  console.log(`Wrote ${files.length} file(s) to audio.js`);
  files.forEach((name) => console.log(`  tmp/${name}`));
}

buildAudioList();
