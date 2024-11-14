<script lang="ts">
	import '../app.postcss';

	// Svelte
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Skeleton
	import {
		AppBar,
		LightSwitch,
		Drawer,
		getDrawerStore,
		initializeStores,
		storeHighlightJs,
		storePopup,
		autoModeWatcher
	} from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import plaintext from 'highlight.js/lib/languages/plaintext';
	import python from 'highlight.js/lib/languages/python';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	// Vercel functions
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { signOut } from '@auth/sveltekit/client';
	import { login } from '$lib/login';

	// Initialize Highlight.js languages
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

	// Initialize Floating UI for Popups
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

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
	let { children } = $props();

	// Vercel analytics
	inject();
	injectSpeedInsights();

	// TODO: Remove once lightswitch has been fixed
	onMount(() => {
		(function Gn() {
			const e = document.documentElement.classList,
				t = localStorage.getItem('modeUserPrefers') === 'false',
				n = !('modeUserPrefers' in localStorage),
				r = window.matchMedia('(prefers-color-scheme: dark)').matches;
			t || (n && r) ? e.add('dark') : e.remove('dark');
		})();
	});
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

<!-- Sidebar UI -->
<Drawer position="right" width="w-72">
	<div class="flex flex-col items-center space-y-4 p-4">
		{#if $page.data.session}
			<div class="flex flex-col items-center gap-2 pb-4">
				<img
					src={$page.data.session.user?.image ?? '/default-avatar.png'}
					alt="User avatar"
					class="h-16 w-16 rounded-full"
				/>
				<p class="text-center font-semibold">{$page.data.session.user?.name ?? 'User'}</p>
			</div>
		{/if}

		{#if $page.data.session}
			<a href="/dashboard" class="variant-ghost-surface btn w-full">
				<i class="fas fa-layer-group"></i>
				<span class="ml-2">Dashboard</span>
			</a>
		{/if}

		<a href="/blog" class="variant-ghost-surface btn w-full">
			<i class="fas fa-newspaper"></i>
			<span class="ml-2">Blog</span>
		</a>

		{#if $page.data.session}
			<button class="variant-ghost-surface btn w-full" onclick={() => signOut()}>
				<i class="fas fa-sign-out-alt"></i>
				<span class="ml-2">Sign out</span>
			</button>
		{:else if $page.data.session == null}
			<button class="variant-ghost-surface btn w-full" onclick={() => login($page.url.pathname)}>
				<i class="fas fa-sign-in-alt"></i>
				<span class="ml-2">Sign in</span>
			</button>
		{/if}

		<div class="pt-4">
			<LightSwitch />
		</div>
	</div>
</Drawer>

<div class="flex min-h-screen flex-col">
	<!-- Header -->
	<div class="sticky top-0 z-10 w-full">
		<AppBar>
			{#snippet lead()}
				<a href="/"><strong class="text-xl uppercase">Aussie's fort</strong></a>
			{/snippet}

			{#snippet trail()}
				<!-- Desktop social links -->
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
				</div>
				<button class="btn btn-sm" onclick={drawerOpen} aria-label="Open menu">
					<i class="fas fa-bars"></i>
				</button>
			{/snippet}
		</AppBar>
	</div>

	<main class="flex-1 p-4 lg:p-5">
		{@render children?.()}
	</main>

	<footer class="flex flex-col items-center p-8">
		<div>
			© 2024 <a href="https://github.com/notaussie" class="pl-1">NotAussie</a>.
		</div>
	</footer>
</div>
