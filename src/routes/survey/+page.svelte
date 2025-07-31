<script>
	import { goto } from "$app/navigation";
	import { Colors, Size, Rating } from "$lib/components/cards";
	import { userStyles } from "$lib/state/userStyles.svelte";

	let currentSlide = $state(1);

	$effect(() => {
		if (currentSlide < 1) {
			goto("/");
		} else if (currentSlide > 3) {
			goto("/statistics");
		}
	});

	function hexToRgb(hex) {
		// Remove the leading '#' if present
		hex = hex.replace(/^#/, "");

		// Parse the hex string into RGB components
		const bigint = parseInt(hex, 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;

		return { r, g, b };
	}

	function convertColorsToRgb(obj) {
		// Create a new object to avoid mutating the original
		const newObj = Array.isArray(obj) ? [] : {};

		for (const key in obj) {
			if (typeof obj[key] === "string" && obj[key].startsWith("#")) {
				// If the value is a hex color string, convert it to { r, g, b }
				newObj[key] = hexToRgb(obj[key]);
			} else if (typeof obj[key] === "object" && obj[key] !== null) {
				// If the value is an object or array, recursively process it
				newObj[key] = convertColorsToRgb(obj[key]);
			} else {
				// Otherwise, copy the value as is
				newObj[key] = obj[key];
			}
		}

		return newObj;
	}

	async function submitData() {
		if (userStyles.colors.bg.type === "") {
			userStyles.colors.bg.type = "solid";
		}

		// Convert all color strings to { r, g, b } objects
		const processedStyles = convertColorsToRgb(userStyles);

		// Upload all data to the database
		const response = await fetch("/api/save", {
			method: "POST",
			body: JSON.stringify(processedStyles)
		});

		// Reset styles
		document.body.style.all = "revert";

		// Redirect to the statistics page
		goto("/statistics");
	}
</script>

<div class="flex h-[100vh] flex-col items-center justify-center">
	<header class="flex h-[15vh] w-full items-center justify-center">
		<h1 id="surveyTitle">A Website Survey</h1>
	</header>
	<section class="flex h-[70vh] w-full items-center justify-center">
		<div class="flex h-150 w-[80%] flex-col border-2 md:w-300" id="card">
			<div class="flex-1 overflow-y-auto p-5">
				{#if currentSlide == 1}
					<Colors />
				{:else if currentSlide == 2}
					<Size />
				{:else if currentSlide == 3}
					<Rating />
				{/if}
			</div>
		</div>
	</section>
	<footer class="flex h-[15vh] w-full items-center justify-center">
		{#if currentSlide != 1}
			<button class="backBtn navButton" onclick={() => currentSlide--}> Back </button>
		{:else}
			<button class="backBtn navButton" disabled> Back </button>
		{/if}

		<div id="buttonSpace" class="w-[1rem]"></div>

		{#if currentSlide != 3}
			<button class="nextBtn navButton" onclick={() => currentSlide++}> Next </button>
		{:else}
			<button class="nextBtn navButton" onclick={submitData}> SUBMIT </button>
		{/if}
	</footer>
</div>
