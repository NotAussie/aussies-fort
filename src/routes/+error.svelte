<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let message = $state<string>('Something went wrong, try again later...');

	onMount(() => {
		message = $page.error?.message || message;
	});
</script>

<main>
	<div class="pl-5 pt-5">
		<h1 class="h1">{$page.status}...</h1>
		<p class="italic">{message}</p>
	</div>
</main>
