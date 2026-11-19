# Onlines — Home Page Clone → Navin D Portfolio

Source: <https://onlines.com.ar/>  
Captured: 2026-11-04  
Scope: **home page only** (`/`)  
Language: **English**  
Current state: **re-skinned as Navin D's creative portfolio** (copy + project
artwork only; layout, components, animations and responsive behaviour are the
original clone).

## Navin D portfolio transformation

The clone was kept structurally intact and re-purposed as a personal
portfolio. Rendered copy and project/toolkit imagery changed, and one
portfolio-only section (Experience) was added; everything else — typography
scale, spacing, colours, grids, card dimensions, navigation, floating
elements, animations and breakpoints — is unchanged.

| Section | Component | Portfolio role |
|---------|-----------|----------------|
| Header | `Header.tsx` | `NAVIN D` SVG wordmark; nav anchors |
| Hero | `Hero.tsx` | `NAVIN D` headline + creative-intro typing snippet |
| Quote | `QuoteBlock.tsx` | Personal intro statement |
| Services | `Servicios.tsx` | 3 capability cards |
| Dark mode | `DarkMode.tsx` | Process / how-I-work copy |
| Team | `Equipo.tsx` | Creative identity + six service icons around the headline |
| Experience | `Experience.tsx` | Journey-map of 4 roles (`#experience`, not in nav) |
| Portfolio | `Portfolio.tsx` | Portfolio intro + 3 project cards (`#work`) |
| Toolkit | `LogoMarquee.tsx` | Software/tool logo marquee |
| Latest news | `Noticias.tsx` | 3 selected projects (`#projects`) |
| Contact | `Contacto.tsx` | Final contact CTA (`#contact`) |
| Footer | `Footer.tsx` | Attribution line |

Changes required for the longer copy:

- `body` carries `className="home"` again — the vendored
  `ultimas-noticias.js` early-returns without it, which had disabled the news
  card entrance animation and the four `body.home` CSS rules.
- `.home-contacto__titulo` is **62px** (was 72px) and
  `.home-portfolio__titulo` is **64px** (was 72px) so each explicit line block
  stays on a single row at 1440 and 1280. Both keep the source line-height,
  letter-spacing ratio and every tablet/mobile size unchanged.
- `.home-bloque-dark-mode__seleccion` height was raised to **184px**, its width
  to `calc(100% + 16px)`, and the drag-area height doubled so the process
  headline's two wrapped lines stay inside the selection outline. Mobile
  selection is **104px**.
- `Equipo.tsx` uses explicit line blocks plus `<br/>` for its two-line
  headline because `.home-equipo__titulo` is `nowrap` on desktop.
- `Experience.tsx` is additive and scoped: `id="experience"` is not linked
  from the nav, and every rule lives under `.home-experiencia` so no other
  section's layout or animation is touched.

Assets added (hand-authored SVG, since image generation was unavailable):

- `public/sites/onlines/projects/` — 6 project artworks, landscape
  `1200×1000` (`gradiance.svg`, `ai-character.svg`, `motion-graphics.svg`) and
  tall `700×1300` (`*-tall.svg`) matching the existing card ratios.
- `public/sites/onlines/logos/` — 7 toolkit logos for the marquee.
- `NAVIN D` wordmark lives in `src/components/sites/onlines/icons.tsx`.

Link behaviour: header/logo links to `/`; all CTAs use internal anchors
(`#work`, `#projects`, `#contact`); external platform buttons point at the
platform root URLs (`behance.net`, `instagram.com`, `linkedin.com`) because no
personal handles were supplied. Replace those three URLs when available.

## What this is

A pixel-faithful Next.js rebuild of the Onlines home page. The WordPress theme
(`onlines-web-2026`) ships its blocks as plain PHP-rendered HTML plus vanilla
view scripts, so the clone reuses the original CSS verbatim and vendors the
original view scripts, adapting only their bootstrap timing so they can run
after React hydration.

