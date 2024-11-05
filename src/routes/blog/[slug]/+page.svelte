<script lang="ts">
	let { data } = $props();

	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<main class="pl-5 pt-5">
	{@html data.post.content}
</main>
