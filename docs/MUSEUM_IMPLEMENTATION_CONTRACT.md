# MATH × ART Digital Exhibition — Implementation Contract and Pass Ledger

**Repository:** `Diannn3/museum-math-10`  
**Canonical working date:** 2026-09-22  
**Status:** Binding implementation context for this repository.

## 1. Purpose

This repository is a lightweight browser-based museum for the current MATH 10 outputs supplied by the user. It is intentionally a **digital white cube**, not a fake 3D museum, game, dashboard, portfolio template, or autoplay slideshow.

The visitor journey is:

```text
entrance
  ↓
exhibition overview
  ↓
individual gallery walls
  ↓
interactive Fibonacci portal
  ↓
closing room
```

The interface should recede so the artworks remain dominant.

## 2. Source-of-truth order

When information conflicts, use this order:

1. newer explicit user instructions;
2. current repository state on the relevant branch;
3. confirmed artwork metadata supplied by the user/class;
4. this file;
5. earlier planning documents and research;
6. generated mockups or informal summaries.

Never treat generated UI mockups as factual artwork metadata.

## 3. Current confirmed collection

The current implementation contains exactly four exhibition entries.

### 01 — Desmos Flower

- slug: `desmos-flower`
- title: `Desmos Flower`
- subtitle: `Mathematics in Nature`
- medium: Desmos / mathematical graphing
- primary asset: `/public/artworks/desmos-flower.jpg`
- intrinsic source size: **1194 × 1207**
- supporting process asset: `/public/artworks/desmos-flower-process.jpg`
- process source size: **719 × 996**
- artist: **not yet confirmed**
- current UI string: `Artist to be confirmed`

Do not infer an artist name from signatures, filenames, image pixels, or unrelated class context.

### 02 — Geometric Portrait

- slug: `geometric-portrait`
- title: `Geometric Portrait`
- subtitle: `Form, Light, and Structure`
- medium: digital illustration
- primary asset: `/public/artworks/geometric-portrait.jpg`
- intrinsic source size: **2048 × 2518**
- artist: **not yet confirmed**
- current UI string: `Artist to be confirmed`

### 03 — Perspective Study

- slug: `perspective-study`
- title: `Perspective Study`
- subtitle: `Space and Geometry`
- medium: digital perspective drawing
- primary asset: `/public/artworks/perspective-city.jpg`
- intrinsic source size: **3166 × 2048**
- artist: **not yet confirmed**
- current UI string: `Artist to be confirmed`

### 04 — Fibonacci, Modulo 25

- slug: `fibonacci-modulo-25`
- title: `Fibonacci, Modulo 25`
- subtitle: `An Interactive Audiovisual Experience`
- artist: Aedrian Ponce
- medium: interactive web artwork / sonification / code
- museum preview asset: `/public/artworks/fibonacci-preview.svg`
- configured live-work URL: `https://math-10-music.vercel.app`
- source repository: `https://github.com/Diannn3/math-10-music`

The configured deployment URL is part of current project data, but this museum repository does not itself prove that the external deployment is live. Verify it before a public presentation if possible.

## 4. Mathematical-integrity rule for the Fibonacci work

The museum may say:

> The Fibonacci sequence modulo 25 is mapped to 25 ascending pitches.

The museum must not say:

- Fibonacci naturally sounds like this.
- The melody is an inherent property of Fibonacci.
- The pitch mapping proves a mathematical property.
- The preview image is the exact runtime visual state.

The Fibonacci residue sequence is mathematical source data. Pitch selection, synth sound, timing, and sonification design are artistic choices.

The separate `math-10-music` repository remains the technical source of truth for the live work.

## 5. Product architecture

Current stack:

- Astro 7.3.3
- TypeScript 6.0.3
- owned CSS
- static output
- Playwright 1.63.0 for browser QA

No React runtime is currently required by the museum itself.

Do not add Three.js, R3F, GSAP, Framer Motion/Motion, Lenis, a carousel library, a component library, or a CMS unless a concrete requirement justifies it.

### Routes

```text
/
  entrance room

/exhibition
  collection overview

/work/desmos-flower
/work/geometric-portrait
/work/perspective-study
/work/fibonacci-modulo-25
  generated artwork walls

/about
  exhibition context

/closing
  final thank-you room
```

## 6. Navigation contract

- no autoplay carousel;
- visitor explicitly controls progression;
- individual work pages support visible Previous / Next controls;
- Left Arrow moves to the previous work when one exists;
- Right Arrow moves to the next work;
- from the final work, Right Arrow enters `/closing`;
- keyboard handlers must ignore editable form fields/contenteditable elements;
- the overview remains available from global navigation and the work footer;
- current global navigation state uses `aria-current="page"`.

## 7. Visual direction

The museum is a restrained editorial gallery:

- warm off-white paper;
- black/dark charcoal type;
- traditional serif display typography;
- small neutral sans-serif interface labels;
- large whitespace;
- thin hairlines;
- no rounded SaaS cards;
- no decorative gradients except restrained spatial lighting at entrance/closing;
- artwork remains larger and louder than interface chrome.

