<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<p>
	{#if Object.keys($page.data.session || {}).length}
		<!-- svelte-ignore node_invalid_placement_ssr -->
		<div class="flex items-center">
			<Avatar
				src={$page.data.session?.user?.image || '/profile-picture'}
				class="mr-2"
				aria-label="User profile picture"
			/>
			<span>
				<b class="text-xl">{$page.data.session?.user?.name || $page.data.session?.user?.email}</b>
				{#if $page.data.session?.user?.name !== undefined}
					<span class="block text-sm font-light">({$page.data.session?.user?.email})</span>
				{/if}
			</span>
		</div>
		<button type="button" class="variant-filled btn mt-4" on:click={() => signOut()}>
			Sign out <i class="fa-solid fa-person-through-window pl-1"></i>
		</button>
	{:else}
		<!-- svelte-ignore node_invalid_placement_ssr -->
		<h1 class="h1 pb-4">You're not signed in!</h1>
		<button on:click={() => signIn('github')} class="variant-filled btn btn-md"
			>Sign in now with GitHub <i class="fab fa-github pl-1"></i></button
		>
	{/if}
</p>
