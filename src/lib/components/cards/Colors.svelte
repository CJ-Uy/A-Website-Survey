<script>
	import { userStyles } from "$lib/state/userStyles.svelte";

	$effect(() => {
		// Effects for Background Subsection
		if (userStyles.colors.bg.type === "solid") {
			// Set solid background color
			document.body.style.backgroundColor = userStyles.colors.bg.solidColor;
			document.body.style.backgroundImage = ""; // Clear gradient background
		} else if (userStyles.colors.bg.type === "gradient") {
			// Set gradient background
			document.body.style.backgroundImage = `linear-gradient(${userStyles.colors.bg.gradient.degrees}deg, ${userStyles.colors.bg.gradient.startColor}, ${userStyles.colors.bg.gradient.endColor})`;
		}

		// Effects for Marginalia Subsection
		if (userStyles.colors.marginalia.header.ownBg)
			document.querySelector("header").style.backgroundColor =
				userStyles.colors.marginalia.header.bg;
		else document.querySelector("header").style.backgroundColor = null;

		if (userStyles.colors.marginalia.footer.ownBg)
			document.querySelector("footer").style.backgroundColor =
				userStyles.colors.marginalia.footer.bg;
		else document.querySelector("footer").style.backgroundColor = null;

		document.getElementById("surveyTitle").style.color = userStyles.colors.marginalia.header.text;

		// Effects for Card Color Subsection
		document.getElementById("card").style.backgroundColor = userStyles.colors.card.bg;
		document.getElementById("card").style.color = userStyles.colors.card.text;
		document.getElementById("card").style.borderColor = userStyles.colors.card.border;

		// Effect for Button Subsection
		for (const nextBtn of document.getElementsByClassName("nextBtn")) {
			nextBtn.style.backgroundColor = userStyles.colors.button.next.bg;
			nextBtn.style.color = userStyles.colors.button.next.text;
		}

		for (const backBtn of document.getElementsByClassName("backBtn")) {
			backBtn.style.backgroundColor = userStyles.colors.button.back.bg;
			backBtn.style.color = userStyles.colors.button.back.text;
		}

		for (const resetBtn of document.getElementsByClassName("resetBtn")) {
			resetBtn.style.backgroundColor = userStyles.colors.button.reset.bg;
			resetBtn.style.color = userStyles.colors.button.reset.text;
		}
	});

	function resetColors() {
		const radios = document.querySelectorAll('input[name="bgType"]'); // Select all radio inputs with name="bgType"
		for (const radio of radios) {
			radio.checked = false; // Uncheck each radio input
		}
		document.body.style.backgroundImage = "";
		document.body.style.backgroundColor = "";
		userStyles.colors = {
			bg: {
				type: "",
				solidColor: "#ffffff", // Default solid color of gray
				gradient: {
					startColor: "#ffffff", // Default start color of white
					endColor: "#111111", // Default end color of black
					degrees: 45 // Default gradient direction
				}
			},
			marginalia: {
				header: {
					ownBg: false,
					bg: "#ffffff",
					text: "#111111"
				},
				footer: {
					ownBg: false,
					bg: "#ffffff"
				}
			},
			card: {
				bg: "#ffffff", // Default card bg of white
				text: "#000000",
				border: "#000000"
			},
			button: {
				next: {
					bg: "#e5e7eb", // Default Button Gray
					text: "#000000"
				},
				back: {
					bg: "#e5e7eb", // Default Button Gray
					text: "#000000"
				},
				reset: {
					bg: "#e5e7eb", // Default Button Gray
					text: "#000000"
				}
			}
		};
	}
</script>

