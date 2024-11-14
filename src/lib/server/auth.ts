import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function requireAuth(event: RequestEvent) {
	const session = await event.locals.auth();
	if (!session?.user) {
		throw redirect(303, `/login?redirectTo=${encodeURI(event.url.pathname)}&update=true`);
	}
	return session;
}
