# Portfolio — Manuel Samaniego

Astro 6 + Tailwind CSS 4 static site. Personal portfolio positioning Manuel Samaniego as a Full Stack engineer (backend Java/Spring) for recruiters, not a freelance service offering.

## Commands

```bash
npm run dev      # Dev server (accessible on network via --host)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

## Architecture

```
src/
  layouts/       # Layout.astro — html shell, fonts, GA4, footer
  pages/         # index.astro, projects/[project].astro, 404.astro, aviso-de-privacidad.astro, links.astro
  views/
    home/
      sections/  # Intro, RecentProjects, AboutMe, Experience, Technologies (full-page sections)
      components/ # ProjectCard
    shared/      # NavBar, Contact, Footer
  data/          # allProjects.ts, experience.ts, technologies.ts, socialLinks.ts
  styles/        # global.css
  types/         # Project.ts
  utils/         # email.ts
public/
  css/           # fonts.css
  robots.txt     # sitemap reference
  og-image.png   # Open Graph image (generated)
scripts/
  generate-og-image.mjs  # regenerates public/og-image.png via sharp
```

## Design System

- Brand teal: `#2d5d54` — hover: `#3e8b7d`
- Background: `linear-gradient(170deg, #daeee9 0%, #f1f2f5 14%) fixed`
- Fonts: `.codec-pro` (headings) / `.rubik` (body)
- Animations: GSAP 3. FOUC prevention pattern: add `visibility: hidden` in `<style>` for every animated element, then use `gsap.set()` for initial scale/y + `gsap.to()` with `autoAlpha: 1` (never `gsap.from()` with `opacity`). `autoAlpha` manages both `opacity` and `visibility` together.
  - **Above-fold / on-load** (`Intro`, `NavBar`, `links`): CSS `visibility:hidden` on elements → `gsap.set(el, { scale:0 })` → `gsap.to(el, { autoAlpha:1, scale:1, duration:0.4, ease:"back.out", delay })`. Delays increment by 0.2s.
  - **Scroll-triggered headings** (`RecentProjects`, `AboutMe`, `Experience`, `Technologies`, `Contact`): CSS `visibility:hidden` on heading elements → `gsap.set()` initial state → `gsap.to()` with `autoAlpha:1` + `scrollTrigger: { trigger: "#section-id", start: "top 80%" }`. Eyebrow at delay 0, h2 at 0.15s, body copy at 0.3s.
  - **Scroll-triggered card grids** (`RecentProjects`, `Experience`, `Technologies`, `Contact`): `gsap.set(".card", { scale:0, autoAlpha:0 })` + `ScrollTrigger.batch(".card", { start:"top 95%", onEnter: batch => gsap.to(batch, { autoAlpha:1, scale:1, stagger:0.07 }) })`. **Never use `gsap.from` + stagger + a single ScrollTrigger for grids** — if the trigger misfires, all elements stay permanently invisible.
  - **Project detail** (`ProjectPage`): header (eyebrow/title/techs/meta/ctas) uses the on-load pattern; body sections (description, architecture, challenges, outcomes) carry a `data-reveal` attribute and are revealed with one generic `gsap.utils.toArray("[data-reveal]")` loop.

### Reusable UI patterns

```html
<!-- Eyebrow label (above every section h2) -->
<p class="text-xs font-semibold tracking-widest text-[#2d5d54] uppercase mb-2
            "
  >— LABEL</p>

<!-- Tech pill -->
<span class="bg-[#2d5d54]/8 text-[#2d5d54] text-xs px-2 py-0.5 rounded-full font-medium">
  Tech
</span>
```

## Adding Content

