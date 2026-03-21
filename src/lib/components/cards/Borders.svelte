<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function randomize() {
		const styles = ['none', 'solid', 'dashed', 'dotted', 'double'];
		userStyles.borders.dividerStyle = styles[Math.floor(Math.random() * styles.length)];
		userStyles.borders.dividerColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
		userStyles.borders.dividerThickness = Math.floor(Math.random() * 10) + 1;
		userStyles.borders.sectionGap = Math.floor(Math.random() * 16) * 4;
	}

	function resetBorders() {
		userStyles.borders = {
			dividerStyle: null,
			dividerColor: null,
			dividerThickness: null,
			sectionGap: null
		};
	}

	const styleOptions = [
		{ name: "None", value: "none" },
		{ name: "Solid", value: "solid" },
		{ name: "Dashed", value: "dashed" },
		{ name: "Dotted", value: "dotted" },
		{ name: "Double", value: "double" }
	];

	let previewBorder = $derived(
		userStyles.borders.dividerStyle && userStyles.borders.dividerStyle !== "none"
			? `${getValue(userStyles.borders.dividerThickness, 1)}px ${userStyles.borders.dividerStyle} ${getValue(userStyles.borders.dividerColor, "#cccccc")}`
			: "none"
	);
</script>

<div class="borders-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetBorders}
			title="Reset borders to default"
			aria-label="Reset borders to default"
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
		Borders & Dividers
	</h2>

	<div class="sections-grid">
		<!-- Divider Style -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Divider Style</h3>
			<div class="option-grid">
				{#each styleOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.borders.dividerStyle === option.value}
						onclick={() => (userStyles.borders.dividerStyle = option.value)}
					>
						{#if option.value !== "none"}
							<div
								class="divider-preview"
								style="border-bottom: 2px {option.value} #666;"
							></div>
						{:else}
							<div class="divider-preview no-divider"></div>
						{/if}
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		{#if userStyles.borders.dividerStyle && userStyles.borders.dividerStyle !== "none"}
			<!-- Divider Color -->
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Divider Color</h3>
				<label>
					<input
						type="color"
						value={getValue(userStyles.borders.dividerColor, defaultValues.borders.dividerColor)}
						oninput={(e) => (userStyles.borders.dividerColor = e.target.value)}
					/>
				</label>
			</div>

			<!-- Divider Thickness -->
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Divider Thickness</h3>
				<label>
					<span
						>{getValue(
							userStyles.borders.dividerThickness,
							defaultValues.borders.dividerThickness
						)}px</span
					>
					<input
						type="range"
						min="1"
						max="10"
						step="1"
						value={getValue(
							userStyles.borders.dividerThickness,
							defaultValues.borders.dividerThickness
						)}
						oninput={(e) =>
							(userStyles.borders.dividerThickness = parseInt(e.target.value))}
					/>
				</label>
			</div>
		{/if}

		<!-- Section Gap -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Gap Between Sections</h3>
			<label>
				<span
					>{getValue(
						userStyles.borders.sectionGap,
						defaultValues.borders.sectionGap
					)}px</span
				>
				<input
					type="range"
					min="0"
					max="64"
					step="4"
					value={getValue(userStyles.borders.sectionGap, defaultValues.borders.sectionGap)}
					oninput={(e) => (userStyles.borders.sectionGap = parseInt(e.target.value))}
				/>
			</label>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div class="preview-area">
				<div
					class="preview-section"
					style="gap: {getValue(userStyles.borders.sectionGap, 24)}px;"
				>
					<div class="preview-block">Section 1</div>
					{#if previewBorder !== "none"}
						<hr style="border: none; border-top: {previewBorder};" />
					{/if}
					<div class="preview-block">Section 2</div>
					{#if previewBorder !== "none"}
						<hr style="border: none; border-top: {previewBorder};" />
					{/if}
					<div class="preview-block">Section 3</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.borders-card {
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
		gap: 0.5em;
		padding: 0.75em 1em;
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

	.divider-preview {
		width: 40px;
		height: 0;
	}

	.no-divider {
		height: 2px;
		background: transparent;
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

	.preview-section {
		display: flex;
		flex-direction: column;
	}

	.preview-section hr {
		margin: 0;
		width: 100%;
	}

	.preview-block {
		padding: 0.75em;
		background: #e0e0e0;
		text-align: center;
		font-size: 0.9em;
		color: #666;
	}

	@media (max-width: 768px) {
		.option-btn {
			padding: 0.5em 0.75em;
			min-width: 55px;
			font-size: 0.9em;
		}
	}
</style>
