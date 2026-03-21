<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function randomize() {
		const levels = ['flat', 'subtle', 'moderate', 'dramatic'];
		userStyles.shadows.elevationLevel = levels[Math.floor(Math.random() * levels.length)];
		userStyles.shadows.cardShadow.enabled = Math.random() > 0.3;
		userStyles.shadows.cardShadow.x = Math.floor(Math.random() * 20) - 10;
		userStyles.shadows.cardShadow.y = Math.floor(Math.random() * 20);
		userStyles.shadows.cardShadow.blur = Math.floor(Math.random() * 40);
		userStyles.shadows.cardShadow.spread = Math.floor(Math.random() * 15) - 5;
		userStyles.shadows.cardShadow.color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') + '33';
		userStyles.shadows.buttonShadow = Math.random() > 0.5;
	}

	function resetShadows() {
		userStyles.shadows = {
			cardShadow: {
				enabled: false,
				x: null,
				y: null,
				blur: null,
				spread: null,
				color: null
			},
			buttonShadow: false,
			elevationLevel: null
		};
	}

	function toggleCardShadow() {
		userStyles.shadows.cardShadow.enabled = !userStyles.shadows.cardShadow.enabled;
		if (userStyles.shadows.cardShadow.enabled) {
			if (userStyles.shadows.cardShadow.x === null)
				userStyles.shadows.cardShadow.x = defaultValues.shadows.cardShadow.x;
			if (userStyles.shadows.cardShadow.y === null)
				userStyles.shadows.cardShadow.y = defaultValues.shadows.cardShadow.y;
			if (userStyles.shadows.cardShadow.blur === null)
				userStyles.shadows.cardShadow.blur = defaultValues.shadows.cardShadow.blur;
			if (userStyles.shadows.cardShadow.spread === null)
				userStyles.shadows.cardShadow.spread = defaultValues.shadows.cardShadow.spread;
			if (userStyles.shadows.cardShadow.color === null)
				userStyles.shadows.cardShadow.color = defaultValues.shadows.cardShadow.color;
		}
	}

	const elevationOptions = [
		{ name: "Flat", value: "flat" },
		{ name: "Subtle", value: "subtle" },
		{ name: "Moderate", value: "moderate" },
		{ name: "Dramatic", value: "dramatic" }
	];

	const elevationStyles = {
		flat: "none",
		subtle: "0 1px 3px rgba(0,0,0,0.1)",
		moderate: "0 4px 12px rgba(0,0,0,0.15)",
		dramatic: "0 10px 40px rgba(0,0,0,0.25)"
	};

	let previewShadow = $derived(
		userStyles.shadows.cardShadow.enabled
			? `${getValue(userStyles.shadows.cardShadow.x, 0)}px ${getValue(userStyles.shadows.cardShadow.y, 4)}px ${getValue(userStyles.shadows.cardShadow.blur, 12)}px ${getValue(userStyles.shadows.cardShadow.spread, 0)}px ${getValue(userStyles.shadows.cardShadow.color, "#00000020")}`
			: "none"
	);
</script>

