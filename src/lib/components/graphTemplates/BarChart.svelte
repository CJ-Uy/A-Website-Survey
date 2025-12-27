<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import Chart from "chart.js/auto";

	// Props
	let { data, title, xLabel, yLabel, labels, height = 300, datasetLabel = "" } = $props();

	// State
	let chartCanvas = $state(null);
	let barChart = $state(null);

	// Beautiful gradient color palette matching the theme
	const colors = [
		{ bg: "rgba(102, 126, 234, 0.7)", border: "rgba(102, 126, 234, 1)" },
		{ bg: "rgba(118, 75, 162, 0.7)", border: "rgba(118, 75, 162, 1)" },
		{ bg: "rgba(34, 197, 94, 0.7)", border: "rgba(34, 197, 94, 1)" },
		{ bg: "rgba(249, 115, 22, 0.7)", border: "rgba(249, 115, 22, 1)" },
		{ bg: "rgba(236, 72, 153, 0.7)", border: "rgba(236, 72, 153, 1)" },
		{ bg: "rgba(14, 165, 233, 0.7)", border: "rgba(14, 165, 233, 1)" },
		{ bg: "rgba(168, 85, 247, 0.7)", border: "rgba(168, 85, 247, 1)" }
	];

	function createOrUpdateChart() {
		if (!browser || !chartCanvas) return;

		if (barChart) {
			barChart.destroy();
		}

		const ctx = chartCanvas.getContext("2d");
		const bgColors = labels.map((_, i) => colors[i % colors.length].bg);
		const borderColors = labels.map((_, i) => colors[i % colors.length].border);

		barChart = new Chart(ctx, {
			type: "bar",
			data: {
				labels,
				datasets: [
					{
						label: datasetLabel,
						data,
						backgroundColor: bgColors,
						borderColor: borderColors,
						borderWidth: 2,
						borderRadius: 6,
						borderSkipped: false
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: !!title,
						text: title,
						font: { size: 16, weight: "600" },
						color: "#1f2937",
						padding: { bottom: 16 }
					},
					legend: { display: false },
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						padding: 12,
						cornerRadius: 8,
						titleFont: { size: 14, weight: "600" },
						bodyFont: { size: 13 },
						callbacks: {
							label: (ctx) => `${datasetLabel || "Count"}: ${ctx.parsed.y}`
						}
					}
				},
				scales: {
					x: {
						title: {
							display: !!xLabel,
							text: xLabel,
							font: { size: 12, weight: "500" },
							color: "#6b7280"
						},
						grid: { display: false },
						ticks: { color: "#6b7280" }
					},
					y: {
						beginAtZero: true,
						title: {
							display: !!yLabel,
							text: yLabel,
							font: { size: 12, weight: "500" },
							color: "#6b7280"
						},
						grid: { color: "rgba(0, 0, 0, 0.05)" },
						ticks: { precision: 0, color: "#6b7280" }
					}
				}
			}
		});
	}

	onMount(() => {
		if (browser) {
			createOrUpdateChart();
		}
	});

	onDestroy(() => {
		if (barChart) {
			barChart.destroy();
		}
	});

	$effect(() => {
		if (data && labels && chartCanvas && browser) {
			createOrUpdateChart();
		}
	});
</script>

<div class="chart-container" style="height: {height}px;">
	<canvas bind:this={chartCanvas}></canvas>
</div>

<style>
	.chart-container {
		position: relative;
		width: 100%;
	}
</style>