- Framework: Next.js 16 App Router, React 19, TypeScript strict
- Styling: original theme CSS + WordPress core block CSS concatenated into
  `src/app/onlines.css`; Tailwind utilities (`px-1rem-mob`, `pt-[80px]`, …)
  remain in markup because the source markup uses them
- Images/fonts: downloaded from the source into `public/sites/onlines/`
- Icons: brand logo is inline SVG (`icons.tsx`); social/app icons are the
  source SVG files

### English localization

Every user-facing string was translated to English: page metadata and
`<html lang="en">`, navigation, hero copy and typing snippet
(`Hello World!`), service/news/team/portfolio/contact copy, buttons, Figma
comment bubbles and timestamps, alt text, ARIA/title attributes, the footer,
and the halftone fallback messages in the CSS. Internal Spanish class names,
asset filenames, URL paths and code comments were left untouched so the
cloned CSS/scripts keep working. Link targets were later re-pointed for the
portfolio (internal anchors + platform placeholders).

## Page composition

`src/components/sites/onlines/OnlinesHome.tsx` renders the same order as the
source, with the portfolio-specific Experience section inserted between Team
and Portfolio. There is no `<main>` wrapper in the source and none here.

| # | Section | Component | Desktop height @1440 | Mobile height @390 |
|---|---------|-----------|---------------------:|-------------------:|
| 1 | Header | `Header.tsx` | 88 | 88 |
| 2 | Hero | `Hero.tsx` | 800 | 744 |
| 3 | Quote | `QuoteBlock.tsx` | 3015 (pinned) | 2109 (pinned) |
| 4 | Services | `Servicios.tsx` | 774 | 1453 |
| 5 | Dark mode | `DarkMode.tsx` | 1012 | 726 |
| 6 | Team | `Equipo.tsx` | 947 | 770 |
| 7 | Experience journey map | `Experience.tsx` | 1355 | 1178 |
| 8 | Portfolio + logo slider | `Portfolio.tsx`, `LogoMarquee.tsx` | 990 | 890 |
| 9 | Latest news | `Noticias.tsx` | 522 | 1239 |
| 10 | Contact | `Contacto.tsx` | 809 | 834 |
| 11 | Footer | `Footer.tsx` | 64 | 90 |

Total document height: 10374 px desktop @1440 / 10219 px mobile @390. Heights
reflect the portfolio copy (and the added Experience section) and therefore
differ from the source layout.

## Behaviour inventory

Vendored scripts live in `src/components/sites/onlines/vendor/`. All keep the
source logic; only `DOMContentLoaded` bootstraps were changed so the module
runs after React has mounted the markup.

| Script | Behaviour |
|--------|-----------|
| `header-logo.js` | Swaps the full wordmark for the small mark as the page scrolls. |
| `home-hero.js` | Scroll lock (until first scroll or 8 s failsafe), then staggered fade-ins, floating parallax, Figma-style cursors, layout selection box and the typing loop. |
| `home-quote-block.js` | Length-pinned quote whose words reveal in sync with scroll progress in both directions. |
| `home-servicios.js` + `card-servicio.js` | Service-card entrance; splits each title into measured lines and draws a dotted rule under every line. |
| `home-bloque-dark-mode.js` | Toggles `body.is-dark` while the description paragraph intersects; title and “selection” are pointer-draggable on desktop. |
| `home-equipo.js` | Staggered service cards and drag-select of the title highlight. |
| `home-portfolio.js` | Fans the card deck, reveals comments/apps, adds `is-animated` to the block. |
| `ultimas-noticias.js` + `card-noticia.js` | News-card entrance; measured title line splitting with dotted rules. |
| `home-contacto.js` | Reveals the artboard, floating app icons, cursor, chat bubble and button. |
| `slider-logos` (replaced) | CSS marquee, duplicated track, 46 s linear loop. |
| Shared | `grilla-celdas.js` (grid overlay), `patron-puntos.js` (dot pattern), `shader-halftone.js` (7 Canvas 2D halftone canvases). |

