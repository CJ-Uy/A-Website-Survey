<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	// Get value or default for display
	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	// Set value when user interacts
	function setValue(path, value) {
		const keys = path.split(".");
		let obj = userStyles.sizes;
		for (let i = 0; i < keys.length - 1; i++) {
			obj = obj[keys[i]];
		}
		obj[keys[keys.length - 1]] = Number(value);
	}

	function resetSizes() {
		userStyles.sizes = {
			card: {
				width: null,
				height: null,
				border: {
					width: null,
					roundness: null
				}
			},
			text: {
				surveyTitle: null,
				cardTitles: null,
				subheadings: null,
				content: null
			},
			button: {
				gap: null,
				padding: null,
				text: null
			},
			form: {
				rangeSlider: {
					height: null,
					width: null
				}
			}
		};
	}
</script>

<div class="sizes-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetSizes}
			title="Reset sizes to default"
			aria-label="Reset sizes to default"
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
		Sizes
	</h2>

	<div class="sections-grid">
		<!-- Card Sizing -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Card</h3>
			<div class="controls-grid">
				<label>
					<span>Width</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(userStyles.sizes.card.width, defaultValues.sizes.card.width)}
							oninput={(e) => setValue("card.width", e.target.value)}
							min="200"
							max="2000"
						/>
						<input
							type="range"
							value={getValue(userStyles.sizes.card.width, defaultValues.sizes.card.width)}
							oninput={(e) => setValue("card.width", e.target.value)}
							min="200"
							max="1600"
						/>
					</div>
				</label>

				<label>
					<span>Height</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(userStyles.sizes.card.height, defaultValues.sizes.card.height)}
							oninput={(e) => setValue("card.height", e.target.value)}
							min="200"
							max="1200"
						/>
						<input
							type="range"
							value={getValue(userStyles.sizes.card.height, defaultValues.sizes.card.height)}
							oninput={(e) => setValue("card.height", e.target.value)}
							min="200"
							max="800"
						/>
					</div>
				</label>

				<label>
					<span>Border Width</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(
								userStyles.sizes.card.border.width,
								defaultValues.sizes.card.border.width
							)}
							oninput={(e) => setValue("card.border.width", e.target.value)}
							min="0"
							max="20"
						/>
						<input
							type="range"
							value={getValue(
								userStyles.sizes.card.border.width,
								defaultValues.sizes.card.border.width
							)}
							oninput={(e) => setValue("card.border.width", e.target.value)}
							min="0"
							max="20"
						/>
					</div>
				</label>

				<label>
					<span>Border Radius</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(
								userStyles.sizes.card.border.roundness,
								defaultValues.sizes.card.border.roundness
							)}
							oninput={(e) => setValue("card.border.roundness", e.target.value)}
							min="0"
							max="50"
						/>
						<input
							type="range"
							value={getValue(
								userStyles.sizes.card.border.roundness,
								defaultValues.sizes.card.border.roundness
							)}
							oninput={(e) => setValue("card.border.roundness", e.target.value)}
							min="0"
							max="50"
						/>
					</div>
				</label>
			</div>
		</div>

		<!-- Text Sizing -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Text</h3>
			<div class="controls-grid">
				<label>
					<span>Survey Title</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(
								userStyles.sizes.text.surveyTitle,
								defaultValues.sizes.text.surveyTitle
							)}
							oninput={(e) => setValue("text.surveyTitle", e.target.value)}
							min="12"
							max="72"
						/>
						<input
							type="range"
							value={getValue(
								userStyles.sizes.text.surveyTitle,
								defaultValues.sizes.text.surveyTitle
							)}
							oninput={(e) => setValue("text.surveyTitle", e.target.value)}
							min="12"
							max="72"
						/>
					</div>
				</label>

				<label>
					<span>Card Titles</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(
								userStyles.sizes.text.cardTitles,
								defaultValues.sizes.text.cardTitles
							)}
							oninput={(e) => setValue("text.cardTitles", e.target.value)}
							min="12"
							max="48"
						/>
						<input
							type="range"
							value={getValue(
								userStyles.sizes.text.cardTitles,
								defaultValues.sizes.text.cardTitles
							)}
							oninput={(e) => setValue("text.cardTitles", e.target.value)}
							min="12"
							max="48"
						/>
					</div>
				</label>

				<label>
					<span>Subheadings</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(
								userStyles.sizes.text.subheadings,
								defaultValues.sizes.text.subheadings
							)}
							oninput={(e) => setValue("text.subheadings", e.target.value)}
							min="10"
							max="36"
						/>
						<input
							type="range"
							value={getValue(
								userStyles.sizes.text.subheadings,
								defaultValues.sizes.text.subheadings
							)}
							oninput={(e) => setValue("text.subheadings", e.target.value)}
							min="10"
							max="36"
						/>
					</div>
				</label>

				<label>
					<span>Content</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(userStyles.sizes.text.content, defaultValues.sizes.text.content)}
							oninput={(e) => setValue("text.content", e.target.value)}
							min="10"
							max="24"
						/>
						<input
							type="range"
							value={getValue(userStyles.sizes.text.content, defaultValues.sizes.text.content)}
							oninput={(e) => setValue("text.content", e.target.value)}
							min="10"
							max="24"
						/>
					</div>
				</label>
			</div>
		</div>

		<!-- Button Sizing -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Buttons</h3>
			<div class="controls-grid">
				<label>
					<span>Text Size</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(userStyles.sizes.button.text, defaultValues.sizes.button.text)}
							oninput={(e) => setValue("button.text", e.target.value)}
							min="10"
							max="32"
						/>
						<input
							type="range"
							value={getValue(userStyles.sizes.button.text, defaultValues.sizes.button.text)}
							oninput={(e) => setValue("button.text", e.target.value)}
							min="10"
							max="32"
						/>
					</div>
				</label>

				<label>
					<span>Padding</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(userStyles.sizes.button.padding, defaultValues.sizes.button.padding)}
							oninput={(e) => setValue("button.padding", e.target.value)}
							min="0"
							max="32"
						/>
						<input
							type="range"
							value={getValue(userStyles.sizes.button.padding, defaultValues.sizes.button.padding)}
							oninput={(e) => setValue("button.padding", e.target.value)}
							min="0"
							max="32"
						/>
					</div>
				</label>

				<label>
					<span>Gap</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(userStyles.sizes.button.gap, defaultValues.sizes.button.gap)}
							oninput={(e) => setValue("button.gap", e.target.value)}
							min="0"
							max="64"
						/>
						<input
							type="range"
							value={getValue(userStyles.sizes.button.gap, defaultValues.sizes.button.gap)}
							oninput={(e) => setValue("button.gap", e.target.value)}
							min="0"
							max="64"
						/>
					</div>
				</label>
			</div>
		</div>

		<!-- Form Elements -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Form Elements</h3>
			<div class="controls-grid">
				<label>
					<span>Slider Width</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(
								userStyles.sizes.form.rangeSlider.width,
								defaultValues.sizes.form.rangeSlider.width
							)}
							oninput={(e) => setValue("form.rangeSlider.width", e.target.value)}
							min="50"
							max="400"
						/>
						<input
							type="range"
							value={getValue(
								userStyles.sizes.form.rangeSlider.width,
								defaultValues.sizes.form.rangeSlider.width
							)}
							oninput={(e) => setValue("form.rangeSlider.width", e.target.value)}
							min="50"
							max="400"
						/>
					</div>
				</label>

				<label>
					<span>Slider Height</span>
					<div class="input-group">
						<input
							type="number"
							value={getValue(
								userStyles.sizes.form.rangeSlider.height,
								defaultValues.sizes.form.rangeSlider.height
							)}
							oninput={(e) => setValue("form.rangeSlider.height", e.target.value)}
							min="4"
							max="24"
						/>
						<input
							type="range"
							value={getValue(
								userStyles.sizes.form.rangeSlider.height,
								defaultValues.sizes.form.rangeSlider.height
							)}
							oninput={(e) => setValue("form.rangeSlider.height", e.target.value)}
							min="4"
							max="24"
						/>
					</div>
				</label>
			</div>
		</div>
	</div>
</div>

<style>
	.sizes-card {
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
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5em;
	}

	.controls-grid {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.controls-grid > label {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.controls-grid > label > span {
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
		min-width: 80px;
	}

	@media (max-width: 768px) {
		.sections-grid {
			grid-template-columns: 1fr;
		}

		input[type="number"] {
			width: 60px;
		}
	}
</style>
