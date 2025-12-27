/**
 * User styles state - starts with null/empty values representing "no choice made"
 * As users make selections in the survey, these get populated and
 * the CSS custom properties update to reflect their choices in real-time.
 */

export const userStyles = $state({
	colors: {
		bg: {
			type: null, // null = no choice, "solid" or "gradient"
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
	},

	sizes: {
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
	},

	typography: {
		fontFamily: null,
		headingFont: null,
		bodyFont: null,
		fontWeight: null,
		lineHeight: null,
		letterSpacing: null
	},

	animations: {
		enabled: false,
		transitionDuration: null,
		transitionTiming: null,
		hoverEffects: {
			scale: null,
			shadow: false,
			colorShift: false
		},
		pageTransitions: null
	},

	layout: {
		maxWidth: null,
		contentPadding: null,
		elementSpacing: null,
		alignment: null
	},

	rating: null
});

// Default values to use when user makes a choice (starting points for sliders/pickers)
export const defaultValues = {
	colors: {
		bg: {
			solidColor: "#808080",
			gradient: {
				startColor: "#ffffff",
				endColor: "#111111",
				degrees: 45
			}
		},
		marginalia: {
			header: {
				bg: "#ffffff",
				text: "#111111"
			},
			footer: {
				bg: "#ffffff"
			}
		},
		card: {
			bg: "#ffffff",
			text: "#000000",
			border: "#000000"
		},
		button: {
			next: { bg: "#e5e7eb", text: "#000000" },
			back: { bg: "#e5e7eb", text: "#000000" },
			reset: { bg: "#e5e7eb", text: "#000000" }
		}
	},
	sizes: {
		card: {
			width: 800,
			height: 500,
			border: { width: 2, roundness: 0 }
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
			text: 16
		},
		form: {
			rangeSlider: { height: 15, width: 200 }
		}
	},
	typography: {
		fontFamily: "system-ui",
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: 0
	},
	animations: {
		transitionDuration: 200,
		transitionTiming: "ease"
	},
	layout: {
		maxWidth: 1200,
		contentPadding: 16,
		elementSpacing: 16
	}
};