### Team service icons

The Team section keeps its headline, CTA, grid, container size and selection
animation; the six member photos became hand-authored monochrome SVGs
(`public/sites/onlines/equipo/servicio-*.svg`) in the existing rounded,
white, shadowed containers, and the role labels became two-line service names.
The six floating Figma comment bubbles were removed entirely. The icons now
sit in two balanced rows framing the headline: three across the upper
perimeter (`top: 52px` desktop, `30px` mobile) and three across the lower
(`bottom: 1px` desktop, `10px` mobile), with equal left/centre/right spacing
and `margin-left: -36px` (`-35px` mobile) to centre the middle column. The
container is **72×72** with a **64×64** icon on desktop (**70×70** / **62×62**
on mobile). Nothing overlaps the headline or CTA, and `body.is-dark` inverts
the icon strokes so they stay visible on the dark card.

- During the theme transition the SVGs are filtered with `invert(1)` rather
  than recoloured, so no per-icon assets are needed.

### Experience journey map (React)

`Experience.tsx` is the only section written for the portfolio rather than
cloned; it has no vendored script and reuses the existing tokens and grid
overlay.

- **Route:** one SVG path built from the real marker centres (Catmull-Rom →
  cubic Bézier, rebuilt on resize), so the line always passes through stops
  01–04 at any width. A light dotted base is always visible; a darker dotted
  progress path is revealed with a solid mask path driven by
  `stroke-dashoffset`.
- **Scroll draw:** progress is computed from the map's viewport position. On
  desktop the draw completes while the whole route is still on screen (~1.5%
  on entry, ~50% mid-scroll, 100% at reading position); the stacked mobile map
  draws over a longer range as it is scrolled through.
- **Reveals:** an `IntersectionObserver` watches the markers (the desktop `<li>`
  anchors are 0×0) and adds `is-visible` to the matching stop, animating the
  marker and floating card with the same 0.5–0.6 s cubic-bezier language used
  elsewhere.
- **Current position:** stop 04 (Falcon Reality) uses the blue marker with a
  slow pulse ring and a blue mono “You are here” caption below it.
- **Mobile:** under 1024 px the stops stack into a single column (marker left,
  card right, 80 px gutter) while the SVG route keeps winding between the same
  marker centres, so the map concept survives instead of collapsing into a
  timeline.
- **Motion safety:** `prefers-reduced-motion` renders the route complete and
  shows markers/cards without transitions or the pulse.

### Shader canvases

Seven `js-shader-halftone` instances render with Canvas 2D:

- 3 service cards
- 3 news cards
- 1 (desktop) / 0 (mobile) decorative instance whose container is hidden at
  the current breakpoint (matches source behaviour)

Canvases are sized to their CSS box (`width/height` attributes equal the
rendered CSS pixels) and re-render on resize.

## Fidelity notes

- **`home-portfolio__bloque.is-animated` is intentionally unstyled.** The
  source view script adds the class, but no rule for it exists in
  `home-portfolio.css`; there is no clip-path or dot-draw transition in the
  source either. The dotted title rules are static. This is a source quirk,
  cloned as-is. The same applies to `home-contacto.is-animated`.
- **Swiper was replaced by a CSS marquee.** The source uses Swiper in linear
  autoplay mode; a duplicated track translated with a 46 s linear animation
  reproduces the visual result without the vendor runtime.
- **Logo images keep the source’s `loading="lazy"`.** A few logos at the far
  end of the track report incomplete only while they are still outside the
  viewport; they resolve as the marquee advances. No asset returns 404.
- Lazy images below the fold report an empty `currentSrc` until scrolled into
  view — same as the source.
