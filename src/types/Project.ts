import type { ImageMetadata } from "astro";

export type ProjectChallenge = {
	title: string;
	description: string;
};

export type Project = {
	title: string;
	shortDescription: string;
	longDescription: string;
	role: string;
	status?: string;
	image: ImageMetadata;
	liveLink: string;
	ctaLabel?: string;
	repoLink?: string;
	repoPrivate?: boolean;
	technologies: string[];
	architecture?: string[];
	challenges?: ProjectChallenge[];
	outcomes?: string[];
	keywords: string[];
};
