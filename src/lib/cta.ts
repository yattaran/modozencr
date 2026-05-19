import type { CollectionEntry } from 'astro:content';

type KitEntry = CollectionEntry<'kits'>;
type SiteEntry = CollectionEntry<'site'>;

export function kitCtaUrl(kit: KitEntry, site: SiteEntry): string {
	const { cta } = kit.data;
	const phone = site.data.whatsapp.phone.replace(/\D/g, '');

	if (cta.type === 'whatsapp') {
		return `https://wa.me/${phone}?text=${encodeURIComponent(cta.message)}`;
	}
	if (cta.type === 'shopify') {
		return cta.shopifyUrl;
	}
	return cta.url;
}

export function whatsappUrl(site: SiteEntry, message?: string): string {
	const phone = site.data.whatsapp.phone.replace(/\D/g, '');
	const text = message ?? site.data.whatsapp.defaultMessage;
	return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
