<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import plaintext from 'highlight.js/lib/languages/typescript';
	import python from 'highlight.js/lib/languages/typescript';

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

	inject();
	injectSpeedInsights();

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>NotAussie's fort</title>
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

<!-- App Shell -->
<AppShell>
	{#snippet header()}
		<!-- App Bar -->
		<AppBar>
			{#snippet lead()}
				<a href="/"><strong class="text-xl uppercase">Aussie's fort</strong></a>
			{/snippet}

			{#snippet trail()}
				<LightSwitch />

				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://bsky.app/profile/notaussie.bsky.social"
					target="_blank"
					rel="noreferrer"
				>
					<i class="fa-brands fa-bluesky"></i>/notaussie.lol
				</a>

				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/notaussie/"
					target="_blank"
					rel="noreferrer"
				>
					<i class="fa-brands fa-github"></i>/NotAussie
				</a>
			{/snippet}
		</AppBar>
	{/snippet}

	{#snippet pageFooter()}
		<a href="https://github.com/notaussie">
			<footer class="flex justify-center p-8">© 2024 NotAussie.</footer>
		</a>
	{/snippet}

	<!-- Page Route Content -->
	{@render children?.()}
</AppShell>
