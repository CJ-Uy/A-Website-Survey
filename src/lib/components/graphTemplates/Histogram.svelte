<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import Chart from "chart.js/auto";

	// Props
	let { data, bins, xLabel, yLabel, title } = $props();
	let showLegend = $state(false);
	let customOptions = $state({});

	// State
	let chartCanvas = $state(null);
	let histogramChart = $state(null);

	// Default colors
	const defaultColor = "rgba(75, 192, 192, 0.7)";
	const defaultBorderColor = "rgba(75, 192, 192, 1)";

	// Function to calculate the histogram values
	function calculateHistogram(data, numBins) {
		// Convert proxy array to plain array if needed
		const plainData = [...data];

		if (!plainData || plainData.length === 0) {
			console.error("No data provided for histogram");
			return { binLabels: [], binCounts: [] };
		}

		// Find min and max of the data
		const min = Math.min(...plainData);
		const max = Math.max(...plainData);

		// Handle case where all values are the same
		if (min === max) {
			const binLabels = [`${min}`];
			const binCounts = [plainData.length];
			return { binLabels, binCounts };
		}

		// Add a small buffer to max to ensure inclusive range
		const range = max - min;
		const adjustedMax = max + range * 0.001;

		// Calculate bin width with safety check
		const binWidth = (adjustedMax - min) / numBins;

		// Create bin edges
		const binEdges = [];
		for (let i = 0; i <= numBins; i++) {
			binEdges.push(min + i * binWidth);
		}

		// Initialize bin counts - use explicit loop for safety
		const binCounts = [];
		for (let i = 0; i < numBins; i++) {
			binCounts[i] = 0;
		}

		// Count data points in each bin
		for (const value of plainData) {
			// Calculate bin index with safety bounds
			let binIndex = Math.floor((value - min) / binWidth);

			// Ensure index is within valid range
			binIndex = Math.max(0, Math.min(binIndex, numBins - 1));

			// Increment the bin count
			binCounts[binIndex]++;
		}

		// Format bin labels
		const binLabels = binEdges.slice(0, -1).map((edge, i) => {
			return `${Math.round(edge)} - ${Math.round(binEdges[i + 1])}`;
		});

		return { binLabels, binCounts };
	}

	function createOrUpdateChart() {
		if (!browser || !chartCanvas) return;

		// Destroy existing chart if it exists
		if (histogramChart) {
			histogramChart.destroy();
		}

		const ctx = chartCanvas.getContext("2d");

		// Calculate histogram data
		const { binLabels, binCounts } = calculateHistogram([...data], bins);

		// Check if we have valid data
		if (binLabels.length === 0 || binCounts.length === 0) {
			console.error("Failed to generate valid histogram data");
			return;
		}

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
						label: (context) => `Frequency: ${context.parsed.y}`
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
					title: {
						display: !!yLabel,
						text: yLabel
					},
					beginAtZero: true,
					ticks: {
						precision: 0 // Show integer values only
					}
				}
			}
		};

		// Merge with custom options
		const mergedOptions = { ...defaultOptions, ...customOptions };

		// Create new chart
		histogramChart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: binLabels,
				datasets: [
					{
						label: "Frequency",
						data: binCounts,
						backgroundColor: defaultColor,
						borderColor: defaultBorderColor,
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
		if (histogramChart) {
			histogramChart.destroy();
		}
	});
</script>

<div class="chart-container h-[100%] w-[100%]">
	<canvas bind:this={chartCanvas}></canvas>
	{#if !chartCanvas}
		<div class="loading">Loading chart...</div>
	{/if}
</div>

<style>
	.chart-container {
		position: relative;
		min-height: 300px;
		overflow: hidden;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #666;
	}
</style>
