<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getGravatarUrl } from '$lib/gravatar';
</script>

{#if Object.keys($page.data.session || {}).length}
	<div class="flex items-center">
		{#await getGravatarUrl($page.data.session?.user?.email || 'fallback@doesnt.exist')}
			<!-- Fallback email only exists for type safety -->
			<div class="placeholder-circle mr-2 w-16 animate-pulse"></div>
		{:then gravatarUrl}
			<Avatar
				src={$page.data.session?.user?.image || gravatarUrl}
				class="mr-2"
				aria-label="User profile picture"
			/>
		{/await}
		<span>
			<b class="text-xl">{$page.data.session?.user?.name || $page.data.session?.user?.email}</b>
			{#if $page.data.session?.user?.name !== undefined}
				<span class="block text-sm font-light">({$page.data.session?.user?.email})</span>
			{/if}
		</span>
	</div>
	<button type="button" class="variant-filled btn mt-4" onclick={() => signOut()}>
		Sign out <i class="fa-solid fa-person-through-window pl-1"></i>
	</button>
{:else}
	<h1 class="h1 pb-4">You're not signed in!</h1>
	<p>Sign in with...</p>
	<div class="flex space-x-2">
		<button
			onclick={() => signIn('gitlab')}
			class="btn-icon-md variant-filled btn-icon"
			aria-label="GitLab login button"><i class="fab fa-gitlab"></i></button
		>
		<button
			onclick={() => signIn('github')}
			class="btn-icon-md variant-filled btn-icon"
			aria-label="GitHub login button"><i class="fab fa-github"></i></button
		>
	</div>
{/if}
