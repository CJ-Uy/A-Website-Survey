<script>
	import { userStyles, defaultValues } from "$lib/state/userStyles.svelte";

	function getValue(value, defaultValue) {
		return value ?? defaultValue;
	}

	function randomize() {
		const positions = ['top', 'sidebar'];
		const mobileStyles = ['hamburger', 'visible', 'bottom-tab'];
		userStyles.navigation.position = positions[Math.floor(Math.random() * positions.length)];
		userStyles.navigation.sticky = Math.random() > 0.5;
		userStyles.navigation.mobileStyle = mobileStyles[Math.floor(Math.random() * mobileStyles.length)];
		userStyles.navigation.transparency = Math.floor(Math.random() * 11) * 5 + 50;
	}

	function resetNavigation() {
		userStyles.navigation = {
			position: null,
			sticky: null,
			mobileStyle: null,
			transparency: null
		};
	}

	const positionOptions = [
		{ name: "Top Bar", value: "top" },
		{ name: "Sidebar", value: "sidebar" }
	];

	const mobileOptions = [
		{ name: "Hamburger", value: "hamburger" },
		{ name: "Visible Links", value: "visible" },
		{ name: "Bottom Tab", value: "bottom-tab" }
	];

	let isTop = $derived(userStyles.navigation.position !== "sidebar");
</script>

<div class="navigation-card">
	<h2 class="cardTitle">
		<button
			class="resetBtn"
			onclick={resetNavigation}
			title="Reset navigation to default"
			aria-label="Reset navigation to default"
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
		Navigation
	</h2>

	<div class="sections-grid">
		<!-- Position -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Navigation Position</h3>
			<div class="option-grid">
				{#each positionOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.navigation.position === option.value}
						onclick={() => (userStyles.navigation.position = option.value)}
					>
						<div class="nav-preview nav-{option.value}">
							<div class="nav-bar"></div>
							<div class="nav-content"></div>
						</div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Sticky -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Sticky Navigation</h3>
			<div class="option-grid">
				<button
					class="option-btn"
					class:selected={userStyles.navigation.sticky === true}
					onclick={() => (userStyles.navigation.sticky = true)}
				>
					<span>Sticky</span>
				</button>
				<button
					class="option-btn"
					class:selected={userStyles.navigation.sticky === false}
					onclick={() => (userStyles.navigation.sticky = false)}
				>
					<span>Scrolls Away</span>
				</button>
			</div>
		</div>

		<!-- Mobile Style -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Mobile Navigation</h3>
			<div class="option-grid">
				{#each mobileOptions as option}
					<button
						class="option-btn"
						class:selected={userStyles.navigation.mobileStyle === option.value}
						onclick={() => (userStyles.navigation.mobileStyle = option.value)}
					>
						<div class="mobile-preview mobile-{option.value}">
							{#if option.value === "hamburger"}
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<line x1="3" y1="6" x2="21" y2="6"></line>
									<line x1="3" y1="12" x2="21" y2="12"></line>
									<line x1="3" y1="18" x2="21" y2="18"></line>
								</svg>
							{:else if option.value === "visible"}
								<div class="mini-links">
									<span></span><span></span><span></span>
								</div>
							{:else}
								<div class="mini-tabs">
									<span></span><span></span><span></span><span></span>
								</div>
							{/if}
						</div>
						<span>{option.name}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Transparency -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Navigation Opacity</h3>
			<label>
				<span
					>{getValue(
						userStyles.navigation.transparency,
						defaultValues.navigation.transparency
					)}%</span
				>
				<input
					type="range"
					min="50"
					max="100"
					step="5"
					value={getValue(
						userStyles.navigation.transparency,
						defaultValues.navigation.transparency
					)}
					oninput={(e) =>
						(userStyles.navigation.transparency = parseInt(e.target.value))}
				/>
			</label>
		</div>

		<!-- Preview -->
		<div class="cardSubSection">
			<h3 class="cardSubHeading">Preview</h3>
			<div class="preview-area">
				<div class="preview-layout" class:sidebar-layout={!isTop}>
					<div
						class="preview-nav"
						class:preview-nav-top={isTop}
						class:preview-nav-side={!isTop}
						style="opacity: {(getValue(userStyles.navigation.transparency, 100)) / 100};"
					>
						{#if isTop}
							<span class="nav-logo">Logo</span>
							<div class="nav-links"><span>Home</span><span>About</span><span>Contact</span></div>
						{:else}
							<span class="nav-logo">Logo</span>
							<div class="nav-links-v"><span>Home</span><span>About</span><span>Contact</span></div>
						{/if}
					</div>
					<div class="preview-body">
						<div class="body-line"></div>
						<div class="body-line short"></div>
						<div class="body-line"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.navigation-card {
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

	.nav-preview {
		width: 60px;
		height: 45px;
		border: 1px solid #ccc;
		display: flex;
		overflow: hidden;
	}

	.nav-top {
		flex-direction: column;
	}

	.nav-top .nav-bar {
		height: 8px;
		background: #999;
		width: 100%;
	}

	.nav-top .nav-content {
		flex: 1;
		background: #eee;
	}

	.nav-sidebar {
		flex-direction: row;
	}

	.nav-sidebar .nav-bar {
		width: 15px;
		background: #999;
		height: 100%;
	}

	.nav-sidebar .nav-content {
		flex: 1;
		background: #eee;
	}

	.mobile-preview {
		width: 40px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.mini-links {
		display: flex;
		gap: 3px;
	}

	.mini-links span {
		width: 8px;
		height: 3px;
		background: #999;
	}

	.mini-tabs {
		display: flex;
		gap: 2px;
		align-items: flex-end;
	}

	.mini-tabs span {
		width: 8px;
		height: 8px;
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
		padding: 1em;
	}

	.preview-layout {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	.sidebar-layout {
		flex-direction: row;
	}

	.preview-nav {
		background: #ddd;
		font-size: 0.75em;
	}

	.preview-nav-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5em 0.75em;
	}

	.preview-nav-side {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0.5em;
		min-width: 70px;
	}

	.nav-logo {
		font-weight: 700;
		font-size: 0.9em;
	}

	.nav-links {
		display: flex;
		gap: 0.75em;
		font-size: 0.85em;
		color: #666;
	}

	.nav-links-v {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		font-size: 0.85em;
		color: #666;
	}

	.preview-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		padding: 0.5em;
	}

	.body-line {
		height: 6px;
		background: #e0e0e0;
		border-radius: 2px;
	}

	.body-line.short {
		width: 60%;
	}

	@media (max-width: 768px) {
		.option-btn {
			padding: 0.5em;
			min-width: 65px;
			font-size: 0.9em;
		}
	}
</style>
