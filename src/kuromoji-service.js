import kuromoji from "kuromoji";

const dictBaseUrl = new URL("./dict/", import.meta.url).href;

let tokenizer = null;
let buildInProgress = null;

async function getTokenizer() {
  if (tokenizer) return tokenizer;
  if (buildInProgress) return buildInProgress;

  buildInProgress = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      buildInProgress = null;
      reject(new Error("Tokenizer build timed out (15s)"));
    }, 15000);

    kuromoji.builder({ dicPath: dictBaseUrl }).build((err, tk) => {
      clearTimeout(timer);
      if (err) {
        buildInProgress = null;
        return reject(err);
      }
      tokenizer = tk;
      resolve(tokenizer);
    });
  });

  return buildInProgress;
}

export async function tokenize(text) {
  const tk = await getTokenizer();
  return tk.tokenize(text);
}

export async function getBaseForms(text) {
  const tokens = await tokenize(text);
  return tokens
    .filter((t) => t.pos !== "補助記号" && t.pos !== "記号")
    .map((t) => ({
      surface: t.surface_form,
      base: t.basic_form || t.surface_form,
      pos: t.pos,
    }));
}

export async function getReadings(text) {
  const tokens = await tokenize(text);
  return tokens.map((t) => ({
    surface: t.surface_form,
    reading: t.reading || t.surface_form,
    pronunciation: t.pronunciation || t.reading || t.surface_form,
  }));
}

export async function splitToWords(text) {
  const tokens = await tokenize(text);
  return tokens
    .filter((t) => t.pos !== "補助記号" && t.pos !== "記号")
    .map((t) => t.surface_form);
}
