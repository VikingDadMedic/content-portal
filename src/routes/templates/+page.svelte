<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const {
		heroLink,
		heroMessage,
		heroTitle,
		pageTitle,
		pageDescription,
		featuredImage: { id: featuredImageId, alt, height, placeholder, width }
	} = data;

	const HERO_WIDTH = 1024;
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<div class="container h-full mx-auto flex py-5">
	<h3 class="screen-reader-text">{pageTitle}</h3>
</div>

<a href={heroLink}>
	<div class="hero-container">
		<div class="hero-image" />
		<div class="hero-overlay">
			<div class="hero-heading">{heroTitle}</div>
			<div class="hero-text">{heroMessage}</div>
		</div>
	</div>
</a>