The interactive Fibonacci wall may use a dark room treatment to distinguish the digital installation from static works.

## 8. Motion contract

Cross-document View Transitions are progressive enhancement only.

The collection and detail pages use matching, unique transition names for:

- artwork;
- artwork title.

If unsupported, navigation must still work normally.

If `prefers-reduced-motion: reduce` is enabled, transition/animation durations collapse to effectively instant behavior.

Motion must never be required to understand navigation.

## 9. Accessibility contract

Blocking requirements:

- semantic headings;
- meaningful artwork alt text;
- visible keyboard focus;
- skip link;
- no audio autoplay;
- new-tab links announce that they open a new tab;
- dark installation focus rings remain visible;
- touch/click targets should remain practically usable;
- no horizontal overflow at narrow widths;
- reduced-motion support;
- disabled Previous state is not exposed as an actionable control;
- artwork labels remain readable without relying on image text.

Unknown artist names must be described as unknown rather than omitted in a way that implies authorship is known.

## 10. Image handling

The three static artworks and the Desmos process screenshot now use the full pixel dimensions of the newer user-supplied JPEG sources. The site does **not** upscale them or invent detail.

Current intrinsic dimensions:

- Desmos Flower: **1194 × 1207**
- Desmos process screenshot: **719 × 996**
- Geometric Portrait: **2048 × 2518**
- Perspective Study: **3166 × 2048**

Rules:

- preserve the artwork's aspect ratio;
- use `object-fit: contain`, not destructive cropping;
- keep each image at its supplied intrinsic pixel dimensions;
- do not recolor, sharpen with generative detail, or otherwise stylize student work;
- do not add fake frames into the source image itself;
- decorative museum framing belongs in CSS;
- record intrinsic width/height in `src/data/exhibits.ts` and emit those dimensions on the HTML `img` elements;
- if a source is still insufficient for the desired display size, request a higher-resolution original instead of upscaling.

The Desmos process screenshot is source-limited to 719 × 996. That is now the exact supplied resolution; a sharper process view would require a larger original screenshot.

## 11. Performance contract

The museum should remain static-first and lightweight.

Current strategy:

- no client framework bundle for basic navigation;
- browser-native page navigation;
- eager/fetch-priority treatment only for immediately visible primary artwork;
- later collection images lazy-load;
- next work image can be prefetched;
- external Fibonacci application remains separate rather than bundling Tone/OGL into this museum.

Do not embed the live Fibonacci app in an iframe unless framing behavior, audio activation, focus behavior, and mobile layout are deliberately tested.

## 12. Browser QA contract

The Playwright suite must cover at least:

- entrance → exhibition flow;
- four collection cards;
- first work rendering;
- right-arrow progression;
- left-arrow reversal;
- final work → closing room;
- absence of audio/video autoplay in the museum page;
- no horizontal overflow at 320, 390, 768, and 1440 px;
- representative desktop and mobile screenshot artifacts.

Playwright Chromium is browser automation evidence. It is not equivalent to physical Safari/iOS certification.

## 13. CI contract

`.github/workflows/quality.yml` is intended to run:

### quality job

1. checkout;
2. Node 22;
3. dependency install;
4. `npm run check`;
5. `npm run build`.

### browser job

1. wait for quality;
2. checkout;
3. Node 22;
4. dependency install;
5. install Playwright Chromium;
6. production build;
7. run browser QA;
8. upload visual QA screenshots.

Never claim these checks passed until the corresponding GitHub Actions run actually succeeds.

## 14. Pass ledger

### PASS 001 — Astro museum foundation

Implemented:

- Astro static foundation;
- base layout;
- design tokens;
- entrance room;
- responsive baseline;
- reduced-motion baseline.

Merged main commit:

`e4121bbfbfd46794fdcae17f4a2256cacdea1b36`

### PASS 002 — Curated artwork collection

Implemented:

- typed artwork metadata;
- optimized supplied image assets;
- supporting Desmos process image;
- purpose-built Fibonacci museum preview;
- explicit unknown-artist handling.

Merged main commit:

`0d24e680e7418ff9bb8358ddfeebba79981fb720`

### PASS 003 — Exhibition overview

Implemented:

- collection landing page;
- reusable museum header;
- asymmetric responsive art grid;
- links into individual works.

Merged main commit:

`e66d674c8811fcd7aef7bbd141ae1c7630a56b26`

### PASS 004 — Gallery work pages

Implemented:

- static generation for each work;
- museum wall composition;
- previous/next navigation;
- arrow-key navigation;
- Desmos process material.

Merged main commit:

`ff49adb0baf3217760c7d5641774040ff3594004`

### PASS 005 — Fibonacci installation portal

Implemented:

- dark digital-installation wall;
- live-work link;
- source-code link;
- explicit no-autoplay explanation.

Merged main commit:

