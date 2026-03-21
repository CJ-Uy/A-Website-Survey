/**
 * User styles state - starts with null/empty values representing "no choice made"
 * As users make selections in the survey, these get populated and
 * the CSS custom properties update to reflect their choices in real-time.
 *
 * State is persisted to localStorage so users can continue where they left off.
 */

import { browser } from "$app/environment";

const STORAGE_KEY = "survey-user-styles";

function createInitialState() {
	return {
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

		shadows: {
			cardShadow: {
				enabled: false,
				x: null,
				y: null,
				blur: null,
				spread: null,
				color: null
			},
			buttonShadow: false,
			elevationLevel: null // "flat", "subtle", "moderate", "dramatic"
		},

		borders: {
			dividerStyle: null, // "none", "solid", "dashed", "dotted", "double"
			dividerColor: null,
			dividerThickness: null,
			sectionGap: null
		},

		spacing: {
			density: null, // "compact", "comfortable", "spacious"
			paragraphGap: null,
			sectionSpacing: null,
			innerPadding: null
		},

		media: {
			imageBorderRadius: null,
			imageAspectRatio: null, // "1:1", "4:3", "16:9", "3:2"
			mediaStyle: null, // "sharp", "rounded", "circular"
			showPlaceholders: true
		},

		darkMode: {
			preference: null, // "light", "dark", "system"
			darkShade: null, // "pure-black", "dark-gray", "dark-blue", "dark-green"
			darkAccentColor: null
		},

		navigation: {
			position: null, // "top", "sidebar"
			sticky: null, // true, false
			mobileStyle: null, // "hamburger", "visible", "bottom-tab"
			transparency: null // 0-100
		},

		formStyling: {
			inputBorderStyle: null, // "solid", "dashed", "none", "underline"
			focusRingColor: null,
			placeholderColor: null,
			inputBorderRadius: null,
			checkboxStyle: null // "square", "rounded", "circular"
		},

		rating: null
	};
}

// Load from localStorage if available
function loadFromStorage() {
	if (!browser) return null;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return JSON.parse(stored);
		}
	} catch {
		// Corrupted data, ignore
	}
	return null;
}

// Deep merge saved state into initial state (handles new fields added since save)
function mergeState(initial, saved) {
	if (!saved) return initial;

	const result = { ...initial };
	for (const key of Object.keys(initial)) {
		if (key in saved) {
			if (
				initial[key] !== null &&
				typeof initial[key] === "object" &&
				!Array.isArray(initial[key]) &&
				saved[key] !== null &&
				typeof saved[key] === "object"
			) {
				result[key] = mergeState(initial[key], saved[key]);
			} else {
				result[key] = saved[key];
			}
		}
	}
	return result;
}

const initialState = createInitialState();
const savedState = loadFromStorage();
export const userStyles = $state(mergeState(initialState, savedState));

// Save to localStorage whenever state changes
if (browser) {
	$effect.root(() => {
		$effect(() => {
			// Access the entire object to track all changes
			const snapshot = JSON.stringify(userStyles);
			localStorage.setItem(STORAGE_KEY, snapshot);
		});
	});
}

/** Clear saved state from localStorage */
export function clearSavedState() {
	if (browser) {
		localStorage.removeItem(STORAGE_KEY);
	}
}

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
	},
	shadows: {
		cardShadow: {
			x: 0,
			y: 4,
			blur: 12,
			spread: 0,
			color: "#00000020"
		}
	},
	borders: {
		dividerColor: "#cccccc",
		dividerThickness: 1,
		sectionGap: 24
	},
	spacing: {
		paragraphGap: 16,
		sectionSpacing: 32,
		innerPadding: 16
	},
	media: {
		imageBorderRadius: 0
	},
	darkMode: {
		darkAccentColor: "#6366f1"
	},
	navigation: {
		transparency: 100
	},
	formStyling: {
		focusRingColor: "#3b82f6",
		placeholderColor: "#9ca3af",
		inputBorderRadius: 4
	}
};
