<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function randomize() {
		const prefs = ['light', 'dark', 'system'];
		const shades = ['pure-black', 'dark-gray', 'dark-blue', 'dark-green'];
		userStyles.darkMode.preference = prefs[Math.floor(Math.random() * prefs.length)];
		userStyles.darkMode.darkShade = shades[Math.floor(Math.random() * shades.length)];
		userStyles.darkMode.darkAccentColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
	}

	function resetDarkMode() {
		userStyles.darkMode = {
			preference: null,
			darkShade: null,
			darkAccentColor: null
		};
	}

	const preferenceOptions = [
		{ name: "Light", value: "light", bg: "#ffffff", text: "#000000" },
		{ name: "Dark", value: "dark", bg: "#1a1a1a", text: "#ffffff" },
		{ name: "System", value: "system", bg: "linear-gradient(135deg, #fff 50%, #1a1a1a 50%)", text: "#666" }
	];

	const shadeOptions = [
		{ name: "Pure Black", value: "pure-black", bg: "#000000" },
		{ name: "Dark Gray", value: "dark-gray", bg: "#1f1f1f" },
		{ name: "Dark Blue", value: "dark-blue", bg: "#0f172a" },
		{ name: "Dark Green", value: "dark-green", bg: "#052e16" }
	];

	let isDark = $derived(
		userStyles.darkMode.preference === "dark" ||
		userStyles.darkMode.preference === "system"
	);
	let bgColor = $derived(
		isDark
			? (shadeOptions.find((s) => s.value === userStyles.darkMode.darkShade)?.bg ?? "#1f1f1f")
			: "#ffffff"
	);
	let textColor = $derived(isDark ? "#e0e0e0" : "#1a1a1a");
	let accentColor = $derived(getValue(
		userStyles.darkMode.darkAccentColor,
		defaultValues.darkMode.darkAccentColor
	));
</script>

<div class="darkmode-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetDarkMode}
			title="Reset dark mode to default"
			aria-label="Reset dark mode to default"
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
		Dark Mode
	</h2>

	<div class="sections-grid">
		<!-- Theme Preference -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Theme Preference</h3>
			<div class="option-grid">
				{#each preferenceOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.darkMode.preference === option.value}
						onclick={() => (userStyles.darkMode.preference = option.value)}
					>
						<div
							class="theme-preview"
							style="background: {option.bg}; color: {option.text};"
						>
							Aa
						</div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Dark Shade (only if dark or system selected) -->
		{#if userStyles.darkMode.preference === "dark" || userStyles.darkMode.preference === "system"}
			<div class="cardSubSection">
				<h3 class="cardSubHeading">Dark Background Shade</h3>
				<div class="option-grid">
					{#each shadeOptions as option}
						<button
							class="option-btn"
							class:selected={userStyles.darkMode.darkShade === option.value}
							onclick={() => (userStyles.darkMode.darkShade = option.value)}
						>
							<div class="shade-preview" style="background: {option.bg};"></div>
							<span>{option.name}</span>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Accent Color -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Accent Color</h3>
			<p class="hint">Used for links, buttons, and interactive elements.</p>
			<label>
				<input
					type="color"
					value={getValue(
						userStyles.darkMode.darkAccentColor,
						defaultValues.darkMode.darkAccentColor
					)}
					oninput={(e) => (userStyles.darkMode.darkAccentColor = e.target.value)}
				/>
			</label>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div class="preview-area" style="background: {bgColor}; color: {textColor};">
				<div class="preview-heading">Page Title</div>
				<div class="preview-text">Some body text content.</div>
				<span class="preview-link" style="color: {accentColor};">A link</span>
				<button class="preview-btn" style="background: {accentColor}; color: #fff;">
					Button
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.darkmode-card {
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

	.hint {
		color: #666;
		font-size: 0.9em;
		margin-bottom: 0.5em;
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

	.theme-preview {
		width: 50px;
		height: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ccc;
		font-weight: 700;
		font-size: 1.1em;
	}

	.shade-preview {
		width: 50px;
		height: 30px;
		border: 1px solid #444;
	}

	.preview-area {
		padding: 1.5em;
		border: 1px solid #ccc;
		display: flex;
		flex-direction: column;
		gap: 0.75em;
	}

	.preview-heading {
		font-weight: 700;
		font-size: 1.1em;
	}

	.preview-text {
		font-size: 0.9em;
		opacity: 0.8;
	}

	.preview-link {
		font-size: 0.9em;
		text-decoration: underline;
		cursor: pointer;
	}

	.preview-btn {
		padding: 0.5em 1em;
		border: none;
		cursor: pointer;
		align-self: flex-start;
		font-size: 0.9em;
	}

	@media (max-width: 768px) {
		.option-btn {
			padding: 0.5em;
			min-width: 65px;
			font-size: 0.9em;
		}
	}
</style>
