<script lang="ts">
	let { data } = $props();

	function formatNames(names: string[]) {
		if (names.length === 0) {
			return '';
		} else if (names.length === 1) {
			return names[0];
		} else if (names.length === 2) {
			return names.join(' and ');
		} else {
			return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
		}
	}
</script>

<main class="pl-5 pt-5">
	<h1 class="h1 pb-4">My blog! <i class="fas fa-newspaper"></i></h1>

	<div class="flex justify-left gap-4">
		{#each data.posts as post}
			<a href="/blog/{post.id}">
				<div class="card card-hover p-4">
					<header><h3 class="h3">{post.metadata.title}</h3></header>
					<section class="font-normal">{post.metadata.summary}</section>
					<footer class="font-normal">
						<p class="italic">
							(Posted at {post.metadata.createdAt.toLocaleDateString()} by {formatNames(
								post.metadata.authors
							)})
						</p>
					</footer>
				</div>
			</a>
		{/each}
	</div>
</main>
