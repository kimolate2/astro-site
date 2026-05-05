import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import general from '../content/settings/general.json';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return rss({
		title: general.site_title,
		description: general.site_description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
		})),
	});
}
