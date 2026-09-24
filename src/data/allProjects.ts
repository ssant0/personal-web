import sorteum from "../assets/img/sorteum-app.png";
import klyn from "../assets/img/klyn.png";
import klynErp from "../assets/img/erp-klyn.png";
import labstudiomedia from "../assets/img/labstudiomedia.png";
import cocinasmodulares from "../assets/img/cocinasmodulares.png";
import cybercafe10m from "../assets/img/cybercafe10m.png";
import cuciiOnline from "../assets/img/cucii-online.png";
import type {Project} from "../types/Project";

export const allProjects: Project[] = [
	{
		title: "Sorteum.app",
		shortDescription:
			"Plataforma SaaS para crear y administrar rifas con marca propia. API-first en Java + Spring Boot, autenticación stateless con JWT y frontend SSR.",
		longDescription:
			"Sorteum es una plataforma SaaS que permite a negocios crear, publicar y administrar rifas con su propia marca (white-label). Desarrollé la arquitectura completa de principio a fin: una API contract-first definida con OpenAPI 3.1, autenticación stateless con JWT (HS256) transportado por header o cookie HttpOnly, y errores estandarizados bajo RFC 9457 (Problem Details). El frontend usa SSR híbrido con middleware de autorización por roles. Actualmente se encuentra en etapa previa a su salida a producción, pendiente de despliegue.",
		role: "Arquitectura y desarrollo full stack (end-to-end)",
		status: "En desarrollo · próximo a producción",
		image: sorteum,
		liveLink: "https://jackpot-7st.pages.dev/",
		ctaLabel: "Ver demo",
		repoPrivate: true,
		technologies: ["Java", "Spring Boot", "PostgreSQL", "JWT", "OpenAPI", "Astro", "Docker", "Caddy"],
		architecture: [
			"API-first / contract-first, con contrato OpenAPI 3.1 como fuente de verdad.",
			"Autenticación stateless con JWT HS256 y doble transporte: header Authorization o cookie HttpOnly.",
			"Errores estandarizados según RFC 9457 (Problem Details).",
			"SSR híbrido con middleware de autorización por roles.",
			"Backend Java + Spring Boot + PostgreSQL; frontend con Astro; despliegue con Docker sobre VPS (DigitalOcean) detrás de Caddy.",
		],
		challenges: [
			{
				title: "Autenticación sin estado y segura",
				description:
					"Diseñé un esquema JWT que sirve tanto a clientes de API como al navegador, aceptando el token por header o por cookie HttpOnly para reducir la exposición a XSS.",
			},
			{
				title: "Contrato antes que código",
				description:
					"Definir la API con OpenAPI 3.1 primero permitió mantener frontend y backend sincronizados y validar los endpoints contra un contrato explícito.",
			},
			{
				title: "Respuestas de error consistentes",
				description:
					"Adoptar RFC 9457 unificó el formato de errores de toda la API, simplificando el manejo en el cliente.",
			},
		],
		outcomes: [
			"Plataforma funcional y accesible en demo (versión previa a producción).",
			"Base de código contract-first preparada para generar clientes y SDKs desde OpenAPI.",
		],
		keywords: [
			"Java",
			"Spring Boot",
			"PostgreSQL",
			"JWT",
			"Spring Security",
			"OpenAPI",
			"RFC 9457",
			"API REST",
			"SSR",
			"Docker",
			"DigitalOcean",
			"SaaS",
			"Full-stack",
		],
	},
	{
		title: "erp.klyn.com.mx",
		shortDescription:
			"ERP Odoo 19 Community en VPS Ubuntu (DigitalOcean) con módulos de Ventas, Inventario, Facturación y Contactos, integración SMTP/IMAP y SSL automático.",
		longDescription:
			"Despliegue e implementación de ERP Odoo 19 Community para Klyn sobre un servidor VPS Ubuntu en DigitalOcean. Instalé mediante el paquete .deb oficial, configuré PostgreSQL y ajusté los módulos de Ventas, Inventario, Facturación y Contactos a los procesos reales del negocio. Integré el correo corporativo con configuración SMTP/IMAP y plantillas de mail personalizadas para comunicaciones profesionales. El servidor opera con actualizaciones de seguridad automáticas y HTTPS mediante Certbot auto-renovable.",
		role: "Administración de infraestructura y despliegue (end-to-end)",
		image: klynErp,
		liveLink: "https://erp.klyn.com.mx/",
		technologies: ["Odoo 19", "PostgreSQL", "Ubuntu", "DigitalOcean", "Let's Encrypt", "SSH"],
		architecture: [
			"Odoo 19 Community sobre Ubuntu (VPS en DigitalOcean).",
			"PostgreSQL como base de datos del ERP.",
			"Módulos de Ventas, Inventario, Facturación y Contactos configurados al negocio.",
			"HTTPS con Let's Encrypt y renovación automática vía Certbot.",
			"Correo corporativo SMTP/IMAP con plantillas personalizadas.",
		],
		challenges: [
			{
				title: "Adaptar el ERP al negocio",
				description:
					"Configuré los módulos de Ventas, Inventario, Facturación y Contactos para reflejar los flujos operativos reales de la empresa.",
			},
			{
				title: "Operación segura y sin mantenimiento manual",
				description:
					"Habilité actualizaciones de seguridad automáticas y certificados TLS auto-renovables para mantener el servidor al día sin intervención constante.",
			},
			{
				title: "Comunicación profesional",
				description:
					"Integré correo corporativo por SMTP/IMAP con plantillas de correo propias.",
			},
		],
		outcomes: [
			"ERP en producción que centraliza ventas, inventario y facturación.",
			"HTTPS auto-renovable y parcheo automático del servidor.",
		],
		keywords: [
			"Odoo",
			"ERP",
			"PostgreSQL",
			"VPS",
			"Ubuntu",
			"Let's Encrypt",
			"SSH",
			"SMTP",
			"IMAP",
			"Linux",
			"DevOps",
			"DigitalOcean",
		],
	},
	{
		title: "cucii.online",
		shortDescription:
			"Plataforma LMS Moodle desplegada en VPS Ubuntu con Apache, SSL auto-renovable y mantenimiento continuo vía SSH.",
		longDescription:
			"Despliegue completo de una plataforma educativa LMS Moodle. Configuré un servidor VPS Ubuntu con Apache, implementé seguridad SSL con Let's Encrypt y scripts de auto-renovación, y administro el mantenimiento continuo vía SSH. Una solución integral que da servicio a la comunidad estudiantil con foco en disponibilidad y seguridad.",
		role: "Administración de sistemas y despliegue",
		image: cuciiOnline,
		liveLink: "https://aula.cucii.mx/",
		technologies: ["Moodle", "Ubuntu", "Apache", "Let's Encrypt", "SSH"],
		architecture: [
			"Moodle LMS sobre servidor VPS Ubuntu con Apache.",
			"HTTPS con Let's Encrypt y scripts de auto-renovación.",
			"Administración y mantenimiento continuo vía SSH.",
		],
		challenges: [
			{
				title: "Puesta en marcha de un LMS",
				description:
					"Desplegué y configuré Moodle para centralizar el acceso de estudiantes y docentes a la plataforma educativa.",
			},
			{
				title: "Operación continua",
				description:
					"Mantengo el servidor vía SSH con SSL auto-renovable y actualizaciones para asegurar disponibilidad.",
			},
		],
		outcomes: [
			"Plataforma educativa en producción con disponibilidad continua.",
			"Infraestructura con HTTPS auto-renovable y mantenimiento remoto.",
		],
		keywords: [
			"Moodle",
			"LMS",
			"VPS",
			"Ubuntu",
			"Apache",
			"SSL",
			"Let's Encrypt",
			"SSH",
			"Linux",
			"DevOps",
		],
	},
	{
		title: "klyn.com.mx",
		shortDescription:
			"Sitio corporativo para proveedor de suministros desarrollado con Astro + Bootstrap 5, desplegado en Cloudflare Pages con analytics avanzado (GA4, Facebook Pixel, GTM).",
		longDescription:
			"Sitio web completo para Klyn, empresa proveedora de suministros de limpieza, oficina y papelería. Diseñé y desarrollé el sitio de principio a fin en colaboración directa con los dueños. Lo desplegué en Cloudflare Pages con HTTPS automático, headers de seguridad personalizados y CDN global. Integré analítica avanzada con Google Analytics 4, Facebook Pixel y Google Tag Manager para el seguimiento preciso de conversiones y campañas.",
		role: "Diseño, desarrollo y despliegue (end-to-end)",
		image: klyn,
		liveLink: "https://klyn.com.mx/",
		repoLink: "https://github.com/ssant0/klyn-web",
		technologies: ["Astro", "Bootstrap 5", "CSS", "Google Analytics", "Facebook Pixel", "GTM", "Cloudflare"],
		architecture: [
			"Astro + Bootstrap 5 desplegado en Cloudflare Pages con HTTPS automático.",
			"Headers de seguridad personalizados y CDN global.",
			"Analítica con Google Analytics 4, Facebook Pixel y Google Tag Manager.",
		],
		challenges: [
			{
				title: "Medición de conversiones",
				description:
					"Implementé GA4, Facebook Pixel y GTM para medir campañas y conversiones de forma precisa.",
			},
			{
				title: "Rendimiento y seguridad en el borde",
				description:
					"Desplegué en Cloudflare aprovechando HTTPS automático, headers de seguridad y CDN global.",
			},
		],
		outcomes: [
			"Sitio corporativo en producción con analítica avanzada y entrega global.",
		],
		keywords: [
			"Astro",
			"Bootstrap 5",
			"CSS",
			"Google Analytics",
			"Facebook Pixel",
			"GTM",
			"Cloudflare",
			"Performance",
			"Full-stack",
		],
	},
	{
		title: "labstudiomedia.com",
		shortDescription:
			"Agencia de marketing digital desarrollada con Astro + TypeScript, desplegada en Cloudflare Pages con CDN global y optimización SEO.",
		longDescription:
			"Sitio web corporativo para la agencia de marketing digital Labstudiomedia. Implementé una arquitectura moderna con Astro y TypeScript para máximo rendimiento, configuré la infraestructura completa en Cloudflare (dominio + CDN + Pages) y optimicé el SEO con Google Analytics. Colaboré con el equipo de diseño para crear un portafolio visual atractivo orientado a la generación de leads.",
		role: "Desarrollo frontend y despliegue",
		image: labstudiomedia,
		liveLink: "https://labstudiomedia.com/",
		repoLink: "https://github.com/ssant0/labstudio-landing",
		technologies: ["Astro", "TypeScript", "Bootstrap", "CSS", "Google Analytics", "AOS", "Cloudflare Pages"],
		architecture: [
			"Astro + TypeScript + Bootstrap para máximo rendimiento.",
			"Cloudflare para dominio, CDN y Pages.",
			"SEO con Google Analytics.",
		],
		challenges: [
			{
				title: "Portafolio con rendimiento",
				description:
					"Arquitectura moderna con Astro para máximo rendimiento, en colaboración con el equipo de diseño.",
			},
		],
		outcomes: [
			"Sitio corporativo en producción para una agencia de marketing.",
		],
		keywords: [
			"Astro",
			"TypeScript",
			"Bootstrap",
			"CSS",
			"Google Analytics",
			"Cloudflare",
			"CDN",
			"Performance",
			"SEO",
			"Full-stack",
		],
	},
	{
		title: "cybercafe10m.com",
		shortDescription:
			"Modernización de cybercafe con migración vanilla → Astro, integración Google Maps API y hosting Cloudflare Pages.",
		longDescription:
			"Proyecto de modernización completa para Cybercafe 10M. Migré la base de vanilla JavaScript a Astro para mejorar rendimiento y mantenibilidad, implementé un diseño responsive con Bootstrap 5, integré una API de Google Maps personalizada y configuré el hosting en Cloudflare Pages. Colaboré con el equipo de diseño gráfico para crear una interfaz moderna que facilita los servicios de documentación y trámites.",
		role: "Desarrollo y migración",
		image: cybercafe10m,
		liveLink: "https://cybercafe10m.com/",
		technologies: ["Astro", "Bootstrap 5", "CSS", "Google Maps API", "Cloudflare Pages"],
		architecture: [
			"Migración de JavaScript vanilla a Astro.",
			"Bootstrap 5 y API de Google Maps personalizada.",
			"Hosting en Cloudflare Pages.",
		],
		challenges: [
			{
				title: "Modernizar sin romper",
				description:
					"Migré la base de vanilla JS a Astro para mejorar rendimiento y mantenibilidad, integrando Google Maps.",
			},
		],
		outcomes: [
			"Sitio modernizado con mejor rendimiento y mantenibilidad.",
		],
		keywords: [
			"Astro",
			"Bootstrap 5",
			"CSS",
			"Google Maps API",
			"Cloudflare Pages",
			"Modernization",
			"Migration",
			"Performance",
			"Full-stack",
		],
	},
	{
		title: "cocinasmodulares.com.mx",
		shortDescription:
			"Sitio corporativo para empresa de cocinas modulares con desarrollo vanilla, configuración de hosting y optimización de imágenes.",
		longDescription:
			"Proyecto completo para una empresa familiar de cocinas modulares en Los Mochis. Desarrollé el sitio con HTML, CSS y JavaScript vanilla, gestioné la configuración completa (dominio + hosting + correo empresarial) y optimicé imágenes profesionales en colaboración con el equipo de fotografía. Implementé un diseño responsive enfocado en elegancia y conversión de clientes.",
		role: "Desarrollo y despliegue (end-to-end)",
		image: cocinasmodulares,
		liveLink: "https://cocinasmodulares.mx/",
		technologies: ["HTML", "CSS", "JavaScript"],
		architecture: [
			"HTML, CSS y JavaScript vanilla.",
			"Hosting, dominio y correo configurados.",
			"Optimización de imágenes profesionales.",
		],
		challenges: [
			{
				title: "Presencia que convierte",
				description:
					"Diseño responsive con foco en elegancia y conversión, optimizando imágenes profesionales.",
			},
		],
		outcomes: [
			"Sitio corporativo responsive en producción.",
		],
		keywords: [
			"HTML",
			"CSS",
			"JavaScript",
			"Responsive Design",
			"SEO",
			"Image Optimization",
			"Hosting",
			"Full-stack",
		],
	},
];
