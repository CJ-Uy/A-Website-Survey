<script>
	import { userStyles } from "$lib/state/userStyles.svelte";

	$effect(() => {
		// Card Sizing Effects
		document.getElementById("card").style.height = `${userStyles.sizes.card.height}px`;
		document.getElementById("card").style.width = `${userStyles.sizes.card.width}px`;
		document.getElementById("card").style.borderWidth = `${userStyles.sizes.card.border.width}px`;
		document.getElementById("card").style.borderRadius =
			`${userStyles.sizes.card.border.roundness}%`;

		// Text Sizing Effects
		document.getElementById("surveyTitle").style.fontSize =
			`${userStyles.sizes.text.surveyTitle}px`;
		for (const cardHeading of document.getElementsByClassName("cardTitle")) {
			cardHeading.style.fontSize = `${userStyles.sizes.text.cardTitles}px`;
		}
		for (const cardHeading of document.getElementsByClassName("cardSubHeading")) {
			cardHeading.style.fontSize = `${userStyles.sizes.text.subheadings}px`;
		}
		document.body.style.fontSize = `${userStyles.sizes.text.content}px`;

		// Button Sizing Effects
		for (const navbtn of document.getElementsByClassName("navButton")) {
			navbtn.style.fontSize = `${userStyles.sizes.button.text}px`;
			navbtn.style.padding = `${userStyles.sizes.button.padding / 2}px ${userStyles.sizes.button.padding}px`;
		}
		document.getElementById("buttonSpace").style.width = `${userStyles.sizes.button.gap}px`;

		// Form Sizing Effects
		for (const slider of document.querySelectorAll('input[type="range"]')) {
			slider.style.width = `${userStyles.sizes.form.rangeSlider.width}px`;
			slider.style.height = `${userStyles.sizes.form.rangeSlider.height}px`;
		}

		for (const resetBtn of document.getElementsByClassName("resetBtn")) {
			resetBtn.style.backgroundColor = userStyles.colors.button.reset.bg;
			resetBtn.style.color = userStyles.colors.button.reset.text;
		}
	});

	function resetSizes() {
		userStyles.sizes = {
			card: {
				width: 1200,
				height: 600,
				border: {
					width: 2,
					roundness: 0
				}
			},
			text: {
				surveyTitle: 48,
				cardTitles: 30,
				subheadings: 18,
				content: 16
			},
			button: {
				gap: 16,
				padding: 8,
				text: 20
			},
			form: {
				rangeSlider: {
					height: 15,
					width: 300
				}
			}
		};
	}
</script>

