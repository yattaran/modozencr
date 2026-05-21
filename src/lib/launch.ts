import { getRelativeLocaleUrl } from 'astro:i18n';
import type { AstroGlobal } from 'astro';
import { localePathArg, stripLocaleFromPath, type Locale } from './i18n';

/**
 * Fases según ModoZen_Launch_Strategy (90 días).
 *
 * Mes 1 — Foundation: landing simple, waitlist, Zencho, Spotify.
 * Mes 2 — Productos: merch, teasers, early drop.
 * Mes 3 — Comunidad: newsletter, outreach corporativo (empresas).
 */
export const LAUNCH_PHASE = 1 as const;

const HIDDEN_ROUTES: Record<number, readonly string[]> = {
	1: ['/merch', '/nosotros', '/kits', '/empresas'],
	2: ['/nosotros', '/kits', '/empresas'],
	3: ['/empresas'],
};

/** Nav/footer anchors ocultos por fase (p. ej. `/#kits` cuando no hay sección). */
const HIDDEN_NAV_HREFS: Record<number, readonly string[]> = {
	1: ['/#kits'],
	2: ['/#kits'],
};

export function isRouteHidden(pathname: string, phase: number = LAUNCH_PHASE): boolean {
	const path = stripLocaleFromPath(pathname);
	const hidden = HIDDEN_ROUTES[phase] ?? [];
	return hidden.some(
		(route) => path === route || (route !== '/' && path.startsWith(`${route}/`)),
	);
}

export function isNavHrefHidden(href: string, phase: number = LAUNCH_PHASE): boolean {
	if (HIDDEN_NAV_HREFS[phase]?.includes(href)) return true;
	const base = href.split('#')[0] || '/';
	if (!base || base === '/') return false;
	return isRouteHidden(base, phase);
}

export function filterVisibleNav<T extends { href: string }>(
	items: T[],
	phase: number = LAUNCH_PHASE,
): T[] {
	return items.filter((item) => !isNavHrefHidden(item.href, phase));
}

export function showTopBar(phase: number = LAUNCH_PHASE): boolean {
	return phase >= 2;
}

export function showKitsSection(phase: number = LAUNCH_PHASE): boolean {
	return phase >= 3;
}

export function showStoryBanner(phase: number = LAUNCH_PHASE): boolean {
	return phase >= 2;
}

/** Redirect to home when the route is hidden for the current launch phase. */
export function launchRedirect(
	Astro: Pick<AstroGlobal, 'url' | 'redirect'>,
	locale: Locale,
): Response | undefined {
	if (isRouteHidden(Astro.url.pathname)) {
		return Astro.redirect(getRelativeLocaleUrl(localePathArg(locale), '/'));
	}
}
