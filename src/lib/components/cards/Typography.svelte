<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	const fontFamilies = [
		{ name: "System Default", value: "system-ui, -apple-system, sans-serif" },
		{ name: "Arial", value: "Arial, sans-serif" },
		{ name: "Helvetica", value: "Helvetica, Arial, sans-serif" },
		{ name: "Georgia", value: "Georgia, serif" },
		{ name: "Times New Roman", value: "'Times New Roman', Times, serif" },
		{ name: "Courier New", value: "'Courier New', monospace" },
		{ name: "Verdana", value: "Verdana, sans-serif" },
		{ name: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
		{ name: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
		{ name: "Impact", value: "Impact, sans-serif" }
	];

	const fontWeights = [
		{ name: "Thin", value: 100 },
		{ name: "Light", value: 300 },
		{ name: "Normal", value: 400 },
		{ name: "Medium", value: 500 },
		{ name: "Semi-Bold", value: 600 },
		{ name: "Bold", value: 700 },
		{ name: "Extra Bold", value: 800 },
		{ name: "Black", value: 900 }
	];

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function resetTypography() {
		userStyles.typography = {
			fontFamily: null,
			headingFont: null,
			bodyFont: null,
			fontWeight: null,
			lineHeight: null,
			letterSpacing: null
		};
	}
</script>

<div class="typography-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetTypography}
			title="Reset typography to default"
			aria-label="Reset typography to default"
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
		Typography
	</h2>

	<div class="sections-grid">
		<!-- Font Family -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Font Family</h3>
			<div class="font-grid">
				{#each fontFamilies as font}
					<button
						class="font-option"
						class:selected={userStyles.typography.fontFamily === font.value}
						onclick={() => (userStyles.typography.fontFamily = font.value)}
						style="font-family: {font.value}"
					>
						{font.name}
					</button>
				{/each}
			</div>
		</div>

		<!-- Font Weight -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Font Weight</h3>
			<div class="weight-grid">
				{#each fontWeights as weight}
					<button
						class="weight-option"
						class:selected={userStyles.typography.fontWeight === weight.value}
						onclick={() => (userStyles.typography.fontWeight = weight.value)}
						style="font-weight: {weight.value}"
					>
						{weight.name}
					</button>
				{/each}
			</div>
		</div>

		<!-- Line Height & Letter Spacing -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Spacing</h3>
			<div class="spacing-controls">
				<label>
					<span>Line Height</span>
					<div class="input-group">
						<input
							type="number"
							step="0.1"
							min="1"
							max="3"
							value={getValue(
								userStyles.typography.lineHeight,
								defaultValues.typography.lineHeight
							)}
							oninput={(e) => (userStyles.typography.lineHeight = parseFloat(e.target.value))}
						/>
						<input
							type="range"
							step="0.1"
							min="1"
							max="3"
							value={getValue(
								userStyles.typography.lineHeight,
								defaultValues.typography.lineHeight
							)}
							oninput={(e) => (userStyles.typography.lineHeight = parseFloat(e.target.value))}
						/>
					</div>
				</label>

				<label>
					<span>Letter Spacing (px)</span>
					<div class="input-group">
						<input
							type="number"
							step="0.5"
							min="-2"
							max="10"
							value={getValue(
								userStyles.typography.letterSpacing,
								defaultValues.typography.letterSpacing
							)}
							oninput={(e) => (userStyles.typography.letterSpacing = parseFloat(e.target.value))}
						/>
						<input
							type="range"
							step="0.5"
							min="-2"
							max="10"
							value={getValue(
								userStyles.typography.letterSpacing,
								defaultValues.typography.letterSpacing
							)}
							oninput={(e) => (userStyles.typography.letterSpacing = parseFloat(e.target.value))}
						/>
					</div>
				</label>
			</div>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div
				class="preview-box"
				style="
					font-family: {userStyles.typography.fontFamily || 'inherit'};
					font-weight: {userStyles.typography.fontWeight || 'normal'};
					line-height: {userStyles.typography.lineHeight || 'normal'};
					letter-spacing: {userStyles.typography.letterSpacing
					? userStyles.typography.letterSpacing + 'px'
					: 'normal'};
				"
			>
				<p class="preview-heading">The Quick Brown Fox</p>
				<p class="preview-body">
					Jumps over the lazy dog. This is a sample paragraph to preview your typography choices.
					The font family, weight, and spacing settings will be reflected here.
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.typography-card {
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

	.font-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		gap: 0.5em;
	}

	.font-option {
		padding: 0.5em 0.75em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		text-align: left;
		transition: all 0.2s;
	}

	.font-option:hover {
		border-color: #666;
	}

	.font-option.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.weight-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
	}

	.weight-option {
		padding: 0.4em 0.8em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
	}

	.weight-option:hover {
		border-color: #666;
	}

	.weight-option.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.spacing-controls {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.spacing-controls > label {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.spacing-controls > label > span {
		font-weight: 500;
	}

	.input-group {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	input[type="number"] {
		width: 70px;
		padding: 4px 8px;
	}

	input[type="range"] {
		flex: 1;
		min-width: 100px;
	}

	.preview-box {
		padding: 1em;
		border: 1px solid #ccc;
		background: #fafafa;
	}

	.preview-heading {
		font-size: 1.5em;
		margin: 0 0 0.5em 0;
	}

	.preview-body {
		margin: 0;
	}

	@media (max-width: 768px) {
		.font-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.weight-grid {
			gap: 0.25em;
		}

		.weight-option {
			padding: 0.3em 0.5em;
			font-size: 0.9em;
		}
	}
</style>
