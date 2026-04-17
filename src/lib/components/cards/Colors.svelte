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

	function hslToHex(h, s, l) {
		s /= 100;
		l /= 100;
		const a = s * Math.min(l, 1 - l);
		const f = (n) => {
			const k = (n + h / 30) % 12;
			const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * c).toString(16).padStart(2, '0');
		};
		return `#${f(0)}${f(8)}${f(4)}`;
	}

	function clamp(v, min, max) {
		return Math.max(min, Math.min(max, v));
	}

	function randomize() {
		const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		const baseHue = rand(0, 359);
		const isDark = Math.random() > 0.5;

		// Pick a color harmony scheme
		const schemes = [
			[baseHue, (baseHue + 180) % 360],
			[baseHue, (baseHue + 30) % 360, (baseHue + 330) % 360],
			[baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360],
			[baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360]
		];
		const hues = schemes[rand(0, schemes.length - 1)];

		// Background: low saturation, extreme lightness
		const bgSat = rand(5, 20);
		const bgLight = isDark ? rand(4, 14) : rand(88, 97);
		const bgColor = hslToHex(hues[0], bgSat, bgLight);

		// Card: slightly offset from bg
		const cardOffset = isDark ? rand(6, 14) : -rand(6, 14);
		const cardLight = clamp(bgLight + cardOffset, 5, 95);
		const cardBg = hslToHex(hues[0], bgSat + 5, cardLight);

		// Text: high contrast with its background
		const textLight = isDark ? rand(82, 96) : rand(4, 18);
		const cardText = hslToHex(hues[0], 15, textLight);

		// Border: same hue family, mid-distance lightness
		const borderLight = isDark ? clamp(cardLight + 20, 20, 60) : clamp(cardLight - 20, 40, 80);
		const cardBorder = hslToHex(hues[0], 20, borderLight);

		// Accent (primary button): harmony's second hue, vivid
		const accentHue = hues[1] ?? hues[0];
		const accentSat = rand(55, 85);
		const accentLight = isDark ? rand(50, 65) : rand(35, 50);
		const accentBg = hslToHex(accentHue, accentSat, accentLight);
		const accentText = hslToHex(accentHue, 15, accentLight > 55 ? rand(5, 15) : rand(85, 95));

		// Secondary buttons: muted, same base hue
		const secLight = isDark ? rand(22, 35) : rand(62, 75);
		const secBg = hslToHex(hues[0], 15, secLight);
		const secText = hslToHex(hues[0], 10, secLight > 55 ? rand(5, 15) : rand(85, 95));

		// Header/footer: close to card lightness
		const headerLight = clamp(cardLight + (isDark ? 5 : -5), 5, 95);
		const headerBg = hslToHex(hues[0], bgSat + 8, headerLight);

		// Gradient: harmony hues with mid saturation
		const gradHue2 = hues[2] ?? hues[1] ?? (baseHue + 60) % 360;
		const gradSat = rand(50, 75);
		const gradBase = isDark ? 30 : 70;
		const gradStart = hslToHex(hues[0], gradSat, clamp(gradBase + rand(-8, 8), 15, 85));
		const gradEnd = hslToHex(gradHue2, gradSat, clamp(gradBase + rand(-8, 8), 15, 85));

		const useGradient = Math.random() > 0.6;
		userStyles.colors.bg.type = useGradient ? 'gradient' : 'solid';
		userStyles.colors.bg.solidColor = bgColor;
		userStyles.colors.bg.gradient.startColor = gradStart;
		userStyles.colors.bg.gradient.endColor = gradEnd;
		userStyles.colors.bg.gradient.degrees = rand(0, 359);

		userStyles.colors.marginalia.header.ownBg = Math.random() > 0.4;
		userStyles.colors.marginalia.header.bg = headerBg;
		userStyles.colors.marginalia.header.text = cardText;
		userStyles.colors.marginalia.footer.ownBg = Math.random() > 0.5;
		userStyles.colors.marginalia.footer.bg = headerBg;

		userStyles.colors.card.bg = cardBg;
		userStyles.colors.card.text = cardText;
		userStyles.colors.card.border = cardBorder;

		userStyles.colors.button.next.bg = accentBg;
		userStyles.colors.button.next.text = accentText;
		userStyles.colors.button.back.bg = secBg;
		userStyles.colors.button.back.text = secText;
		userStyles.colors.button.reset.bg = secBg;
		userStyles.colors.button.reset.text = secText;
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

	.randomizeBtn {
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
