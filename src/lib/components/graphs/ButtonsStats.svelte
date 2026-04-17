<script>
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Button Styling</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	{#if chartData?.buttonTextSize?.values || chartData?.buttonPadding?.values || chartData?.buttonGap?.values}
		<div class="border border-gray-300">
			<div class="mr-3">
				{#if chartData?.buttonTextSize?.values}
					<Histogram
						title="Button Text Size Distribution"
						data={chartData.buttonTextSize.values}
						xLabel="Font Size"
						yLabel="Frequency"
						bins={10}
					/>
				{/if}
				{#if chartData?.buttonPadding?.values}
					<Histogram
						title="Button Padding Distribution"
						data={chartData.buttonPadding.values}
						xLabel="px width"
						yLabel="Frequency"
						bins={10}
					/>
				{/if}
				{#if chartData?.buttonGap?.values}
					<Histogram
						title="Button Gap Distribution"
						data={chartData.buttonGap.values}
						xLabel="px width"
						yLabel="Frequency"
						bins={10}
					/>
				{/if}
			</div>
		</div>
	{/if}
	{#if chartData?.buttonResetBg?.values || chartData?.buttonResetTextColor?.values}
		<div class="border border-gray-300">
			{#if chartData?.buttonResetBg?.values}
				<ScatterPlot3D
					title="Reset Button Background Color"
					data={chartData.buttonResetBg.values}
					pointSize={10}
					zoom={1.75}
				/>
			{/if}
			{#if chartData?.buttonResetTextColor?.values}
				<ScatterPlot3D
					title="Reset Button Text Color"
					data={chartData.buttonResetTextColor.values}
					pointSize={10}
					zoom={1.75}
				/>
			{/if}
		</div>
	{/if}
	{#if chartData?.buttonBackBg?.values || chartData?.buttonBackTextColor?.values}
		<div class="border border-gray-300">
			{#if chartData?.buttonBackBg?.values}
				<ScatterPlot3D
					title="Back Button Background Color"
					data={chartData.buttonBackBg.values}
					pointSize={10}
					zoom={1.75}
				/>
			{/if}
			{#if chartData?.buttonBackTextColor?.values}
				<ScatterPlot3D
					title="Back Button Text Color"
					data={chartData.buttonBackTextColor.values}
					pointSize={10}
					zoom={1.75}
				/>
			{/if}
		</div>
	{/if}
	{#if chartData?.buttonNextBg?.values || chartData?.buttonNextTextColor?.values}
		<div class="border border-gray-300">
			{#if chartData?.buttonNextBg?.values}
				<ScatterPlot3D
					title="Next Button Background Color"
					data={chartData.buttonNextBg.values}
					pointSize={10}
					zoom={1.75}
				/>
			{/if}
			{#if chartData?.buttonNextTextColor?.values}
				<ScatterPlot3D
					title="Next Button Text Color"
					data={chartData.buttonNextTextColor.values}
					pointSize={10}
					zoom={1.75}
				/>
			{/if}
		</div>
	{/if}
</div>
