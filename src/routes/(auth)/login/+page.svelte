<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Get URL parameters
	const redirectTo = $page.url.searchParams.get('redirectTo') || '/dashboard';
	const needsAuth = $page.url.searchParams.get('update') === 'true';

	const handleSignIn = (provider: string) => {
		signIn(provider, { callbackUrl: redirectTo });
	};

	onMount(() => {
		if ($page.data?.session !== null) {
			goto('/');
		}
	});
</script>

<div class="container mx-auto flex h-full items-center justify-center">
	<div class="card w-full max-w-md p-8">
		<h2 class="h2 mb-8 text-center">Sign In</h2>
		{#if needsAuth}
			<p class="variant-soft-warning mb-6 p-2 text-center text-sm rounded-container-token">
				Please sign in to access the requested content
			</p>
		{/if}
		<div class="flex flex-col space-y-4">
			<button class="variant-filled btn btn-lg" onclick={() => handleSignIn('github')}>
				<i class="fa-brands fa-github fa-xl pr-1"></i> Github
			</button>
			<button class="variant-filled btn btn-lg" onclick={() => handleSignIn('gitlab')}>
				<i class="fa-brands fa-gitlab fa-xl pr-1"></i> GitLab
			</button>
		</div>
		<p class="mt-8 text-center text-sm">
			Authentication is email based, you can use either service as long as your email matches.
		</p>
	</div>
</div>
