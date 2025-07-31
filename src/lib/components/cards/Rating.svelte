<script>
	import { userStyles } from "$lib/state/userStyles.svelte";

	let stars = $derived(Array.from({ length: userStyles.rating }, (_, i) => i + 1));
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<h2 class="cardTitle">Rate the Survey</h2>

	<div class="text-7xl mt-5 mb-3">
		{#if userStyles.rating == 1}
			😡
		{:else if userStyles.rating == 2}
			😞
		{:else if userStyles.rating == 3}
			😐
		{:else if userStyles.rating == 4}
			🙂
		{:else if userStyles.rating == 5}
			😍
		{/if}
	</div>

	<div class="text-3xl">
		{#each stars as star}
			<span class="star">⭐</span>
		{/each}
	</div>

	<input class="mt-10" type="range" min="1" max="5" bind:value={userStyles.rating} />
</div>
