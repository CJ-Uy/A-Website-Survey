<script>
	import PieChart from "../graphTemplates/PieChart.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Navigation</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData.navPosition?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Navigation Position"
				pieLabels={[...new Set(chartData.navPosition.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.navPosition.values)].map((v) => [
						v,
						chartData.navPosition.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.navMobileStyle?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Mobile Navigation Style"
				pieLabels={[...new Set(chartData.navMobileStyle.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.navMobileStyle.values)].map((v) => [
						v,
						chartData.navMobileStyle.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.navTransparency?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Navigation Opacity Distribution"
				data={chartData.navTransparency.values}
				xLabel="Opacity (%)"
				yLabel="Frequency"
				bins="6"
			/>
		</div>
	{/if}
</div>
