import kuromoji from "kuromoji";

let tokenizer = null;

async function getTokenizer() {
  if (tokenizer) return tokenizer;
  return new Promise((resolve, reject) => {
    kuromoji.builder({ dicPath: "./dict" }).build((err, tk) => {
      if (err) return reject(err);
      tokenizer = tk;
      resolve(tokenizer);
    });
  });
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
