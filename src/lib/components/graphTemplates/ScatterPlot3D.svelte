<script>
	import { onMount, onDestroy } from "svelte";
	import { browser } from "$app/environment";

	// Props
	let { data, title, pointSize = 10, zoom = 1.75 } = $props();

	// Additional customization
	let opacity = 0.8;

	// State
	let plotlyDiv = $state(null);
	let plotlyLoaded = $state(false);
	let Plotly = $state(null);
	let resizeObserver = $state(null);

	// Create or update the chart
	async function renderChart() {
		if (!browser || !plotlyDiv) return;

		try {
			// Dynamically import Plotly only in browser
			if (!Plotly) {
				Plotly = await import("plotly.js-dist-min");
			}
			plotlyLoaded = true;

			// Guard against empty/missing data
			if (!data || data.length === 0) {
				Plotly.default.purge(plotlyDiv);
				return;
			}

			// Extract data for plotting
			const plotData = [
				{
					type: "scatter3d",
					mode: "markers",
					x: data.map((point) => point.r),
					y: data.map((point) => point.g),
					z: data.map((point) => point.b),
					text: data.map((point) => {
						const r = point.r.toString(16).padStart(2, "0");
						const g = point.g.toString(16).padStart(2, "0");
						const b = point.b.toString(16).padStart(2, "0");
						return `#${r}${g}${b}`;
					}),
					marker: {
						size: pointSize,
						color: data.map((point) => `rgb(${point.r}, ${point.g}, ${point.b})`),
						opacity: opacity,
						line: {
							color: "rgba(0,0,0,0.15)",
							width: 0.5
						}
					},
					hovertemplate:
						"Hex: %{text}<br>" + "R: %{x}<br>" + "G: %{y}<br>" + "B: %{z}<br>" + "<extra></extra>"
				}
			];

			let tickvalues = [];
			if (zoom > 1.75) {
				tickvalues = [0, 100, 200];
			} else {
				tickvalues = [0, 50, 100, 150, 200, 250];
			}

			const cameraPosition = { x: zoom, y: zoom, z: zoom };

			const layout = {
				title: {
					text: title,
					font: { size: 14, weight: 600, color: "#1f2937" },
					y: 0.98,
					yanchor: "top"
				},
				scene: {
					xaxis: {
						title: {
							text: "R",
							font: { color: "rgb(220,40,40)", size: 12 }
						},
						range: [0, 255],
						tickvals: tickvalues,
						tickfont: { size: 10 },
						gridcolor: "rgba(0,0,0,0.06)",
						zerolinecolor: "rgba(0,0,0,0.1)"
					},
					yaxis: {
						title: {
							text: "G",
							font: { color: "rgb(40,180,40)", size: 12 }
						},
						range: [0, 255],
						tickvals: tickvalues,
						tickfont: { size: 10 },
						gridcolor: "rgba(0,0,0,0.06)",
						zerolinecolor: "rgba(0,0,0,0.1)"
					},
					zaxis: {
						title: {
							text: "B",
							font: { color: "rgb(40,40,220)", size: 12 }
						},
						range: [0, 255],
						tickvals: tickvalues,
						tickfont: { size: 10 },
						gridcolor: "rgba(0,0,0,0.06)",
						zerolinecolor: "rgba(0,0,0,0.1)"
					},
					camera: { eye: cameraPosition },
					aspectmode: "cube",
					aspectratio: { x: 1, y: 1, z: 1 },
					bgcolor: "rgba(0,0,0,0)"
				},
				margin: { l: 0, r: 0, b: 0, t: 30 },
				paper_bgcolor: "rgba(0,0,0,0)",
				autosize: true
			};

			const config = {
				displayModeBar: false,
				scrollZoom: true,
				responsive: true
			};

			Plotly.default.react(plotlyDiv, plotData, layout, config);
		} catch (error) {
			console.error("Error rendering Plotly chart:", error);
		}
	}

	onMount(async () => {
		if (browser) {
			await renderChart();

			// Resize observer for responsive behavior
			resizeObserver = new ResizeObserver(() => {
				if (plotlyDiv && Plotly) {
					Plotly.default.Plots.resize(plotlyDiv);
				}
			});
			if (plotlyDiv) {
				resizeObserver.observe(plotlyDiv.parentElement);
			}
		}
	});

	onDestroy(() => {
		if (resizeObserver) {
			resizeObserver.disconnect();
		}
		if (browser && plotlyDiv && Plotly) {
			Plotly.default.purge(plotlyDiv);
		}
	});

	// Re-render when data or props change
	$effect(() => {
		if (data && plotlyDiv && browser) {
			renderChart();
		}
	});
</script>

<div class="scatter-container">
	<div bind:this={plotlyDiv} class="scatter-plot"></div>
	{#if !plotlyLoaded}
		<div class="loading">
			<div class="loading-spinner"></div>
			<span>Loading 3D plot...</span>
		</div>
	{/if}
</div>

<style>
	.scatter-container {
		position: relative;
		width: 100%;
		min-height: 350px;
	}

	.scatter-plot {
		width: 100%;
		height: 350px;
	}

	.loading {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		color: #6b7280;
		font-size: 0.875rem;
	}

	.loading-spinner {
		width: 24px;
		height: 24px;
		border: 2px solid #e5e7eb;
		border-top-color: #6b7280;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
