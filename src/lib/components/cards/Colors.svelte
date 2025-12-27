<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	// Initialize a color value when user first interacts with it
	function initColor(path, defaultValue) {
		const keys = path.split(".");
		let obj = userStyles.colors;
		for (let i = 0; i < keys.length - 1; i++) {
			obj = obj[keys[i]];
		}
		if (obj[keys[keys.length - 1]] === null) {
			obj[keys[keys.length - 1]] = defaultValue;
		}
	}

	// Get current value or empty string for color inputs
	function getColor(value, defaultValue) {
		return value ?? defaultValue;
	}

	function resetColors() {
		userStyles.colors = {
			bg: {
				type: null,
				solidColor: null,
				gradient: {
					startColor: null,
					endColor: null,
					degrees: null
				}
			},
			marginalia: {
				header: {
					ownBg: false,
					bg: null,
					text: null
				},
				footer: {
					ownBg: false,
					bg: null
				}
			},
			card: {
				bg: null,
				text: null,
				border: null
			},
			button: {
				next: {
					bg: null,
					text: null
				},
				back: {
					bg: null,
					text: null
				},
				reset: {
					bg: null,
					text: null
				}
			}
		};
	}

	// When background type is selected, initialize with defaults
	function selectBgType(type) {
		userStyles.colors.bg.type = type;
		if (type === "solid" && userStyles.colors.bg.solidColor === null) {
			userStyles.colors.bg.solidColor = defaultValues.colors.bg.solidColor;
		} else if (type === "gradient") {
			if (userStyles.colors.bg.gradient.startColor === null) {
				userStyles.colors.bg.gradient.startColor = defaultValues.colors.bg.gradient.startColor;
			}
			if (userStyles.colors.bg.gradient.endColor === null) {
				userStyles.colors.bg.gradient.endColor = defaultValues.colors.bg.gradient.endColor;
			}
			if (userStyles.colors.bg.gradient.degrees === null) {
				userStyles.colors.bg.gradient.degrees = defaultValues.colors.bg.gradient.degrees;
			}
		}
	}
</script>

