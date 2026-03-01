# TASK.md – Jennifer Calmelat Portfolio · Feature Backlog

> **Multi-agent instructions**: Each task is self-contained. Read `CLAUDE.md` for project context before starting.
> Agents may work on independent tasks in parallel. **Only the human owner may change task status.**
>
> **Status legend**:
>
> - `todo` — pendiente, no iniciado
> - `process` — agente trabajando en ello
> - `humanreview` — implementado, esperando revisión manual del usuario
> - `done` — revisado y aprobado por el usuario

---

## T1 · Fix Hero / About Color Seam

**Status**: `done`
**Priority**: High
**Depends on**: nothing
**Files**: `index.html` (inline `<style>`), `static/js/custom.js`

### Problem

When `NAY.HeroDarken` animates the hero bottom corners from `0px → 120px` border-radius on scroll,
the browser reveals the document background (white) through the curved cutout before the About
section is visible. This produces a white "gap" arc at the bottom of the hero. (See image 9 in
conversation history.)

### Acceptance Criteria

- No white/grey artifacts visible at the hero bottom edge during scroll
- The color seen through the curved corners must match the About section background (`#007ae5`)
- Works on desktop (1920px) and mobile (375px)
- Does not break the existing `NAY.HeroDarken` or `NAY.AboutScrollAnim` logic

### Implementation Notes

- The `#home` wrapper or `body` background needs to be set to the same blue (`#007ae5`) so when
  the rounded corners reveal what's "behind", it's already blue
- Alternatively, a thin absolutely-positioned blue strip can be placed just below the hero
- The About sticky scroll area (`#about .about-scroll-area`) starts immediately below `#home`;
  its background is set inside `NAY.AboutScrollAnim` via JS. Consider setting it in CSS too so
  it's stable before JS runs.
- Test by scrolling slowly at the hero/about seam

---

## T2 · About Section Animation Polish

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing (independent of T1)
**Files**: `index.html` (inline `<style>`), `static/js/custom.js`

### Problem

The About section Joby-style scroll animation (Phase 1: title shrinks + bg color change,
Phase 2: content fades in) has some rough edges:

1. Image reveal is too abrupt — needs smoother easing and a more natural grow
2. Image size is ~10% too large for the layout
3. Some component proportions feel off for an Awwwwards-quality result

### Acceptance Criteria

- Image fade-in / scale-up feels buttery smooth (no pop-in)
- Jennifer's photo is approximately 10% smaller than current size
- Text items and button stagger in elegantly (current stagger is acceptable, tune if needed)
- Layout proportions feel balanced and refined at all viewport widths
- No jank or frame drops during animation

### Implementation Notes

- Image is in `.about-img-wrap` inside the Bootstrap col — reduce its `max-width` or
  `.about-photo` dimensions by ~10%
- Image currently uses: `transform-origin: bottom left; transform: scale(imgScale)` where
  `imgScale` goes `0.01 → 1` via smoothstep. Consider starting at `scale(0.85)` instead of
  `scale(0.01)` for a subtler, more premium feel
- Phase timing is in `NAY.AboutScrollAnim` in `custom.js` — look for `colorProgress`,
  `contentProgress`, `imgEased`
- Remember to bump cache version: `custom.js?vN` in `index.html` `<script>` tag

---

## T3 · Download CV Button — PDF Link + Slide Animation

**Status**: `done`
**Priority**: High
**Depends on**: nothing
**Files**: `index.html`, `static/style/master.css`

### Problem

The "DOWNLOAD CV" button in the About section currently has no `href` and no hover animation
matching the design system.

### Acceptance Criteria

1. Clicking "DOWNLOAD CV" downloads / opens the PDF:
   `CV-JenniferCalmelatInvestigationsConsultantSpontaneousApplication.pdf`
   (file is at project root, same level as `index.html`)
2. Button has the same slide-fill hover animation as the hero "CONTACT ME" button,
   but **inverted**: fill slides from bottom to top in **white** revealing **blue text**
   (i.e. primary blue background + white slide → white bg + blue text on hover)
