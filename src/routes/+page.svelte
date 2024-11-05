<script lang="ts">
	let { data } = $props();
</script>

<main>
	<div class="pl-5 pt-5">
		<h1 class="h1 pb-4">Hiya! <i class="fa-solid fa-hand-peace"></i></h1>

		<p class="text-pretty max-w-5xl">
			Hiya, I'm NotAussie! I'm an aviation enthusiast and full-stack programmer, I specialise in
			building bots and backend APIs. I'm currently studying with FLO (flexible learning options)
			Australia, I hope to one day study software engineering but I've got a <i>lot</i> to learn before
			I get to that.
		</p>

		<h2 class="h2 pt-4 pb-4">My statistics <i class="fa-solid fa-square-poll-vertical"></i></h2>
		<div class="flex justify-left gap-4">
			<div class="card p-4">
				<header><h3 class="h3">Programming hours <i class="fa-solid fa-skull"></i></h3></header>
				<section>{data.time}</section>
				<footer>
					<p class="italic">
						(Powered by <a class="underline" href="https://wakatime.com">Wakatime.com</a>)
					</p>
				</footer>
			</div>
		</div>
	</div>
</main>