<div class="w-full">
	<h2 class="cardTitle">
		<button class="resetBtn" onclick={resetColors}>
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
		Colors
	</h2>

	<!-- BACKGROUND COLORS -->
	<div class="cardSubSection">
		<h3 class="cardSubHeading">Background Color</h3>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div>
				<div class="mb-2 flex items-center gap-4">
					<label class="flex items-center">
						<input
							type="radio"
							name="bgType"
							value="gradient"
							onchange={() => (userStyles.colors.bg.type = "gradient")}
							class="mr-2"
						/>
						Gradient
					</label>
					<label class="flex items-center">
						<input
							type="radio"
							name="bgType"
							value="solid"
							onchange={() => (userStyles.colors.bg.type = "solid")}
							class="mr-2"
						/>
						Solid
					</label>
				</div>
			</div>

			<div>
				{#if userStyles.colors.bg.type == "solid"}
					<label class="mb-2 block">
						Select a Solid Background
						<input type="color" bind:value={userStyles.colors.bg.solidColor} class="ml-2" />
					</label>
				{:else if userStyles.colors.bg.type == "gradient"}
					<div>
						<div class="flex flex-col gap-2">
							<div class="flex flex-row gap-5">
								<label class="flex items-center">
									Starting Color
									<input
										type="color"
										bind:value={userStyles.colors.bg.gradient.startColor}
										class="ml-2"
									/>
								</label>
								<label class="flex items-center">
									Ending Color
									<input
										type="color"
										bind:value={userStyles.colors.bg.gradient.endColor}
										class="ml-2"
									/>
								</label>
							</div>
							<label class="flex items-center">
								Gradient Direction
								<input
									type="range"
									min="0"
									max="180"
									bind:value={userStyles.colors.bg.gradient.degrees}
									class="ml-2 w-32"
								/>
							</label>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Cards and Margins -->
	<div class="cardSubSection grid grid-cols-1 md:grid-cols-2">
		<!-- CARD COLORS -->
		<div>
			<h3 class="cardSubHeading">Card Color</h3>
			<div class="flex flex-col gap-2">
				<label class="flex items-center">
					Card Background Color
					<input type="color" bind:value={userStyles.colors.card.bg} class="ml-2" />
				</label>
				<label class="flex items-center">
					Card Text Color
					<input type="color" bind:value={userStyles.colors.card.text} class="ml-2" />
				</label>
				<label class="flex items-center">
					Card Border Color
					<input type="color" bind:value={userStyles.colors.card.border} class="ml-2" />
				</label>
			</div>
		</div>

		<!-- MARGINALIA COLORS -->
		<div>
			<h3 class="cardSubHeading">Marginalia</h3>
			<div class="flex flex-col gap-2">
				<div class="flex items-center">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={userStyles.colors.marginalia.header.ownBg}
							class="mr-2"
						/>
						Header should be colored
					</label>
					{#if userStyles.colors.marginalia.header.ownBg}
						<label class="ml-4 flex items-center">
							|| Color
							<input
								type="color"
								bind:value={userStyles.colors.marginalia.header.bg}
								class="ml-2"
							/>
						</label>
					{/if}
				</div>

				<div class="flex items-center">
					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={userStyles.colors.marginalia.footer.ownBg}
							class="mr-2"
						/>
						Footer should be colored
					</label>
					{#if userStyles.colors.marginalia.footer.ownBg}
						<label class="ml-4 flex items-center">
							|| Color
							<input
								type="color"
								bind:value={userStyles.colors.marginalia.footer.bg}
								class="ml-2"
							/>
						</label>
					{/if}
				</div>

				<div>
					<label class="flex items-center">
						Survey Title Color
						<input
							type="color"
							bind:value={userStyles.colors.marginalia.header.text}
							class="ml-2"
						/>
					</label>
				</div>
			</div>
		</div>
	</div>

	<!-- BUTTON COLORS -->
	<div>
		<h3 class="cardSubHeading">Buttons Color</h3>
		<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
			<div class="flex flex-col gap-2">
				<h4 class="font-medium">Next Button</h4>
				<label class="flex items-center">
					Background
					<input type="color" bind:value={userStyles.colors.button.next.bg} class="ml-2" />
				</label>
				<label class="flex items-center">
					Text Color
					<input type="color" bind:value={userStyles.colors.button.next.text} class="ml-2" />
				</label>
			</div>

			<div class="flex flex-col gap-2">
				<h4 class="font-medium">Back Button</h4>
				<label class="flex items-center">
					Background
					<input type="color" bind:value={userStyles.colors.button.back.bg} class="ml-2" />
				</label>
				<label class="flex items-center">
					Text Color
					<input type="color" bind:value={userStyles.colors.button.back.text} class="ml-2" />
				</label>
			</div>

			<div class="flex flex-col gap-2">
				<h4 class="font-medium">Reset Button</h4>
				<label class="flex items-center">
					Background
					<input type="color" bind:value={userStyles.colors.button.reset.bg} class="ml-2" />
				</label>
				<label class="flex items-center">
					Text Color
					<input type="color" bind:value={userStyles.colors.button.reset.text} class="ml-2" />
				</label>
			</div>
		</div>
	</div>
</div>
