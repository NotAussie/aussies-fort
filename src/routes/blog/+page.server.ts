import { loadPosts } from '$lib/loadpost';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const posts = await loadPosts();
	return { posts };
};
