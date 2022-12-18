<script>
	import { PUBLIC_DIRECTUS_PROJECT_URL } from '$env/static/public';
	import Image from '$lib/components/Image.svelte';

	export let alt;
	export let description;
	export let lazyLoad;
	export let id;
	export let imageId;
	export let name;
	export let placeholder;
	export let price;
	export let sizes;
	export let slug;

	const IMAGE_WIDTH = 512;
	const src = `/assets/${imageId}/${slug}?width=${IMAGE_WIDTH}`;
</script>

<a href={`/products/${slug}`}>
	<Image
		{alt}
		height={IMAGE_WIDTH}
		width={IMAGE_WIDTH}
		maxWidth="100%"
		loading={lazyLoad ? 'lazy' : 'eager'}
		{slug}
		{placeholder}
		id={imageId}
		aspectRatio="1"
		{sizes}
	/>
	<div class="product-about">
		<h3><a href={`/products/${slug}`}>{name}</a></h3>
		<p>{description}</p>
	</div>
</a>
<div class="product-price-add">
	<span class="product-price"> {(price / 100).toFixed(2)}</span>
	<button class="snipcart-add-item">ADD<span class="icon" /></button>
</div>
