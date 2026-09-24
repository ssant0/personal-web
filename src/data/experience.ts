export type ExperienceItem = {
	role: string
	organization: string
	period: string
	employmentType?: string
	location?: string
	modality?: string
	bullets: string[]
}

export const experience: ExperienceItem[] = [
	{
		role: "Responsable de TI",
		organization: "Centro Universitario de Ciencias e Investigación (CUCII)",
		period: "mar. 2024 – Actualidad",
		employmentType: "Jornada completa",
		location: "Los Mochis, Sinaloa",
		modality: "Presencial",
		bullets: [
			"Soporte técnico a personal, docentes y alumnos de la institución.",
			"Desplegué y mantengo un servidor VPS Ubuntu con Moodle como plataforma educativa, con HTTPS y mantenimiento vía SSH.",
			"Desarrollé un wrapper en Go que integra el sistema de titulación electrónica de la SEP (SOAP sobre HTTPS): mapea campos y genera formatos para agilizar la titulación de alumnos.",
			"Construí un sistema interno de gestión de alumnos con Angular y Java/Spring, además de otras herramientas para automatizar procesos administrativos.",
			"Responsable del proceso de titulación electrónica de los alumnos.",
		],
	},
	{
		role: "Co-Fundador & Lead Front-End Developer",
		organization: "Labstudiomedia",
		period: "ago. 2023 – Actualidad",
		employmentType: "Autónomo",
		location: "Los Mochis, Sinaloa",
		modality: "Remoto",
		bullets: [
			"Co-fundé la agencia y lidero el desarrollo front-end de los proyectos de clientes.",
			"Diseño, desarrollo y despliegue end-to-end de sitios y plataformas web (Astro, TypeScript, Bootstrap).",
			"Administro infraestructura y analítica de los proyectos (Cloudflare, SEO, Google Analytics).",
		],
	},
	{
		role: "Desarrollador Web JR",
		organization: "Fentigo",
		period: "oct. 2022 – ago. 2023",
		employmentType: "Jornada completa",
		location: "México",
		modality: "Remoto",
		bullets: [
			"Desarrollo front-end de sitios web en un equipo remoto.",
			"Maquetación responsive, corrección de bugs y mejoras de interfaz.",
		],
	},
]
