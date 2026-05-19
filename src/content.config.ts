import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ctaSchema = z.discriminatedUnion('type', [
	z.object({
		type: z.literal('whatsapp'),
		message: z.string(),
	}),
	z.object({
		type: z.literal('shopify'),
		shopifyUrl: z.string().url(),
	}),
	z.object({
		type: z.literal('external'),
		url: z.string().url(),
	}),
]);

const kits = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/kits' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		shortDescription: z.string(),
		image: z.string(),
		featured: z.boolean().default(true),
		order: z.number(),
		cta: ctaSchema,
	}),
});

const site = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/site' }),
	schema: z.object({
		brand: z.object({
			name: z.string(),
			tagline: z.string(),
			heroCopy: z.string(),
			description: z.string(),
		}),
		whatsapp: z.object({
			phone: z.string(),
			defaultMessage: z.string(),
		}),
		navigation: z.array(
			z.object({
				label: z.string(),
				href: z.string(),
				comingSoon: z.boolean().optional(),
			}),
		),
		topBar: z.array(z.object({ label: z.string(), icon: z.string() })),
		benefits: z.array(z.object({ label: z.string(), icon: z.string() })),
		kitsSection: z.object({
			title: z.string(),
			subtitle: z.string(),
		}),
		story: z.object({
			quote: z.string(),
			subquote: z.string(),
			ctaLabel: z.string(),
		}),
		trustBar: z.array(z.object({ label: z.string(), icon: z.string() })),
		about: z.object({
			title: z.string(),
			lead: z.string(),
			paragraphs: z.array(z.string()),
		}),
		footer: z.object({
			menu: z.array(z.object({ label: z.string(), href: z.string() })),
			social: z.object({
				instagram: z.string().url(),
				spotify: z.string().url(),
				pinterest: z.string().url(),
				email: z.string(),
			}),
			legal: z.array(z.object({ label: z.string(), href: z.string() })),
		}),
	}),
});

export const collections = { kits, site };
