# Auditoría de Empleabilidad — `personal-web`

**Perfil objetivo:** Ingeniero de Software (backend / full-stack) buscando contratación, no clientes.
**Stack real detectado:** Astro 6 + Tailwind 4 + GSAP 3 + TypeScript, `output: static`. Datos en `src/data/`, vistas en `src/views/`.
**Veredicto general:** el sitio está bien construido a nivel de ingeniería (FOUC controlado, `prefers-reduced-motion`, sitemap, a11y), pero el **posicionamiento y el contenido siguen vendiendo servicios**. Un Technical Sourcer en 5 segundos te lee como "freelance de páginas web", no como ingeniero de software.

---

## Estado de ejecución

> Leyenda: ✅ hecho · 🟡 parcial · ☐ pendiente. Actualizar al cerrar cada punto.

### 🔴 Bloqueadores
- ✅ **1.** Meta description orientada a ingeniería (`index.astro`)
- ✅ **2.** Keywords de ingeniería, sin términos freelance (`index.astro`)
- ✅ **3.** README reescrito en español con posicionamiento de ingeniería
- ✅ **4.** Bio de `/links` reposicionada
- ✅ **5.** Copy de Contacto reposicionado ("— HABLEMOS", orientado a recruiting)
- ☐ **6.** CV en PDF + botón "Descargar CV" _(requiere el PDF del usuario)_
- ✅ **7.** Link de agencia eliminado del Linktree
- ☐ **8.** Open Graph / Twitter Cards
- 🟡 **9.** Repos de flagships (Sorteum añadido con repo privado; Odoo/Moodle sin repo)
- ✅ **10.** Proyectos reordenados por impacto técnico
- 🟡 **11.** Instagram fuera del hero (sigue presente en la sección Contacto)
- ☐ **12.** Evidencia de contenedores/CI/tests _(acción personal — ver `PLAN-REACTIVACION.md`)_
- ☐ **13.** Lockfile único (`package-lock.json` + `pnpm-lock.yaml`)
- ✅ **14.** Slug del README corregido (`personal-web`)

### 🟡 Mejoras de contenido
- ✅ **1.** Hero / propuesta de valor reescrita
- ✅ **2.** Case studies de proyectos (rol, arquitectura, retos, resultados)
- ✅ **3.** Seniority en "Sobre mí" sin antigüedad
- ✅ **4a.** Sección Experiencia
- ✅ **4b.** Skills agrupadas por dominio con subtítulos (Backend · Bases de datos · Infra & DevOps · Frontend · Fundamentos web · Tooling; +Docker y Linux)
- ☐ **4c.** CTA "Descargar CV" persistente
- ☐ **5.** Docker/tests/CI real _(acción personal)_
- ➖ Ejemplos de copy reescrito (referencia, no ejecutable)

### 🟢 Refinamiento de código
- ✅ **ProjectCard** `image: any` → `ImageMetadata`
- ✅ **ProjectPage**: secciones semánticas `<section>` + `data-reveal`
- ☐ Semántica de secciones del home (`<div id>` → `<section aria-labelledby>`)
- ☐ Email con fallback sin JS (`href=""` + hidratación por JS)
- ☐ `ScrollTrigger.registerPlugin` duplicado → helper
- ☐ `<style is:global>` duplicado → `global.css`
- ☐ Metadata de `package.json` (name/version/description/author)
- ☐ ESLint + Prettier + `astro check` + CI
- ☐ Comprimir imágenes fuente (`klyn.png`, `cybercafe10m.png`)
- ☐ `will-change: transform` permanente
- ☐ `og:*` / `twitter:*` / `robots.txt` / JSON-LD `Person`
- ☐ `alt` descriptivos y `keywords[]` de proyectos recortados
- ☐ Mover `AUDITORIA.md` a `/docs` o presentarlo como QA report

---

## 🔴 Bloqueadores Críticos

Elementos comerciales o estructurales a eliminar/corregir ya.