<div class="w-full">
	<h2 class="cardTitle">
		<button class="resetBtn" onclick={resetSizes}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={userStyles.sizes.text.cardTitles * 0.7}
				height={userStyles.sizes.text.cardTitles * 0.7}
				viewBox="0 0 21 21"
				><!-- Icon from System UIcons by Corey Ginnivan - https://github.com/CoreyGinnivan/system-uicons/blob/master/LICENSE --><g
					fill="none"
					fill-rule="evenodd"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M3.578 6.487A8 8 0 1 1 2.5 10.5" /><path d="M7.5 6.5h-4v-4" /></g
				></svg
			>
		</button>
		Sizes
	</h2>
	<div class="cardSubSection grid grid-cols-1 gap-x-20 gap-y-5 md:grid-cols-2">
		<div>
			<!-- I don't know why this is the only thing that works [hours waster: 2] -->
			<h3 class="cardSubHeading" style="margin-top: 1px;">Card Sizing</h3>
			<div class="grid grid-cols-[30%_70%] gap-y-3 md:grid-cols-[20%_80%]">
				<label for="cardHeight" class="mr-5">Card Height</label>
				<div>
					<input
						type="number"
						name="cardHeight"
						bind:value={userStyles.sizes.card.height}
						class="h-[30px] w-[80px]"
					/>
					<input
						type="range"
						name="cardHeight"
						bind:value={userStyles.sizes.card.height}
						min="300"
						max="1000"
					/>
				</div>

				<label for="cardWidth" class="mr-5">Card Width</label>
				<div>
					<input
						type="number"
						name="cardWidth"
						bind:value={userStyles.sizes.card.width}
						class="h-[30px] w-[80px]"
					/>
					<input
						type="range"
						name="cardWidth"
						onchange={(e) => (userStyles.sizes.card.width = Number(e.target.value))}
						min="500"
						max="1700"
					/>
				</div>

				<label for="borderWidth" class="mr-5">Border Width</label>
				<div>
					<input
						type="number"
						name="borderWidth"
						bind:value={userStyles.sizes.card.border.width}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="borderWidth"
						bind:value={userStyles.sizes.card.border.width}
						min="1"
						max="99"
					/>
				</div>

				<label for="borderRoundness" class="mr-5 mb-3">Border Roundness</label>
				<div>
					<input
						type="number"
						name="borderRoundness"
						bind:value={userStyles.sizes.card.border.roundness}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="borderRoundness"
						bind:value={userStyles.sizes.card.border.roundness}
						min="1"
						max="50"
					/>
				</div>
			</div>
		</div>

		<div>
			<h3 class="cardSubHeading" style="margin-top: 1px;">Text Sizing</h3>
			<div class="grid grid-cols-[30%_70%] gap-y-3 md:grid-cols-[20%_80%]">
				<label for="surveyTitleSize" class="mr-5">Survey Title</label>
				<div>
					<input
						type="number"
						name="surveyTitleSize"
						bind:value={userStyles.sizes.text.surveyTitle}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="surveyTitleSize"
						bind:value={userStyles.sizes.text.surveyTitle}
						min="1"
						max="99"
					/>
				</div>

				<label for="cardTitleSize" class="mr-5">Card Titles</label>
				<div>
					<input
						type="number"
						name="cardTitleSize"
						bind:value={userStyles.sizes.text.cardTitles}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="cardTitleSize"
						bind:value={userStyles.sizes.text.cardTitles}
						min="1"
						max="99"
					/>
				</div>

				<label for="cardSubHeadingSize" class="mr-5">Subheadings</label>
				<div>
					<input
						type="number"
						name="cardSubHeadingSize"
						bind:value={userStyles.sizes.text.subheadings}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="cardSubHeadingSize"
						bind:value={userStyles.sizes.text.subheadings}
						min="1"
						max="99"
					/>
				</div>

				<label for="cardContentSize" class="mr-5">Content</label>
				<div>
					<input
						type="number"
						name="cardContentSize"
						bind:value={userStyles.sizes.text.content}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="cardContentSize"
						bind:value={userStyles.sizes.text.content}
						min="1"
						max="99"
					/>
				</div>
			</div>
		</div>
	</div>
	<div class="mt-4 grid grid-cols-1 gap-x-20 gap-y-5 md:grid-cols-2">
		<div>
			<h3 class="cardSubHeading" style="margin-top: 1px;">Button Sizing</h3>
			<div class="grid grid-cols-[30%_70%] gap-y-3 md:grid-cols-[20%_80%]">
				<label for="buttonText" class="mr-5">Btn Text</label>
				<div>
					<input
						type="number"
						name="buttonText"
						bind:value={userStyles.sizes.button.text}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="buttonText"
						bind:value={userStyles.sizes.button.text}
						min="1"
						max="99"
					/>
				</div>

				<label for="buttonGap" class="mr-5">Gap</label>
				<div>
					<input
						type="number"
						name="buttonGap"
						bind:value={userStyles.sizes.button.gap}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="buttonGap"
						bind:value={userStyles.sizes.button.gap}
						min="0"
						max="999"
					/>
				</div>

				<label for="buttonPadding" class="mr-5">Btn Padding</label>
				<div>
					<input
						type="number"
						name="buttonPadding"
						bind:value={userStyles.sizes.button.padding}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="buttonPadding"
						bind:value={userStyles.sizes.button.padding}
						min="1"
						max="100"
					/>
				</div>
			</div>
		</div>

		<div>
			<h3 class="cardSubHeading" style="margin-top: 1px;">Form Element Sizing</h3>
			<div class="grid grid-cols-[30%_70%] gap-y-3 md:grid-cols-[20%_80%]">
				<label for="rangeBarWidth" class="mr-5">Range Bar Width</label>
				<div>
					<input
						type="number"
						name="rangeBarWidth"
						bind:value={userStyles.sizes.form.rangeSlider.width}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="rangeBarWidth"
						value={userStyles.sizes.form.rangeSlider.width}
						onchange={(e) => (userStyles.sizes.form.rangeSlider.width = Number(e.target.value))}
						min="50"
						max="500"
					/>
				</div>

				<label for="rangeBarHeight" class="mr-5">Range Bar Height</label>
				<div>
					<input
						type="number"
						name="rangeBarHeight"
						bind:value={userStyles.sizes.form.rangeSlider.height}
						class="h-[30px] w-[70px]"
					/>
					<input
						type="range"
						name="rangeBarHeight"
						bind:value={userStyles.sizes.form.rangeSlider.height}
						min="1"
						max="15"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
