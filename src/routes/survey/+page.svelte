<script>
	import { goto } from "$app/navigation";
	import { Colors, Size, Typography, Animations, Layout, Rating } from "$lib/components/cards";
	import { userStyles } from "$lib/state/userStyles.svelte";
	import { onMount } from "svelte";

	let currentSlide = $state(1);
	let slideDirection = $state("next");
	let isTransitioning = $state(false);
	let isSubmitting = $state(false);
	let mounted = $state(false);

	const steps = [
		{ num: 1, label: "Colors", icon: "1" },
		{ num: 2, label: "Sizes", icon: "2" },
		{ num: 3, label: "Typography", icon: "3" },
		{ num: 4, label: "Animations", icon: "4" },
		{ num: 5, label: "Layout", icon: "5" },
		{ num: 6, label: "Rate", icon: "6" }
	];

	const totalSteps = steps.length;

	onMount(() => {
		mounted = true;
	});

	// Single effect to sync all CSS custom properties - only set if value is not null
	$effect(() => {
		const root = document.documentElement;

		// Background - only apply if user has made a choice
		if (userStyles.colors.bg.type === "solid" && userStyles.colors.bg.solidColor) {
			root.style.setProperty("--survey-bg-color", userStyles.colors.bg.solidColor);
			root.style.setProperty("--survey-bg-gradient", "none");
		} else if (userStyles.colors.bg.type === "gradient") {
			const { degrees, startColor, endColor } = userStyles.colors.bg.gradient;
			if (startColor && endColor && degrees !== null) {
				root.style.setProperty(
					"--survey-bg-gradient",
					`linear-gradient(${degrees}deg, ${startColor}, ${endColor})`
				);
				root.style.setProperty("--survey-bg-color", "transparent");
			}
		}

		// Card colors - only if set
		if (userStyles.colors.card.bg) {
			root.style.setProperty("--survey-card-bg", userStyles.colors.card.bg);
		}
		if (userStyles.colors.card.text) {
			root.style.setProperty("--survey-card-text", userStyles.colors.card.text);
		}
		if (userStyles.colors.card.border) {
			root.style.setProperty("--survey-card-border", userStyles.colors.card.border);
		}

		// Card sizes - only if set
		if (userStyles.sizes.card.width !== null) {
			root.style.setProperty("--survey-card-width", `${userStyles.sizes.card.width}px`);
		}
		if (userStyles.sizes.card.height !== null) {
			root.style.setProperty("--survey-card-height", `${userStyles.sizes.card.height}px`);
		}
		if (userStyles.sizes.card.border.width !== null) {
			root.style.setProperty(
				"--survey-card-border-width",
				`${userStyles.sizes.card.border.width}px`
			);
		}
		if (userStyles.sizes.card.border.roundness !== null) {
			root.style.setProperty(
				"--survey-card-border-radius",
				`${userStyles.sizes.card.border.roundness}%`
			);
		}

		// Marginalia
		if (userStyles.colors.marginalia.header.ownBg && userStyles.colors.marginalia.header.bg) {
			root.style.setProperty("--survey-header-bg", userStyles.colors.marginalia.header.bg);
		}
		if (userStyles.colors.marginalia.header.text) {
			root.style.setProperty("--survey-header-text", userStyles.colors.marginalia.header.text);
		}
		if (userStyles.colors.marginalia.footer.ownBg && userStyles.colors.marginalia.footer.bg) {
			root.style.setProperty("--survey-footer-bg", userStyles.colors.marginalia.footer.bg);
		}

		// Buttons
		if (userStyles.colors.button.next.bg) {
			root.style.setProperty("--survey-btn-next-bg", userStyles.colors.button.next.bg);
		}
		if (userStyles.colors.button.next.text) {
			root.style.setProperty("--survey-btn-next-text", userStyles.colors.button.next.text);
		}
		if (userStyles.colors.button.back.bg) {
			root.style.setProperty("--survey-btn-back-bg", userStyles.colors.button.back.bg);
		}
		if (userStyles.colors.button.back.text) {
			root.style.setProperty("--survey-btn-back-text", userStyles.colors.button.back.text);
		}
		if (userStyles.colors.button.reset.bg) {
			root.style.setProperty("--survey-btn-reset-bg", userStyles.colors.button.reset.bg);
		}
		if (userStyles.colors.button.reset.text) {
			root.style.setProperty("--survey-btn-reset-text", userStyles.colors.button.reset.text);
		}

		// Text sizes
		if (userStyles.sizes.text.surveyTitle !== null) {
			root.style.setProperty("--survey-title-size", `${userStyles.sizes.text.surveyTitle}px`);
		}
		if (userStyles.sizes.text.cardTitles !== null) {
			root.style.setProperty("--survey-card-title-size", `${userStyles.sizes.text.cardTitles}px`);
		}
		if (userStyles.sizes.text.subheadings !== null) {
			root.style.setProperty("--survey-subheading-size", `${userStyles.sizes.text.subheadings}px`);
		}
		if (userStyles.sizes.text.content !== null) {
			root.style.setProperty("--survey-content-size", `${userStyles.sizes.text.content}px`);
		}

		// Button sizes
		if (userStyles.sizes.button.text !== null) {
			root.style.setProperty("--survey-btn-text-size", `${userStyles.sizes.button.text}px`);
		}
		if (userStyles.sizes.button.padding !== null) {
			root.style.setProperty("--survey-btn-padding", `${userStyles.sizes.button.padding}px`);
		}
		if (userStyles.sizes.button.gap !== null) {
			root.style.setProperty("--survey-btn-gap", `${userStyles.sizes.button.gap}px`);
		}

		// Form elements
		if (userStyles.sizes.form.rangeSlider.width !== null) {
			root.style.setProperty(
				"--survey-range-width",
				`${userStyles.sizes.form.rangeSlider.width}px`
			);
		}
		if (userStyles.sizes.form.rangeSlider.height !== null) {
			root.style.setProperty(
				"--survey-range-height",
				`${userStyles.sizes.form.rangeSlider.height}px`
			);
		}

		// Typography
		if (userStyles.typography.fontFamily) {
			root.style.setProperty("--survey-font-family", userStyles.typography.fontFamily);
		}
		if (userStyles.typography.fontWeight !== null) {
			root.style.setProperty("--survey-font-weight", userStyles.typography.fontWeight);
		}
		if (userStyles.typography.lineHeight !== null) {
			root.style.setProperty("--survey-line-height", userStyles.typography.lineHeight);
		}
		if (userStyles.typography.letterSpacing !== null) {
			root.style.setProperty("--survey-letter-spacing", `${userStyles.typography.letterSpacing}px`);
		}

		// Animations
		if (userStyles.animations.enabled && userStyles.animations.transitionDuration !== null) {
			root.style.setProperty(
				"--survey-transition-duration",
				`${userStyles.animations.transitionDuration}ms`
			);
		}
		if (userStyles.animations.transitionTiming) {
			root.style.setProperty("--survey-transition-timing", userStyles.animations.transitionTiming);
		}

		// Layout
		if (userStyles.layout.maxWidth !== null) {
			root.style.setProperty("--survey-content-max-width", `${userStyles.layout.maxWidth}px`);
		}
		if (userStyles.layout.contentPadding !== null) {
			root.style.setProperty("--survey-content-padding", `${userStyles.layout.contentPadding}px`);
		}
	});

	$effect(() => {
		if (currentSlide < 1) {
			goto("/");
		} else if (currentSlide > totalSteps) {
			goto("/statistics");
		}
	});

	function hexToRgb(hex) {
		if (!hex || typeof hex !== "string") return null;
		hex = hex.replace(/^#/, "");
		const bigint = parseInt(hex, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return { r, g, b };
	}

	function convertColorsToRgb(obj) {
		if (obj === null || obj === undefined) return obj;
		if (typeof obj !== "object") {
			if (typeof obj === "string" && obj.startsWith("#")) {
				return hexToRgb(obj);
			}
			return obj;
		}

		const newObj = Array.isArray(obj) ? [] : {};
		for (const key in obj) {
			newObj[key] = convertColorsToRgb(obj[key]);
		}
		return newObj;
	}

	function navigateTo(direction) {
		if (isTransitioning) return;
		slideDirection = direction;
		isTransitioning = true;

		setTimeout(() => {
			if (direction === "next") {
				currentSlide++;
			} else {
				currentSlide--;
			}
			setTimeout(() => {
				isTransitioning = false;
			}, 50);
		}, 200);
	}

	function goToStep(step) {
		if (isTransitioning || step === currentSlide) return;
		slideDirection = step > currentSlide ? "next" : "back";
		isTransitioning = true;

		setTimeout(() => {
			currentSlide = step;
			setTimeout(() => {
				isTransitioning = false;
			}, 50);
		}, 200);
	}

	async function submitData() {
		if (isSubmitting) return;
		isSubmitting = true;

		// Set default bg type if none selected
		if (userStyles.colors.bg.type === null) {
			userStyles.colors.bg.type = "solid";
			userStyles.colors.bg.solidColor = "#ffffff";
		}

		// Set default rating if none selected
		if (userStyles.rating === null) {
			userStyles.rating = 3;
		}

		const processedStyles = convertColorsToRgb(userStyles);

		try {
			await fetch("/api/save", {
				method: "POST",
				body: JSON.stringify(processedStyles)
			});

			// Clean up CSS custom properties before navigating
			const root = document.documentElement;
			const props = [
				"--survey-bg-color",
				"--survey-bg-gradient",
				"--survey-card-bg",
				"--survey-card-text",
				"--survey-card-border",
				"--survey-card-width",
				"--survey-card-height",
				"--survey-card-border-width",
				"--survey-card-border-radius",
				"--survey-header-bg",
				"--survey-header-text",
				"--survey-footer-bg",
				"--survey-btn-next-bg",
				"--survey-btn-next-text",
				"--survey-btn-back-bg",
				"--survey-btn-back-text",
				"--survey-btn-reset-bg",
				"--survey-btn-reset-text",
				"--survey-title-size",
				"--survey-card-title-size",
				"--survey-subheading-size",
				"--survey-content-size",
				"--survey-btn-text-size",
				"--survey-btn-padding",
				"--survey-btn-gap",
				"--survey-range-width",
				"--survey-range-height",
				"--survey-font-family",
				"--survey-font-weight",
				"--survey-line-height",
				"--survey-letter-spacing",
				"--survey-transition-duration",
				"--survey-transition-timing",
				"--survey-content-max-width",
				"--survey-content-padding"
			];
			props.forEach((p) => root.style.removeProperty(p));
			goto("/statistics");
		} catch (error) {
			console.error("Error submitting:", error);
			isSubmitting = false;
		}
	}
</script>

<div class="survey-container" class:mounted>
	<header class="survey-header">
		<h1>A Website Survey</h1>

		<!-- Progress Steps -->
		<div class="progress-container">
			<div class="progress-line">
				<div
					class="progress-fill"
					style="width: {((currentSlide - 1) / (totalSteps - 1)) * 100}%"
				></div>
			</div>
			<div class="steps">
				{#each steps as step}
					<button
						class="step"
						class:active={currentSlide === step.num}
						class:completed={currentSlide > step.num}
						onclick={() => goToStep(step.num)}
					>
						<span class="step-number">{step.icon}</span>
						<span class="step-label">{step.label}</span>
					</button>
				{/each}
			</div>
		</div>
	</header>

	<section class="survey-section">
		<div class="card-wrapper">
			<div class="survey-card">
				<div
					class="card-content"
					class:animated={userStyles.animations.enabled}
					class:slide-out-left={isTransitioning &&
						slideDirection === "next" &&
						userStyles.animations.enabled}
					class:slide-out-right={isTransitioning &&
						slideDirection === "back" &&
						userStyles.animations.enabled}
				>
					{#if currentSlide === 1}
						<Colors />
					{:else if currentSlide === 2}
						<Size />
					{:else if currentSlide === 3}
						<Typography />
					{:else if currentSlide === 4}
						<Animations />
					{:else if currentSlide === 5}
						<Layout />
					{:else if currentSlide === 6}
						<Rating />
					{/if}
				</div>
			</div>
		</div>
	</section>

	<footer class="survey-footer">
		<div class="nav-buttons">
			<button
				class="backBtn nav-btn"
				class:disabled={currentSlide === 1}
				disabled={currentSlide === 1}
				onclick={() => navigateTo("back")}
			>
				Back
			</button>

			<span class="step-indicator">{currentSlide} / {totalSteps}</span>

			{#if currentSlide !== totalSteps}
				<button class="nextBtn nav-btn" onclick={() => navigateTo("next")}> Next </button>
			{:else}
				<button
					class="nextBtn nav-btn submit-btn"
					class:submitting={isSubmitting}
					onclick={submitData}
					disabled={isSubmitting}
				>
					{#if isSubmitting}
						Submitting...
					{:else}
						Submit
					{/if}
				</button>
			{/if}
		</div>
	</footer>
</div>

<style>
	.survey-container {
		display: flex;
		min-height: 100vh;
		flex-direction: column;
		opacity: 0;
		transition: opacity 0.3s ease;
		background-color: var(--survey-bg-color, transparent);
		background-image: var(--survey-bg-gradient, none);
		font-family: var(--survey-font-family, inherit);
		font-weight: var(--survey-font-weight, normal);
		line-height: var(--survey-line-height, normal);
		letter-spacing: var(--survey-letter-spacing, normal);
		font-size: var(--survey-content-size, 1em);
	}

	.survey-container.mounted {
		opacity: 1;
	}

	.survey-header {
		padding: 1rem;
		text-align: center;
		background-color: var(--survey-header-bg, transparent);
		color: var(--survey-header-text, inherit);
	}

	.survey-header h1 {
		font-size: var(--survey-title-size, 2em);
		margin: 0 0 1rem 0;
	}

	/* Progress indicator */
	.progress-container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		position: relative;
		padding: 0 1rem;
	}

	.progress-line {
		position: absolute;
		top: 50%;
		left: 40px;
		right: 40px;
		height: 2px;
		background: #ddd;
		transform: translateY(-50%);
		z-index: 0;
	}

	.progress-fill {
		height: 100%;
		background: #333;
		transition: width 0.3s ease;
	}

	.steps {
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 1;
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		background: #fff;
		border: 1px solid #ccc;
		padding: 0.25rem 0.5rem;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 50px;
	}

	.step:hover {
		border-color: #666;
	}

	.step.active {
		border-color: #333;
		background: #333;
		color: #fff;
	}

	.step.completed {
		border-color: #333;
		background: #eee;
	}

	.step-number {
		font-weight: bold;
	}

	.step-label {
		font-size: 0.7rem;
	}

	/* Card area */
	.survey-section {
		display: flex;
		flex: 1;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding: var(--survey-content-padding, 1rem);
		overflow: hidden;
	}

	.card-wrapper {
		width: 100%;
		max-width: var(--survey-content-max-width, none);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.survey-card {
		display: flex;
		width: var(--survey-card-width, 100%);
		max-width: 100%;
		min-height: var(--survey-card-height, auto);
		flex-direction: column;
		border-width: var(--survey-card-border-width, 0);
		border-style: solid;
		border-color: var(--survey-card-border, transparent);
		border-radius: var(--survey-card-border-radius, 0);
		background: var(--survey-card-bg, transparent);
		color: var(--survey-card-text, inherit);
		overflow: hidden;
	}

	.card-content {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
	}

	.card-content.animated {
		transition: all var(--survey-transition-duration, 0.2s) var(--survey-transition-timing, ease);
	}

	.card-content.slide-out-left {
		opacity: 0;
		transform: translateX(-20px);
	}

	.card-content.slide-out-right {
		opacity: 0;
		transform: translateX(20px);
	}

	/* Footer */
	.survey-footer {
		padding: 1rem;
		text-align: center;
		background-color: var(--survey-footer-bg, transparent);
	}

	.nav-buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--survey-btn-gap, 1rem);
	}

	.step-indicator {
		font-size: 0.9em;
		color: #666;
	}

	.nav-btn {
		padding: var(--survey-btn-padding, 0.5rem 1rem);
		font-size: var(--survey-btn-text-size, 1em);
		cursor: pointer;
		transition: all var(--survey-transition-duration, 0.2s) var(--survey-transition-timing, ease);
	}

	.nextBtn {
		background-color: var(--survey-btn-next-bg, buttonface);
		color: var(--survey-btn-next-text, buttontext);
	}

	.backBtn {
		background-color: var(--survey-btn-back-bg, buttonface);
		color: var(--survey-btn-back-text, buttontext);
	}

	:global(.resetBtn) {
		background-color: var(--survey-btn-reset-bg, buttonface);
		color: var(--survey-btn-reset-text, buttontext);
	}

	.nav-btn:hover:not(:disabled) {
		opacity: 0.8;
	}

	.nav-btn.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.submit-btn.submitting {
		opacity: 0.7;
		pointer-events: none;
	}

	/* Mobile */
	@media (max-width: 768px) {
		.survey-container {
			min-height: 100vh;
		}

		.survey-header h1 {
			font-size: clamp(1.5rem, 5vw, var(--survey-title-size, 2em));
		}

		.progress-container {
			max-width: 100%;
			padding: 0 0.25rem;
		}

		.progress-line {
			left: 20px;
			right: 20px;
		}

		.step {
			padding: 0.2rem 0.3rem;
			min-width: 40px;
		}

		.step-label {
			display: none;
		}

		.survey-card {
			width: 100%;
			min-height: auto;
		}

		.card-content {
			padding: 0.75rem;
		}
	}

	@media (max-width: 480px) {
		.step {
			min-width: 30px;
			padding: 0.15rem 0.2rem;
			font-size: 0.9em;
		}

		.nav-btn {
			padding: 0.4rem 0.75rem;
			font-size: 0.9em;
		}
	}
</style>