<div class="colors-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetColors}
			title="Reset colors to default"
			aria-label="Reset colors to default"
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
		Colors
	</h2>

	<!-- BACKGROUND COLORS -->
	<div class="cardSubSection">
		<h3 class="cardSubHeading">Background</h3>
		<div class="options-row">
			<div class="radio-group">
				<label>
					<input
						type="radio"
						name="bgType"
						value="solid"
						checked={userStyles.colors.bg.type === "solid"}
						onchange={() => selectBgType("solid")}
					/>
					Solid Color
				</label>
				<label>
					<input
						type="radio"
						name="bgType"
						value="gradient"
						checked={userStyles.colors.bg.type === "gradient"}
						onchange={() => selectBgType("gradient")}
					/>
					Gradient
				</label>
			</div>

			<div class="color-options">
				{#if userStyles.colors.bg.type === "solid"}
					<label>
						Background Color
						<input type="color" bind:value={userStyles.colors.bg.solidColor} />
					</label>
				{:else if userStyles.colors.bg.type === "gradient"}
					<div class="gradient-options">
						<label>
							Start Color
							<input type="color" bind:value={userStyles.colors.bg.gradient.startColor} />
						</label>
						<label>
							End Color
							<input type="color" bind:value={userStyles.colors.bg.gradient.endColor} />
						</label>
						<label>
							Angle: {userStyles.colors.bg.gradient.degrees}deg
							<input
								type="range"
								min="0"
								max="360"
								bind:value={userStyles.colors.bg.gradient.degrees}
							/>
						</label>
					</div>
				{:else}
					<p class="hint">Select a background type to customize</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- CARD COLORS -->
	<div class="cardSubSection">
		<h3 class="cardSubHeading">Card</h3>
		<div class="color-grid">
			<label>
				Background
				<input
					type="color"
					value={getColor(userStyles.colors.card.bg, defaultValues.colors.card.bg)}
					oninput={(e) => (userStyles.colors.card.bg = e.target.value)}
				/>
			</label>
			<label>
				Text
				<input
					type="color"
					value={getColor(userStyles.colors.card.text, defaultValues.colors.card.text)}
					oninput={(e) => (userStyles.colors.card.text = e.target.value)}
				/>
			</label>
			<label>
				Border
				<input
					type="color"
					value={getColor(userStyles.colors.card.border, defaultValues.colors.card.border)}
					oninput={(e) => (userStyles.colors.card.border = e.target.value)}
				/>
			</label>
		</div>
	</div>

	<!-- MARGINALIA COLORS -->
	<div class="cardSubSection">
		<h3 class="cardSubHeading">Header & Footer</h3>
		<div class="marginalia-options">
			<div class="marginalia-row">
				<label>
					<input type="checkbox" bind:checked={userStyles.colors.marginalia.header.ownBg} />
					Header has background
				</label>
				{#if userStyles.colors.marginalia.header.ownBg}
					<input
						type="color"
						value={getColor(
							userStyles.colors.marginalia.header.bg,
							defaultValues.colors.marginalia.header.bg
						)}
						oninput={(e) => (userStyles.colors.marginalia.header.bg = e.target.value)}
					/>
				{/if}
			</div>

			<div class="marginalia-row">
				<label>
					<input type="checkbox" bind:checked={userStyles.colors.marginalia.footer.ownBg} />
					Footer has background
				</label>
				{#if userStyles.colors.marginalia.footer.ownBg}
					<input
						type="color"
						value={getColor(
							userStyles.colors.marginalia.footer.bg,
							defaultValues.colors.marginalia.footer.bg
						)}
						oninput={(e) => (userStyles.colors.marginalia.footer.bg = e.target.value)}
					/>
				{/if}
			</div>

			<label>
				Title Text Color
				<input
					type="color"
					value={getColor(
						userStyles.colors.marginalia.header.text,
						defaultValues.colors.marginalia.header.text
					)}
					oninput={(e) => (userStyles.colors.marginalia.header.text = e.target.value)}
				/>
			</label>
		</div>
	</div>

	<!-- BUTTON COLORS -->
	<div class="cardSubSection">
		<h3 class="cardSubHeading">Buttons</h3>
		<div class="buttons-grid">
			<div class="button-group">
				<h4>Next Button</h4>
				<label>
					Background
					<input
						type="color"
						value={getColor(userStyles.colors.button.next.bg, defaultValues.colors.button.next.bg)}
						oninput={(e) => (userStyles.colors.button.next.bg = e.target.value)}
					/>
				</label>
				<label>
					Text
					<input
						type="color"
						value={getColor(
							userStyles.colors.button.next.text,
							defaultValues.colors.button.next.text
						)}
						oninput={(e) => (userStyles.colors.button.next.text = e.target.value)}
					/>
				</label>
			</div>

			<div class="button-group">
				<h4>Back Button</h4>
				<label>
					Background
					<input
						type="color"
						value={getColor(userStyles.colors.button.back.bg, defaultValues.colors.button.back.bg)}
						oninput={(e) => (userStyles.colors.button.back.bg = e.target.value)}
					/>
				</label>
				<label>
					Text
					<input
						type="color"
						value={getColor(
							userStyles.colors.button.back.text,
							defaultValues.colors.button.back.text
						)}
						oninput={(e) => (userStyles.colors.button.back.text = e.target.value)}
					/>
				</label>
			</div>

			<div class="button-group">
				<h4>Reset Button</h4>
				<label>
					Background
					<input
						type="color"
						value={getColor(
							userStyles.colors.button.reset.bg,
							defaultValues.colors.button.reset.bg
						)}
						oninput={(e) => (userStyles.colors.button.reset.bg = e.target.value)}
					/>
				</label>
				<label>
					Text
					<input
						type="color"
						value={getColor(
							userStyles.colors.button.reset.text,
							defaultValues.colors.button.reset.text
						)}
						oninput={(e) => (userStyles.colors.button.reset.text = e.target.value)}
					/>
				</label>
			</div>
		</div>
	</div>
</div>

<style>
	.colors-card {
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

	.options-row {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.radio-group {
		display: flex;
		gap: 1.5em;
	}

	.radio-group label {
		display: flex;
		align-items: center;
		gap: 0.5em;
		cursor: pointer;
	}

	.color-options {
		margin-top: 0.5em;
	}

	.gradient-options {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}

	.hint {
		color: #666;
		font-style: italic;
	}

	.color-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
	}

	.color-grid label,
	.gradient-options label,
	.marginalia-options label {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.marginalia-options {
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.marginalia-row {
		display: flex;
		align-items: center;
		gap: 1em;
	}

	.buttons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1em;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.button-group h4 {
		font-weight: 600;
		margin: 0;
	}

	.button-group label {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	input[type="color"] {
		width: 40px;
		height: 30px;
		border: 1px solid #ccc;
		cursor: pointer;
	}

	input[type="range"] {
		width: 100px;
	}

	@media (max-width: 768px) {
		.buttons-grid {
			grid-template-columns: 1fr;
		}

		.gradient-options {
			flex-direction: column;
		}
	}
</style>
