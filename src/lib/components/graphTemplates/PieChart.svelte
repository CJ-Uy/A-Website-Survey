<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import Chart from "chart.js/auto";

	// Props
	let { title, data, pieLabels } = $props();
	let backgroundColor = []; // Colors for pie slices
	let borderColor = []; // Border colors for pie slices
	let customOptions = {}; // Additional Chart.js options

	// State
	let chartCanvas = null;
	let pieChart = null;

	// Default colors if none provided
	const defaultColors = [
		"rgba(255, 99, 132, 0.7)",
		"rgba(54, 162, 235, 0.7)",
		"rgba(255, 206, 86, 0.7)",
		"rgba(75, 192, 192, 0.7)",
		"rgba(153, 102, 255, 0.7)",
		"rgba(255, 159, 64, 0.7)"
	];

	const defaultBorders = defaultColors.map((color) => color.replace("0.7)", "1)"));

	function createOrUpdateChart() {
		if (!browser || !chartCanvas) return;

		// Destroy existing chart if it exists
		if (pieChart) {
			pieChart.destroy();
		}

		const ctx = chartCanvas.getContext("2d");

		// Extract labels and values from the data object
		const labels = Object.keys(data);
		const values = Object.values(data);

		// Use provided colors or defaults
		const bgColors = backgroundColor.length
			? backgroundColor
			: values.map((_, i) => defaultColors[i % defaultColors.length]);

		const borderColors = borderColor.length
			? borderColor
			: values.map((_, i) => defaultBorders[i % defaultBorders.length]);

		// Default chart options
		const defaultOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				title: {
					display: !!title,
					text: title,
					font: {
						size: "20rem", 
						weight: "normal",
						color: "black",
					}
				},
				legend: {
					display: true
				}
			}
		};

		// Merge with custom options
		const mergedOptions = { ...defaultOptions, ...customOptions };

		// Create new chart
		pieChart = new Chart(ctx, {
			type: "pie",
			data: {
				labels: pieLabels,
				datasets: [
					{
						data: values,
						backgroundColor: bgColors,
						borderColor: borderColors,
						borderWidth: 1
					}
				]
			},
			options: mergedOptions
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
</script>

<div class="chart-container">
	<canvas bind:this={chartCanvas}></canvas>
</div>

<style>
	.chart-container {
		position: relative;
	}
</style>