3. Animation must be CSS-only (no JS needed for hover)
4. Works on mobile tap (touch events)

### Current Hero "Contact Me" Button Reference

In `index.html` the Contact Me button uses class `.m-btn-outline` with a `.btn-fill` pseudo-element
that slides up. Find this pattern in `master.css` (search for `.m-btn-outline`, `.btn-fill`).

### Implementation Notes

- The PDF path from the HTML root is:
  `./CV-JenniferCalmelatInvestigationsConsultantSpontaneousApplication.pdf`
- Add `download` attribute so browser triggers download rather than inline view
- Create a new class (e.g. `.m-btn-cv`) or extend existing `.m-btn-theme` / `.m-btn-outline`
- Slide animation: white pseudo-element slides in from bottom, button text changes to blue
- Make sure the anchor tag has `target="_blank" rel="noopener"` as fallback if download fails
- Test: click button → PDF download dialog appears; hover → smooth fill animation

---

## T4 · Section 3 (Key Competencies) — Alternate Background + Scroll-Rounded Top Corners

**Status**: `done`
**Priority**: Medium
**Depends on**: T1 complete (color seam fix gives context for bg color choices)
**Files**: `index.html`, `static/style/master.css`, `static/js/custom.js`

### Problem

Section 3 `#competencies` currently has a white background identical to adjacent sections,
making the page feel flat. It needs:

