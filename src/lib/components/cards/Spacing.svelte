<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function randomize() {
		const densities = ['compact', 'comfortable', 'spacious'];
		userStyles.spacing.density = densities[Math.floor(Math.random() * densities.length)];
		userStyles.spacing.paragraphGap = Math.floor(Math.random() * 24) * 2;
		userStyles.spacing.sectionSpacing = Math.floor(Math.random() * 18) * 4 + 8;
		userStyles.spacing.innerPadding = Math.floor(Math.random() * 12) * 4;
	}

	function resetSpacing() {
		userStyles.spacing = {
			density: null,
			paragraphGap: null,
			sectionSpacing: null,
			innerPadding: null
		};
	}

	const densityOptions = [
		{ name: "Compact", value: "compact", desc: "Tight, minimal whitespace" },
		{ name: "Comfortable", value: "comfortable", desc: "Balanced, easy to read" },
		{ name: "Spacious", value: "spacious", desc: "Open, lots of breathing room" }
	];
</script>

<div class="spacing-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetSpacing}
			title="Reset spacing to default"
			aria-label="Reset spacing to default"
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
		Spacing & Density
	</h2>

	<div class="sections-grid">
		<!-- Density -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Content Density</h3>
			<div class="option-grid">
				{#each densityOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.spacing.density === option.value}
						onclick={() => (userStyles.spacing.density = option.value)}
					>
						<div class="density-preview density-{option.value}">
							<div class="density-line"></div>
							<div class="density-line"></div>
							<div class="density-line"></div>
						</div>
						<span class="option-name">{option.name}</span>
						<span class="option-desc">{option.desc}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Paragraph Gap -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Paragraph Gap</h3>
			<label>
				<span
					>{getValue(
						userStyles.spacing.paragraphGap,
						defaultValues.spacing.paragraphGap
					)}px</span
				>
				<input
					type="range"
					min="0"
					max="48"
					step="2"
					value={getValue(
						userStyles.spacing.paragraphGap,
						defaultValues.spacing.paragraphGap
					)}
					oninput={(e) => (userStyles.spacing.paragraphGap = parseInt(e.target.value))}
				/>
			</label>
		</div>

		<!-- Section Spacing -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Section Spacing</h3>
			<label>
				<span
					>{getValue(
						userStyles.spacing.sectionSpacing,
						defaultValues.spacing.sectionSpacing
					)}px</span
				>
				<input
					type="range"
					min="8"
					max="80"
					step="4"
					value={getValue(
						userStyles.spacing.sectionSpacing,
						defaultValues.spacing.sectionSpacing
					)}
					oninput={(e) =>
						(userStyles.spacing.sectionSpacing = parseInt(e.target.value))}
				/>
			</label>
		</div>

		<!-- Inner Padding -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Inner Padding</h3>
			<label>
				<span
					>{getValue(
						userStyles.spacing.innerPadding,
						defaultValues.spacing.innerPadding
					)}px</span
				>
				<input
					type="range"
					min="0"
					max="48"
					step="4"
					value={getValue(
						userStyles.spacing.innerPadding,
						defaultValues.spacing.innerPadding
					)}
					oninput={(e) =>
						(userStyles.spacing.innerPadding = parseInt(e.target.value))}
				/>
			</label>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div
				class="preview-area"
				style="padding: {getValue(userStyles.spacing.innerPadding, 16)}px;"
			>
				<div
					class="preview-content"
					style="gap: {getValue(userStyles.spacing.sectionSpacing, 32)}px;"
				>
					<div class="preview-section">
						<div class="preview-title">Section Title</div>
						<div
							class="preview-paragraphs"
							style="gap: {getValue(userStyles.spacing.paragraphGap, 16)}px;"
						>
							<div class="preview-text">First paragraph of content.</div>
							<div class="preview-text">Second paragraph of content.</div>
						</div>
					</div>
					<div class="preview-section">
						<div class="preview-title">Another Section</div>
						<div class="preview-text">More content here.</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.spacing-card {
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

	.sections-grid label {
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
		gap: 0.4em;
		padding: 0.75em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 100px;
		flex: 1;
	}

	.option-btn:hover {
		border-color: #666;
	}

	.option-btn.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.option-name {
		font-weight: 600;
		font-size: 0.95em;
	}

	.option-desc {
		font-size: 0.75em;
		color: #666;
	}

	.density-preview {
		display: flex;
		flex-direction: column;
		width: 40px;
	}

	.density-compact {
		gap: 2px;
	}

	.density-comfortable {
		gap: 6px;
	}

	.density-spacious {
		gap: 10px;
	}

	.density-line {
		height: 3px;
		background: #999;
		border-radius: 1px;
	}

	input[type="range"] {
		width: 100%;
		max-width: 300px;
	}

	.preview-area {
		border: 1px solid #ccc;
		background: #fafafa;
	}

	.preview-content {
		display: flex;
		flex-direction: column;
	}

	.preview-section {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.preview-title {
		font-weight: 600;
		font-size: 0.9em;
		color: #333;
	}

	.preview-paragraphs {
		display: flex;
		flex-direction: column;
	}

	.preview-text {
		font-size: 0.85em;
		color: #666;
		padding: 0.5em;
		background: #e8e8e8;
	}

	@media (max-width: 768px) {
		.option-btn {
			padding: 0.5em;
			min-width: 80px;
		}
	}
</style>
