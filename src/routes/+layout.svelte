<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import plaintext from 'highlight.js/lib/languages/plaintext';
	import python from 'highlight.js/lib/languages/python';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('ts', typescript);
	hljs.registerLanguage('plaintext', plaintext);
	hljs.registerLanguage('python', python);
	hljs.registerLanguage('py', python);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Vercel functions
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { signOut } from '@auth/sveltekit/client';

	inject();
	injectSpeedInsights();

	// Initialize Skeleton stores
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	// Initialize Skeleton stores
	initializeStores();
	const drawerStore = getDrawerStore();

	// Add function to control drawer
	function drawerOpen(): void {
		drawerStore.set({ open: true });
	}

	// Props declaration for Svelte 5
	interface Props {
		children?: import('svelte').Snippet;
	}
	let { children } = $props<Props>();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<meta name="title" content="NotAussie's fort" />
	<meta
		name="description"
		content="Learn about whom NotAussie is, and read all their juicy blog posts!"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://aussies-fort.vercel.app/" />
	<meta property="og:title" content="NotAussie's fort" />
	<meta
		property="og:description"
		content="Learn about whom NotAussie is, and read all their juicy blog posts!"
	/>
	<meta property="og:image" content="https://aussies-fort.vercel.app/banner.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://aussies-fort.vercel.app/" />
	<meta property="twitter:title" content="NotAussie's fort" />
	<meta
		property="twitter:description"
		content="Learn about whom NotAussie is, and read all their juicy blog posts!"
	/>
	<meta property="twitter:image" content="https://aussies-fort.vercel.app/banner.png" />
</svelte:head>

<!-- Add drawer component outside AppShell -->
<Drawer position="right" width="w-64">
	<div class="flex flex-col items-center space-y-4 p-4">
		<a
			class="variant-ghost-surface btn btn-sm"
			href="https://bsky.app/profile/notaussie.bsky.social"
			target="_blank"
			rel="noreferrer"
			aria-label="Bluesky Profile"
		>
			<i class="fa-brands fa-bluesky" aria-hidden="true"></i>
			<span class="ml-2">/notaussie.lol</span>
		</a>

		<a
			class="variant-ghost-surface btn btn-sm"
			href="https://github.com/notaussie/"
			target="_blank"
			rel="noreferrer"
			aria-label="GitHub Profile"
		>
			<i class="fa-brands fa-github" aria-hidden="true"></i>
			<span class="ml-2">/NotAussie</span>
		</a>

		{#if $page.data.session}
			<button class="variant-ghost-surface btn btn-sm" on:click={() => signOut()}>
				<i class="far fa-times-circle"></i>
				<span class="ml-2">Sign out</span>
			</button>
		{/if}

		<LightSwitch />
	</div>
</Drawer>

<!-- App Shell -->
<AppShell>
	{#snippet header()}
		<!-- App Bar -->
		<AppBar>
			{#snippet lead()}
				<a href="/"><strong class="text-xl uppercase">Aussie's fort</strong></a>
			{/snippet}

			{#snippet trail()}
				<!-- Add hamburger menu for mobile -->
				<button class="btn btn-sm lg:hidden" on:click={drawerOpen} aria-label="Open menu">
					<i class="fas fa-bars"></i>
				</button>

				<!-- Hide original buttons on mobile -->
				<div class="hidden lg:flex lg:gap-4">
					<a
						class="variant-ghost-surface btn btn-sm"
						href="https://bsky.app/profile/notaussie.bsky.social"
						target="_blank"
						rel="noreferrer"
						aria-label="Bluesky Profile"
					>
						<i class="fa-brands fa-bluesky" aria-hidden="true"></i>/notaussie.lol
					</a>

					<a
						class="variant-ghost-surface btn btn-sm"
						href="https://github.com/notaussie/"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub Profile"
					>
						<i class="fa-brands fa-github" aria-hidden="true"></i>/NotAussie
					</a>

					{#if $page.data.session}
						<button class="variant-ghost-surface btn btn-sm" on:click={() => signOut()}>
							<i class="far fa-times-circle pr-1"></i> Sign out
						</button>
					{/if}
				</div>
			{/snippet}
		</AppBar>
	{/snippet}

	{#snippet pageFooter()}
		<footer class="flex flex-col items-center p-8">
			<div class="mb-2 hidden lg:block">
				<LightSwitch />
			</div>
			<div>
				© 2024 <a href="https://github.com/notaussie" class="pl-1">NotAussie</a>.
			</div>
		</footer>
	{/snippet}

	<!-- Page Route Content -->
	<main class="lg:pl-5 lg:pt-5">
		{@render children?.()}
	</main>
</AppShell>
