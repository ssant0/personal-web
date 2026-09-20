# Auditoría — Funcionamiento y Accesibilidad

> Documento de trabajo. Contiene el resultado de una auditoría estática de código
> (revisión manual de componentes, sin ejecutar Lighthouse/axe). Cada hallazgo tiene
> severidad, ubicación exacta, impacto y una corrección sugerida para abordarlo después.

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
| `/projects/[slug]` | **sin `<main>`** | `ProjectPage.astro`, sin NavBar |
| `/links` | `<main>`, sin NavBar | linktree, tarjetas animadas |
| `/aviso-de-privacidad` | `<main>`, sin NavBar | 8 secciones legales animadas |
| `/404` | **sin `<main>`** | `NotFound.astro` |

### Patrón de animación (clave para entender los bugs)

El sitio usa un patrón anti-FOUC: cada elemento animado arranca con `visibility: hidden`
en CSS, luego GSAP hace `gsap.set()` del estado inicial y `gsap.to({ autoAlpha: 1 })`.
Esto **depende por completo de JavaScript** para mostrar contenido. Ver AGENTS.md para
el detalle del patrón (above-fold, scroll-triggered headings, card grids con
`ScrollTrigger.batch`, `prefers-reduced-motion` vía `gsap.globalTimeline.timeScale(500)`).

### Severidades

- **Crítico** — rompe la experiencia para un grupo de usuarios o deja contenido inaccesible.
- **Alto** — violación WCAG AA clara (contraste, landmarks, headings, skip link).
- **Medio** — degradación funcional o de UX con workaround.
- **Bajo** — pulido, semántica o best practice.

### Estado

- [ ] Sin corregir
- [x] Corregido

---

## Críticos

### C1 — Sitio en blanco sin JavaScript
**Estado:** [ ]
**Archivos:** `Intro.astro:140-148`, `NavBar.astro:120-123`, `AboutMe.astro:39-43`,
`RecentProjects.astro:42-46`, `Technologies.astro:43-47`, `Contact.astro:112-117`,
`ProjectPage.astro:161-169`, `links.astro:202-210`, `aviso-de-privacidad.astro:234-243`.

Todo el contenido animado está en `visibility: hidden` y solo GSAP lo revela. Si el JS
no carga, se bloquea (adblocker, error de red) o el usuario lo desactiva, la página queda
vacía. No hay fallback `<noscript>`.

**Corrección sugerida:** añadir una clase `js` al `<html>` desde un script inline temprano
en `Layout.astro` y condicionar el `visibility: hidden` a `.js .elemento`. Alternativa:
`<noscript><style> ...visibility: visible !important </style></noscript>`. Verificar que
el contenido sea visible y usable con JS desactivado en las 5 páginas.

### C2 — Enlaces de email `href=""` dependen de JS
**Estado:** [x] (intencional — no se corrige)
**Archivos:** `Intro.astro:64,110`, `Contact.astro:91-105`, `Footer.astro:102`,
`links.astro:168`, `aviso-de-privacidad.astro:55,105,126,178`.

`hydrateEmail()` (`src/utils/email.ts`) rellena `href` y `textContent` después de cargar.
Sin JS, los enlaces de email recargan la propia página y los textos `data-email-text`
quedan vacíos. Caso más grave: el aviso legal dice "envía un correo a: [vacío]" y
"escribiendo a [vacío]" — el documento queda incompleto.

**Corrección sugerida:** renderizar el email en build (Astro) en lugar de depender de JS,
o al menos un fallback de texto. Si se mantiene la ofuscación, añadir `<noscript>` con el
correo o un texto alternativo.

**Decisión:** el `href` vacío + hidratación vía `hydrateEmail()` es **intencional**. Ofusca
el correo en el HTML estático para evitar el spam de bots: solo quienes ejecutan JS (personas
reales) ven y usan el correo. No se corrige; el costo de accesibilidad sin JS se acepta a
cambio de proteger el buzón.

---

## Accesibilidad (WCAG)