`9e81b1201ba51653a76c2f2190b8d466ee46022f`

### PASS 006 — Exhibition bookends

Implemented:

- About page;
- closing / Thank You room;
- final-work progression toward the closing sequence.

Merged main commit:

`113b801efdcb0f86c369d27262a22582b8543f7e`

### PASS 007 — Transition and accessibility polish

Implemented:

- cross-document artwork/title View Transitions;
- reduced-motion-safe transition behavior;
- current-page navigation semantics;
- adaptive browser theme color;
- neighbor image prefetch;
- keyboard shortcut metadata;
- accessible new-tab announcements;
- dark-room focus visibility;
- corrected final-work route to `/closing`.

Merged main commit:

`1a74a47d1a7b41a1d18213271263203c5654c53f`

### PASS 008 — Quality gates

Status: **VERIFIED ON FEATURE BRANCH**.

Implemented:

- Playwright browser suite;
- responsive overflow tests;
- explicit artwork image-decode assertions;
- deterministic visual screenshot capture that waits for image decoding;
- escaped-newline regression coverage for document chrome;
- GitHub Actions quality workflow;
- Node typings required by the browser QA suite.

Verification evidence:

- feature head verified: `10f246b70d35dccb6b0a7ea4583b9a2a3e37e617`;
- GitHub Actions run: `35619252615`;
- `quality` job: **success**;
- `astro check`: **success**;
- production build: **success**;
- `browser` job: **success**;
- Playwright browser QA: **success**;
- screenshot artifact `museum-visual-qa`: produced successfully;
- latest desktop and mobile screenshot outputs were manually inspected after the green run;
- the Desmos Flower, portrait, perspective study, and Fibonacci preview are visibly rendered in the inspected exhibition capture;
- no obvious horizontal-overflow or major layout defect was observed in the inspected desktop/mobile captures.

This verifies the branch in Chromium automation. It does not claim physical Safari/iOS certification or external deployment availability.

### PASS 009 — Full-resolution artwork replacement

Status: **VERIFIED ON FEATURE BRANCH**.

Implemented:

- replaced the low-resolution static artwork derivatives with the newer supplied full-resolution JPEG sources;
- preserved the exact supplied pixel dimensions rather than upscaling;
- recorded intrinsic width/height in the exhibit data model;
- emitted intrinsic dimensions in both collection and gallery image markup;
- replaced the Desmos process screenshot with the newer supplied source;
- removed the superseded low-resolution WebP files;
- added Playwright assertions that lock the expected natural pixel dimensions so a future low-resolution regression fails CI.

Expected source dimensions:

- Desmos Flower: `1194 × 1207`;
- Desmos process screenshot: `719 × 996`;
- Geometric Portrait: `2048 × 2518`;
- Perspective Study: `3166 × 2048`.

Verification evidence:

- verified feature head before this documentation-only update: `65edeccf874423bc9fa82b1df890bf30bfbdfa0e`;
- GitHub Actions run: `35636781664`;
- `quality` job: **success**;
- Astro check: **success**;
- production build: **success**;
- `browser` job: **success**;
- Playwright browser QA: **success**;
- the new resolution-regression test confirmed exact natural dimensions for the three static artworks and the Desmos process screenshot;
- screenshot artifact `museum-visual-qa` (artifact id `10656641542`) was produced successfully;
- desktop and mobile captures for the collection, Desmos Flower, Geometric Portrait, and Perspective Study were manually inspected;
- the portrait and perspective work pages render the new sources cleanly at gallery scale on desktop and mobile;
- no obvious crop, stretching, missing-image, or horizontal-overflow defect was observed in the inspected captures.

The process screenshot remains limited to the 719 × 996 source supplied by the user. No artificial upscaling was applied.

## 15. Release blockers

Before calling the museum release-ready:

- [x] quality workflow passes on the feature branch;
- [x] browser workflow passes on the feature branch;
- [x] screenshot artifact is inspected;
- [x] no obvious desktop/mobile visual defects remain in the inspected Chromium captures;
- [ ] live Fibonacci URL is manually verified in a browser if possible;
- [ ] unconfirmed artist names are replaced only when authoritative names are supplied;
- [x] full-resolution replacement screenshots are re-inspected on desktop and mobile after PASS 009 CI;
- [ ] final main commit is known;
- [ ] deployment is tested after main is green.

## 16. Anti-hallucination checklist

Before every future implementation pass:

- [ ] inspect the current repository branch;
- [ ] reread this file;
- [ ] do not invent student names;
- [ ] do not invent artwork techniques not visibly or explicitly supported;
- [ ] preserve Fibonacci mathematical-integrity wording;
- [ ] do not treat generated mockups as factual content;
- [ ] keep static artworks static;
- [ ] keep audio user-initiated;
- [ ] preserve Previous / Next / closing flow;
- [ ] preserve reduced-motion behavior;
- [ ] record only tests actually run;
- [ ] record only screenshots actually inspected;
- [ ] do not claim deployment success without deployment evidence.
