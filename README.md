# kuromoji-cdn-service

CDN-ready bundle of [Kuromoji.js](https://github.com/takuyaa/kuromoji.js) for client-side Japanese text analysis, deployable on **Cloudflare Pages**.

## Build

```bash
npm install
npm run build
```

This produces:

```
dist/
  kuromoji.bundle.js   # ES module bundle
  dict/                # IPADic dictionary files
```

## Deploy to Cloudflare Pages

1. Push the repo to GitHub/GitLab.
2. In Cloudflare Dashboard → **Pages** → **Connect to Git**.
3. Select the repo.
4. Build settings:
   - **Build command**: `npm run build`
   - **Build output**: `dist`
5. Deploy.

After deployment, the bundle and dict are available at:

```
https://<project>.pages.dev/kuromoji.bundle.js
https://<project>.pages.dev/dict/...
```

## Usage

```html
<script type="module">
  import {
    tokenize,
    getBaseForms,
    getReadings,
    splitToWords
  } from "https://<project>.pages.dev/kuromoji.bundle.js";

  (async () => {
    const tokens = await tokenize("日本語のテキスト");
    console.log(tokens);

    const words = await splitToWords("日本語のテキスト");
    console.log(words); // ["日本", "語", "の", "テキスト"]

    const bases = await getBaseForms("走ります");
    console.log(bases); // [{ surface: "走ります", base: "走る", pos: "動詞" }]
  })();
</script>
```

## API

| Function | Description |
|----------|-------------|
| `tokenize(text)` | Returns raw Kuromoji token array |
| `getBaseForms(text)` | Returns tokens with their dictionary base form |
| `getReadings(text)` | Returns tokens with reading/pronunciation |
| `splitToWords(text)` | Splits a Japanese sentence into word surfaces |
