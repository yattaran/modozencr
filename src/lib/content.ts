import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { DEFAULT_LOCALE, type Locale } from './i18n';

export async function getSiteConfig(
	locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'site'>> {
	const sites = await getCollection('site');
	const site = sites.find((entry) => entry.id === locale);
	if (!site) {
		throw new Error(`Site config not found at src/content/site/${locale}.yaml`);
	}
	return site;
}

export async function getKits(locale: Locale = DEFAULT_LOCALE): Promise<CollectionEntry<'kits'>[]> {
	const prefix = `${locale}/`;
	const kits = await getCollection('kits', ({ id }) => id.startsWith(prefix));
	return kits.sort((a, b) => a.data.order - b.data.order);
}

export async function getKitBySlug(
	slug: string,
	locale: Locale = DEFAULT_LOCALE,
): Promise<CollectionEntry<'kits'> | undefined> {
	const kits = await getKits(locale);
	return kits.find((kit) => kit.data.slug === slug);
}
