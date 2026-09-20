import java from "../assets/icons/java.svg?raw";
import spring from "../assets/icons/spring-icon.svg?raw";
import postgresql from "../assets/icons/postgresql.svg?raw";
import typescript from "../assets/icons/typescript.svg?raw";
import html from "../assets/icons/html.svg?raw";
import css from "../assets/icons/css.svg?raw";
import astro from "../assets/icons/astro.svg?raw";
import js from "../assets/icons/js.svg?raw";
import angular from "../assets/icons/angular.svg?raw";

const processIcon = (svg: string) => {
	return svg
		.replace(/<\?xml.*?\?>/, "")
		.replace(/<!--[\s\S]*?-->/, "")
		.replace("<svg", `<svg class="w-12 h-12" aria-hidden="true" focusable="false"`)
		.replace(/width="[^"]*"/, "")
		.replace(/height="[^"]*"/, "");
};

export const technologies = [
	// Backend
	{
		name: "Java",
		icon: processIcon(java),
	},
	{
		name: "Spring Boot",
		icon: processIcon(spring),
	},
	{
		name: "PostgreSQL",
		icon: processIcon(postgresql),
	},
	// Frontend
	{
		name: "Angular",
		icon: processIcon(angular),
	},
	{
		name: "TypeScript",
		icon: processIcon(typescript),
	},
	{
		name: "JavaScript",
		icon: processIcon(js),
	},
	// Fundamentos
	{
		name: "HTML",
		icon: processIcon(html),
	},
	{
		name: "CSS",
		icon: processIcon(css),
	},
	// Tooling
	{
		name: "Astro",
		icon: processIcon(astro),
	},
];
