# Premium Museum UX Audit & Implementation Plan — PASS 010

**Date:** 2026-09-22  
**Branch:** `feature/10-premium-museum-ux`  
**Reference:** `MATH10_MUSEUM_SLIDESHOW_ANTI_HALLUCINATION_MASTER_PLAN_2026-09-21.md`

## 1. Current-state audit

The implementation is structurally sound: semantic Astro pages, a typed exhibit model, static-first delivery, keyboard Previous/Next navigation, no autoplay, reduced-motion protection, a dark installation treatment for the interactive work, and green Chromium CI. The full-resolution artwork pass is also green.

The remaining gap is **experience quality**, not basic correctness. The current site reads as a clean editorial portfolio with museum styling rather than a deliberately choreographed digital exhibition.

### Highest-impact visual problems

1. **Wayfinding is under-designed.** The original plan called for a quiet room strip / “you are here” device. Current pages rely on a conventional website header plus tiny side arrows.
2. **Gallery composition lacks spatial depth.** Artwork, label, and controls are correctly arranged but feel placed on a page rather than curated on a wall. The frame has little material hierarchy and the side arrows float in dead space.
3. **Entrance is competent but generic.** It establishes a room, but the title/button stack resembles a landing-page hero. It needs stronger exhibition identity and a more architectural threshold.
4. **Overview is too catalogue-like.** The grid is visually clean, but every work uses a similar large rectangular container. It needs stronger curatorial rhythm, clearer numbering, and a more intentional transition into individual walls.
5. **Mobile navigation is visually weak.** Previous/Next controls are small and detached from the progress state. The experience needs a single coherent navigation rail.
6. **Motion is technically present but not choreographed.** Matching artwork/title View Transition names exist, but root transitions are generic. Direction, hierarchy, and navigation feedback are not yet part of a coherent motion language.
7. **Process material is always expanded.** This makes the first work disproportionately long and weakens the “one artwork per wall” rhythm. The original plan explicitly supported a process/provenance secondary action.
8. **Bookends do not fully feel related to the tour.** Entrance, exhibition, work pages, and closing share typography but lack a strong repeated spatial/navigation motif.
9. **Typography and micro-details are too default.** The serif/sans pairing is sensible, but optical sizing, label rhythm, metadata rules, active states, and small interface details can be substantially refined without adding fonts or dependencies.
10. **No deliberate pointer/focus choreography on artwork cards.** Hover is only a tiny scale. A premium gallery should communicate “enter this room” through restrained framing and text motion rather than generic zoom.

## 2. UX problems

- The visitor cannot see the complete exhibition sequence while inside a work.
- “View all works” is distant from the current work and does not communicate location.
- Side arrows are hard to scan and can be visually confused with decoration.
- The process section interrupts the tour instead of behaving as optional supporting material.
- The interactive room’s CTA is good but its hierarchy competes with source access.
- There is no concise “room title / current position / next destination” system.
- Mobile has no compact overview affordance beyond returning to the collection page.

## 3. Motion audit

### Keep
- Cross-document View Transition API as progressive enhancement.
- Matching artwork/title transition names.
- CSS-only interaction motion.
- Reduced-motion override.

### Fix
- Root crossfade should be quieter than artwork/title continuity.
- Navigation arrows should have directional affordance without large travel.
- Collection hover should use frame/label emphasis and subtle artwork settling, not noticeable zoom.
- Entrance should have a short, one-time reveal hierarchy; no looping motion.
- Process disclosure should animate only opacity/clip/translate over a short distance and become instant under reduced motion.
- Dark-room transition should feel like entering an installation, but must not flash or create long fades.

### Explicit non-goals
- No GSAP/Motion/React animation dependency.
- No smooth-scroll library.
- No WebGL in the museum shell.
- No cursor follower, particles, magnetic buttons, 3D tilt, or decorative animation stack.
- No autoplay or auto-advancing slideshow.

## 4. Premium direction

**Digital White Cube, sharpened into an editorial exhibition system.**

The premium quality should come from:
- museum-scale spacing;
- stronger optical alignment;
- one persistent exhibition wayfinding language;
- controlled light/material depth;
- typography and hairline detail;
- artwork-specific framing;
- calm but intentional transitions;
- a compact floor-plan/progress rail;
- secondary information revealed only on demand.

## 5. Implementation sequence / atomic commits

### Commit A — audit + plan
Document current defects, motion principles, acceptance criteria, and second-pass gate.

### Commit B — design system + museum wayfinding
- expand semantic tokens for spacing, motion, room surfaces, focus;
- add reusable `ExhibitionRail` with Entrance → 01 → 02 → 03 → 04 → Exit;
- current-work semantics and compact mobile state;
- integrate on work pages and collection.

### Commit C — premium gallery wall
- rebalance desktop wall grid;
- turn Previous/Next into legible edge controls;
- refine artwork frame/mat/shadow/light;
- strengthen label typography and metadata;
- convert Desmos process material into an explicit native disclosure;
- improve interactive CTA hierarchy.

### Commit D — entrance, overview, bookends
- create a stronger threshold/room-number motif;
- improve overview art direction and card interaction;
- unify entrance/closing spatial language;
- improve mobile compositions.

### Commit E — motion choreography
- directional/quiet View Transition timing;
- entrance reveal;
- card hover/focus motion;
- disclosure motion;
- reduced-motion hard stop.

### Commit F — adversarial second pass
- inspect screenshots;
- fix density, alignment, mobile navigation, contrast, and any over-animation;
- strengthen tests for wayfinding/disclosure/reduced-motion hooks;
- update implementation ledger.

## 6. Acceptance criteria

- The experience reads as an exhibition before it reads as a website.
- Art remains the loudest object in every work view.
- A visitor always understands current room and tour direction.
- No artwork is cropped.
- Process material is optional and keyboard-accessible.
- Desktop and mobile have intentionally different compositions.
- No horizontal overflow at 320/390/768/1440.
- Keyboard tour remains complete.
- Reduced motion removes nonessential animation.
- No new runtime dependency.
- Astro check, build, browser QA, and screenshot artifact succeed.
- A second visual audit is performed after implementation and produces at least one refinement commit.
