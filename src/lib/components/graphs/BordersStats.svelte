<script>
	import PieChart from "../graphTemplates/PieChart.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Borders & Dividers</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData.dividerStyle?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Divider Style Preference"
				pieLabels={[...new Set(chartData.dividerStyle.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.dividerStyle.values)].map((v) => [
						v,
						chartData.dividerStyle.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.dividerThickness?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Divider Thickness Distribution"
				data={chartData.dividerThickness.values}
				xLabel="Thickness (px)"
				yLabel="Frequency"
				bins="5"
			/>
		</div>
	{/if}
	{#if chartData.sectionGap?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Section Gap Distribution"
				data={chartData.sectionGap.values}
				xLabel="Gap (px)"
				yLabel="Frequency"
				bins="8"
			/>
		</div>
	{/if}
</div>
