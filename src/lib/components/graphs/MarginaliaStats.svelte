<script>
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";
	import PieChart from "../graphTemplates/PieChart.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();

	const totalResponses = $derived(
		(chartData?.bgTypeSolid?.totalCount ?? 0) + (chartData?.bgTypeGradient?.totalCount ?? 0)
	);
</script>

<h3 class="mb-3 text-center text-3xl">Marginalia Styling</h3>
<div class="grid grid-cols-1 md:grid-cols-3">
	{#if chartData?.headerOwnBg}
		<div class="border border-gray-300">
			<PieChart
				title="# of Headers with Backgrounds"
				pieLabels={["w/ Own Background", "Uses Page Background"]}
				data={{
					ownBackground: chartData.headerOwnBg.totalCount ?? 0,
					pageBackground: totalResponses - (chartData.headerOwnBg.totalCount ?? 0)
				}}
			/>
		</div>
	{/if}
	{#if chartData?.textSurveyTitle?.values}
		<div class="border border-gray-300">
			<div class="mr-3">
				<Histogram
					title="Survey Title Size Distribution"
					data={chartData.textSurveyTitle.values}
					xLabel="Font Size"
					yLabel="Frequency"
					bins={5}
				/>
			</div>
		</div>
	{/if}
	{#if chartData?.footerOwnBg}
		<div class="border border-gray-300">
			<PieChart
				title="# of Footers with Backgrounds"
				pieLabels={["w/ Own Background", "Uses Page Background"]}
				data={{
					ownBackground: chartData.footerOwnBg.totalCount ?? 0,
					pageBackground: totalResponses - (chartData.footerOwnBg.totalCount ?? 0)
				}}
			/>
		</div>
	{/if}
	{#if chartData?.headerBg?.values}
		<div class="border border-gray-300">
			<ScatterPlot3D
				title="Header Background"
				data={chartData.headerBg.values}
				pointSize="10"
				zoom="2.5"
			/>
		</div>
	{/if}
	{#if chartData?.textCardTitle?.values}
		<div class="flex justify-center border border-gray-300">
			<div class="mr-3">
				<Histogram
					title="Card Title Size Distribution"
					data={chartData.textCardTitle.values}
					xLabel="Font Size"
					yLabel="Frequency"
					bins={5}
				/>
			</div>
		</div>
	{/if}
	{#if chartData?.footerBg?.values}
		<div class="border border-gray-300">
			<ScatterPlot3D
				title="Footer Background"
				data={chartData.footerBg.values}
				pointSize="10"
				zoom="2.5"
			/>
		</div>
	{/if}
</div>
