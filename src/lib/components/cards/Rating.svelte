<script>
	import { userStyles } from "$lib/state/userStyles.svelte";

	let hoveredRating = $state(0);
	let isAnimating = $state(false);

	const ratingData = [
		{ emoji: "😡", label: "Terrible", color: "#ef4444" },
		{ emoji: "😞", label: "Poor", color: "#f97316" },
		{ emoji: "😐", label: "Okay", color: "#eab308" },
		{ emoji: "🙂", label: "Good", color: "#84cc16" },
		{ emoji: "😍", label: "Amazing!", color: "#22c55e" }
	];

	// Default to showing "Okay" (3) but don't set it until user interacts
	const defaultDisplay = 3;

	function setRating(value) {
		isAnimating = true;
		userStyles.rating = value;
		setTimeout(() => (isAnimating = false), 300);
	}

	// Use actual rating if set, otherwise show default for display only
	let actualRating = $derived(userStyles.rating ?? defaultDisplay);
	let currentRatingData = $derived(ratingData[actualRating - 1]);
	let displayRating = $derived(hoveredRating || actualRating);
	let displayData = $derived(ratingData[displayRating - 1]);
</script>

<div class="rating-container">
	<h2 class="cardTitle rating-title">How was your experience?</h2>

	{#if userStyles.rating === null}
		<p class="hint">Click a star to rate your experience building this website</p>
	{/if}

	<div class="rating-content">
		<!-- Emoji display -->
		<div class="emoji-section">
			<div
				class="emoji-display"
				class:animating={isAnimating}
				class:unrated={userStyles.rating === null}
				style="--rating-color: {displayData.color}"
			>
				{displayData.emoji}
			</div>
			<p class="rating-label" style="color: {displayData.color}">{displayData.label}</p>
		</div>

		<!-- Star rating -->
		<div class="stars-container" role="group" aria-label="Rating selection">
			{#each [1, 2, 3, 4, 5] as star (star)}
				<button
					class="star-btn"
					class:filled={star <= displayRating}
					class:selected={userStyles.rating !== null && star <= userStyles.rating}
					onmouseenter={() => (hoveredRating = star)}
					onmouseleave={() => (hoveredRating = 0)}
					onclick={() => setRating(star)}
					style="--delay: {star * 0.05}s"
					aria-label="Rate {star} out of 5 stars"
					aria-pressed={userStyles.rating !== null && star <= userStyles.rating}
				>
					<svg
						class="star-svg"
						viewBox="0 0 24 24"
						fill={star <= displayRating ? ratingData[displayRating - 1].color : "none"}
						stroke={star <= displayRating ? ratingData[displayRating - 1].color : "#d1d5db"}
						stroke-width="2"
						aria-hidden="true"
					>
						<path
							d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
						/>
					</svg>
				</button>
			{/each}
		</div>

		<!-- Rating bar -->
		<div class="rating-bar-container">
			<div class="rating-bar">
				<div
					class="rating-bar-fill"
					style="width: {(actualRating / 5) * 100}%; background: {currentRatingData.color}"
				></div>
			</div>
			<div class="rating-bar-labels">
				<span>1</span>
				<span>2</span>
				<span>3</span>
				<span>4</span>
				<span>5</span>
			</div>
		</div>
	</div>
</div>

<style>
	.rating-container {
		display: flex;
		height: 100%;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.rating-title {
		text-align: center;
		margin-bottom: 0.5rem;
	}

	.hint {
		color: #666;
		font-style: italic;
		margin-bottom: 1rem;
		text-align: center;
	}

	.rating-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	/* Emoji section */
	.emoji-section {
		text-align: center;
	}

	.emoji-display {
		font-size: 5rem;
		line-height: 1;
		transition: transform 0.3s ease;
		filter: drop-shadow(0 4px 20px color-mix(in srgb, var(--rating-color) 40%, transparent));
	}

	.emoji-display.unrated {
		opacity: 0.5;
	}

	.emoji-display.animating {
		animation: bounce 0.3s ease;
	}

	.rating-label {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 0.5rem;
		transition: color 0.3s ease;
	}

	/* Stars */
	.stars-container {
		display: flex;
		gap: 0.5rem;
	}

	.star-btn {
		background: none !important;
		border: none !important;
		padding: 0.5rem !important;
		cursor: pointer;
		transition: transform 0.2s ease;
		border-radius: 50% !important;
	}

	.star-btn:hover {
		transform: scale(1.2);
	}

	.star-btn.filled .star-svg {
		animation: starPop 0.3s ease;
		animation-delay: var(--delay);
	}

	.star-svg {
		width: 3rem;
		height: 3rem;
		transition: all 0.2s ease;
	}

	/* Rating bar */
	.rating-bar-container {
		width: 100%;
		max-width: 300px;
	}

	.rating-bar {
		height: 8px;
		background: #e5e7eb;
		border-radius: 4px;
		overflow: hidden;
	}

	.rating-bar-fill {
		height: 100%;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.rating-bar-labels {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
		font-size: 0.875rem;
		color: #6b7280;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}

	@keyframes starPop {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.3);
		}
		100% {
			transform: scale(1);
		}
	}

	@media (max-width: 640px) {
		.emoji-display {
			font-size: 4rem;
		}

		.star-svg {
			width: 2.5rem;
			height: 2.5rem;
		}

		.rating-label {
			font-size: 1.25rem;
		}
	}
</style>
