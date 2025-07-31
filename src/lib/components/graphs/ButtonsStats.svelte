<script>
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Button Styling</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	<div class="border border-gray-300">
		<div class="mr-3">
			<Histogram
				title="Button Text Size Distribution"
				data={chartData.buttonTextSize.values}
				xLabel="Font Size"
				yLabel="Frequency"
				bins="10"
			/>
			<Histogram
				title="Button Padding Distribution"
				data={chartData.buttonPadding.values}
				xLabel="px width"
				yLabel="Frequency"
				bins="10"
			/>
			<Histogram
				title="Button Gap Distribution"
				data={chartData.buttonGap.values}
				xLabel="px width"
				yLabel="Frequency"
				bins="10"
			/>
		</div>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Reset Button Background Color"
			data={chartData.buttonResetBg.values}
			pointSize="10"
			zoom="1.75"
		/>
		<ScatterPlot3D
			title="Reset Button Text Color"
			data={chartData.buttonResetTextColor.values}
			pointSize="10"
			zoom="1.75"
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Back Button Background Color"
			data={chartData.buttonBackBg.values}
			pointSize="10"
			zoom="1.75"
		/>
		<ScatterPlot3D
			title="Back Button Text Color"
			data={chartData.buttonBackTextColor.values}
			pointSize="10"
			zoom="1.75"
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Next Button Background Color"
			data={chartData.buttonNextBg.values}
			pointSize="10"
			zoom="1.75"
		/>
		<ScatterPlot3D
			title="Next Button Text Color"
			data={chartData.buttonNextTextColor.values}
			pointSize="10"
			zoom="1.75"
		/>
	</div>
</div>
