<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	let message = $state('');

	onMount(() => {
		if ($page.error?.message != undefined) {
			message = $page.error?.message;
		} else {
			message = 'Something went wrong, try agian later...';
		}
	});
</script>

<main>
	<div class="pl-5 pt-5">
		<h1 class="h1">{$page.status}...</h1>
		<p class="italic">{message}</p>
	</div>
</main>