| # | Hallazgo | Ubicación | Acción |
|---|----------|-----------|--------|
| 1 | Meta description vende a pymes: *"especializado en aplicaciones a medida y **sitios web para pymes**"* | `src/pages/index.astro:14` | Reescribir orientado a rol técnico |
| 2 | Keyword stuffing 100% freelance: `freelancer`, `desarrollo para pymes`, `mantenimiento web`, `páginas web personalizadas`, `contactar desarrollador web`… | `src/pages/index.astro:15` | Reemplazar por términos de ingeniería (Java, Spring Boot, PostgreSQL, REST, Linux, Docker, CI/CD) |
| 3 | README dice *"targeting **SME clients**"* y "5 internal systems" | `README.md:3`, `README.md:144` | Reescribir README como repo de ingeniería (es lo primero que abre un reclutador técnico) |
| 4 | Bio de Linktree: *"Creo soluciones web a medida para **pymes y emprendedores**"* | `src/pages/links.astro:33` | Reescribir a propuesta de valor técnica |
| 5 | Copy de agencia en Contacto: eyebrow **"— HAGAMOS ALGO"** y *"cómo podemos colaborar"* | `src/views/shared/Contact.astro:16`, `:28` | Cambiar a "— HABLEMOS" orientado a recruiting |
| 6 | **No existe CV en PDF** en ningún lugar del repo (ni ruta `/cv`). Un reclutador no tiene cómo descargarlo | verificado: 0 archivos PDF | Añadir `/cv` + botón "Descargar CV" en hero y navbar |
| 7 | Link de agencia en posición privilegiada del Linktree | `src/pages/links.astro:64-89` | Eliminar o degradar; manda al reclutador a una agencia, no a tu perfil |
| 8 | **Sin Open Graph / Twitter Cards**: compartir el link en LinkedIn/WhatsApp no genera preview | `src/layouts/Layout.astro:37-47` | Añadir `og:*` + `twitter:*` (imagen 1200×630) |
| 9 | Solo **2 de 6 proyectos** exponen repositorio (`labstudiomedia`, `klyn`); los más técnicos (Odoo ERP, Moodle VPS) no tienen `repoLink` ni detalle | `src/data/allProjects.ts:44,115` | Añadir repos/case studies de los proyectos de infraestructura |
| 10 | El primer proyecto del grid es una web de agencia de marketing, no tu trabajo de mayor ingeniería | `src/data/allProjects.ts:10` | Reordenar por impacto técnico (ERP, Moodle, migración) |
| 11 | Instagram con mismo peso que GitHub/LinkedIn en hero y contacto | `src/views/home/sections/Intro.astro:50`, `Contact.astro:56` | Bajar jerarquía o retirar del hero |
| 12 | Cero mención de **contenedores, CI/CD o testing** en todo el repo (buscado `docker|dockerfile|vitest|jest|playwright|.test.`) | todo el repo | Es el mayor hueco de tu propuesta backend; ver 🟡 |
| 13 | Doble lockfile `package-lock.json` **y** `pnpm-lock.yaml`; los scripts usan `npx astro` pero el README documenta `pnpm` | raíz, `package.json:6-9`, `README.md:52,66` | Elegir un gestor y eliminar el lockfile sobrante |
| 14 | Slug de repo inconsistente: README clona `github.com/ssant0/portfolio` (real: `personal-web`) | `README.md:60` | Corregir |

---

## 🟡 Mejoras de Alto Impacto (Contenido)

### 1. Hero / propuesta de valor — no domina en 5 segundos
Hoy `Intro.astro:26` dice **"Desarrollador Full Stack"** (genérico, sin stack ni especialidad) y `links.astro:23` **"Desarrollador Web"** (aún más vago). El párrafo (`Intro.astro:41-44`) menciona Java/Spring Boot/Angular, pero no menciona **base de datos relacional, Linux/VPS, ni despliegue**. `index.astro:12` incluso te titula *"Desarrollador Web"*.

**Reescribir:** rol específico + 3-4 tecnologías verificables + dominio de producción. Añadir badges de stack en el hero.

### 2. Profundidad de proyectos — hoy son "páginas terminadas"
`ProjectPage.astro:113-120` renderiza **un solo párrafo plano** (`longDescription`). No hay: arquitectura, retos, decisiones de infraestructura, métricas, ni responsabilidades. Tampoco en el modelo de datos: `src/types/Project.ts` solo tiene descripciones largas/cortas.

