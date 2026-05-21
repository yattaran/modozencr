import type { Locale } from './i18n';

export type ZenchoTip = string;

const TIPS_ES: ZenchoTip[] = [
	'Si Waze dice 45 minutos, no se enoje: es como el clima, todos sabemos que miente un poquito.',
	'Cuando alguien dice "ya casi llego", tome café. Usted ya sabe cómo termina esa historia.',
	'El "urgente" del viernes a las 4:30 puede esperar hasta el lunes. La vida también.',
	'Antes de responder en el grupo familiar, pregúntese si vale la pena perder la paz por un meme malo.',
	'La fila del banco no se acelera con el suspiro. Respire, la fila avanza cuando quiere.',
	'No todo lo que le preocupa hoy le va a importar en un mes. Guarde energía para lo que sí.',
	'Si el almuerzo fue casado, la tarde pide sombra y silencio, no más ruido.',
	'La guácima del vecino crece sola. Usted no tiene que regarla ni comentarla.',
	'Cuando todo salga mal, recuerde: al menos no le cayó un mango en la cabeza. Eso ya es ganancia.',
	'El mejor plan tico sigue siendo "mañana se ve". Hoy haga lo que alcance y suelte el resto.',
];

const TIPS_EN: ZenchoTip[] = [
	'If Waze says 45 minutes, don\'t get mad—it\'s like the weather: we all know it fibs a little.',
	'When someone says "almost there," grab coffee. You already know how that story ends.',
	'Friday\'s 4:30 "urgent" can wait till Monday. Life can too.',
	'Before replying in the family group chat, ask if it\'s worth losing peace over a bad meme.',
	'The bank line won\'t move faster with sighing. Breathe—the line moves when it wants.',
	'Not everything worrying you today will matter in a month. Save energy for what will.',
	'If lunch was casado, the afternoon wants shade and quiet—not more noise.',
	'Your neighbor\'s drama grows on its own. You don\'t have to water it or comment.',
	'When everything goes wrong, remember: at least no mango fell on your head. That\'s a win.',
	'The best tico plan is still "we\'ll see tomorrow." Today, do what you can and drop the rest.',
];

const TIPS_BY_LOCALE: Record<Locale, ZenchoTip[]> = {
	'es-CR': TIPS_ES,
	'en-US': TIPS_EN,
};

/** Day-of-year in Costa Rica (1–366), stable for daily rotation. */
export function getCostaRicaDayOfYear(date = new Date()): number {
	const parts = new Intl.DateTimeFormat('en-US', {
		timeZone: 'America/Costa_Rica',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	}).formatToParts(date);
	const year = Number(parts.find((p) => p.type === 'year')?.value);
	const month = Number(parts.find((p) => p.type === 'month')?.value);
	const day = Number(parts.find((p) => p.type === 'day')?.value);
	const utc = Date.UTC(year, month - 1, day);
	const start = Date.UTC(year, 0, 0);
	return Math.floor((utc - start) / 86_400_000);
}

export function getZenchoTips(locale: Locale): ZenchoTip[] {
	return TIPS_BY_LOCALE[locale];
}

export function getZenchoTipIndex(locale: Locale, date = new Date()): number {
	const tips = getZenchoTips(locale);
	if (tips.length === 0) return 0;
	return getCostaRicaDayOfYear(date) % tips.length;
}

export function getZenchoTipOfDay(locale: Locale, date = new Date()): ZenchoTip {
	const tips = getZenchoTips(locale);
	return tips[getZenchoTipIndex(locale, date)] ?? tips[0];
}
