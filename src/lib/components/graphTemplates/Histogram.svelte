<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";
	import Chart from "chart.js/auto";

	// Props
	let { data, bins = 10, xLabel, yLabel, title, height = 300 } = $props();

	// State
	let chartCanvas = $state(null);
	let histogramChart = $state(null);

	// Gradient color matching theme
	const gradientColor = "rgba(102, 126, 234, 0.7)";
	const gradientBorder = "rgba(102, 126, 234, 1)";

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

		// Create chart with improved styling
		histogramChart = new Chart(ctx, {
			type: "bar",
			data: {
				labels: binLabels,
				datasets: [
					{
						label: "Frequency",
						data: binCounts,
						backgroundColor: gradientColor,
						borderColor: gradientBorder,
						borderWidth: 2,
						borderRadius: 4,
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
						font: { size: 14, weight: "600" },
						color: "#1f2937",
						padding: { bottom: 12 }
					},
					legend: { display: false },
					tooltip: {
						backgroundColor: "rgba(0, 0, 0, 0.8)",
						padding: 10,
						cornerRadius: 6,
						callbacks: {
							label: (ctx) => `Frequency: ${ctx.parsed.y}`
						}
					}
				},
				scales: {
					x: {
						title: {
							display: !!xLabel,
							text: xLabel,
							font: { size: 11, weight: "500" },
							color: "#6b7280"
						},
						grid: { display: false },
						ticks: {
							color: "#6b7280",
							font: { size: 10 },
							maxRotation: 45,
							minRotation: 0
						}
					},
					y: {
						title: {
							display: !!yLabel,
							text: yLabel,
							font: { size: 11, weight: "500" },
							color: "#6b7280"
						},
						beginAtZero: true,
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
		if (histogramChart) {
			histogramChart.destroy();
		}
	});

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