- The hero deliberately locks scrolling for up to 8 seconds if the visitor
  does not interact, exactly like the source. Automated screenshots should
  scroll or wait past the failsafe.

## Verification

Final Navin D pass — `npm run lint`, `npm run typecheck`, `npm run build` all
pass (`npm run check`).

Headless Chrome audit at **1440×900, 1280×800, 1024×768, 768×1024, 390×844**:

- `document.documentElement.lang === "en"`; `<title>` is
  “Navin D — Creative AI Animator & Graphic Designer” and the description
  matches the portfolio intro.
- **No horizontal overflow** at any width (`scrollWidth <= clientWidth`).
- **No console errors or exceptions**; no broken images.
- Section order/anchors verified: `#work`, `#projects`, `#contact` all exist
  and every `href="#…"` resolves to a target. All CTA buttons are internal
  anchors; the three platform buttons are external root URLs.
- Contact and portfolio headlines are single-row line blocks at 1440 and 1280
  (62px / 64px), and wrap naturally below that without clipping.
- Hero `is-started`; quote reveals 24/24 words; all six service cards reveal
  at every width; portfolio fans the deck and reveals 2 comments + 2 app
  badges; news reveals 3/3 cards; contact reaches `is-animated` with 3 cards.
- All 7 halftone canvases render; logo marquee runs (`onlines-marquee`);
  dark mode engages while the process block is in view and clears after.
- No heading or headline is clipped by the viewport at any tested width.
- **Team service icons:** all six SVGs load and rasterise inside the
  **72×72** (desktop) / **70×70** (mobile) containers; labels render exactly
  `GRAPHIC DESIGN`, `AI VIDEO GENERATION`, `AI FILMMAKING`, `UI/UX DESIGN`,
  `MOTION GRAPHICS`, `2D AI ANIMATION` directly under their icon. The six
  comment bubbles are gone (0 in the DOM). At 1520/1440/1280/1024/768/390 the
  two icon rows stay inside the section, no icon or label touches the headline
  or CTA, and there is no horizontal overflow. The selection highlight still
  completes (`is-selected`, `rgba(0, 149, 255, 0.2)`), and the headline/CTA
  positions and section heights are unchanged.
- **Experience journey map:** at 1440/1280/1024/768/390 all **4/4** stops and
  cards reveal; the route is a curved path passing through the four marker
  centres (1311 px at 1440, 607 px at 390) and draws progressively
  (~3–6% on entry → ~50–60% mid-scroll → 100% at reading position). Stop 04 is
  the blue marker (`rgb(8, 89, 212)`) with the “You are here” caption; the
  other three are white/black. No card-to-card overlaps, no route segment
  crossing a card, no clipping, and no horizontal overflow.

Automation notes: the hero scroll lock blocks programmatic scrolling for
~9.5 s, so CDP checks wait ≥10.8 s before scrolling. `scrollIntoView` on
overflow-hidden sections can move the wrong container; use
`window.scrollTo(0, rect.top + scrollY)`. The Experience section observes
markers, not the 0×0 desktop `<li>` anchors, so reveal checks must scroll the
marker itself into view.

Reproduction scripts: `%TEMP%/verify-navin.mjs`,
`%TEMP%/team4.mjs`, `%TEMP%/final-audit.mjs`,
`%TEMP%/verify-experience-v3.mjs`,
`%TEMP%/verify-team-layout.mjs`,
`%TEMP%/verify-team-service.mjs` (CDP, not committed).

## Out of scope

Only `/` exists. The portfolio has no additional routes:

- All CTAs are in-page anchors (`#work`, `#projects`, `#contact`).
- Project cards link to `#projects` (no case-study routes yet).
- External buttons point at platform root URLs as placeholders:
  `https://www.behance.net/`, `https://www.instagram.com/`,
  `https://www.linkedin.com/`. Swap in the real profile URLs.
- The header wordmark links to `/`.

Adding case-study or project-detail routes is a separate task.