1. An alternate background color (light tint `#BDD6EE` or very light warm grey — designer's choice)
2. As the user scrolls INTO section 3, its top edge transitions from straight → rounded corners
   (mirror of how the hero bottom corners round when scrolling away from hero)

### Acceptance Criteria

- `#competencies` has a visually distinct background from white sections
- On scroll, top-left and top-right border-radius of `#competencies` animate from `0px → ~80px`
  as the section enters the viewport
- Animation is scroll-driven via `requestAnimationFrame`, similar to `NAY.HeroDarken`
- Looks correct on desktop and mobile (radius may need to be smaller on mobile)
- No layout shifts or content clipping during animation

### Implementation Notes

- Add a new function `NAY.CompetenciesReveal()` in `custom.js`
- Trigger: when `#competencies` top edge is within `window.innerHeight` of viewport bottom,
  animate radius 0 → 80px proportionally to how far the section has scrolled into view
- Use `border-top-left-radius` + `border-top-right-radius` (or shorthand with bottom as 0)
- The section needs `overflow: hidden` to clip its own content to the rounded corners
- Suggested alt background: `#eaedf2` (very subtle blue tint) or `#BDD6EE` (project light tint)
- Remember cache version bump

---

## T6 · Language Switcher UI/UX Fixes

**Status**: `done`
**Priority**: High
**Depends on**: nothing
**Files**: `index.html`

### Problem

The language switcher has three main issues:

1. **Mobile Visibility**: The "EN" toggle in the Hero section is not visible on mobile devices.
2. **Color Contrast**: The white toggle is invisible on light backgrounds (like Section 2).
3. **Hover Interaction**: When the toggle is active in the navigation/menu, the hover color should be black instead of the default blue.

### Acceptance Criteria

- Language switcher is visible and functional on mobile (375px viewport)
- Toggle color/background adapt when scrolling to light sections (using `.nav-active` class)
- Hovering over the toggle in the navigation menu changes its background to black
- Consistent look and feel across all screen sizes

---

## T5 · Section 3 (Key Competencies) — Awwwwards-Quality Redesign

**Status**: `done`
**Priority**: Low (design-heavy, tackle after T4)
**Depends on**: T4 complete (background + corners established)
**Files**: `index.html`, `static/style/master.css`

### Problem

The current Key Competencies section uses basic Bootstrap progress bars with percentage labels.
This is low-quality and doesn't match a premium Awwwwards-level portfolio. The data is good;
the visual design must be elevated.

### Acceptance Criteria

- Progress bars are completely removed (no percentage numbers visible)
- All existing competency data is preserved (skill names, relative levels are kept as visual metaphor)
- Design quality is Awwwwards-level: editorial typography, generous whitespace, micro-interactions
- Stat counters (years of experience, cases investigated, etc.) are kept but redesigned
- Must work with existing fonts (Playfair Display + Inter) and color palette (see CLAUDE.md)
- Responsive: looks excellent on mobile and desktop

### Ideas to Explore (agent decides best approach)

- **Skill constellation**: skills displayed as floating tags with size proportional to proficiency
- **Editorial list**: large numbered list with thin horizontal rules — minimal, elegant
- **Pill tags grid**: grouped skill pills by category (Investigations, Management, Languages…)
  with subtle color coding using project palette
- **Icon + label cards**: each skill as a small card with an ET-Line or FA icon, no percentages
- Whatever the agent chooses, it must feel intentional and polished — not template-like

### Implementation Notes

- Current section HTML is inside `#competencies` in `index.html`
- Stat counters use jQuery Appear + `data-to` and `data-speed` attributes — preserve this logic
- Skills data to preserve:
  - PSEAH & Fraud Investigations
  - Humanitarian Project Management
  - Compliance & Accountability
  - Case Management
  - Intercultural Mediation
  - Training & Capacity Building
  - Languages (FR native, EN fluent, ES fluent, DE basic)
- Language switcher: all new text content must use `data-i18n` attributes if it will be translated

---

## T7 · About Section — Mobile Contact Details Layout Fix

**Status**: `done`
**Priority**: High
**Depends on**: nothing (independent)
**Files**: `index.html` (inline `<style>`), `static/style/master.css`

### Problem

In the About section (`#about`), the contact details grid (`.about-list`) uses Bootstrap
`col-md-6` columns. On mobile (< 768px), both columns collapse to `col-12` and stack
vertically, turning 6 `label | value` rows into a messy single-column list with a pipe
divider that looks misaligned. Language badges wrap awkwardly alongside the "Languages"
label. (See screenshot: E-mail, Phone, Location, Experience, Availability, Languages all
stacked with uneven spacing and visual noise.)

### Acceptance Criteria

- On mobile (≤ 575px), the contact details render as a clean 2-column layout:
  **label** (left, bold, fixed width) / **value** (right, gray), stacked vertically per row
- The pipe `|` separator between label and value is removed on mobile (or replaced with
  a cleaner visual treatment — e.g. a subtle color distinction only)
- Language badges wrap naturally below the "Languages" label without overflowing
- DOWNLOAD CV button stays full-width or auto-width, left-aligned on mobile
- Looks correct at 375px (iPhone SE) and 430px (iPhone 14 Pro Max)
- No changes to desktop layout (≥ 992px remains as-is)

### Implementation Notes

- The problematic block is `.about-list` at `index.html:1205`. It contains two
  `.col-md-6` divs, each with 3 `.media` rows (label + value)
- Best fix: on mobile, use `display: grid; grid-template-columns: max-content 1fr; gap: 6px 12px`
  on each `.media` instead of Bootstrap's flex `.media` layout
- Alternatively, merge both `col-md-6` into a single column on mobile with `col-xs-12`
  and let CSS Grid handle the label/value alignment uniformly
- The pipe separator is rendered via a CSS `border-left` or `|` character in `.media` —
  remove it on mobile via `@media (max-width: 575px)`
- Language `.lang-badge` spans should `display: inline-flex; flex-wrap: wrap` and have
  `margin-top` so they don't collide with the label on narrow screens
- Remember cache version bump after editing `master.css` and/or `custom.js`

---

## T8 · Areas of Expertise — Particle Wave Background (Aramco-inspired)

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing (independent)
**Files**: `index.html`, `static/style/master.css`, `static/js/custom.js`

### Problem

The `#expertise` section currently uses a flat gray background. The user wants a premium
motion background inspired by the "particles" section style from:
`https://sponsorships.aramco.com/cba/shoot-for-the-future/`

Goal: adapt the **idea** (flowing particle-wave atmosphere) to this portfolio’s visual language,
without a direct copy and while preserving readability of cards/text.

### Acceptance Criteria

- `#expertise` keeps strong text readability (WCAG-friendly contrast for headings, cards, and body text)
- Background includes subtle animated particle-wave motion inspired by the reference style
- Particle field reacts to mouse movement (pointer influence/repulsion) in desktop browsers
- On touch devices, interaction is adapted (tap/drag influence) or gracefully disabled without visual breakage
- Motion feels elegant and lightweight (no visual noise, no distraction from content)
- Performance is smooth on desktop and mobile (no notable scroll jank)
- Respect reduced-motion preferences (`prefers-reduced-motion` fallback to static background)
- Existing section content/cards remain intact and responsive
- Visual style remains coherent with the rest of the website (fonts, colors, spacing, card language)

### Implementation Notes

- Preferred approach: absolutely positioned `canvas` layer inside `#expertise`
  with low-opacity blue/green particle streams; content stays above via z-index
- Add pointer interaction force (radius + falloff) to perturb particles near cursor position
- Alternative fallback: static gradient + subtle dot texture when canvas is unavailable
- Keep particle density conservative; prioritize elegance over intensity
- Use project palette as base and tune toward soft cyan/teal highlights if needed
- Ensure animation loop is paused/throttled when section is off-screen (if needed for performance)
- Bump cache version after edits (`master.css?vN`, `custom.js?vN`)

---

## Completed Tasks

- **T1** – Fixed `#about { margin-top: -130px }` (was -60px). Root cause: max corner radius is 120px, so the about section needed to overlap the hero by ≥120px to cover the full arc. Also added `background-color: #007ae5` as a fallback safety.
- **T7** – About Section mobile contact grid fix. Removed inconsistent inline `min-width` overrides (90px vs 100px) from label elements; set unified `flex: 0 0 110px` in CSS. Added `flex: 1; min-width: 0` on `<p>` to prevent overflow. Language badges now use `class="lang-badges-wrap"` with `display: flex; flex-wrap: wrap; gap: 4px`. CSS bump: `master.css?v=11`.
- **T2** – About Section Animation Polish. Implemented critically-damped spring physics (`k=120, d=22`) with real `dt` for velocity-aware smooth scroll. Phase sequencing: Phase 1 (title shrinks, 0→40%) completes before Phase 2 (content reveals, 40→100%). Mobile/tablet (≤991px) uses static CSS display. `padding-top: 220px` on `.about-unified-container` for breathing room below hero curve.
- **T3** – Download CV button wired to correct PDF path with `download` attribute. Button uses `.btn-slide-cv` class with slide-fill hover animation (blue bg → white fill expands → blue text on hover). CSS-only, no JS needed.
- **Overscroll fix** – Added `html { overscroll-behavior: none }` to prevent bounce/rubber-band effect when scrolling past the top of the page on macOS/Safari. Also set `html { background-color: #0d0d0d }` as a dark fallback in case any gap is visible.

---

## T9 · Work Experience — Scroll-Driven Timeline Progress

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing (independent)
**Files**: `index.html`, `static/style/master.css`, `static/js/custom.js`

### Problem

The `#experience` timeline currently has a static vertical line connecting the dots. There is no visual feedback as the user scrolls through entries — everything looks identical whether seen or unseen.

### Acceptance Criteria

- The vertical timeline line fills from top to bottom as the user scrolls through the section (progress bar effect)
- Each `.experience-item` dot and text light up (gain color) when scrolled into view
- Inactive/unread entries remain muted (light gray text + empty dot)
- Active/read entry is visually highlighted (colored dot, full-opacity text)
- Works on desktop and mobile
- Respects `prefers-reduced-motion` (instant reveal, no animation)

### Implementation Notes

- Add a `.exp-progress-line` element inside `.experience-timeline` — absolutely positioned, height driven by JS scroll progress
- Use `IntersectionObserver` to add `.exp-active` class to each `.experience-item` when it enters the viewport
- Muted state: dot border `#dce3ec`, text `rgba(0,0,0,0.35)`, date badge gray
- Active state: dot filled `#5099df`, text full opacity, date badge blue (`#5099df`)
- Progress line color: `#5099df` (primary blue) over the existing gray track
- New function `NAY.ExperienceTimeline()` in `custom.js`, called on ready + scroll

---

## T10 · Education — Academic Background Redesign

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing (independent)
**Files**: `index.html` (inline `<style>` + section HTML), `static/style/master.css`

### Current State

Section `#education` has `class="section gray-bg"` (background `#c1dfef`, pale blue).
4 entries in a Bootstrap `col-md-6 col-lg-3` grid, each wrapped in `.edu-card`:

```
.edu-card
  .edu-date  (calendar icon + year span)
  h5         (degree title)
  h6         (field / specialization)
  .edu-location (map marker icon + institution, city, country)
```

Entries (chronological):

1. 2020–2021 · Master of Specialization in Law – Human Rights · Saint Louis University, Brussels
2. 2012–2013 · Master in Business & Administration – Business Management · Burgundy School of Business, Dijon
3. 2011 · Academic Exchange – International Studies · FU-JEN University, Taipei
4. 2008–2010 · Bachelor in Sociology – Sociology of Organizations · Paris 12 University

### Problem

The current `.edu-card` design (white card, blue left-border, box-shadow, icon + text stack)
feels template-like and doesn't match the premium quality of other redesigned sections.
The `gray-bg` background (`#c1dfef`) creates a cold visual break between Work Experience
(white) and Certifications (white).

### Acceptance Criteria

- Section feels editorial and premium — Awwwwards quality
- All 4 education entries preserved with all `data-i18n` attributes intact
- Responsive: excellent on desktop (≥992px), tablet, and mobile (375px)
- Consistent with project palette: `#5099df` primary blue, `#D6995C` orange accent,
  Playfair Display + Inter fonts
- Section background harmonizes with surrounding sections
- Hover micro-interactions on cards/items (subtle, no jank)
- No JS required for the redesign (pure CSS is preferred)
- Cache bump: `master.css?vN` after editing

### Design Direction

Replace the 4-column card grid with a **horizontal academic timeline** approach:
a single row of 4 nodes connected by a line, where each node expands downward
with degree info. On mobile, collapses to a vertical list.

Alternative approaches the agent may choose instead:

- **Large year + editorial text**: year in oversized Playfair Display as a visual anchor,
  degree and institution in Inter, entries separated by thin rules
- **Two-row staggered layout**: alternating cards above/below a central horizontal axis
  (classic horizontal timeline)
- **Minimal list with icon accent**: numbered 01–04 large, each entry as a typographic block
  with a thin colored left border (matching project palette)

Whatever approach is chosen must feel intentional, cohesive, and clearly better than
the current template cards. The degree title (h5) should be the visual hero of each entry.

### Implementation Notes

- Current `.edu-card` CSS is in the inline `<style>` block of `index.html` (lines ~242–308)
- The `gray-bg` class sets `background-color: #c1dfef` — feel free to change the section
  background to white `#ffffff` or a very subtle tint if the new design warrants it
- All text nodes use `data-i18n` attributes — do not remove them
- The `<i>` icon elements inside `.edu-date` and `.edu-location` can be replaced or removed
  if the new design doesn't use them
- Keep `id="education"` on the `<section>` for navigation
- Remember cache version bump after editing `master.css`

---

## T13 · About Section — Remove "& Humanitarian Professional"

**Status**: `humanreview`
**Priority**: Low
**Depends on**: nothing
**Files**: `index.html`, `static/js/translations.js`

### Problem

The About section subtitle reads "Investigations Consultant & Humanitarian Professional". The client wants to simplify it to just "Investigations Consultant".

### Acceptance Criteria

- Subtitle in About section shows only "Investigations Consultant" (no "& Humanitarian Professional")
- Updated across all 3 languages (EN, FR, ES) in `translations.js`
- Updated in `index.html` default text

---

## T14 · Replace "Heimsbrunn, France" with "Alsace, France"

**Status**: `humanreview`
**Priority**: Low
**Depends on**: nothing
**Files**: `index.html`, `static/js/translations.js`

### Problem

Location displays "Heimsbrunn, France" — too specific. Client wants "Alsace, France" instead.

### Acceptance Criteria

- All occurrences of "Heimsbrunn" replaced with "Alsace" across the site
- Updated in 3 places per language: About intro subtitle, About location value, Contact location value
- ES translation uses "Alsacia, Francia"
- Updated in `index.html` default text (3 occurrences)

---

## T15 · Fix "I'M" Capitalization in About Section

**Status**: `humanreview`
**Priority**: Low
**Depends on**: nothing
**Files**: `index.html`, `static/js/translations.js`

### Problem

The About intro title reads "I'M Jennifer Calmelat" — all-caps "I'M" feels inconsistent with the editorial tone. Should be "I'm".

### Acceptance Criteria

- EN: "I'M" → "I'm"
- FR: "JE SUIS" → "Je suis"
- ES: "SOY" → "Soy"
- Updated in both `index.html` and `translations.js`

---

## T16 · About Description — "spanning" → "between"

**Status**: `done`
**Priority**: Low
**Depends on**: nothing
**Files**: `index.html`, `static/js/translations.js`

### Problem

The About description reads "12-year career spanning Human Resources, Finance…" — "spanning" sounds unnatural. Replace with "between" for a more natural tone.

### Acceptance Criteria

- EN: "spanning" → "between"
- FR/ES: equivalent phrasing adjusted accordingly
- Updated in `index.html` and `translations.js`

---

## T17 · Competencies — Replace Intercultural Mediation with Review item

**Status**: `done`
**Priority**: Low
**Depends on**: nothing
**Files**: `index.html`, `static/js/translations.js`

### Problem

"Intercultural Mediation" should be removed from the competencies list and replaced with a new item: "Review of Training Material & Internal Policies".

### Acceptance Criteria

- "Intercultural Mediation" skill item removed entirely
- New skill item added: "Review of Training Material & Internal Policies"
- New `data-i18n` keys: `comp_review`, `comp_review_desc`
- FR/ES translations added for the new item
- Total skill items remains at 6

---

## T18 · Update Experience from 12+ to 13+ Years

**Status**: `done`
**Priority**: Low
**Depends on**: nothing
**Files**: `index.html`, `static/js/translations.js`

### Problem

Experience should show 13+ years, not 12+. Affects: About details, Key Competencies counter, Work Experience subtitle, and About description text.

### Acceptance Criteria

- All "12+" references updated to "13+" across EN/FR/ES
- Counter `data-to` attribute updated from 12 to 13
- About description text updated ("12-year" → "13-year" and equivalents)

---

## T19 · Footer — Add Version Number v.0.1.0

**Status**: `done`
**Priority**: Low
**Depends on**: nothing
**Files**: `index.html`

### Problem

Client wants a version number "v.0.1.0" displayed in the footer.

### Acceptance Criteria

- "v.0.1.0" visible in the footer, properly styled
- Does not break existing copyright text or layout

---

## Notes for Agents

1. **Status workflow**: `todo` → `process` (agent working) → `humanreview` (ready for user check) → `done` (user approved). **Only the human owner may move a task to `humanreview` or `done`.**
2. **Cache busting**: after editing `custom.js`, find `custom.js?v=` in `index.html` and increment the number. After editing `master.css`, find `master.css?v=` and increment.
3. **NAY namespace**: all new JS functions must be added inside the `NAY` IIFE in `custom.js`
4. **No separate HTML files**: language switching is JS-driven. Don't create `index-fr.html` etc.
5. **Test locally**: `python3 -m http.server 8080` from project root, then open `http://localhost:8080`
6. **Commit**: stage specific files only (`git add index.html static/js/custom.js static/style/master.css`)

## T20 · Fix Competencies Double Background Layer Animation

**Status**: `done`
**Priority**: High
**Depends on**: nothing
**Files**: `static/style/master.css`, `static/js/custom.js`

### Problem

The `#competencies` section had a double background layer issue on mobile causing visual bugs. `NAY.CompetenciesReveal` animated the parent's `border-radius`, but the `.comp-sticky` child had its own square background that broke the styling.

### Solution

- Removed `background-color: #eaedf2;` from `.comp-sticky` (leaving only the parent's background).
- Made `maxRadius` responsive (`40` on mobile, `120` on desktop) inside `NAY.CompetenciesReveal` so the scroll-curved corners look proportionate.

## T21 · Fix Source Map Load Errors

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing
**Files**: `static/style/master.css`, `bootstrap.min.css`, `bootstrap.js`, `popper.min.js`

### Problem

The console showed 404 errors for `.map` files because the CSS and JS files had `sourceMappingURL` comments pointing to non-existent source maps.

### Solution

- Removed the `//# sourceMappingURL=` and `/*# sourceMappingURL=` lines from the end of the affected files to silence the console errors.

## T22 · Fix About Me Mobile Image Size

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing
**Files**: `index.html`

### Problem

The "About Me" image was too small on mobile views (58% width) and retained a thick white border, which didn't match the new premium design look shown in the provided mockups.

### Solution

- Updated the mobile CSS (`@media (max-width: 991px)`) in `index.html` for `.about-img-reveal`.
- Changed `max-width` from `58%` to `100%` so it aligns nicely with the text margins.
- Removed the thick white border (`border: none`) and `box-shadow`.
- Applied a modern `border-radius: 16px` to both the container and the `img`.

## T23 · Standardize Scroll Border Radius

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing
**Files**: `static/js/custom.js`, `index.html`

### Problem

The rounding effect on scroll at the bottom of the Hero section and around the Competencies section was exaggerated (up to 120px) and inconsistent between components.

### Solution

- Updated `NAY.HeroDarken` and `NAY.CompetenciesReveal` in `custom.js` to use a standardized maximum radius.
- Replaced the hardcoded values with variables: `80px` for desktop and `40px` for mobile.
- This creates a subtler, homogenous curve across all animated sections.

## T24 · Hero Scroll Indicator Hide on Scroll

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing
**Files**: `index.html`, `static/js/custom.js`, `static/style/master.css`

### Problem

The mouse scroll animation in Section 1 (Hero) stays visible while scrolling. The user wants it to fade out intelligently as soon as scrolling down begins, and reappear only when the user scrolls completely back to the top of the section.

### Acceptance Criteria

- Scroll indicator fades out gracefully when `window.scrollY` goes above a small threshold.
- Scroll indicator fades back in when the user is at the very top.
- The indicator is responsive and positions correctly on all screen sizes.
- NO automatic commits or closing the task until the user explicitly approves.

---

## T25 · Smooth Mobile Scroll Animations

**Status**: `done`
**Priority**: Medium
**Depends on**: nothing
**Files**: `static/js/custom.js`, `index.html`, `static/style/master.css`

### Problem

In mobile view (< 991px), the scroll animations for Section 2 (About) and Section 3 (Competencies) are completely disabled. Currently, the content appears statically as the user scrolls, which feels abrupt and lacks the premium feel of the desktop experience.

### Acceptance Criteria

- Implement a graceful, directional "Fade In Up" animation for mobile devices.
- As the user scrolls down on mobile, elements in Section 2 and 3 should smoothly fade in and slide up slightly.
- The animation should use `IntersectionObserver` (or similar performance-friendly API) rather than heavy math calculations on scroll, preserving 60fps on mobile devices.
- Desktop animations (`>= 992px`) remain strictly untouched (using the existing `position: sticky` and requestAnimationFrame logic).
- Do not commit or mark as done until the user tests and approves the behavior.

---

## T26 · Justify Text in Work Experience

**Status**: `done`
**Priority**: Low
**Depends on**: nothing
**Files**: `static/style/master.css`

### Problem

The text blocks (bullet points) in the "Work Experience" section are currently left-aligned, creating a ragged right edge that looks untidy. The user wants the text to be justified to create a cleaner, more readable block of text.

### Acceptance Criteria

- Set text alignment to `justify` for paragraphs and list items within the `#experience` section.
- Ensure the hyphens and spacing look appropriate (no massive gaps between words).
- Do not commit or mark as done until the user approves.
