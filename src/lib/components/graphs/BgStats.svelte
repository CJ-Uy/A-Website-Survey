<script>
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";
	import PieChart from "../graphTemplates/PieChart.svelte";
	import { mean, median, mode } from "mathjs";

	const { chartData } = $props();
</script>

<!-- Large screens -->

<h3 class="mb-3 text-center text-3xl">Background Color</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	<div class="border border-gray-300">
		<PieChart
			title="# of Solid & Gradient Backgrounds"
			pieLabels={["Solid Backgrounds", "Gradient Backgrounds"]}
			data={{
				solidCount: chartData.bgTypeSolid.totalCount,
				gradientCount: chartData.bgTypeGradient.totalCount
			}}
		/>
		<div class="mt-5 text-center">
			<h4 class="font-bold">Gradient Angle (°)</h4>
			<p>
				Average : {mean(chartData.bgGradientAngle.values).toFixed(2)}
			</p>
			<p>
				Median : {median(chartData.bgGradientAngle.values)}
			</p>
			<p>
				Mode : {mode(chartData.bgGradientAngle.values)}
			</p>
		</div>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Solid Background Colors"
			data={chartData.bgSolidColor.values}
			pointSize="10"
			zoom="1.75"
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Starting Gradient Background Colors"
			data={chartData.bgGradientStartColor.values}
			pointSize="10"
			zoom="1.75"
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Ending Gradient Background Colors"
			data={chartData.bgGradientEndColor.values}
			pointSize="10"
			zoom="1.75"
		/>
	</div>
</div>
