<script>
	import { onMount } from "svelte";
	import BgStats from "$lib/components/graphs/BgStats.svelte";
	import CardsStats from "$lib/components/graphs/CardsStats.svelte";
	import MarginaliaStats from "$lib/components/graphs/MarginaliaStats.svelte";
	import ButtonsStats from "$lib/components/graphs/ButtonsStats.svelte";
	import RatingStats from "$lib/components/graphs/RatingStats.svelte";
	import ShadowsStats from "$lib/components/graphs/ShadowsStats.svelte";
	import BordersStats from "$lib/components/graphs/BordersStats.svelte";
	import SpacingStats from "$lib/components/graphs/SpacingStats.svelte";
	import MediaStats from "$lib/components/graphs/MediaStats.svelte";
	import DarkModeStats from "$lib/components/graphs/DarkModeStats.svelte";
	import NavigationStats from "$lib/components/graphs/NavigationStats.svelte";
	import FormStylingStats from "$lib/components/graphs/FormStylingStats.svelte";
	import { goto } from "$app/navigation";

	let chartData = $state({});
	let isLoading = $state(true);
	let loadingProgress = $state(0);
	let sectionsVisible = $state(new Array(12).fill(false));

	const sections = [
		{ id: "rating", label: "Ratings" },
		{ id: "bg", label: "Backgrounds" },
		{ id: "cards", label: "Cards" },
		{ id: "marginalia", label: "Marginalia" },
		{ id: "buttons", label: "Buttons" },
		{ id: "shadows", label: "Shadows" },
		{ id: "borders", label: "Borders" },
		{ id: "spacing", label: "Spacing" },
		{ id: "media", label: "Media" },
		{ id: "darkmode", label: "Dark Mode" },
		{ id: "navigation", label: "Navigation" },
		{ id: "forms", label: "Forms" }
	];

	let activeSection = $state("rating");

	onMount(async () => {
		const progressInterval = setInterval(() => {
			loadingProgress = Math.min(loadingProgress + Math.random() * 15, 90);
		}, 200);

		await new Promise((resolve) => setTimeout(resolve, 1500));

		try {
			const response = await fetch("/api/stats");
			const data = await response.json();
			loadingProgress = 100;
			clearInterval(progressInterval);

			await new Promise((resolve) => setTimeout(resolve, 300));
			chartData = data;
			isLoading = false;

			sectionsVisible = sectionsVisible.map((_, i) => {
				setTimeout(() => {
					sectionsVisible[i] = true;
					sectionsVisible = [...sectionsVisible];
				}, i * 150);
				return false;
			});
		} catch (error) {
			console.error("Error fetching data:", error);
			clearInterval(progressInterval);
			isLoading = false;
		}
	});

	function scrollToSection(id) {
		activeSection = id;
		const element = document.getElementById(`section-${id}`);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}
</script>

