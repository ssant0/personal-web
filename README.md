# Manuel Samaniego — Portafolio

Portafolio personal de **Manuel Samaniego**, ingeniero full stack con foco en backend (Java / Spring Boot). Sitio estático construido con Astro 6 y Tailwind CSS 4, con animaciones GSAP y despliegue en Cloudflare Pages.

[![Astro](https://img.shields.io/badge/Astro-6.x-BC52EE?logo=astro&logoColor=white)](https://astro.build/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed_on-Cloudflare_Pages-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

**Sitio en vivo: [www.manuelsamaniego.com.mx](https://www.manuelsamaniego.com.mx)**

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Stack](#stack)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Scripts](#scripts)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Agregar contenido](#agregar-contenido)
- [Documentación](#documentación)
- [Contacto](#contacto)

---

## Descripción

Sitio personal orientado a procesos de contratación técnica. Presenta mi perfil de ingeniería (backend Java/Spring, bases de datos relacionales e infraestructura), el detalle de mis proyectos (arquitectura, retos y resultados), mi trayectoria y mi stack.

Incluye animaciones de scroll con GSAP, páginas de detalle de proyecto autogeneradas, una página de enlaces estilo Linktree y un aviso de privacidad conforme a la LFPDPPP.

---

## Stack

- **Framework:** [Astro 6](https://astro.build/) — generación de sitio estático (SSG), cero JS por defecto
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) — vía el plugin `@tailwindcss/vite`
- **Animaciones:** [GSAP 3](https://gsap.com/) — animaciones de entrada y de scroll
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Imágenes:** [Sharp](https://sharp.pixelplumbing.com/) — conversión automática a WebP
- **Sitemap:** [`@astrojs/sitemap`](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- **Despliegue:** [Cloudflare Pages](https://pages.cloudflare.com/)

---

## Requisitos

| Herramienta | Versión |
|---|---|
| Node.js | `>= 20.x` |
| npm | `>= 10.x` |

---

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/ssant0/personal-web.git
   cd personal-web
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Levanta el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

Abre [http://localhost:4321](http://localhost:4321) en el navegador.

> **Nota:** el servidor de desarrollo arranca con `--host`, por lo que también es accesible desde otros dispositivos de la red local.

---

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (accesible en la red) |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Previsualiza el build de producción |

---

## Estructura del proyecto

```
src/
  layouts/       # Layout.astro — shell HTML, fuentes, GA4, footer
  pages/         # index, projects/[project], 404, aviso-de-privacidad, links
  views/
    home/
      sections/  # Intro, RecentProjects, AboutMe, Experience, Technologies
      components/ # ProjectCard
    projects/    # ProjectPage (case study de proyecto)
    shared/      # NavBar, Contact, Footer
  data/          # allProjects.ts, experience.ts, technologies.ts, socialLinks.ts
  styles/        # global.css
  types/         # Project.ts
  utils/         # email.ts
public/
  css/           # fonts.css
```

---

## Agregar contenido

### Nuevo proyecto

Agrega una entrada en `src/data/allProjects.ts`. Campos requeridos: `title`, `shortDescription`, `longDescription`, `role`, `image`, `liveLink`, `technologies[]`, `keywords[]`. Campos opcionales: `status`, `ctaLabel`, `repoLink`, `repoPrivate`, `architecture[]`, `challenges[]`, `outcomes[]`.

La página de detalle (`ProjectPage.astro`) renderiza las secciones de **Arquitectura**, **Retos y decisiones** y **Resultados** solo cuando esos arrays tienen contenido. El slug de la URL se genera automáticamente a partir del `title`.

### Nueva experiencia

Agrega una entrada en `src/data/experience.ts` (`ExperienceItem`): `role`, `organization`, `period` y, opcionalmente, `employmentType`, `location`, `modality`, más `bullets[]`. Mantén el orden cronológico inverso.

### Nueva tecnología

Agrega una entrada dentro del grupo correcto en `src/data/technologies.ts` (Backend · Bases de datos · Infra & DevOps · Frontend · Fundamentos web · Tooling), con `name` e `icon` SVG.

---

## Documentación

- `AGENTS.md` — guía de arquitectura, sistema de diseño, patrones de animación y convenciones del proyecto.
- `AUDITORIA.md` — auditoría de empleabilidad (hallazgos y estado de ejecución).
- `PLAN-REACTIVACION.md` — plan de estudio y repaso técnico.

---

## Contacto

- **LinkedIn:** [Manuel Samaniego](https://www.linkedin.com/in/manuel-samaniego/)
- **GitHub:** [ssant0](https://github.com/ssant0)
- **Email:** [contacto@manuelsamaniego.com.mx](mailto:contacto@manuelsamaniego.com.mx)
