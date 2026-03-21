<script>
	import PieChart from "../graphTemplates/PieChart.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Form Styling</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData.inputBorderStyle?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Input Border Style"
				pieLabels={[...new Set(chartData.inputBorderStyle.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.inputBorderStyle.values)].map((v) => [
						v,
						chartData.inputBorderStyle.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.checkboxStyle?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Checkbox / Radio Style"
				pieLabels={[...new Set(chartData.checkboxStyle.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.checkboxStyle.values)].map((v) => [
						v,
						chartData.checkboxStyle.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.inputBorderRadius?.values}
		<div class="border border-gray-300">
			<Histogram
				title="Input Border Radius Distribution"
				data={chartData.inputBorderRadius.values}
				xLabel="Border Radius (px)"
				yLabel="Frequency"
				bins="6"
			/>
		</div>
	{/if}
</div>
