<script>
	import { goto } from "$app/navigation";
</script>

<div class="landing">
	<h1>A Website Survey</h1>
	<p>Design your ideal website. Watch it come to life as you choose.</p>
	<button onclick={() => goto("/survey")}>Start Survey</button>
</div>

<style>
	.landing {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 1rem;
	}

	p {
		margin-bottom: 2rem;
	}
</style>
