<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center">
		<h2 class="font-bold">Content Portal</h2>
		<!-- Animated Logo -->
		<figure>
			<section class="img-bg" />
			<svg class="fill-token" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
				<path
					d="M2.94606 5.64302C6.08852 12.331 61.0816 113.696 62.0636 114.532C62.8493 115.368 72.8659 96.7673 72.8659 94.4683C72.8659 92.3783 26.9073 7.10602 23.3721 2.50801C22.1936 1.045 16.8907 0 10.8022 0H0L2.94606 5.64302Z"
					fill="#E8E8E8"
				/>
				<path
					d="M41.6374 4.59796C43.9943 9.61397 80.9182 77.9572 81.7038 79.0022C82.4895 80.0472 92.5061 60.1921 92.3096 57.6841C92.3096 56.4301 85.4355 43.0541 77.1865 28.215L62.0634 1.04495L50.672 0.417947C39.2806 -0.209055 39.2806 -0.209055 41.6374 4.59796Z"
					fill="#E8E8E8"
				/>
				<path
					d="M127.073 26.125C120.003 39.292 114.111 50.996 114.111 52.25C114.111 53.7131 117.842 54.3401 124.324 53.9221L134.733 53.2951L142 39.919C145.928 32.604 150.249 25.498 151.428 24.244C154.177 21.318 167.533 20.9 166.747 24.035C166.354 25.289 161.248 35.321 155.356 46.607L144.553 66.8801H104.683L87.7926 98.6482L70.9019 130.207L85.8286 158.213C94.0775 173.679 101.344 185.592 101.934 185.174C102.327 184.547 112.54 166.364 124.324 144.837L145.535 105.545L135.519 104.918C129.823 104.5 124.52 105.127 123.538 106.172C122.36 107.426 117.45 115.995 112.147 125.609C107.04 135.223 102.13 142.956 101.344 142.747C100.559 142.747 98.202 139.821 96.238 136.477L92.8991 130.625L104.094 109.725L115.486 88.8251L155.945 86.7351L177.353 47.025C189.333 25.08 199.35 6.06092 199.939 4.59792C200.725 2.71691 194.047 2.08991 170.479 2.08991H140.232L127.073 26.125Z"
					fill="#E8E8E8"
				/>
			</svg>
		</figure>
		<!-- <div class="flex justify-center space-x-2">
			<a class="btn btn-filled" href="https://skeleton.dev/" target="_blank" rel="noreferrer"
				>Launch Documentation</a
			>
		</div> -->
		<!-- <div class="space-y-2">
			<p>Try editing the following:</p>
			<p><code>/src/routes/+layout.svelte</code></p>
			<p><code>/src/routes/+page.svelte</code></p>
		</div> -->
	</div>

	<style lang="postcss">
		figure {
			@apply flex relative flex-col;
		}
		figure svg,
		.img-bg {
			@apply w-64 h-64 md:w-80 md:h-80;
		}
		.img-bg {
			@apply bg-gradient-to-r from-primary-300 to-warning-300;
			@apply absolute z-[-1] rounded-full blur-[64px];
			animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite;
		}
		@keyframes pulse {
			50% {
				transform: scale(1.5);
			}
		}
	</style>
</div>
