import { loadPostById } from '$lib/loadpost';

export const load = async ({ params }) => {
	const post = await loadPostById(params.slug);
	return { post };
};
