<script lang="ts">
	import { getSrc, getSrcset, getWebpSrcset } from '$lib/utilities/image';

	export let alt: string;
	export let height: number; // needed to reduce CLS
	export let width: number; // needed to reduce CLS
	export let maxWidth: string = '1280px';
	export let sizes: string = `(max-width: ${maxWidth}) 100vw, ${maxWidth}}`;
	// export let fetchpriority: 'auto' | 'high' | 'low' | undefined = undefined;
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let id: string;
	export let slug: string;
	export let placeholder: string;
	export let aspectRatio: string;

	const lazy = loading === 'lazy';
	const densities = [1.0, 2.0];
	$: src = getSrc({ id, slug, width });
	$: srcset = getSrcset({ densities, id, sizes: [374, width], slug });
	$: webpSrcset = getWebpSrcset({ densities, id, sizes: [374, width], slug });
</script>

{#if lazy}
	<picture style:aspect-ratio={aspectRatio} style:max-width={maxWidth}>
		<source data-sizes={sizes} data-srcset={webpSrcset} type="image/webp" {width} {height} />
		<source data-sizes={sizes} data-srcset={srcset} type="image/jpeg" {width} {height} />
		<img
			style:aspect-ratio={aspectRatio}
			style:max-width={maxWidth}
			class="lazy"
			{alt}
			loading="lazy"
			decoding="async"
			{width}
			{height}
			data-src={src}
			src={placeholder}
		/>
	</picture>
{:else}
	<picture style:aspect-ratio={aspectRatio} style:max-width={maxWidth}>
		<source {sizes} srcset={webpSrcset} type="image/webp" {width} {height} />
		<source {sizes} {srcset} type="image/jpeg" {width} {height} />
		<img
			style:aspect-ratio={aspectRatio}
			style:max-width={maxWidth}
			{alt}
			loading="eager"
			decoding="async"
			{width}
			{height}
			{src}
		/>
	</picture>
{/if}

<style>
	img {
		height: auto;
		border: var(--spacing-px) solid var(--colour-dark);
		border-radius: var(--spacing-px-2);
		overflow: clip;
	}

	img:not([src]):not([srcset]) {
		visibility: hidden;
	}
</style>
