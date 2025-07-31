<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import Chart from "chart.js/auto";

	// Props
	let { data, title, xLabel, yLabel, labels } = $props();
	let backgroundColor = $state([]); // Colors for bars
	let borderColor = $state([]); // Border colors
	let beginAtZero = $state(true);
	let stepSize = $state(undefined);
	let datasetLabel = $state(""); // Label for the dataset
	let showLegend = $state(false);
	let customOptions = $state({}); // Additional Chart.js options

	// State
	let chartCanvas = $state(null);
	let barChart = $state(null);

	// Default colors if none provided
	const defaultColors = [
		"rgba(75, 192, 192, 0.7)",
		"rgba(255, 99, 132, 0.7)",
		"rgba(255, 159, 64, 0.7)",
		"rgba(255, 205, 86, 0.7)",
		"rgba(54, 162, 235, 0.7)",
		"rgba(153, 102, 255, 0.7)",
		"rgba(201, 203, 207, 0.7)"
	];

	const defaultBorders = defaultColors.map((color) => color.replace("0.7)", "1)"));

	function createOrUpdateChart() {
		if (!browser || !chartCanvas) return;

		// Destroy existing chart if it exists
		if (barChart) {
			barChart.destroy();
		}

		const ctx = chartCanvas.getContext("2d");

		// Use provided colors or defaults
		const bgColors = backgroundColor.length
			? backgroundColor
			: labels.map((_, i) => defaultColors[i % defaultColors.length]);

		const borderColors = borderColor.length
			? borderColor
			: labels.map((_, i) => defaultBorders[i % defaultBorders.length]);

		// Default chart options
		const defaultOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				title: {
					display: !!title,
					text: title
				},
				legend: {
					display: showLegend
				},
				tooltip: {
					callbacks: {
						label: (context) => `${datasetLabel || 'Value'}: ${context.parsed.y}`
					}
				}
			},
			scales: {
				x: {
					title: {
						display: !!xLabel,
						text: xLabel
					}
				},
				y: {
					beginAtZero,
					title: {
						display: !!yLabel,
						text: yLabel
					},
					ticks: {
						precision: 0, // Show integer values only
						stepSize: stepSize
					}
				}
			}
		};

		// Merge with custom options
		const mergedOptions = { ...defaultOptions, ...customOptions };

		// Create new chart
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
		if (barChart) {
			barChart.destroy();
		}
	});
</script>

<div class="chart-container">
	<canvas bind:this={chartCanvas}></canvas>
	{#if !chartCanvas}
		<div class="loading">Loading chart...</div>
	{/if}
</div>

<style>
	.chart-container {
		position: relative;
		min-height: 300px;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #666;
	}
</style>