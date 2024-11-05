import { loadPostById } from '$lib/loadpost';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const post = await loadPostById(params.slug);
	if (post === null) {
		error(404, "The requested blog post wasn't found");
	}
	return { post };
};
