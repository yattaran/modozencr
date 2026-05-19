import { getEntry, getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getSiteConfig(): Promise<CollectionEntry<'site'>> {
	const site = await getEntry('site', 'site');
	if (!site) {
		throw new Error('Site config not found at src/content/site/site.yaml');
	}
	return site;
}

export async function getKits(): Promise<CollectionEntry<'kits'>[]> {
	const kits = await getCollection('kits');
	return kits.sort((a, b) => a.data.order - b.data.order);
}
