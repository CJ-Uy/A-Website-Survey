<script>
	import { onMount } from "svelte";
	import BgStats from "$lib/components/graphs/BgStats.svelte";
	import CardsStats from "$lib/components/graphs/CardsStats.svelte";
	import MarginaliaStats from "$lib/components/graphs/MarginaliaStats.svelte";
	import ButtonsStats from "$lib/components/graphs/ButtonsStats.svelte";
	import RatingStats from "$lib/components/graphs/RatingStats.svelte";
	import { goto } from "$app/navigation";

	let chartData = $state({});
	let isLoading = $state(true);
	let loadingProgress = $state(0);
	let sectionsVisible = $state([false, false, false, false, false]);

	const sections = [
		{ id: "rating", label: "Ratings", icon: "⭐" },
		{ id: "bg", label: "Backgrounds", icon: "🎨" },
		{ id: "cards", label: "Cards", icon: "🃏" },
		{ id: "marginalia", label: "Marginalia", icon: "📐" },
		{ id: "buttons", label: "Buttons", icon: "🔘" }
	];

	let activeSection = $state("rating");

	onMount(async () => {
		// Animated loading progress
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

			// Stagger the section animations
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
	<!-- Hero Header -->
	<header class="stats-header">
		<div class="header-bg"></div>
		<div class="header-content">
			<h1 class="stats-title">Survey Results</h1>
			<p class="stats-subtitle">See what everyone chose</p>
		</div>
	</header>

	{#if isLoading}
		<!-- Loading State -->
		<div class="loading-container">
			<div class="loading-card">
				<div class="loading-icon">📊</div>
				<h2 class="loading-title">Crunching the numbers...</h2>
				<div class="loading-bar">
					<div class="loading-fill" style="width: {loadingProgress}%"></div>
				</div>
				<p class="loading-percent">{Math.round(loadingProgress)}%</p>
			</div>
		</div>
	{:else if chartData?.status === "success"}
		<!-- Navigation Tabs -->
		<nav class="stats-nav">
			<div class="nav-container">
				{#each sections as section}
					<button
						class="nav-tab"
						class:active={activeSection === section.id}
						onclick={() => scrollToSection(section.id)}
					>
						<span class="nav-icon">{section.icon}</span>
						<span class="nav-label">{section.label}</span>
					</button>
				{/each}
			</div>
		</nav>

		<!-- Stats Sections -->
		<main class="stats-content">
			<section id="section-rating" class="stats-section" class:visible={sectionsVisible[0]}>
				<div class="section-card">
					<RatingStats chartData={chartData.data} />
				</div>
			</section>

			<section id="section-bg" class="stats-section" class:visible={sectionsVisible[1]}>
				<div class="section-card">
					<BgStats chartData={chartData.data} />
				</div>
			</section>

			<section id="section-cards" class="stats-section" class:visible={sectionsVisible[2]}>
				<div class="section-card">
					<CardsStats chartData={chartData.data} />
				</div>
			</section>

			<section id="section-marginalia" class="stats-section" class:visible={sectionsVisible[3]}>
				<div class="section-card">
					<MarginaliaStats chartData={chartData.data} />
				</div>
			</section>

			<section id="section-buttons" class="stats-section" class:visible={sectionsVisible[4]}>
				<div class="section-card">
					<ButtonsStats chartData={chartData.data} />
				</div>
			</section>
		</main>
	{:else}
		<div class="error-container">
			<div class="error-card">
				<div class="error-icon">😕</div>
				<h2>Something went wrong</h2>
				<p>We couldn't load the statistics. Please try again.</p>
				<button class="retry-btn" onclick={() => window.location.reload()}> Try Again </button>
			</div>
		</div>
	{/if}

	<!-- Footer CTA -->
	<footer class="stats-footer">
		<div class="cta-card">
			<h2 class="cta-title">Want to contribute?</h2>
			<p class="cta-text">Take the survey and add your preferences to the data!</p>
			<button class="cta-btn" onclick={() => goto("/")}>
				<span>Retake the Survey</span>
				<span class="cta-arrow">→</span>
			</button>
		</div>
	</footer>
</div>

<style>
	.stats-page {
		min-height: 100vh;
		background: #f8fafc;
	}

	/* Header */
	.stats-header {
		position: relative;
		padding: 4rem 2rem 3rem;
		text-align: center;
		overflow: hidden;
	}

	.header-bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		z-index: 0;
	}

	.header-bg::after {
		content: "";
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
	}

	.header-content {
		position: relative;
		z-index: 1;
	}

	.stats-title {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 700;
		color: white;
		margin: 0;
		text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
	}

	.stats-subtitle {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.9);
		margin-top: 0.5rem;
	}

	/* Loading State */
	.loading-container {
		display: flex;
		justify-content: center;
		padding: 4rem 2rem;
	}

	.loading-card {
		background: white;
		border-radius: 1rem;
		padding: 3rem;
		text-align: center;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
		max-width: 400px;
		width: 100%;
	}

	.loading-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		animation: bounce 1s infinite;
	}

	.loading-title {
		font-size: 1.5rem;
		color: #1f2937;
		margin-bottom: 1.5rem;
	}

	.loading-bar {
		height: 8px;
		background: #e5e7eb;
		border-radius: 4px;
		overflow: hidden;
	}

	.loading-fill {
		height: 100%;
		background: linear-gradient(90deg, #667eea, #764ba2);
		border-radius: 4px;
		transition: width 0.3s ease;
	}

	.loading-percent {
		margin-top: 0.75rem;
		font-weight: 600;
		color: #667eea;
	}

	/* Navigation */
	.stats-nav {
		position: sticky;
		top: 0;
		z-index: 100;
		background: white;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.nav-container {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		max-width: 800px;
		margin: 0 auto;
	}

	.nav-tab {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem !important;
		background: #f3f4f6 !important;
		border: none !important;
		border-radius: 2rem !important;
		font-weight: 600;
		color: #4b5563;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.nav-tab:hover {
		background: #e5e7eb !important;
	}

	.nav-tab.active {
		background: linear-gradient(135deg, #667eea, #764ba2) !important;
		color: white !important;
	}

	.nav-icon {
		font-size: 1.25rem;
	}

	/* Content */
	.stats-content {
		max-width: 1400px;
		margin: 0 auto;
		padding: 2rem;
	}

	.stats-section {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.5s ease;
		margin-bottom: 3rem;
	}

	.stats-section.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.section-card {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
	}

	/* Error State */
	.error-container {
		display: flex;
		justify-content: center;
		padding: 4rem 2rem;
	}

	.error-card {
		background: white;
		border-radius: 1rem;
		padding: 3rem;
		text-align: center;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
	}

	.error-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.retry-btn {
		margin-top: 1.5rem;
		padding: 0.75rem 2rem !important;
		background: linear-gradient(135deg, #667eea, #764ba2) !important;
		color: white !important;
		border: none !important;
		border-radius: 2rem !important;
	}

	/* Footer CTA */
	.stats-footer {
		padding: 3rem 2rem 4rem;
	}

	.cta-card {
		max-width: 600px;
		margin: 0 auto;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 1.5rem;
		padding: 3rem;
		text-align: center;
		box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
	}

	.cta-title {
		font-size: 1.75rem;
		color: white;
		margin: 0 0 0.5rem;
	}

	.cta-text {
		color: rgba(255, 255, 255, 0.9);
		margin-bottom: 1.5rem;
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 2rem !important;
		background: white !important;
		color: #667eea !important;
		border: none !important;
		border-radius: 2rem !important;
		font-weight: 600;
		font-size: 1.1rem !important;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.cta-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.cta-arrow {
		transition: transform 0.3s ease;
	}

	.cta-btn:hover .cta-arrow {
		transform: translateX(5px);
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@media (max-width: 768px) {
		.stats-header {
			padding: 2rem 1rem 1.5rem;
		}

		.stats-title {
			font-size: 2rem;
		}

		.stats-subtitle {
			font-size: 1rem;
		}

		.nav-container {
			justify-content: flex-start;
			padding: 0.5rem;
			gap: 0.25rem;
		}

		.nav-tab {
			padding: 0.4rem 0.75rem !important;
			font-size: 0.85rem;
		}

		.nav-label {
			display: none;
		}

		.nav-icon {
			font-size: 1.1rem;
		}

		.stats-content {
			padding: 0.75rem;
		}

		.section-card {
			padding: 0.75rem;
			border-radius: 0.75rem;
		}

		.stats-section {
			margin-bottom: 1.5rem;
		}

		.cta-card {
			padding: 1.5rem 1rem;
			border-radius: 1rem;
		}

		.cta-title {
			font-size: 1.25rem;
		}

		.cta-text {
			font-size: 0.9rem;
		}

		.cta-btn {
			padding: 0.75rem 1.5rem !important;
			font-size: 1rem !important;
		}

		.loading-card,
		.error-card {
			padding: 2rem 1.5rem;
		}

		.loading-icon,
		.error-icon {
			font-size: 3rem;
		}

		.loading-title {
			font-size: 1.25rem;
		}
	}

	@media (max-width: 480px) {
		.stats-header {
			padding: 1.5rem 0.75rem 1rem;
		}

		.stats-title {
			font-size: 1.5rem;
		}

		.nav-tab {
			padding: 0.35rem 0.5rem !important;
			min-width: auto;
		}

		.nav-icon {
			font-size: 1rem;
		}

		.stats-content {
			padding: 0.5rem;
		}

		.section-card {
			padding: 0.5rem;
		}

		.stats-footer {
			padding: 1.5rem 0.5rem 2rem;
		}
	}
</style>
