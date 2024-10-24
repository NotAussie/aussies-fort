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
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>

			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase">Aussie's fort</strong></a>
			</svelte:fragment>

			<svelte:fragment slot="trail">

				<LightSwitch/>

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
			</svelte:fragment>

		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="pageFooter">
		<footer class="flex justify-center p-8">
			© 2024 NotAussie.
		</footer>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
	i.fa-brands {
		padding-left: 0.0rem; /* Adjust the value as needed */
	}
</style>