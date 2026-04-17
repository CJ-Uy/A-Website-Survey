<script>
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Card Styling</h3>
<div class="grid grid-cols-1 md:grid-cols-3">
	{#if chartData?.cardBg?.values}
		<div class="border border-gray-300">
			<ScatterPlot3D
				title="Card Background Color"
				data={chartData.cardBg.values}
				pointSize={10}
				zoom={2.25}
			/>
		</div>
	{/if}
	{#if chartData?.cardTextColor?.values}
		<div class="border border-gray-300">
			<ScatterPlot3D
				title="Card Text Content Color"
				data={chartData.cardTextColor.values}
				pointSize={10}
				zoom={2.25}
			/>
		</div>
	{/if}
	{#if chartData?.cardBorderColor?.values}
		<div class="border border-gray-300">
			<ScatterPlot3D
				title="Card Border Color"
				data={chartData.cardBorderColor.values}
				pointSize={10}
				zoom={2.25}
			/>
		</div>
	{/if}
	{#if chartData?.cardWidth?.values || chartData?.cardHeight?.values}
		<div class="border border-gray-300">
			<div class="mr-3">
				{#if chartData?.cardWidth?.values}
					<Histogram
						title="Card Width Distribution"
						data={chartData.cardWidth.values}
						xLabel="Width (px)"
						yLabel="Frequency"
						bins={10}
					/>
				{/if}
				{#if chartData?.cardHeight?.values}
					<Histogram
						title="Card Height Distribution"
						data={chartData.cardHeight.values}
						xLabel="Height (px)"
						yLabel="Frequency"
						bins={10}
					/>
				{/if}
			</div>
		</div>
	{/if}
	{#if chartData?.textSubheadings?.values || chartData?.textContent?.values}
		<div class="border border-gray-300">
			<div class="mr-3">
				{#if chartData?.textSubheadings?.values}
					<Histogram
						title="Card Subheading Size Distribution"
						data={chartData.textSubheadings.values}
						xLabel="Font Size (px)"
						yLabel="Frequency"
						bins={5}
					/>
				{/if}
				{#if chartData?.textContent?.values}
					<Histogram
						title="Card Content Size Distribution"
						data={chartData.textContent.values}
						xLabel="Font Size (px)"
						yLabel="Frequency"
						bins={5}
					/>
				{/if}
			</div>
		</div>
	{/if}
	{#if chartData?.cardBorderRoundness?.values || chartData?.cardBorderWidth?.values}
		<div class="border border-gray-300">
			<div class="mr-3">
				{#if chartData?.cardBorderRoundness?.values}
					<Histogram
						title="Card Border Roundness Distribution"
						data={chartData.cardBorderRoundness.values}
						xLabel="Border Radius (px)"
						yLabel="Frequency"
						bins={5}
					/>
				{/if}
				{#if chartData?.cardBorderWidth?.values}
					<Histogram
						title="Card Border Width Distribution"
						data={chartData.cardBorderWidth.values}
						xLabel="Border Width (px)"
						yLabel="Frequency"
						bins={5}
					/>
				{/if}
			</div>
		</div>
	{/if}
</div>