**Refactor de contenido:** ampliar el tipo `Project` con campos estructurados (`challenge`, `architecture`, `decisions`, `outcomes[]`, `role`) y renderizarlos como secciones. Eso convierte deploy de Odoo/Moodle en evidencia de ingeniería.

### 3. Reposicionar seniority en "Sobre mí"
`AboutMe.astro:18` arranca con *"desarrollador Full Stack **autodidacta con más de un año**"*. Suena junior y a autoformación. El contenido de los proyectos demuestra cosas más fuertes (admin de VPS, PostgreSQL, SSL auto-renovable, SMTP/IMAP, gestión de servidores). **Enfoca en responsabilidad, no en antigüedad.**

### 4. Añadir secciones que un reclutador busca y no existen
- **Experiencia / Trayectoria** (aunque sean proyectos propios, con fechas y responsabilidades).
- **Skills agrupadas por dominio** (Backend / Bases de datos / Infra & DevOps / Frontend), no el grid plano de `Technologies.astro`.
- **CTA "Descargar CV"** persistente.

### 5. Cerrar el hueco backend real (sin mentir)
Tu criterio menciona contenedores, y no hay Docker/CI/tests en el repo. No inventes: **adquiérelo y demuéstralo**. Concretamente, dockeriza el ERP Odoo o el stack Java/Spring, añade un `Dockerfile` + `docker-compose.yml` a un repo, y escribe un test (JUnit/Vitest) + GitHub Actions. Luego cuéntalo en el case study. Eso es lo que separa "hace webs" de "ingeniero backend".

---

### Ejemplos de copy reescrito (orientados a Technical Sourcer)

**Ejemplo A — Hero (`Intro.astro`, párrafo + titulación)**

> *Antes:* "Desarrollador Full Stack con dominio de Java, Spring Boot y Angular. Construyo productos digitales de punta a punta — del API a la interfaz — y estoy disponible para nuevas oportunidades profesionales."

> *Después:*
> **"Ingeniero de Software Full Stack con foco en backend.** Diseño aplicaciones con **Java y Spring Boot** sobre **PostgreSQL** y las llevo a producción en **Linux** — configuración de servidores, HTTPS, correo y despliegue continuo. Frontend con **Angular y TypeScript**. Busco un equipo de producto donde resolver problemas de arquitectura, testing y automatización de despliegues."

**Ejemplo B — Ficha de proyecto ERP Odoo (`allProjects.ts:118-145` + `ProjectPage.astro`)**

> *Antes (párrafo plano):* "Despliegue e implementación de ERP Odoo 19 Community para Klyn en servidor VPS Ubuntu en DigitalOcean. Instalé mediante paquete .deb oficial, configuré PostgreSQL…"

> *Después (estructura de case study técnico):*
> **Rol:** Administrador de infraestructura y despliegue (end-to-end).
> **Arquitectura:** Odoo 19 Community sobre Ubuntu 22.04 (VPS DigitalOcean) → PostgreSQL 15 → Nginx/reverse proxy → Let's Encrypt (Certbot). Correo corporativo vía SMTP/IMAP con plantillas propias.
> **Retos y decisiones:** (1) Elegí instalación por `.deb` oficial sobre Docker para facilitar actualizaciones de seguridad del host; (2) ajusté los módulos de Inventario y Facturación a los flujos reales del negocio; (3) automaticé renovación de TLS y parcheo del sistema para eliminar mantenimiento manual.
> **Resultado:** ERP en producción que reemplazó procesos manuales de ventas, inventario y facturación, con disponibilidad continua y HTTPS auto-renovable.

---

## 🟢 Refinamiento de Código

Observaciones de meta-análisis — lo que un ingeniero verá al inspeccionar el repo.

**Type-safety**
- `ProjectCard.astro:7` tipa `image: any`, mientras el modelo ya usa `ImageMetadata` (`src/types/Project.ts:8`). `any` en un portafolio resta credibilidad. Usa el tipo compartido.
- `Project` se importa como `{type Project}` en `[project].astro:6` y `[project].astro:9` anota `(project: Project)`. Correcto, pero el modelo y el `Props` de `ProjectCard` están desalineados.

