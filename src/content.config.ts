import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(z.union([image(), z.string()])),
			category: z.string().optional(),
			tags: z.array(z.string()).optional(),
			draft: z.boolean().optional().default(false),
			author: z.string().optional(),
			featured: z.boolean().optional(),
			popular: z.boolean().optional(),
			rating: z.number().optional(),
			faq: z.array(z.object({
				question: z.string(),
				answer: z.string(),
			})).optional(),
		}),
});

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			heroImage: z.optional(z.union([image(), z.string()])),
		}),
});

export const collections = { blog, pages };
