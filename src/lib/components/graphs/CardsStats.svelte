<script>
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";
	import Histogram from "../graphTemplates/Histogram.svelte";

	const { chartData } = $props();
</script>

<h3 class="mb-3 text-center text-3xl">Card Styling</h3>
<div class="grid grid-cols-1 md:grid-cols-3">
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Card Background Color"
			data={chartData.cardBg.values}
			pointSize="10"
			zoom="2.25"
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Card Text Content Color"
			data={chartData.cardTextColor.values}
			pointSize="10"
			zoom="2.25"
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Card Border Color"
			data={chartData.cardBorderColor.values}
			pointSize="10"
			zoom="2.25"
		/>
	</div>
	<div class="border border-gray-300">
		<div class="mr-3">
			<Histogram
				title="Card Width Distribution"
				data={chartData.cardWidth.values}
				xLabel="Font Size"
				yLabel="Frequency"
				bins="10"
			/>
			<Histogram
				title="Card Height Distribution"
				data={chartData.cardHeight.values}
				xLabel="Font Size"
				yLabel="Frequency"
				bins="10"
			/>
		</div>
	</div>
	<div class="border border-gray-300">
		<div class="mr-3">
			<Histogram
				title="Card Subheading Size Distribution"
				data={chartData.textSubheadings.values}
				xLabel="Font Size"
				yLabel="Frequency"
				bins="5"
			/>
			<Histogram
				title="Card Content Size Distribution"
				data={chartData.textContent.values}
				xLabel="Font Size"
				yLabel="Frequency"
				bins="5"
			/>
		</div>
	</div>
	<div class="border border-gray-300">
		<div class="mr-3">
			<Histogram
				title="Card Subheading Size Distribution"
				data={chartData.cardBorderRoundness.values}
				xLabel="Font Size"
				yLabel="Frequency"
				bins="5"
			/>
			<Histogram
				title="Card Content Size Distribution"
				data={chartData.cardBorderWidth.values}
				xLabel="Font Size"
				yLabel="Frequency"
				bins="5"
			/>
		</div>
	</div>
</div>
