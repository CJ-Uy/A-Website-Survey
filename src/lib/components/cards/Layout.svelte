<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	const alignmentOptions = [
		{ name: "Left", value: "left" },
		{ name: "Center", value: "center" },
		{ name: "Right", value: "right" }
	];

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function resetLayout() {
		userStyles.layout = {
			maxWidth: null,
			contentPadding: null,
			elementSpacing: null,
			alignment: null
		};
	}
</script>

<div class="layout-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetLayout}
			title="Reset layout to default"
			aria-label="Reset layout to default"
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
		Layout & Spacing
	</h2>

	<div class="sections-grid">
		<!-- Content Width -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Content Width</h3>
			<label>
				<span
					>Max Width: {getValue(userStyles.layout.maxWidth, defaultValues.layout.maxWidth)}px</span
				>
				<input
					type="range"
					min="600"
					max="1600"
					step="50"
					value={getValue(userStyles.layout.maxWidth, defaultValues.layout.maxWidth)}
					oninput={(e) => (userStyles.layout.maxWidth = parseInt(e.target.value))}
				/>
			</label>
			<div class="width-presets">
				<button
					class:selected={userStyles.layout.maxWidth === 800}
					onclick={() => (userStyles.layout.maxWidth = 800)}
				>
					Narrow
				</button>
				<button
					class:selected={userStyles.layout.maxWidth === 1000}
					onclick={() => (userStyles.layout.maxWidth = 1000)}
				>
					Medium
				</button>
				<button
					class:selected={userStyles.layout.maxWidth === 1200}
					onclick={() => (userStyles.layout.maxWidth = 1200)}
				>
					Wide
				</button>
				<button
					class:selected={userStyles.layout.maxWidth === 1600}
					onclick={() => (userStyles.layout.maxWidth = 1600)}
				>
					Full
				</button>
			</div>
		</div>

		<!-- Padding -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Content Padding</h3>
			<label>
				<span
					>Padding: {getValue(
						userStyles.layout.contentPadding,
						defaultValues.layout.contentPadding
					)}px</span
				>
				<input
					type="range"
					min="0"
					max="64"
					step="4"
					value={getValue(userStyles.layout.contentPadding, defaultValues.layout.contentPadding)}
					oninput={(e) => (userStyles.layout.contentPadding = parseInt(e.target.value))}
				/>
			</label>
			<div class="padding-presets">
				<button
					class:selected={userStyles.layout.contentPadding === 8}
					onclick={() => (userStyles.layout.contentPadding = 8)}
				>
					Compact
				</button>
				<button
					class:selected={userStyles.layout.contentPadding === 16}
					onclick={() => (userStyles.layout.contentPadding = 16)}
				>
					Normal
				</button>
				<button
					class:selected={userStyles.layout.contentPadding === 32}
					onclick={() => (userStyles.layout.contentPadding = 32)}
				>
					Relaxed
				</button>
				<button
					class:selected={userStyles.layout.contentPadding === 48}
					onclick={() => (userStyles.layout.contentPadding = 48)}
				>
					Spacious
				</button>
			</div>
		</div>

		<!-- Element Spacing -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Element Spacing</h3>
			<label>
				<span
					>Gap between elements: {getValue(
						userStyles.layout.elementSpacing,
						defaultValues.layout.elementSpacing
					)}px</span
				>
				<input
					type="range"
					min="0"
					max="48"
					step="4"
					value={getValue(userStyles.layout.elementSpacing, defaultValues.layout.elementSpacing)}
					oninput={(e) => (userStyles.layout.elementSpacing = parseInt(e.target.value))}
				/>
			</label>
		</div>

		<!-- Alignment -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Content Alignment</h3>
			<div class="alignment-grid">
				{#each alignmentOptions as alignment}
					<button
						class="alignment-option"
						class:selected={userStyles.layout.alignment === alignment.value}
						onclick={() => (userStyles.layout.alignment = alignment.value)}
					>
						<span class="alignment-icon">
							{#if alignment.value === "left"}
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="3" y1="12" x2="15" y2="12"></line>
									<line x1="3" y1="18" x2="18" y2="18"></line>
								</svg>
							{:else if alignment.value === "center"}
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="6" y1="12" x2="18" y2="12"></line>
									<line x1="5" y1="18" x2="19" y2="18"></line>
								</svg>
							{:else}
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="9" y1="12" x2="21" y2="12"></line>
									<line x1="6" y1="18" x2="21" y2="18"></line>
								</svg>
							{/if}
						</span>
						<span>{alignment.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div
				class="preview-container"
				style="
					max-width: {getValue(userStyles.layout.maxWidth, defaultValues.layout.maxWidth)}px;
					padding: {getValue(userStyles.layout.contentPadding, defaultValues.layout.contentPadding)}px;
					text-align: {userStyles.layout.alignment || 'left'};
				"
			>
				<div
					class="preview-content"
					style="gap: {getValue(
						userStyles.layout.elementSpacing,
						defaultValues.layout.elementSpacing
					)}px;"
				>
					<div class="preview-block">Header Area</div>
					<div class="preview-block">Content Area</div>
					<div class="preview-block">Footer Area</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.layout-card {
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

	.sections-grid > div > label {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.sections-grid > div > label > span {
		font-weight: 500;
	}

	input[type="range"] {
		width: 100%;
		max-width: 300px;
	}

	.width-presets,
	.padding-presets {
		display: flex;
		gap: 0.5em;
		margin-top: 0.75em;
		flex-wrap: wrap;
	}

	.width-presets button,
	.padding-presets button {
		padding: 0.4em 0.8em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
	}

	.width-presets button:hover,
	.padding-presets button:hover {
		border-color: #666;
	}

	.width-presets button.selected,
	.padding-presets button.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.alignment-grid {
		display: flex;
		gap: 0.5em;
	}

	.alignment-option {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5em;
		padding: 1em;
		border: 1px solid #ccc;
		background: transparent;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 80px;
	}

	.alignment-option:hover {
		border-color: #666;
	}

	.alignment-option.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.alignment-icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.preview-container {
		border: 1px solid #ccc;
		background: #fafafa;
		margin: 0 auto;
	}

	.preview-content {
		display: flex;
		flex-direction: column;
	}

	.preview-block {
		padding: 0.75em;
		background: #e0e0e0;
		border: 1px dashed #999;
		text-align: center;
		font-size: 0.9em;
		color: #666;
	}

	@media (max-width: 768px) {
		.width-presets,
		.padding-presets {
			gap: 0.25em;
		}

		.width-presets button,
		.padding-presets button {
			padding: 0.3em 0.6em;
			font-size: 0.9em;
		}

		.alignment-option {
			padding: 0.75em;
			min-width: 60px;
		}
	}
</style>