<div class="shadows-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetShadows}
			title="Reset shadows to default"
			aria-label="Reset shadows to default"
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
		Shadows & Depth
	</h2>

	<div class="sections-grid">
		<!-- Elevation Level -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Overall Elevation</h3>
			<div class="option-grid">
				{#each elevationOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.shadows.elevationLevel === option.value}
						onclick={() => (userStyles.shadows.elevationLevel = option.value)}
					>
						<div class="elevation-preview" style="box-shadow: {elevationStyles[option.value]};">
						</div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Card Shadow -->
		<div class="cardSubSection">
			<label class="toggle-row">
				<input
					type="checkbox"
					checked={userStyles.shadows.cardShadow.enabled}
					onchange={toggleCardShadow}
				/>
				<span class="toggle-label">Custom Card Shadow</span>
			</label>

			{#if userStyles.shadows.cardShadow.enabled}
				<div class="shadow-controls">
					<label>
						<span>X Offset: {getValue(userStyles.shadows.cardShadow.x, 0)}px</span>
						<input
							type="range"
							min="-20"
							max="20"
							step="1"
							value={getValue(userStyles.shadows.cardShadow.x, 0)}
							oninput={(e) =>
								(userStyles.shadows.cardShadow.x = parseInt(e.target.value))}
						/>
					</label>
					<label>
						<span>Y Offset: {getValue(userStyles.shadows.cardShadow.y, 4)}px</span>
						<input
							type="range"
							min="-20"
							max="20"
							step="1"
							value={getValue(userStyles.shadows.cardShadow.y, 4)}
							oninput={(e) =>
								(userStyles.shadows.cardShadow.y = parseInt(e.target.value))}
						/>
					</label>
					<label>
						<span>Blur: {getValue(userStyles.shadows.cardShadow.blur, 12)}px</span>
						<input
							type="range"
							min="0"
							max="50"
							step="1"
							value={getValue(userStyles.shadows.cardShadow.blur, 12)}
							oninput={(e) =>
								(userStyles.shadows.cardShadow.blur = parseInt(e.target.value))}
						/>
					</label>
					<label>
						<span
							>Spread: {getValue(userStyles.shadows.cardShadow.spread, 0)}px</span
						>
						<input
							type="range"
							min="-10"
							max="20"
							step="1"
							value={getValue(userStyles.shadows.cardShadow.spread, 0)}
							oninput={(e) =>
								(userStyles.shadows.cardShadow.spread = parseInt(e.target.value))}
						/>
					</label>
					<label>
						<span>Shadow Color</span>
						<input
							type="color"
							value={getValue(
								userStyles.shadows.cardShadow.color,
								"#000000"
							)}
							oninput={(e) =>
								(userStyles.shadows.cardShadow.color = e.target.value + "33")}
						/>
					</label>
				</div>
			{/if}
		</div>

		<!-- Button Shadow -->
		<div class="cardSubSection">
			<label class="toggle-row">
				<input type="checkbox" bind:checked={userStyles.shadows.buttonShadow} />
				<span>Add shadow to buttons</span>
			</label>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div class="preview-area">
				<div class="preview-card" style="box-shadow: {previewShadow};">
					Card with shadow
				</div>
				<button
					class="preview-btn"
					style="box-shadow: {userStyles.shadows.buttonShadow
						? '0 2px 8px rgba(0,0,0,0.15)'
						: 'none'};"
				>
					Button
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.shadows-card {
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
		min-width: 80px;
	}

	.option-btn:hover {
		border-color: #666;
	}

	.option-btn.selected {
		border-color: #333;
		background: #f0f0f0;
	}

	.elevation-preview {
		width: 50px;
		height: 30px;
		background: #fff;
		border: 1px solid #e0e0e0;
	}

	.toggle-row {
		display: flex;
		align-items: center;
		gap: 0.75em;
		cursor: pointer;
	}

	.toggle-label {
		font-weight: 600;
	}

	.shadow-controls {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
		margin-top: 1em;
	}

	.shadow-controls label {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	input[type="range"] {
		width: 100%;
		max-width: 300px;
	}

	.preview-area {
		padding: 2em;
		border: 1px solid #ccc;
		background: #fafafa;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5em;
		flex-wrap: wrap;
	}

	.preview-card {
		padding: 1.5em 2em;
		background: #fff;
		border: 1px solid #e0e0e0;
		font-size: 0.9em;
		color: #666;
	}

	.preview-btn {
		padding: 0.5em 1.5em;
		border: 1px solid #ccc;
		background: #fff;
		cursor: pointer;
	}

	@media (max-width: 768px) {
		.option-btn {
			padding: 0.5em;
			min-width: 65px;
			font-size: 0.9em;
		}
	}
</style>
