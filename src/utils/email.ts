import { socialLinks } from "../data/socialLinks";

export function hydrateEmail() {
	const email = atob(socialLinks.email);
	document.querySelectorAll<HTMLAnchorElement>("[data-email-href]").forEach((el) => {
		el.href = `mailto:${email}`;
	});
	document.querySelectorAll<HTMLElement>("[data-email-text]").forEach((el) => {
		el.textContent = email;
	});
}
