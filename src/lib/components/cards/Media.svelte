<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function randomize() {
		const mediaStyles = ['sharp', 'rounded', 'circular'];
		const ratios = ['1:1', '4:3', '16:9', '3:2'];
		userStyles.media.mediaStyle = mediaStyles[Math.floor(Math.random() * mediaStyles.length)];
		userStyles.media.imageAspectRatio = ratios[Math.floor(Math.random() * ratios.length)];
		userStyles.media.imageBorderRadius = Math.floor(Math.random() * 32);
		userStyles.media.showPlaceholders = Math.random() > 0.3;
	}

	function resetMedia() {
		userStyles.media = {
			imageBorderRadius: null,
			imageAspectRatio: null,
			mediaStyle: null,
			showPlaceholders: true
		};
	}

	const styleOptions = [
		{ name: "Sharp", value: "sharp", radius: "0" },
		{ name: "Rounded", value: "rounded", radius: "8px" },
		{ name: "Circular", value: "circular", radius: "50%" }
	];

	const aspectOptions = [
		{ name: "1:1", value: "1:1", style: "aspect-ratio: 1/1;" },
		{ name: "4:3", value: "4:3", style: "aspect-ratio: 4/3;" },
		{ name: "16:9", value: "16:9", style: "aspect-ratio: 16/9;" },
		{ name: "3:2", value: "3:2", style: "aspect-ratio: 3/2;" }
	];

	let previewRadius = $derived(
		userStyles.media.mediaStyle === "circular"
			? "50%"
			: userStyles.media.mediaStyle === "rounded"
				? "8px"
				: getValue(userStyles.media.imageBorderRadius, 0) + "px"
	);
</script>

<div class="media-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetMedia}
			title="Reset media to default"
			aria-label="Reset media to default"
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
		<button
			class="randomizeBtn"
			onclick={randomize}
			title="Randomize values"
			aria-label="Randomize values"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<rect x="1" y="1" width="8" height="8" rx="1" /><rect x="15" y="1" width="8" height="8" rx="1" /><rect x="1" y="15" width="8" height="8" rx="1" /><rect x="15" y="15" width="8" height="8" rx="1" /><circle cx="5" cy="5" r="1" fill="currentColor" /><circle cx="19" cy="5" r="1" fill="currentColor" /><circle cx="5" cy="19" r="1" fill="currentColor" /><circle cx="19" cy="19" r="1" fill="currentColor" />
			</svg>
		</button>
		Images & Media
	</h2>

	<div class="sections-grid">
		<!-- Media Style -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Media Shape</h3>
			<div class="option-grid">
				{#each styleOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.media.mediaStyle === option.value}
						onclick={() => (userStyles.media.mediaStyle = option.value)}
					>
						<div
							class="shape-preview"
							style="border-radius: {option.radius};"
						></div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Image Border Radius (custom) -->
		{#if userStyles.media.mediaStyle !== "circular"}
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Image Border Radius</h3>
				<label>
					<span
						>{getValue(
							userStyles.media.imageBorderRadius,
							defaultValues.media.imageBorderRadius
						)}px</span
					>
					<input
						type="range"
						min="0"
						max="32"
						step="1"
						value={getValue(
							userStyles.media.imageBorderRadius,
							defaultValues.media.imageBorderRadius
						)}
						oninput={(e) =>
							(userStyles.media.imageBorderRadius = parseInt(e.target.value))}
					/>
				</label>
			</div>
		{/if}

		<!-- Aspect Ratio -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preferred Aspect Ratio</h3>
			<div class="option-grid">
				{#each aspectOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.media.imageAspectRatio === option.value}
						onclick={() => (userStyles.media.imageAspectRatio = option.value)}
					>
						<div class="aspect-preview" style={option.style}></div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Show Placeholders -->
		<div class="cardSubSection">
			<label class="toggle-row">
				<input type="checkbox" bind:checked={userStyles.media.showPlaceholders} />
				<span>Show placeholder images when no image is provided</span>
			</label>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div class="preview-area">
				<div class="preview-images">
					<div class="preview-img" style="border-radius: {previewRadius};">
						<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="100" height="100" fill="#e0e0e0" />
							<circle cx="35" cy="35" r="10" fill="#bbb" />
							<path d="M10 70 L40 45 L60 60 L75 48 L95 70 L95 95 L10 95Z" fill="#ccc" />
						</svg>
					</div>
					<div class="preview-img" style="border-radius: {previewRadius};">
						<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="100" height="100" fill="#d8d8d8" />
							<circle cx="50" cy="40" r="15" fill="#bbb" />
							<path d="M5 80 L30 55 L50 70 L70 50 L95 75 L95 95 L5 95Z" fill="#c0c0c0" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.media-card {
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

	.randomizeBtn {
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

	.sections-grid label:not(.toggle-row) {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.option-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	.option-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
		padding: 0.75em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 70px;
	}

	.option-btn:hover {
		border-color: #666;
	}

	.option-btn.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.shape-preview {
		width: 40px;
		height: 40px;
		background: #ccc;
	}

	.aspect-preview {
		width: 50px;
		background: #ccc;
		min-height: 20px;
	}

	.toggle-row {
		display: flex;
		align-items: center;
		gap: 0.75em;
		cursor: pointer;
	}

	input[type="range"] {
		width: 100%;
		max-width: 300px;
	}

	.preview-area {
		padding: 1.5em;
		border: 1px solid #ccc;
		background: #fafafa;
	}

	.preview-images {
		display: flex;
		gap: 1em;
		justify-content: center;
		flex-wrap: wrap;
	}

	.preview-img {
		width: 120px;
		height: 120px;
		overflow: hidden;
		background: #e0e0e0;
	}

	.preview-img svg {
		width: 100%;
		height: 100%;
	}

	@media (max-width: 768px) {
		.option-btn {
			padding: 0.5em;
			min-width: 55px;
			font-size: 0.9em;
		}

		.preview-img {
			width: 90px;
			height: 90px;
		}
	}
</style>
