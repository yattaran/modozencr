export const DEFAULT_LOCALE = 'es-CR';
export const LOCALES = ['es-CR', 'en-US'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_PREFIX: Record<Locale, string> = {
	'es-CR': '',
	'en-US': '/en',
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
	'es-CR': 'es-CR',
	'en-US': 'en-US',
};

export const LOCALE_OPTIONS: { locale: Locale; label: string; title: string }[] = [
	{ locale: 'es-CR', label: 'ES', title: 'Español (Costa Rica)' },
	{ locale: 'en-US', label: 'EN', title: 'English (United States)' },
];

/** URL path segment / locale arg for `getRelativeLocaleUrl` (custom `path` in astro.config). */
export function localePathArg(locale: Locale): string {
	return locale === 'en-US' ? 'en' : locale;
}

/** Path without locale prefix (for getRelativeLocaleUrl). */
export function stripLocaleFromPath(pathname: string): string {
	if (pathname === '/en' || pathname.startsWith('/en/')) {
		const stripped = pathname.slice(3);
		return stripped === '' ? '/' : stripped;
	}
	return pathname;
}

export function isLocale(value: string | undefined): value is Locale {
	return LOCALES.includes(value as Locale);
}

export function resolveLocale(value: string | undefined): Locale {
	if (value === 'en' || value === 'en-US') return 'en-US';
	return isLocale(value) ? value : DEFAULT_LOCALE;
}
