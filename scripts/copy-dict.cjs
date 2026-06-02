const fs = require("fs");
const path = require("path");

const src = path.resolve(__dirname, "..", "node_modules", "kuromoji", "dict");
const dest = path.resolve(__dirname, "..", "public", "dict");

if (!fs.existsSync(src)) {
  console.error("kuromoji dict not found. Run `npm install` first.");
  process.exit(1);
}

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

const files = fs.readdirSync(src);
for (const file of files) {
  fs.copyFileSync(path.join(src, file), path.join(dest, file));
}

console.log(`Copied ${files.length} dictionary files to public/dict/`);