**New project** — add entry to `src/data/allProjects.ts`:
- Required: `title`, `shortDescription`, `longDescription`, `role`, `image`, `liveLink`, `technologies[]`, `keywords[]`
- Optional: `status` (badge on the card, e.g. "En desarrollo · próximo a producción"), `ctaLabel` (defaults to "Visitar proyecto"; use e.g. "Ver demo"), `repoLink`, `repoPrivate` (renders a non-link "Código privado" badge), `architecture[]`, `challenges[]` (`{ title, description }`), `outcomes[]`
- `ProjectPage.astro` renders Arquitectura / Retos y decisiones / Resultados sections only when those arrays are non-empty.
- Image: import from `src/assets/img/` (Astro optimizes to WebP)
- URL slug is auto-generated from `title` (spaces/dots → hyphens, lowercase)

**New experience** — add entry to `src/data/experience.ts` (`ExperienceItem`): `role`, `organization`, `period`, and optional `employmentType`, `location`, `modality`, plus `bullets[]`. Rendered in the `Experience` section; keep reverse-chronological order.

**New technology** — add an item (`name` + inline SVG `icon`) inside the correct group of `src/data/technologies.ts` (`technologyGroups`), rendered by `Technologies.astro` with a subtitle per group.
- Groups: **Backend** (Java, Spring Boot) · **Bases de datos** (PostgreSQL) · **Infra & DevOps** (Docker, Linux) · **Frontend** (Angular, TypeScript, JavaScript) · **Fundamentos web** (HTML, CSS) · **Tooling** (Astro).
- Icons are colorized brand SVGs. Prefer `https://cdn.simpleicons.org/<slug>` (returns a colored `<svg>`). `processIcon` strips `<?xml>`, comments and `<title>`, adds `class="w-12 h-12"` + `aria-hidden`, and removes `width`/`height`.
- Custom SVGs often carry whitespace around the artwork. Fix by computing the real bounding box from the polygon/path coordinates and setting `viewBox="minX minY width height"` to crop tightly.
- To colorize a monochrome SVG: add a `<linearGradient>` inside `<defs>` and apply `fill="url(#id)"` to the root `<g>`. Use brand colors — `processIcon` preserves internal SVG content (other than the title) untouched.

## Analytics

Google Analytics 4 (`G-G40F72XVS0`) is injected as the first element in `<head>` inside `Layout.astro` as an inline script (`is:inline`, so Astro leaves it unbundled and it runs early). Active since 2026-03-23.

## SEO / Compartición

- `Layout.astro` emits Open Graph + Twitter Card tags on every page. `ogImage` is an optional prop (defaults to `/og-image.png`, resolved against `Astro.site`).
- `public/og-image.png` (1200×630) is generated by `scripts/generate-og-image.mjs` (`node scripts/generate-og-image.mjs`). Regenerate it when the name/role/stack on the card changes.
- `public/robots.txt` points to the Astro sitemap (`sitemap-index.xml`).
- A JSON-LD `Person` schema is injected in `<head>`; update `knowsAbout` / `sameAs` when the profile changes.

## Legal

`/aviso-de-privacidad` — LFPDPPP-compliant privacy notice (persona física, Los Mochis Sinaloa). Update `lastUpdated` + sections II, III, V, VII whenever GA config or third-party services change.

## Pages

- `/` — Home (Intro, RecentProjects, AboutMe, Experience, Technologies, Contact)
- `/projects/[slug]` — Project detail (auto-generated from `allProjects.ts`)
- `/links` — Linktree-style page: avatar, badge, stacked link cards (Portfolio, LinkedIn, GitHub, Instagram, Email). No NavBar, uses Layout.astro. Link cards: primary teal for portfolio, glass `bg-white/80 backdrop-blur` for social links.
- `/aviso-de-privacidad` — LFPDPPP privacy notice
- `/404` — Not found

## Gotchas

