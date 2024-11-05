<script lang="ts">
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<hr />
<AppBar>
	<svelte:fragment slot="lead">
		<div class="flex items-center">
			<button
				aria-label="back button"
				class="btn btn-sm variant-ghost-surface mr-2"
				on:click={goto('/blog')}
			>
				<i class="fas fa-arrow-left"></i>
			</button>
			<p class="text-lg font-semibold">{data.post?.metadata.title}</p>
		</div>
	</svelte:fragment>
</AppBar>

{@render children?.()}
