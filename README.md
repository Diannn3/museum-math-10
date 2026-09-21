# MATH × ART — Digital Exhibition

A lightweight digital museum for MATH 10 works exploring the relationship between mathematics and art.

## Stack

- Astro 7
- TypeScript
- owned CSS
- static deployment

## Development

```bash
npm install
npm run dev
npm run check
npm run build
npm run test:e2e
```

Browser QA uses Playwright Chromium and covers the exhibition flow, arrow-key gallery navigation, image decoding, no-autoplay behavior, responsive overflow checks, and deterministic desktop/mobile screenshot capture. GitHub Actions runs the same quality and browser gates on pull requests and main.

The project intentionally avoids heavy 3D/gallery frameworks. The exhibition is designed as a quiet "digital white cube": one work at a time, large artwork, museum labels, deliberate navigation, and an optional portal into interactive works.
