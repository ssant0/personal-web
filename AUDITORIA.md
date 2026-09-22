# Auditoría — Funcionamiento y Accesibilidad

> Documento de trabajo. Contiene el resultado de una auditoría estática de código
> (revisión manual de componentes, sin ejecutar Lighthouse/axe). Cada hallazgo tiene
> severidad, ubicación exacta, impacto y una corrección sugerida para abordarlo después.
>
> Los hallazgos ya corregidos se han retirado de este documento; aquí solo quedan los
> pendientes.

---

## Bloque de contexto

**Proyecto:** Portafolio personal de Manuel Samaniego (`personal-web`).
**Stack:** Astro 6 (`output: 'static'`) + Tailwind CSS 4 + GSAP 3 + `@astrojs/sitemap`.
**Deploy:** estático, dominio `https://www.manuelsamaniego.com.mx/`.

### Comandos

```bash
npm run dev      # Dev server (--host, accesible en red)
npm run build    # Build de producción → dist/
npm run preview  # Preview del build
```

No hay script de lint ni de tests automatizados. Para verificar cambios: `npm run build`
(compila y detecta errores de TypeScript/Astro) y prueba manual en `npm run dev`.

### Páginas

| Ruta | Layout/landmark | Notas |
|------|-----------------|-------|
| `/` | `NavBar` + `<main>` | Intro, RecentProjects, AboutMe, Technologies, Contact |
| `/projects/[slug]` | `<main>`, sin NavBar | `ProjectPage.astro` |
| `/links` | `<main>`, sin NavBar | linktree, tarjetas animadas |
| `/aviso-de-privacidad` | `<main>`, sin NavBar | 8 secciones legales animadas |
| `/404` | `<main>` | `NotFound.astro` |

### Patrón de animación (clave para entender los bugs)

El sitio usa un patrón anti-FOUC: cada elemento animado arranca con `visibility: hidden`
en CSS cuando `<html>` tiene la clase `js` (añadida por un script inline), luego GSAP hace
`gsap.set()` del estado inicial y `gsap.to({ autoAlpha: 1 })`. Sin JS, la clase no existe y
el contenido permanece visible. Ver AGENTS.md para el detalle del patrón (above-fold,
scroll-triggered headings, card grids con `ScrollTrigger.batch`, `prefers-reduced-motion`
vía `gsap.globalTimeline.timeScale(500)`).

### Severidades

- **Crítico** — rompe la experiencia para un grupo de usuarios o deja contenido inaccesible.
- **Alto** — violación WCAG AA clara (contraste, landmarks, headings, skip link).
- **Medio** — degradación funcional o de UX con workaround.
- **Bajo** — pulido, semántica o best practice.

### Estado

Sin hallazgos pendientes.

---

## Verificación manual sugerida

1. `npm run build` sin errores.
2. Navegar todo con teclado (Tab/Shift+Tab/Enter/Espacio) → skip link, foco visible,
   overlay de proyecto con focus.
3. Lighthouse / axe en `/`, `/links`, `/projects/klyn-com-mx`, `/aviso-de-privacidad`,
   `/404`.
4. Zoom al 200% y viewport móvil → layout y scroll.
5. `prefers-reduced-motion: reduce` → contenido visible sin animación.
6. Desactivar JS en el navegador → revisar las 5 páginas.
