<script>
	import ScatterPlot3D from "../graphTemplates/ScatterPlot3D.svelte";
	import PieChart from "../graphTemplates/PieChart.svelte";
	import { mean, median, mode } from "mathjs";

	const { chartData } = $props();

	/** @param {string} key */
	function safeValues(key) {
		return chartData?.[key]?.values ?? [];
	}

	/** @param {(v: number[]) => unknown} fn @param {number[]} values */
	function safeStat(fn, values) {
		if (!values || values.length === 0) return "—";
		try {
			const result = fn(values);
			return Array.isArray(result) ? result.join(", ") : Number(result).toFixed(2);
		} catch {
			return "—";
		}
	}

	const gradientAngles = $derived(safeValues("bgGradientAngle"));
</script>

<h3 class="mb-3 text-center text-3xl">Background Color</h3>
<div class="grid grid-cols-1 md:grid-cols-2">
	<div class="border border-gray-300">
		<PieChart
			title="# of Solid & Gradient Backgrounds"
			pieLabels={["Solid Backgrounds", "Gradient Backgrounds"]}
			data={{
				solidCount: chartData?.bgTypeSolid?.totalCount ?? 0,
				gradientCount: chartData?.bgTypeGradient?.totalCount ?? 0
			}}
		/>
		{#if gradientAngles.length > 0}
			<div class="mt-5 text-center">
				<h4 class="font-bold">Gradient Angle (°)</h4>
				<p>Average : {safeStat(mean, gradientAngles)}</p>
				<p>Median : {safeStat(median, gradientAngles)}</p>
				<p>Mode : {safeStat(mode, gradientAngles)}</p>
			</div>
		{/if}
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Solid Background Colors"
			data={safeValues("bgSolidColor")}
			pointSize={10}
			zoom={1.75}
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Starting Gradient Background Colors"
			data={safeValues("bgGradientStartColor")}
			pointSize={10}
			zoom={1.75}
		/>
	</div>
	<div class="border border-gray-300">
		<ScatterPlot3D
			title="Ending Gradient Background Colors"
			data={safeValues("bgGradientEndColor")}
			pointSize={10}
			zoom={1.75}
		/>
	</div>
</div>
