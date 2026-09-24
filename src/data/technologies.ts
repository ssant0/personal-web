import java from "../assets/icons/java.svg?raw";
import spring from "../assets/icons/spring-icon.svg?raw";
import postgresql from "../assets/icons/postgresql.svg?raw";
import docker from "../assets/icons/docker.svg?raw";
import linux from "../assets/icons/linux.svg?raw";
import angular from "../assets/icons/angular.svg?raw";
import typescript from "../assets/icons/typescript.svg?raw";
import js from "../assets/icons/js.svg?raw";
import html from "../assets/icons/html.svg?raw";
import css from "../assets/icons/css.svg?raw";
import astro from "../assets/icons/astro.svg?raw";

const processIcon = (svg: string) => {
	return svg
		.replace(/<\?xml.*?\?>/, "")
		.replace(/<!--[\s\S]*?-->/, "")
		.replace(/<title>[\s\S]*?<\/title>/, "")
		.replace("<svg", `<svg class="w-12 h-12" aria-hidden="true" focusable="false"`)
		.replace(/width="[^"]*"/, "")
		.replace(/height="[^"]*"/, "");
};

export type Technology = {
	name: string;
	icon: string;
};

export type TechnologyGroup = {
	name: string;
	items: Technology[];
};

export const technologyGroups: TechnologyGroup[] = [
	{
		name: "Backend",
		items: [
			{ name: "Java", icon: processIcon(java) },
			{ name: "Spring Boot", icon: processIcon(spring) },
		],
	},
	{
		name: "Bases de datos",
		items: [{ name: "PostgreSQL", icon: processIcon(postgresql) }],
	},
	{
		name: "Infra & DevOps",
		items: [
			{ name: "Docker", icon: processIcon(docker) },
			{ name: "Linux", icon: processIcon(linux) },
		],
	},
	{
		name: "Frontend",
		items: [
			{ name: "Angular", icon: processIcon(angular) },
			{ name: "TypeScript", icon: processIcon(typescript) },
			{ name: "JavaScript", icon: processIcon(js) },
		],
	},
	{
		name: "Fundamentos web",
		items: [
			{ name: "HTML", icon: processIcon(html) },
			{ name: "CSS", icon: processIcon(css) },
		],
	},
	{
		name: "Tooling",
		items: [{ name: "Astro", icon: processIcon(astro) }],
	},
];
