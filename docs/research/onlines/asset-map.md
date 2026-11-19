# Onlines — Asset Map

All assets were downloaded from the live page’s rendered `<img>`/`<picture>`
and CSS `url()` references and stored under `public/sites/onlines/`.
73 files, ~2.57 MB total. Every path below is served at
`/sites/onlines/<path>`.

## hero/ (21 files)

Used by `Hero.tsx` (figma comments, device mockups, floating apps, typing
card, wireframe and chat cards).

| File | Size | Usage |
|------|-----:|-------|
| `diseno.avif` / `diseno.webp` | 44 KB / 74 KB | “Diseño” artboard, ≥1024 px |
| `diseno-mobile.avif` / `.webp` | 16 KB / 29 KB | Same artboard, <1024 px |
| `pc-screen.avif` / `.webp` | 5 KB / 10 KB | Desktop monitor screen, ≥1024 px |
| `pc-screen-mobile.avif` / `.webp` | 3 KB / 5 KB | Monitor screen, <1024 px |
| `celular-screen.avif` / `.webp` | 9 KB / 14 KB | Phone screen, ≥1024 px |
| `celular-screen-mobile.avif` / `.webp` | 2 KB / 2 KB | Phone screen, <1024 px |
| `wireframe.svg` | 1.7 KB | Wireframe card |
| `codigo.svg` | 0.8 KB | Code-editor background behind typing text |
| `chat.svg` | 1.9 KB | Chat card |
| `app-vscode.svg` | 3.5 KB | VS Code floating app icon |
| `app-figma.webp` | 1.5 KB | Figma floating app icon |
| `app-notion.svg` | 2 KB | Notion floating app icon |
| `app-notion2.svg` | 1 KB | Next.js floating app icon |
| `app-wordpress.webp` | 2.7 KB | WordPress floating app icon |

## servicios/ (3 files)

Used by `Servicios.tsx` as the halftone shader source (452×520).

| File | Size | Usage |
|------|-----:|-------|
| `fondo-1.webp` | 68 KB | Service 1 — UX/UI design |
| `fondo-2.webp` | 108 KB | Service 2 — custom development |
| `fondo-3.webp` | 69 KB | Service 3 — digital services |

## dark/ (2 files)

Used by `DarkMode.tsx`.

| File | Size | Usage |
|------|-----:|-------|
| `laptop.webp` | 20 KB | Laptop shown in the dark block |
| `trama-textura.webp` | 36 KB | Dot/texture overlay |

## equipo/ (6 files)

Used by `Equipo.tsx`; the six role cards are now service icons instead of
member photos. Each is a hand-authored 80×80 monochrome SVG on a transparent
background (`stroke: #1d1d1f`, 2 px, round caps/joins) so the existing white
card, radius and shadow carry the container styling.

| File | Usage |
|------|-------|
| `servicio-graphic-design.svg` | Graphic design (layered shapes) |
| `servicio-ai-video-generation.svg` | AI video generation (screen + spark) |
| `servicio-ai-filmmaking.svg` | AI filmmaking (clapperboard + spark) |
| `servicio-ui-ux-design.svg` | UI/UX design (browser window) |
| `servicio-motion-graphics.svg` | Motion graphics (motion arc) |
| `servicio-2d-ai-animation.svg` | 2D AI animation (frame + spark) |

## portfolio/ (5 files)

Used by `Portfolio.tsx` — card deck plus floating app badges.

| File | Size | Usage |
|------|-----:|-------|
| `tarjeta-2.webp` | 92 KB | Deck card 1 |
| `tarjeta-5.webp` | 13 KB | Deck card 2 |
| `tarjeta-4.webp` | 46 KB | Deck card 3 |
| `app-vscode.svg` | 3.5 KB | VS Code badge |
| `app-figma.webp` | 1.5 KB | Figma badge |

## news/ (3 files)

Used by `Noticias.tsx` as both the `<picture>` image and the halftone shader
source (407×340).

| File | Size | Usage |
|------|-----:|-------|
| `ambar-ultramar.webp` | 10 KB | “IA y ciberseguridad” card |
| `posse-web.webp` | 6 KB | “Publicar en tu propio sitio” card |
| `diseno-centrado-usuario.webp` | 14 KB | “Diseño centrado en el usuario” card |

## contacto/ (9 files)

Used by `Contacto.tsx`.

| File | Size | Usage |
|------|-----:|-------|
| `tarjeta-metricas.webp` | 23 KB | Flat metrics card |
| `tarjeta-persona-notebook.webp` | 68 KB | Stacked artboard photo |
| `tarjeta-mano-sobre-escritorio.webp` | 58 KB | Stacked artboard photo |
| `chat.svg` | 1.9 KB | Chat bubble artboard |
| `app-google-doc.svg` | 0.7 KB | Google Docs floating icon |
| `app-notion.svg` | 2 KB | Notion floating icon |
| `app-vscode.svg` | 3.5 KB | VS Code floating icon |
| `app-figma.webp` | 1.5 KB | Figma floating icon |
| `app-cursor.svg` | 1 KB | Cursor floating icon |

## logos/ (9 files)

Used by `LogoMarquee.tsx`; each logo is rendered twice to make the CSS
marquee seamless. Intrinsic widths: 123–160 px.

| File | Size |
|------|-----:|
| `mexico-presidencia.svg` | 40 KB |
| `fundar.svg` | 3.5 KB |
| `union-europea.svg` | 11 KB |
| `santa-fe-provincia.svg` | 11 KB |
| `nissan.svg` | 2.3 KB |
| `valenziana.svg` | 8 KB |
| `rosental.svg` | 8.2 KB |
| `grupo-gamma.svg` | 13 KB |
| `sports-rights.svg` | 14 KB |

## ui/ (5 files)

Shared icons.

| File | Size | Usage |
|------|-----:|-------|
| `onlines-avatar.svg` | 0.7 KB | Figma-comment avatar (hero, team, portfolio) |
| `behance.svg` | 1.1 KB | Portfolio social button |
| `instagram.svg` | 1.9 KB | Contact social button |
| `linkedin.svg` | 0.7 KB | Contact social button |
| `cursor.svg` | 3.6 KB | Generic cursor (CSS reference) |

## fonts/ (10 files)

Referenced by `@font-face` in `src/app/onlines.css`.

| File | Usage |
|------|-------|
| `inter-display-300-normal.woff2` | Inter Display 300 |
| `inter-display-400-normal.woff2` | Inter Display 400 |
| `inter-display-400-italic.woff2` | Inter Display 400 italic |
| `inter-display-500-normal.woff2` | Inter Display 500 |
| `inter-display-500-italic.woff2` | Inter Display 500 italic |
| `inter-display-600-normal.woff2` | Inter Display 600 |
| `inter-display-700-normal.woff2` | Inter Display 700 |
| `jetbrains-mono-400-normal.woff2` | JetBrains Mono 400 |
| `jetbrains-mono-400-italic.woff2` | JetBrains Mono 400 italic |
| `jetbrains-mono-500-normal.woff2` | JetBrains Mono 500 |

## Inline assets (no file)

The Onlines wordmark (small + full), the cursor glyph, the arrow and the
check icon are inline SVG in `src/components/sites/onlines/icons.tsx`, copied
from the source markup so they inherit `currentColor` and dark-mode styles.