- **Astro `Image` sizing**: always pass an explicit `width` prop — without it Astro generates the WebP at full source resolution. Card images use `width={800}` (covers 2× retina at 620 px tablet); project detail uses `width={900}` (matches `max-w-4xl`). Source images live at 1600 px wide. Avoid `inferSize` for layout-controlled images: it injects inline `width`/`height` that fights CSS height. Fix when needed: `relative` on wrapper + `absolute inset-0 w-full h-full object-cover` on the image.
- **Hero badges**: both pills (role + open-to-work) live inside `#intro-badges` wrapper — GSAP and `visibility:hidden` target the wrapper, not individual pills. Responsive sizing: `text-sm px-4` default → `text-xs tracking-normal px-3` at ≤440 px → `px-2.5` at ≤382 px.
- **Hero animation sequence**: avatar → badges → h1 → lead (`#intro-lead`) → stack line (`#intro-stack`) → social links → CTAs. Last CTA fires at 1s total (`delay: 1`) — don't push further, CTAs must appear fast. Animate `#intro-lead`/`#intro-stack` by id, not `#intro p` (that would also catch the stack line).
- **`prefers-reduced-motion`** is handled in `Layout.astro` via a module script that sets `gsap.globalTimeline.timeScale(500)` when the user prefers reduced motion — all entrance animations fast-forward to their final state before the first rAF, so content never stays invisible and no motion is perceived. The same script also calls `ScrollTrigger.refresh()` on `document.fonts.ready` + window `load` (Google Fonts shifts layout and can desync trigger positions).
- Scroll restoration is disabled on page load (`history.scrollRestoration = 'manual'`), set in `Layout.astro`.
- **CSS hover transforms on GSAP-entranced cards**: never put a `transform` transition on an element GSAP animates with `scale` (the CSS transition fights the tween → lag/stutter). Instead: keep the base rule transform-free, add a `.card-ready` class from the batch `onComplete` (`clearProps: "transform"` + `el.classList.add("card-ready")`) and gate the hover transform behind `.card-project.card-ready:hover` / `.contact-card.card-ready:hover` / `.exp-card.card-ready:hover`. See `RecentProjects.astro`/`ProjectCard.astro`, `Contact.astro` and `Experience.astro`.
- **Avoid `transition-all`**: it makes CSS transition every inline change (including GSAP-driven transforms/opacity), causing rubber-banding. Use scoped utilities — `transition-colors` for color/fill/border, Tailwind default `transition` for bg+shadow+transform, `transition-[box-shadow,border-color]` for card hovers.
- **Footer nav smooth scroll** — links use `data-scroll="<section-id>"` + a script in `Footer.astro`. "Inicio" scrolls to `top: 0`; others use `offsetTop`. The `href` fallback handles cross-page navigation (e.g. from `/aviso-de-privacidad`).
- **Navbar (`NavBar.astro`) — desktop pill + mobile dropdown**: links come from a single `links[]` array rendered twice (desktop `#links-container`, mobile `#mobile-menu`), so add a section in one place only. Breakpoint is 660 px (`min-[660px]` / `max-[660px]`). Rules:
  - Entrance animation targets `#links-container .lb` only — never all `.lb`, or the mobile links stay stuck at `scale: 0`.
  - Desktop links have no fixed width (they size to content) so 5+ links fit between 660–976 px; do not reintroduce `w-34`-style fixed widths.
  - Active state uses `[data-nav-link]` (one desktop + one mobile link per section); the IntersectionObserver marks the **visible** link via `offsetParent`, and click handling is bound to `a[data-target]`.
  - The mobile toggle manages `aria-expanded`/`aria-controls`, closes on `Escape` (returning focus to the button), on outside click and on resize to desktop; the icon morphs via `.menu-toggle[aria-expanded="true"] .menu-bar`.
  - A `<noscript>` block reveals `#links-container` and hides `#mobile-bar` so navigation works without JS.
  - New homepage section anchors must be added to the `scroll-margin-top: var(--nav-height)` selector in `global.css`; `--nav-height` is set by the NavBar script.
- **Repo docs (root)**: `AUDITORIA.md` (employability audit: blockers, content, code findings) and `PLAN-REACTIVACION.md` (study/refresh plan). `README.md` still carries the old SME/freelance positioning and is pending a rewrite.
