<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import Chart from "chart.js/auto";

	// Props
	let { title, data, pieLabels, height = 300 } = $props();

	// State
	let chartCanvas = $state(null);
	let pieChart = $state(null);

	// Beautiful color palette for charts
	const colors = [
		{ bg: "rgba(102, 126, 234, 0.7)", border: "rgba(102, 126, 234, 1)" },
		{ bg: "rgba(118, 75, 162, 0.7)", border: "rgba(118, 75, 162, 1)" },
		{ bg: "rgba(34, 197, 94, 0.7)", border: "rgba(34, 197, 94, 1)" },
		{ bg: "rgba(249, 115, 22, 0.7)", border: "rgba(249, 115, 22, 1)" },
		{ bg: "rgba(236, 72, 153, 0.7)", border: "rgba(236, 72, 153, 1)" },
		{ bg: "rgba(14, 165, 233, 0.7)", border: "rgba(14, 165, 233, 1)" }
	];

	function createOrUpdateChart() {
		if (!browser || !chartCanvas) return;

		if (pieChart) {
			pieChart.destroy();
		}

		const ctx = chartCanvas.getContext("2d");
		const values = Object.values(data);
		const bgColors = values.map((_, i) => colors[i % colors.length].bg);
		const borderColors = values.map((_, i) => colors[i % colors.length].border);

		pieChart = new Chart(ctx, {
			type: "pie",
			data: {
				labels: pieLabels,
				datasets: [
					{
						data: values,
						backgroundColor: bgColors,
						borderColor: borderColors,
						borderWidth: 2
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
					legend: {
						display: true,
						position: "bottom",
						labels: {
							padding: 16,
							usePointStyle: true,
							font: { size: 12 }
						}
					},
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						padding: 12,
						cornerRadius: 8,
						titleFont: { size: 14, weight: "600" },
						bodyFont: { size: 13 }
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
		if (pieChart) {
			pieChart.destroy();
		}
	});

	// Reactively update chart when data changes
	$effect(() => {
		if (data && chartCanvas && browser) {
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
