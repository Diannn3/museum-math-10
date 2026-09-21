# Museum UX + Motion Audit — 2026-09-22

## Scope

Audit of the current `main` museum after the premium-gallery merge and artist-attribution pass, followed by implementation on `feature/light-fibonacci-motion-polish`.

## User-directed changes

1. Make the Fibonacci work page light rather than a dark installation room.
2. Replace the old colorful spiral preview with the supplied light, monochrome visual direction.
3. Audit the full site UX and add smooth, premium motion without making the museum feel like a SaaS landing page.
4. Preserve artwork dominance, accessibility, static-first Astro architecture, and the existing gallery navigation model.

## UX audit

### What was already working

- Strong digital-white-cube concept.
- Artwork-first detail pages.
- Explicit previous/next controls and keyboard navigation.
- Good intrinsic image sizing and contain-based framing.
- Progressive cross-document View Transitions.
- Reduced-motion baseline.
- No unnecessary framework runtime.

### Friction found

- The Fibonacci page broke the visual continuity of the rest of the exhibition by switching to a dark room, while the live artwork itself is now a white/minimal experience.
- The old Fibonacci preview no longer represented the current live work.
- Page entry states were visually static: content appeared all at once, so the exhibition lacked pacing.
- Collection hover feedback was too quiet for a gallery index.
- About and closing pages had strong composition but little temporal hierarchy.
- The header felt more like a static document bar than persistent museum chrome.
- Motion existed mostly at cross-document navigation boundaries; in-page discovery had little choreography.

## Library / platform research

### Motion

Motion's `inView()` is a compact IntersectionObserver-based viewport primitive and is a good candidate when a project already uses Motion or needs a broader animation API.

Decision: **not added**. The museum only needs reveal orchestration and hover/ambient motion, so a dependency would add surface area without enough benefit.

Reference: https://motion.dev/docs/inview

### GSAP

GSAP is appropriate for complex timelines, pinned storytelling, SVG morphing, and highly choreographed sequences. Its `matchMedia()` API explicitly supports reduced-motion-aware animation strategies.

Decision: **not added**. The museum does not need timeline-level orchestration or scroll pinning, and adding GSAP would work against the existing static-first contract.

Reference: https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/

### CSS Scroll-Driven Animations

Modern CSS can bind animations to scroll/view progress with `animation-timeline`, `scroll()`, and `view()`. This can avoid JavaScript scroll handlers and is promising for editorial experiences.

Decision: **not used as the primary reveal system** because support remains incomplete across some browsers. It remains a future progressive-enhancement option.

References:
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/animation-timeline

### View Transition API

The existing cross-document View Transition approach is appropriate for moving from collection card → work page because matching artwork/title snapshots preserve spatial continuity.

Decision: **keep and build around it**. It remains progressive enhancement and must not be required for navigation.

References:
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
- https://docs.astro.build/en/guides/view-transitions/

### Web Animations API

WAAPI is widely available and suitable for custom interactive motion without a library.

Decision: not required for this pass. CSS transitions/animations plus IntersectionObserver are enough; WAAPI remains the next escalation point if direction-aware or interruptible interactions are added.

Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API

## Performance principles used

- Animate `transform` and `opacity` for primary reveals and hovers.
- Avoid layout-heavy animated properties.
- Do not scatter `will-change` across the site; MDN recommends reserving it for measured performance problems.
- Keep ambient loops subtle and decorative.
- Respect `prefers-reduced-motion` as a hard stop.
- Preserve no-JS usability: reveal content is visible by default and is hidden only after JavaScript opts the page into motion.

References:
- https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate
- https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change

## Implemented motion system

### Progressive reveal choreography

`BaseLayout.astro` now adds a tiny IntersectionObserver-based reveal controller.

Behavior:
- only activates when reduced motion is not requested;
- leaves content visible when JavaScript is unavailable;
- observes `[data-reveal]` elements;
- reveals once, then unobserves;
- uses a small stagger index for rhythm;
- has distinct art, label, header, card, and section reveal directions.

### Collection

- Intro reveals first.
- Work cards reveal as they enter.
- Fine-pointer hover gently lifts the card and scales the artwork.
- “Enter room” gains clearer hover feedback.
- Touch layouts do not depend on hover.

### Work pages

- Artwork and label enter with different but restrained vectors.
- Artwork frame has a subtle lift on pointer hover.
- Existing artwork/title View Transitions remain intact.
- Process section reveals only when it reaches the visitor.

### Entrance and closing

- Entrance architectural lighting now breathes subtly.
- Closing-room guide lines use a low-amplitude opacity loop.
- Reduced-motion mode collapses these animations.

### Header

- Header reveals from above.
- Gallery chrome now uses a restrained translucent blur while preserving the editorial look.

## Fibonacci redesign

- Removed the dark-room theme switch.
- Header, rail, page background, controls, and focus treatment now stay in the museum's light system.
- Interactive action buttons were rebuilt for light contrast.
- Preview artwork was rebuilt to match the supplied current visual direction:
  - white field;
  - 25-point circular residue layout;
  - many Fibonacci residue connections;
  - active black point;
  - faint AEDRIAN PONCE field;
  - playback/status treatment.
- Preview metadata updated to 1600 × 1030.

## Non-goals

- No smooth-scroll hijacking.
- No Lenis.
- No GSAP.
- No Motion dependency.
- No autoplay.
- No cursor follower.
- No WebGL.
- No parallax that fights scrolling.
- No motion required to understand navigation.

## QA targets

- Astro check and production build.
- Existing Playwright flow remains green.
- Fibonacci work page has no dark shell.
- Fibonacci preview is the light asset and decodes.
- All routes remain free of horizontal overflow.
- Reduced-motion mode shows content immediately and removes decorative animation.
- Keyboard previous/next navigation remains unchanged.
