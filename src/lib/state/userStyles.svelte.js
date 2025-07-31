/**
 * Original attempt was actually to use Tailwind classes in an array then use .join(" ") to
 * reactively change the styles. However, this was inconsistent and did not work with the
 * bind:value modifier since the value needs to be processed like adding a prefix before being
 * pushed into the corresponding global state's property's array. To do this attempts were made
 * with the $derived and $effect runes but that lead to infinite loops. It looked something like:
 * class = {userStyles.card.heading.h2.join(" ")}
 */

export const userStyles = $state({
	colors: {
		bg: {
			type: "",
			solidColor: "#808080", // Default solid color of gray
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
				bg: "#ffffff",
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
	},

	sizes: {
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
	},

	rating: 3
});
