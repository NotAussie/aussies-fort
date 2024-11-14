<script lang="ts">
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
	import { getGravatarUrl } from '$lib/gravatar';

	const whitelistedEmails = ['notaussie@duck.com'];
</script>

{#if Object.keys($page.data.session || {}).length}
	{#if whitelistedEmails.includes($page.data.session?.user?.email || 'fallback@doesnt.exist')}
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
		<h1 class="h1 pb-4">Something's not right...</h1>
		<p>Your account doesn't have permission to view this page.</p>
	{/if}
{/if}
