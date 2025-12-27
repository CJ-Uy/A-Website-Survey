<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	const timingFunctions = [
		{ name: "Ease", value: "ease" },
		{ name: "Linear", value: "linear" },
		{ name: "Ease In", value: "ease-in" },
		{ name: "Ease Out", value: "ease-out" },
		{ name: "Ease In-Out", value: "ease-in-out" }
	];

	const pageTransitions = [
		{ name: "None", value: "none" },
		{ name: "Fade", value: "fade" },
		{ name: "Slide", value: "slide" },
		{ name: "Scale", value: "scale" }
	];

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function resetAnimations() {
		userStyles.animations = {
			enabled: false,
			transitionDuration: null,
			transitionTiming: null,
			hoverEffects: {
				scale: null,
				shadow: false,
				colorShift: false
			},
			pageTransitions: null
		};
	}

	// Enable animations with defaults when toggled on
	function toggleAnimations() {
		userStyles.animations.enabled = !userStyles.animations.enabled;
		if (userStyles.animations.enabled) {
			if (userStyles.animations.transitionDuration === null) {
				userStyles.animations.transitionDuration = defaultValues.animations.transitionDuration;
			}
			if (userStyles.animations.transitionTiming === null) {
				userStyles.animations.transitionTiming = defaultValues.animations.transitionTiming;
			}
		}
	}
</script>

<div class="animations-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetAnimations}
			title="Reset animations to default"
			aria-label="Reset animations to default"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 21">
				<g
					fill="none"
					fill-rule="evenodd"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" />
					<path d="M7.5 6.5h-4v-4" />
				</g>
			</svg>
		</button>
		Animations & Transitions
	</h2>

	<div class="sections-grid">
		<!-- Enable/Disable -->
		<div class="cardSubSection">
			<label class="toggle-row">
				<input
					type="checkbox"
					checked={userStyles.animations.enabled}
					onchange={toggleAnimations}
				/>
				<span class="toggle-label">Enable Animations</span>
			</label>
			{#if !userStyles.animations.enabled}
				<p class="hint">
					Turn on animations to see instant visual feedback as you interact with elements.
				</p>
			{/if}
		</div>

		{#if userStyles.animations.enabled}
			<!-- Transition Duration -->
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Transition Speed</h3>
				<label>
					<span
						>Duration: {getValue(
							userStyles.animations.transitionDuration,
							defaultValues.animations.transitionDuration
						)}ms</span
					>
					<input
						type="range"
						min="0"
						max="1000"
						step="50"
						value={getValue(
							userStyles.animations.transitionDuration,
							defaultValues.animations.transitionDuration
						)}
						oninput={(e) => (userStyles.animations.transitionDuration = parseInt(e.target.value))}
					/>
				</label>
				<div class="speed-presets">
					<button
						class:selected={userStyles.animations.transitionDuration === 100}
						onclick={() => (userStyles.animations.transitionDuration = 100)}
					>
						Fast
					</button>
					<button
						class:selected={userStyles.animations.transitionDuration === 200}
						onclick={() => (userStyles.animations.transitionDuration = 200)}
					>
						Normal
					</button>
					<button
						class:selected={userStyles.animations.transitionDuration === 400}
						onclick={() => (userStyles.animations.transitionDuration = 400)}
					>
						Slow
					</button>
					<button
						class:selected={userStyles.animations.transitionDuration === 800}
						onclick={() => (userStyles.animations.transitionDuration = 800)}
					>
						Very Slow
					</button>
				</div>
			</div>

			<!-- Timing Function -->
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Easing</h3>
				<div class="timing-grid">
					{#each timingFunctions as timing}
						<button
							class="timing-option"
							class:selected={userStyles.animations.transitionTiming === timing.value}
							onclick={() => (userStyles.animations.transitionTiming = timing.value)}
						>
							{timing.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Hover Effects -->
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Hover Effects</h3>
				<div class="hover-options">
					<label class="checkbox-row">
						<input type="checkbox" bind:checked={userStyles.animations.hoverEffects.shadow} />
						<span>Add shadow on hover</span>
					</label>

					<label class="checkbox-row">
						<input type="checkbox" bind:checked={userStyles.animations.hoverEffects.colorShift} />
						<span>Subtle color shift on hover</span>
					</label>

					<label>
						<span
							>Scale on hover: {(userStyles.animations.hoverEffects.scale ?? 1).toFixed(2)}x</span
						>
						<input
							type="range"
							min="1"
							max="1.2"
							step="0.01"
							value={userStyles.animations.hoverEffects.scale ?? 1}
							oninput={(e) =>
								(userStyles.animations.hoverEffects.scale = parseFloat(e.target.value))}
						/>
					</label>
				</div>
			</div>

			<!-- Page Transitions -->
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Page Transitions</h3>
				<div class="transition-grid">
					{#each pageTransitions as transition}
						<button
							class="transition-option"
							class:selected={userStyles.animations.pageTransitions === transition.value}
							onclick={() => (userStyles.animations.pageTransitions = transition.value)}
						>
							{transition.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Preview -->
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Preview</h3>
				<div class="preview-area">
					<button
						class="preview-button"
						style="
							transition-duration: {userStyles.animations.transitionDuration}ms;
							transition-timing-function: {userStyles.animations.transitionTiming};
						"
					>
						Hover me!
					</button>
					<p class="preview-hint">
						Hover over the button to see your animation settings in action.
					</p>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.animations-card {
		width: 100%;
	}

	.cardTitle {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.resetBtn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		cursor: pointer;
	}

	.sections-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
	}

	.toggle-row {
		display: flex;
		align-items: center;
		gap: 0.75em;
		cursor: pointer;
	}

	.toggle-label {
		font-weight: 600;
		font-size: 1.1em;
	}

	.hint {
		color: #666;
		font-style: italic;
		margin-top: 0.5em;
	}

	.speed-presets {
		display: flex;
		gap: 0.5em;
		margin-top: 0.75em;
		flex-wrap: wrap;
	}

	.speed-presets button {
		padding: 0.4em 0.8em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
	}

	.speed-presets button:hover {
		border-color: #666;
	}

	.speed-presets button.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.timing-grid,
	.transition-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	.timing-option,
	.transition-option {
		padding: 0.5em 1em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
	}

	.timing-option:hover,
	.transition-option:hover {
		border-color: #666;
	}

	.timing-option.selected,
	.transition-option.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.hover-options {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.checkbox-row {
		display: flex;
		align-items: center;
		gap: 0.5em;
		cursor: pointer;
	}

	.hover-options > label:not(.checkbox-row) {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.preview-area {
		padding: 1.5em;
		border: 1px solid #ccc;
		background: #fafafa;
		text-align: center;
	}

	.preview-button {
		padding: 0.75em 1.5em;
		font-size: 1em;
		border: 2px solid #333;
		background: #fff;
		cursor: pointer;
	}

	.preview-button:hover {
		background: #333;
		color: #fff;
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.preview-hint {
		margin: 1em 0 0;
		font-size: 0.9em;
		color: #666;
	}

	input[type="range"] {
		width: 100%;
		max-width: 300px;
	}

	@media (max-width: 768px) {
		.speed-presets {
			gap: 0.25em;
		}

		.speed-presets button {
			padding: 0.3em 0.6em;
			font-size: 0.9em;
		}
	}
</style>
