<script>
	import PieChart from "../graphTemplates/PieChart.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Spacing & Density</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData.spacingDensity?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Content Density Preference"
				pieLabels={[...new Set(chartData.spacingDensity.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.spacingDensity.values)].map((v) => [
						v,
						chartData.spacingDensity.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.paragraphGap?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Paragraph Gap Distribution"
				data={chartData.paragraphGap.values}
				xLabel="Gap (px)"
				yLabel="Frequency"
				bins="8"
			/>
		</div>
	{/if}
	{#if chartData.sectionSpacing?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Section Spacing Distribution"
				data={chartData.sectionSpacing.values}
				xLabel="Spacing (px)"
				yLabel="Frequency"
				bins="8"
			/>
		</div>
	{/if}
	{#if chartData.innerPadding?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Inner Padding Distribution"
				data={chartData.innerPadding.values}
				xLabel="Padding (px)"
				yLabel="Frequency"
				bins="8"
			/>
		</div>
	{/if}
</div>