**Entrega / tooling**
- No hay `lint`, `format`, `test`, `astro check` ni CI. `package.json:5-10` solo tiene dev/build/preview. Para un portafolio de ingeniería, añadir **ESLint + Prettier + `astro check`** y un workflow de **GitHub Actions** es un diferenciador directo.
- `package.json:2-3`: `name: "astro-latest"`, `version: "0.0.1"`, sin `description`/`author`/`repository`. Parece una plantilla sin personalizar. Renómbralo (ej. `portfolio`), sube a `1.0.0` y añade metadata.

**Accesibilidad / resiliencia**
- El email se rellena solo por JS: `src/utils/email.ts` y `href=""` en `Intro.astro:111`, `Contact.astro:95`, `Footer.astro:109`. **Sin JavaScript los enlaces de correo quedan vacíos** (`mailto:` en blanco). El patrón de ofuscación base64 (`socialLinks.ts:5`) es reversible y no aporta seguridad real. Añade un fallback `<noscript>` o genera el `mailto:` en build.
- La obfusación también es inconsistente: el email aparece en texto plano en `aviso-de-privacidad.astro:55,102` y `README.md:159`.

**Semántica**
- Las secciones de home son `<div id="...">` en lugar de `<section aria-labelledby="...">` (`Intro.astro:5`, `RecentProjects.astro:6`, etc.). `ProjectCard` es un `<div>` con un `<h3>`; debería ser `<article>`. Mejora el árbol de landmarks para lectores de pantalla y para quien lee el HTML.
- Numeración de headings correcta (un solo `<h1>` en home); buen trabajo.

**Organización / duplicación**
- `ScrollTrigger.registerPlugin` y la lógica de triggers se repiten en 5 componentes (`RecentProjects`, `Technologies`, `Contact`, `ProjectPage`, `aviso`). Extraíble a un helper para DRY.
- `<style is:global>` con `body { display:flex } body > :first-child { flex:1 }` está duplicado en `ProjectPage.astro:205-215` y `aviso-de-privacidad.astro:212-221`. Centralizar en `global.css`.
- `AUDITORIA.md` es evidencia positiva de rigor, pero está redactado como doc de trabajo interno ("Sin hallazgos pendientes", "documento de trabajo"). Muévelo a `/docs` y preséntalo como "QA report" — o elimínalo de la raíz.

**Performance / assets**
- Imágenes fuente pesadas: `klyn.png` 616 KB, `cybercafe10m.png` 552 KB (`src/assets/img/`). Astro las optimiza a WebP en build, pero el repo pesa ~1.7 MB en PNG. Comprímelas.
- `will-change: transform` fijado permanentemente en muchos elementos (`Intro.astro:150`, `ProjectCard.astro:68`, `Contact.astro:131`, `Technologies.astro:50`, `link-card`). GSAP ya gestiona compositing; dejarlo permanentes consume memoria. Aplícalo solo durante la animación.

**SEO / compartición**
- Faltan `og:*`, `twitter:*`, `og:locale`, `robots.txt` y JSON-LD `Person` (schema.org) — sin esto, tu perfil no se enriquece en buscadores ni al compartirlo.
- Los `alt` de imágenes de proyecto son genéricos ("Imagen del proyecto: X", `ProjectCard.astro:31`); descríbelos con contenido real.
- Los arrays `keywords` por proyecto (`allProjects.ts:27-43`, etc.) están inflados con términos comerciales ("Agencia", "Diseño Web", "Marketing Digital"). Redúcelos a tecnología.

---

### Prioridad sugerida (orden de ejecución)
1. **CV en PDF + botón "Descargar CV"** (bloqueador #6) — sin esto pierdes conversiones de reclutador.
2. **Reescritura de hero + metadatos + Contacto** (bloqueadores 1-5).
3. **Open Graph + case studies estructurados** (bloqueadores 7-11, 🟡2).
4. **Añadir evidencia backend real (Docker/tests/CI) + sección Experiencia** (🟡5, 🟢 tooling).
5. **Refinamiento de código** (tipos, semántica, lockfiles).