<div class="stats-page">
	<header class="stats-header">
		<h1>Survey Results</h1>
		<p>See what everyone chose</p>
	</header>

	{#if isLoading}
		<div class="loading-container">
			<div class="loading-card">
				<h2>Crunching the numbers...</h2>
				<div class="loading-bar">
					<div class="loading-fill" style="width: {loadingProgress}%"></div>
				</div>
				<p>{Math.round(loadingProgress)}%</p>
			</div>
		</div>
	{:else if chartData?.status === "success"}
		<nav class="stats-nav">
			<div class="nav-container">
				{#each sections as section}
					<button
						class="nav-tab"
						class:active={activeSection === section.id}
						onclick={() => scrollToSection(section.id)}
					>
						{section.label}
					</button>
				{/each}
			</div>
		</nav>

		<main class="stats-content">
			<section id="section-rating" class="stats-section" class:visible={sectionsVisible[0]}>
				<RatingStats chartData={chartData.data} />
			</section>

			<section id="section-bg" class="stats-section" class:visible={sectionsVisible[1]}>
				<BgStats chartData={chartData.data} />
			</section>

			<section id="section-cards" class="stats-section" class:visible={sectionsVisible[2]}>
				<CardsStats chartData={chartData.data} />
			</section>

			<section id="section-marginalia" class="stats-section" class:visible={sectionsVisible[3]}>
				<MarginaliaStats chartData={chartData.data} />
			</section>

			<section id="section-buttons" class="stats-section" class:visible={sectionsVisible[4]}>
				<ButtonsStats chartData={chartData.data} />
			</section>

			<section id="section-shadows" class="stats-section" class:visible={sectionsVisible[5]}>
				<ShadowsStats chartData={chartData.data} />
			</section>

			<section id="section-borders" class="stats-section" class:visible={sectionsVisible[6]}>
				<BordersStats chartData={chartData.data} />
			</section>

			<section id="section-spacing" class="stats-section" class:visible={sectionsVisible[7]}>
				<SpacingStats chartData={chartData.data} />
			</section>

			<section id="section-media" class="stats-section" class:visible={sectionsVisible[8]}>
				<MediaStats chartData={chartData.data} />
			</section>

			<section id="section-darkmode" class="stats-section" class:visible={sectionsVisible[9]}>
				<DarkModeStats chartData={chartData.data} />
			</section>

			<section id="section-navigation" class="stats-section" class:visible={sectionsVisible[10]}>
				<NavigationStats chartData={chartData.data} />
			</section>

			<section id="section-forms" class="stats-section" class:visible={sectionsVisible[11]}>
				<FormStylingStats chartData={chartData.data} />
			</section>
		</main>
	{:else}
		<div class="error-container">
			<h2>Something went wrong</h2>
			<p>We couldn't load the statistics. Please try again.</p>
			<button onclick={() => window.location.reload()}>Try Again</button>
		</div>
	{/if}

	<footer class="stats-footer">
		<h2>Want to contribute?</h2>
		<p>Take the survey and add your preferences to the data!</p>
		<button onclick={() => goto("/")}>Retake the Survey</button>
	</footer>
</div>

<style>
	.stats-page {
		min-height: 100vh;
	}

	.stats-header {
		padding: 2rem 1rem;
		text-align: center;
	}

	.stats-header h1 {
		margin: 0;
	}

	.stats-header p {
		margin-top: 0.5rem;
		color: #666;
	}

	/* Loading */
	.loading-container {
		display: flex;
		justify-content: center;
		padding: 4rem 2rem;
	}

	.loading-card {
		text-align: center;
		max-width: 400px;
		width: 100%;
	}

	.loading-bar {
		height: 8px;
		background: #e5e7eb;
		margin-top: 1rem;
	}

	.loading-fill {
		height: 100%;
		background: #333;
		transition: width 0.3s ease;
	}

	/* Navigation */
	.stats-nav {
		position: sticky;
		top: 0;
		z-index: 100;
		background: #fff;
		border-bottom: 1px solid #ddd;
	}

	.nav-container {
		display: flex;
		justify-content: center;
		gap: 0.25rem;
		padding: 0.5rem;
		overflow-x: auto;
		max-width: 900px;
		margin: 0 auto;
	}

	.nav-tab {
		padding: 0.4rem 0.75rem;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		white-space: nowrap;
		font-size: 0.85rem;
	}

	.nav-tab:hover {
		border-color: #666;
	}

	.nav-tab.active {
		background: #333;
		color: #fff;
		border-color: #333;
	}

	/* Content */
	.stats-content {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	.stats-section {
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.4s ease;
		margin-bottom: 3rem;
	}

	.stats-section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* Error */
	.error-container {
		text-align: center;
		padding: 4rem 2rem;
	}

	/* Footer */
	.stats-footer {
		padding: 2rem;
		text-align: center;
		border-top: 1px solid #ddd;
	}

	.stats-footer button {
		margin-top: 1rem;
		padding: 0.5rem 1.5rem;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.nav-container {
			justify-content: flex-start;
			padding: 0.25rem;
		}

		.nav-tab {
			padding: 0.3rem 0.5rem;
			font-size: 0.75rem;
		}

		.stats-content {
			padding: 0.75rem;
		}
	}
</style>
