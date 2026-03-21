<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function randomize() {
		const borderStyles = ['solid', 'dashed', 'none', 'underline'];
		const cbStyles = ['square', 'rounded', 'circular'];
		userStyles.formStyling.inputBorderStyle = borderStyles[Math.floor(Math.random() * borderStyles.length)];
		userStyles.formStyling.focusRingColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
		userStyles.formStyling.placeholderColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
		userStyles.formStyling.inputBorderRadius = Math.floor(Math.random() * 20);
		userStyles.formStyling.checkboxStyle = cbStyles[Math.floor(Math.random() * cbStyles.length)];
	}

	function resetFormStyling() {
		userStyles.formStyling = {
			inputBorderStyle: null,
			focusRingColor: null,
			placeholderColor: null,
			inputBorderRadius: null,
			checkboxStyle: null
		};
	}

	const borderStyleOptions = [
		{ name: "Solid", value: "solid" },
		{ name: "Dashed", value: "dashed" },
		{ name: "None", value: "none" },
		{ name: "Underline", value: "underline" }
	];

	const checkboxOptions = [
		{ name: "Square", value: "square", radius: "0" },
		{ name: "Rounded", value: "rounded", radius: "4px" },
		{ name: "Circular", value: "circular", radius: "50%" }
	];

	let borderRadius = $derived(getValue(userStyles.formStyling.inputBorderRadius, 4));
	let borderStyle = $derived(userStyles.formStyling.inputBorderStyle || "solid");
	let focusColor = $derived(getValue(
		userStyles.formStyling.focusRingColor,
		defaultValues.formStyling.focusRingColor
	));
	let placeholderColor = $derived(getValue(
		userStyles.formStyling.placeholderColor,
		defaultValues.formStyling.placeholderColor
	));
</script>

<div class="form-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetFormStyling}
			title="Reset form styling to default"
			aria-label="Reset form styling to default"
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
		Form Styling
	</h2>

	<div class="sections-grid">
		<!-- Input Border Style -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Input Border Style</h3>
			<div class="option-grid">
				{#each borderStyleOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.formStyling.inputBorderStyle === option.value}
						onclick={() => (userStyles.formStyling.inputBorderStyle = option.value)}
					>
						<div class="input-preview input-{option.value}">
							<span>Text</span>
						</div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Input Border Radius -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Input Border Radius</h3>
			<label>
				<span
					>{getValue(
						userStyles.formStyling.inputBorderRadius,
						defaultValues.formStyling.inputBorderRadius
					)}px</span
				>
				<input
					type="range"
					min="0"
					max="20"
					step="1"
					value={getValue(
						userStyles.formStyling.inputBorderRadius,
						defaultValues.formStyling.inputBorderRadius
					)}
					oninput={(e) =>
						(userStyles.formStyling.inputBorderRadius = parseInt(e.target.value))}
				/>
			</label>
		</div>

		<!-- Focus Ring Color -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Focus Ring Color</h3>
			<label>
				<input
					type="color"
					value={getValue(
						userStyles.formStyling.focusRingColor,
						defaultValues.formStyling.focusRingColor
					)}
					oninput={(e) => (userStyles.formStyling.focusRingColor = e.target.value)}
				/>
			</label>
		</div>

		<!-- Placeholder Color -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Placeholder Text Color</h3>
			<label>
				<input
					type="color"
					value={getValue(
						userStyles.formStyling.placeholderColor,
						defaultValues.formStyling.placeholderColor
					)}
					oninput={(e) => (userStyles.formStyling.placeholderColor = e.target.value)}
				/>
			</label>
		</div>

		<!-- Checkbox Style -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Checkbox / Radio Style</h3>
			<div class="option-grid">
				{#each checkboxOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.formStyling.checkboxStyle === option.value}
						onclick={() => (userStyles.formStyling.checkboxStyle = option.value)}
					>
						<div
							class="checkbox-preview"
							style="border-radius: {option.radius};"
						></div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div class="preview-area">
				<div class="preview-field">
					<label class="preview-label">Name</label>
					<div
						class="preview-input"
						class:underline-only={borderStyle === "underline"}
						style="
							border-style: {borderStyle === 'underline' ? 'none' : borderStyle};
							border-bottom-style: {borderStyle === 'underline' ? 'solid' : borderStyle};
							border-radius: {borderStyle === 'underline' ? '0' : borderRadius + 'px'};
						"
					>
						<span style="color: {placeholderColor};">Enter your name...</span>
					</div>
				</div>
				<div class="preview-field">
					<label class="preview-label">Email</label>
					<div
						class="preview-input focused"
						class:underline-only={borderStyle === "underline"}
						style="
							border-style: {borderStyle === 'underline' ? 'none' : borderStyle};
							border-bottom-style: {borderStyle === 'underline' ? 'solid' : borderStyle};
							border-radius: {borderStyle === 'underline' ? '0' : borderRadius + 'px'};
							outline: 2px solid {focusColor};
							outline-offset: 2px;
						"
					>
						<span>user@example.com</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.form-card {
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

	.sections-grid label:not(.preview-label):not(.toggle-row) {
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

	.input-preview {
		width: 50px;
		height: 24px;
		display: flex;
		align-items: center;
		padding: 0 4px;
		font-size: 0.7em;
		color: #999;
		background: #fff;
	}

	.input-solid {
		border: 1px solid #999;
	}

	.input-dashed {
		border: 1px dashed #999;
	}

	.input-none {
		border: none;
		background: #f0f0f0;
	}

	.input-underline {
		border: none;
		border-bottom: 1px solid #999;
	}

	.checkbox-preview {
		width: 18px;
		height: 18px;
		border: 2px solid #666;
		background: #fff;
	}

	input[type="range"] {
		width: 100%;
		max-width: 300px;
	}

	.preview-area {
		padding: 1.5em;
		border: 1px solid #ccc;
		background: #fafafa;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.preview-field {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.preview-label {
		font-size: 0.85em;
		font-weight: 500;
		color: #333;
	}

	.preview-input {
		padding: 0.5em 0.75em;
		border: 1px solid #ccc;
		background: #fff;
		font-size: 0.9em;
	}

	.preview-input.underline-only {
		background: transparent;
		padding-left: 0;
	}

	@media (max-width: 768px) {
		.option-btn {
			padding: 0.5em;
			min-width: 55px;
			font-size: 0.9em;
		}
	}
</style>
