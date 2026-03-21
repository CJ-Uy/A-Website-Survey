<script>
	import PieChart from "../graphTemplates/PieChart.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Images & Media</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData.mediaStyle?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Media Shape Preference"
				pieLabels={[...new Set(chartData.mediaStyle.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.mediaStyle.values)].map((v) => [
						v,
						chartData.mediaStyle.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.imageAspectRatio?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Aspect Ratio Preference"
				pieLabels={[...new Set(chartData.imageAspectRatio.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.imageAspectRatio.values)].map((v) => [
						v,
						chartData.imageAspectRatio.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.imageBorderRadius?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Image Border Radius Distribution"
				data={chartData.imageBorderRadius.values}
				xLabel="Border Radius (px)"
				yLabel="Frequency"
				bins="8"
			/>
		</div>
	{/if}
</div>