### A1 — Contraste insuficiente (WCAG 1.4.3, AA)
**Estado:** [x]
**Archivos:**
- `text-gray-400` (#9ca3af) sobre fondo claro (~2.3–2.6:1, requiere 4.5:1):
  `ProjectPage.astro:23`, `aviso-de-privacidad.astro:19-20,37`, `links.astro:81,106,131,156,180,193`.
- `text-gray-500` 12px "Aviso de Privacidad" sobre `#202020` (~3.3:1): `Footer.astro:119-121`.
- Bio de `/links` (`text-gray-500`, 14px) ~4.2:1, falla sobre la zona teal del gradiente:
  `links.astro:32`.

**Corrección sugerida:** subir a `text-gray-600`/`text-gray-500` según el fondo y verificar
con un checker de contraste. Para el footer oscuro, usar un gris más claro (`text-gray-400`).

**Corrección aplicada:** `text-gray-400` → `text-gray-600` sobre fondos claros
(`ProjectPage.astro:23`, `aviso-de-privacidad.astro:20,37`, `links.astro:81,106,131,156,180,193`);
bio de `/links` `text-gray-500` → `text-gray-600` (`links.astro:32`); "Aviso de Privacidad"
del footer `text-gray-500` → `text-gray-400` sobre `#202020` (`Footer.astro:122`).

### A2 — Sin skip link (WCAG 2.4.1)
**Estado:** [ ]
**Archivo:** `Layout.astro` (no existe).

Los usuarios de teclado deben atravesar los 4 botones del nav en cada página.

**Corrección sugerida:** añadir como primer elemento del `<body>` un
`<a href="#main" class="sr-only focus:not-sr-only ...">Saltar al contenido</a>` y dar
`id="main"` al `<main>` (incluyendo las páginas que hoy no lo tienen, ver A3).

### A3 — Falta landmark `<main>` en proyectos y 404
**Estado:** [x]
**Archivos:** `views/projects/ProjectPage.astro`, `views/404/NotFound.astro`.

`/`, `/links` y `/aviso-de-privacidad` sí tienen `<main>`. Las páginas de proyecto y el 404
no, por lo que no hay landmark de contenido principal (regla axe `landmark-one-main`).

**Corrección aplicada:** el contenedor raíz de `ProjectPage.astro` y `NotFound.astro`
ahora es `<main>` (mismas clases, sin cambios visuales). Verificado: una sola landmark
`<main>` por página en el build.

### A4 — Jerarquía de headings con saltos (heading-order)
**Estado:** [x]
**Archivo:** `Footer.astro:13,34,43`.

En `/links` y `/404` el footer usa `<h3>` sin que exista un `<h2>` en la página (h1 → h3).
En `/`, `/projects` y `/aviso` no ocurre porque hay h2 previos.

**Corrección aplicada:** `<h2 class="sr-only">Pie de página</h2>` al inicio de
`Footer.astro`, de modo que los `<h3>` existentes ya no saltan desde el `h1`.
Pendiente evaluar `ProjectCard.astro:39` (títulos de tarjeta como `h2`, ver B5).

### A5 — Estado activo del nav solo visual
**Estado:** [ ]
**Archivos:** `NavBar.astro:5,20-47,129-133`.

El link activo se marca solo con clase CSS (color/borde/fondo), sin `aria-current`.
El `<nav>` tampoco tiene `aria-label`.

**Corrección sugerida:** añadir `aria-current="true"` (o `"location"`) al link activo al
cambiar con el observer/click, y `aria-label="Principal"` al `<nav>`.

### A6 — SVGs decorativos sin `aria-hidden`
**Estado:** [x]
**Archivos:** `Technologies.astro:29`, `src/data/technologies.ts:11-18`, íconos sociales
en `Intro.astro`, `Contact.astro`, `Footer.astro`, `links.astro`.

Los íconos decorativos no se ocultan a lectores de pantalla. Algunos SVG inyectados con
`set:html` incluyen `<title>` interno (`spring-icon.svg`, `css.svg` con
`role="img" aria-labelledby`, `html.svg`) y se anuncian como "spring-icon", "CSS Logo",
"file_type_html", duplicando el texto visible.

**Corrección sugerida:** en `processIcon()` añadir `aria-hidden="true" focusable="false"`
al `<svg>`; hacer lo mismo con los íconos sociales que acompañan texto visible.

**Corrección aplicada:** `processIcon()` (`technologies.ts:15`) añade ahora
`aria-hidden="true" focusable="false"` al `<svg>`, lo que oculta también sus `<title>`
internos. Se aplicó el mismo tratamiento a los íconos decorativos de `Intro.astro`,
`Contact.astro`, `Footer.astro`, `links.astro`, `ProjectPage.astro` y
`aviso-de-privacidad.astro`.

### A7 — "404" gigante decorativo
**Estado:** [x]
**Archivo:** `NotFound.astro:8-14`.

Es un `<p>` con `text-[#2d5d54]/10` (contraste ~nulo) que un lector de pantalla lee como
contenido real ("404") justo antes del h1, y fallaría contraste si se trata como texto.

**Corrección aplicada:** `aria-hidden="true"` en el `<p>` (es decorativo).

### A8 — Iniciales del avatar "MS"
**Estado:** [x]
**Archivos:** `Intro.astro:20`, `links.astro:18`.

Texto suelto "MS" leído por SR sin contexto.

**Corrección sugerida:** `aria-hidden="true"` si es puramente decorativo.

**Corrección aplicada:** `aria-hidden="true"` en el `<span>` "MS" de `Intro.astro:20` y
`links.astro:18` (es decorativo).

### A9 — `viewport` sin `initial-scale=1`
**Estado:** [ ]
**Archivo:** `Layout.astro:36`.

`content="width=device-width"` — recomendable `width=device-width, initial-scale=1` para
comportamiento de zoom correcto en móviles.

---

## Funcionales

### B1 — Nav con `<button>` en vez de `<a>`
**Estado:** [ ]
**Archivo:** `NavBar.astro:20-47`.

Sin JS los botones no navegan; no permiten abrir en pestaña nueva, copiar URL ni son
enlaces semánticamente.

**Corrección sugerida:** usar `<a href="#intro">`, `#recent-projects`, `#about`, `#contact`
y hacer `preventDefault()` + scroll suave con JS (progressive enhancement). Añadir
`scroll-margin-top` a las secciones.

### B2 — Scroll que oculta el título tras el nav sticky
**Estado:** [ ]
**Archivos:** `Intro.astro:188-193`, `Footer.astro:133-141`.

Usan `target.offsetTop` sin restar la altura del navbar; el encabezado queda tapado.
`NavBar.astro:108-112` sí resta `navHeight` — comportamiento inconsistente.

**Corrección sugerida:** restar la altura del nav en todos los casos, o mejor, usar
`scroll-margin-top` en las secciones y `element.scrollIntoView({behavior:'smooth'})`.

### B3 — Overlay "Visitar proyecto" solo con `:hover`
**Estado:** [ ]
**Archivo:** `ProjectPage.astro:63-76,180-191`.

El overlay es invisible con teclado (focus) y en dispositivos táctiles. Además duplica el
CTA inferior con el mismo destino y nombre casi idéntico (`aria-label="Visitar X"` en la
imagen + botón "Visitar proyecto").

**Corrección sugerida:** mostrar el overlay con `:focus-visible` en el enlace; considerar
eliminarlo por ser redundante.

### B4 — `target="_blank"` en `mailto:` y `rel` faltante
**Estado:** [x]
**Archivos:** `Intro.astro:64-66,89-109`, `Contact.astro:36-107`, `Footer.astro:101-113`.

`mailto:` con `target="_blank"` abre pestaña vacía + app de correo. Los links sociales de
`Intro` y `Contact` no llevan `rel="noopener noreferrer"` (Footer sí).

**Corrección sugerida:** quitar `target="_blank"` de los `mailto:`; añadir
`rel="noopener noreferrer"` donde falte (aunque los navegadores modernos ya lo implican).

**Corrección aplicada:** se eliminó `target="_blank"` de los `mailto:` de `Intro.astro`,
`Contact.astro` y `Footer.astro`; se añadió `rel="noopener noreferrer"` a los enlaces
sociales de `Intro.astro` y `Contact.astro` que lo omitían.

### B5 — Títulos de tarjetas de proyecto como `<h2>`
**Estado:** [ ]
**Archivo:** `ProjectCard.astro:39`.

Están al mismo nivel que los títulos de sección. Al ser hijos del h2 "Proyectos"
(`RecentProjects.astro:12-18`), deberían ser `h3` para reflejar la estructura real.

**Corrección sugerida:** cambiar a `<h3>`.

### B6 — `IntersectionObserver` con `threshold: 0.5`
**Estado:** [ ]
**Archivo:** `NavBar.astro:79`.

En móvil, secciones muy altas (Technologies/Contact) pueden no alcanzar el 50% visible y
el link activo nunca se resalta.

**Corrección sugerida:** bajar el threshold (p.ej. 0.25) o usar `rootMargin` con múltiples
thresholds.

### B7 — Scroll del navbar no mueve el foco
**Estado:** [ ]
**Archivo:** `NavBar.astro:98-116`.

Al activar un botón del nav, el foco queda en el botón y el SR no anuncia el destino.

**Corrección sugerida:** tras el scroll, mover el foco al heading de la sección destino
con `tabindex="-1"` y `.focus({preventScroll:true})`.

---

## SEO técnico

### S1 — Canonical hardcodeado a la home en todas las páginas
**Estado:** [ ]
**Archivo:** `Layout.astro:44`.

Todas las URLs declaran `https://www.manuelsamaniego.com.mx/` como canónica, incluyendo
proyectos y aviso de privacidad.

**Corrección sugerida:** construir el canonical con `Astro.url`/`Astro.site` (p.ej.
`new URL(Astro.url.pathname, Astro.site)`).

### S2 — Aviso legal menciona un servicio que no se usa
**Estado:** [ ]
**Archivo:** `aviso-de-privacidad.astro:76,151`.

El aviso dice que se carga "Animate.css desde cdnjs.cloudflare.com", pero el sitio usa GSAP
empaquetado (no cdnjs). Texto legal inexacto.

**Corrección sugerida:** actualizar el texto o eliminar la mención a Cloudflare cdnjs.

---

## Verificación manual sugerida

1. `npm run build` sin errores.
2. Desactivar JS en el navegador → revisar las 5 páginas (C1, C2).
3. Navegar todo con teclado (Tab/Shift+Tab/Enter/Espacio) → skip link, foco visible,
   estado activo del nav (A2, A5, B1, B7).
4. Lighthouse / axe en `/`, `/links`, `/projects/klyn-com-mx`, `/aviso-de-privacidad`,
   `/404` → contraste, landmarks, headings (A1, A3, A4, A6).
5. Zoom al 200% y viewport móvil → layout y scroll (A9, B6).
6. `prefers-reduced-motion: reduce` → contenido visible sin animación.
