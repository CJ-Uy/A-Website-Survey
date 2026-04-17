<script>
	import BarChart from "../graphTemplates/BarChart.svelte";

	const { chartData } = $props();

	const ratingLabels = ["1", "2", "3", "4", "5"];
	const ratingData = $derived(
		ratingLabels.map((key) => chartData?.ratingsCount?.[key] ?? 0)
	);
</script>

<h3 class="mb-3 text-center text-3xl">Rating</h3>
<div>
	<BarChart
		title="Ratings"
		xLabel="Rating"
		yLabel="Frequency"
		labels={ratingLabels}
		data={ratingData}
		datasetLabel="Responses"
	/>
</div>
