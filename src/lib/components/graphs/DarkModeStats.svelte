<script>
	import PieChart from "../graphTemplates/PieChart.svelte";
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Dark Mode</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData.darkModePreference?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Theme Preference"
				pieLabels={[...new Set(chartData.darkModePreference.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.darkModePreference.values)].map((v) => [
						v,
						chartData.darkModePreference.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
	{#if chartData.darkShade?.values}
		<div class="border border-gray-300">
			<PieChart
				title="Dark Shade Preference"
				pieLabels={[...new Set(chartData.darkShade.values)]}
				data={Object.fromEntries(
					[...new Set(chartData.darkShade.values)].map((v) => [
						v,
						chartData.darkShade.values.filter((x) => x === v).length
					])
				)}
			/>
		</div>
	{/if}
</div>
