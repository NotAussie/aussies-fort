import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })]
});