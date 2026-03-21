<script>
	import PieChart from "../graphTemplates/PieChart.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();

	const totalResponses = $derived(
		(chartData.shadowCardEnabled?.totalCount ?? 0)
	);
</script>

<h3 class="mb-3 text-center text-3xl">Shadows & Depth</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData.elevationLevel?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Elevation Level Preference"
				pieLabels={[...new Set(chartData.elevationLevel.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.elevationLevel.values)].map((v) => [
						v,
						chartData.elevationLevel.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.shadowCardEnabled}
		<div class="border border-gray-300">
			<PieChart
				title="Card Shadow Usage"
				pieLabels={["With Shadow", "Without Shadow"]}
				data={{
					withShadow: chartData.shadowCardEnabled.totalCount,
					withoutShadow: totalResponses - chartData.shadowCardEnabled.totalCount
				}}
			/>
		</div>
	{/if}
	{#if chartData.shadowBlur?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Shadow Blur Distribution"
				data={chartData.shadowBlur.values}
				xLabel="Blur (px)"
				yLabel="Frequency"
				bins="8"
			/>
		</div>
	{/if}
	{#if chartData.shadowSpread?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Shadow Spread Distribution"
				data={chartData.shadowSpread.values}
				xLabel="Spread (px)"
				yLabel="Frequency"
				bins="8"
			/>
		</div>
	{/if}
</div>
