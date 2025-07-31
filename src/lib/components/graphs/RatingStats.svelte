<script>
	import BarChart from "../graphTemplates/BarChart.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Rating</h3>
<div>
	<BarChart 
		title="Ratings"
		xLabel="Rating"
		yLabel="Frequency"
		labels={["1", "2", "3", "4", "5"]}
		data={chartData.ratingsCount}
	/>
</div>
