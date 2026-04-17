/**
 * Seed script — generates realistic survey responses.
 * Run while the dev server is running: node scripts/seed.js
 * Override count or URL: COUNT=50 API_URL=http://localhost:5173 node scripts/seed.js
 */

const API_URL = (process.env.API_URL ?? "http://localhost:5173") + "/api/save";
const COUNT = parseInt(process.env.COUNT ?? "80", 10);

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const weighted = (opts) => {
	const total = opts.reduce((s, o) => s + o.w, 0);
	let r = Math.random() * total;
	for (const o of opts) { r -= o.w; if (r <= 0) return o.v; }
	return opts[opts.length - 1].v;
};
const rgb = (r, g, b, v = 25) => ({
	r: Math.max(0, Math.min(255, r + rand(-v, v))),
	g: Math.max(0, Math.min(255, g + rand(-v, v))),
	b: Math.max(0, Math.min(255, b + rand(-v, v)))
});

function generate() {
	const isDark = Math.random() > 0.55;
	const useGradient = Math.random() > 0.68;
	const accentHue = pick([
		rgb(70, 130, 230),   // blue
		rgb(130, 70, 220),   // purple
		rgb(220, 80, 80),    // red
		rgb(40, 180, 120),   // green
		rgb(220, 140, 40),   // orange
	]);

	return {
		colors: {
			bg: {
				type: useGradient ? "gradient" : "solid",
				solidColor: isDark ? rgb(18, 18, 28, 8) : rgb(245, 245, 250, 8),
				gradient: {
					startColor: isDark ? rgb(15, 15, 40, 15) : rgb(210, 225, 255, 20),
					endColor: isDark ? rgb(40, 15, 60, 15) : rgb(255, 235, 210, 20),
					degrees: rand(0, 359)
				}
			},
			marginalia: {
				header: {
					ownBg: Math.random() > 0.38,
					bg: isDark ? rgb(22, 22, 32, 6) : rgb(255, 255, 255, 5),
					text: isDark ? rgb(220, 220, 232, 12) : rgb(20, 20, 30, 10)
				},
				footer: {
					ownBg: Math.random() > 0.5,
					bg: isDark ? rgb(18, 18, 28, 6) : rgb(248, 248, 252, 5)
				}
			},
			card: {
				bg: isDark ? rgb(28, 28, 40, 8) : rgb(255, 255, 255, 5),
				text: isDark ? rgb(218, 218, 230, 12) : rgb(15, 15, 22, 8),
				border: isDark ? rgb(55, 55, 75, 15) : rgb(200, 200, 210, 15)
			},
			button: {
				next: { bg: accentHue, text: rgb(255, 255, 255, 15) },
				back: {
					bg: isDark ? rgb(48, 48, 60, 10) : rgb(225, 225, 230, 10),
					text: isDark ? rgb(195, 195, 210, 12) : rgb(35, 35, 45, 10)
				},
				reset: {
					bg: isDark ? rgb(65, 22, 22, 10) : rgb(255, 225, 225, 10),
					text: isDark ? rgb(255, 175, 175, 15) : rgb(145, 10, 10, 20)
				}
			}
		},
		sizes: {
			card: {
				width: weighted([
					{ v: 600, w: 8 }, { v: 800, w: 22 }, { v: 900, w: 18 },
					{ v: 1000, w: 30 }, { v: 1200, w: 15 }, { v: rand(700, 1100), w: 7 }
				]),
				height: rand(320, 680),
				border: {
					width: weighted([{ v: 0, w: 28 }, { v: 1, w: 38 }, { v: 2, w: 22 }, { v: rand(3, 8), w: 12 }]),
					roundness: weighted([{ v: 0, w: 20 }, { v: 4, w: 28 }, { v: 8, w: 28 }, { v: 12, w: 15 }, { v: rand(14, 20), w: 9 }])
				}
			},
			text: {
				surveyTitle: rand(28, 58),
				cardTitles: rand(18, 36),
				subheadings: rand(13, 24),
				content: weighted([{ v: 13, w: 10 }, { v: 14, w: 20 }, { v: 15, w: 15 }, { v: 16, w: 30 }, { v: 18, w: 15 }, { v: 20, w: 10 }])
			},
			button: { gap: rand(8, 32), padding: rand(6, 20), text: rand(12, 20) },
			form: { rangeSlider: { height: rand(6, 20), width: rand(150, 340) } }
		},
		typography: {
			fontFamily: weighted([
				{ v: "system-ui", w: 28 },
				{ v: "Georgia, serif", w: 12 },
				{ v: "'Inter', sans-serif", w: 22 },
				{ v: "'Roboto', sans-serif", w: 14 },
				{ v: "monospace", w: 6 },
				{ v: "'Playfair Display', serif", w: 10 },
				{ v: "'Poppins', sans-serif", w: 8 }
			]),
			headingFont: null,
			bodyFont: null,
			fontWeight: weighted([{ v: 300, w: 8 }, { v: 400, w: 40 }, { v: 500, w: 22 }, { v: 600, w: 20 }, { v: 700, w: 10 }]),
			lineHeight: Math.round((rand(13, 20) / 10) * 10) / 10,
			letterSpacing: Math.round((rand(-10, 30)) / 10 * 10) / 10
		},
		animations: {
			enabled: weighted([{ v: true, w: 65 }, { v: false, w: 35 }]),
			transitionDuration: weighted([{ v: 100, w: 10 }, { v: 150, w: 15 }, { v: 200, w: 35 }, { v: 300, w: 25 }, { v: 500, w: 15 }]),
			transitionTiming: weighted([
				{ v: "ease", w: 35 }, { v: "ease-in-out", w: 30 },
				{ v: "ease-out", w: 20 }, { v: "ease-in", w: 8 }, { v: "linear", w: 7 }
			]),
			hoverEffects: {
				scale: Math.random() > 0.48 ? (Math.round((1 + rand(2, 8) / 100) * 100) / 100) : null,
				shadow: Math.random() > 0.55,
				colorShift: Math.random() > 0.65
			},
			pageTransitions: weighted([{ v: "fade", w: 40 }, { v: "slide", w: 35 }, { v: "none", w: 25 }])
		},
		layout: {
			maxWidth: weighted([
				{ v: 800, w: 12 }, { v: 1000, w: 28 }, { v: 1200, w: 35 },
				{ v: 1400, w: 15 }, { v: 1600, w: 10 }
			]),
			contentPadding: weighted([{ v: 8, w: 10 }, { v: 16, w: 35 }, { v: 24, w: 30 }, { v: 32, w: 20 }, { v: 48, w: 5 }]),
			elementSpacing: weighted([{ v: 8, w: 10 }, { v: 12, w: 20 }, { v: 16, w: 35 }, { v: 24, w: 25 }, { v: 32, w: 10 }]),
			alignment: weighted([{ v: "left", w: 35 }, { v: "center", w: 50 }, { v: "right", w: 15 }])
		},
		shadows: {
			cardShadow: {
				enabled: Math.random() > 0.38,
				x: 0, y: rand(2, 14), blur: rand(4, 28), spread: rand(0, 5),
				color: rgb(0, 0, 0, 5)
			},
			buttonShadow: Math.random() > 0.5,
			elevationLevel: weighted([
				{ v: "flat", w: 20 }, { v: "subtle", w: 38 },
				{ v: "moderate", w: 30 }, { v: "dramatic", w: 12 }
			])
		},
		borders: {
			dividerStyle: weighted([
				{ v: "none", w: 22 }, { v: "solid", w: 42 }, { v: "dashed", w: 18 },
				{ v: "dotted", w: 12 }, { v: "double", w: 6 }
			]),
			dividerColor: rgb(180, 180, 185, 25),
			dividerThickness: weighted([{ v: 1, w: 55 }, { v: 2, w: 30 }, { v: 3, w: 15 }]),
			sectionGap: weighted([{ v: 16, w: 20 }, { v: 24, w: 35 }, { v: 32, w: 30 }, { v: 48, w: 15 }])
		},
		spacing: {
			density: weighted([{ v: "compact", w: 20 }, { v: "comfortable", w: 55 }, { v: "spacious", w: 25 }]),
			paragraphGap: weighted([{ v: 8, w: 15 }, { v: 12, w: 20 }, { v: 16, w: 40 }, { v: 20, w: 15 }, { v: 24, w: 10 }]),
			sectionSpacing: weighted([{ v: 16, w: 15 }, { v: 24, w: 25 }, { v: 32, w: 35 }, { v: 48, w: 25 }]),
			innerPadding: weighted([{ v: 8, w: 15 }, { v: 12, w: 20 }, { v: 16, w: 40 }, { v: 24, w: 25 }])
		},
		media: {
			imageBorderRadius: weighted([{ v: 0, w: 20 }, { v: 4, w: 20 }, { v: 8, w: 25 }, { v: 12, w: 20 }, { v: 16, w: 15 }]),
			imageAspectRatio: weighted([{ v: "16:9", w: 42 }, { v: "4:3", w: 25 }, { v: "1:1", w: 20 }, { v: "3:2", w: 13 }]),
			mediaStyle: weighted([{ v: "sharp", w: 22 }, { v: "rounded", w: 52 }, { v: "circular", w: 26 }]),
			showPlaceholders: Math.random() > 0.08
		},
		darkMode: {
			preference: weighted([{ v: "light", w: 52 }, { v: "dark", w: 38 }, { v: "system", w: 10 }]),
			darkShade: weighted([
				{ v: "pure-black", w: 15 }, { v: "dark-gray", w: 42 },
				{ v: "dark-blue", w: 28 }, { v: "dark-green", w: 15 }
			]),
			darkAccentColor: accentHue
		},
		navigation: {
			position: weighted([{ v: "top", w: 72 }, { v: "sidebar", w: 28 }]),
			sticky: weighted([{ v: true, w: 58 }, { v: false, w: 42 }]),
			mobileStyle: weighted([
				{ v: "hamburger", w: 55 }, { v: "visible", w: 25 }, { v: "bottom-tab", w: 20 }
			]),
			transparency: weighted([{ v: 0, w: 10 }, { v: 50, w: 15 }, { v: 80, w: 20 }, { v: 100, w: 55 }])
		},
		formStyling: {
			inputBorderStyle: weighted([
				{ v: "solid", w: 48 }, { v: "dashed", w: 15 },
				{ v: "underline", w: 22 }, { v: "none", w: 15 }
			]),
			focusRingColor: rgb(60, 110, 220, 70),
			placeholderColor: rgb(148, 148, 158, 22),
			inputBorderRadius: weighted([{ v: 0, w: 15 }, { v: 4, w: 30 }, { v: 6, w: 22 }, { v: 8, w: 20 }, { v: 12, w: 13 }]),
			checkboxStyle: weighted([{ v: "square", w: 28 }, { v: "rounded", w: 42 }, { v: "circular", w: 30 }])
		},
		rating: weighted([{ v: 1, w: 3 }, { v: 2, w: 7 }, { v: 3, w: 18 }, { v: 4, w: 38 }, { v: 5, w: 34 }])
	};
}

async function seed() {
	console.log(`Seeding ${COUNT} responses → ${API_URL}`);
	let ok = 0, fail = 0;

	for (let i = 0; i < COUNT; i++) {
		try {
			const res = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(generate())
			});
			const body = await res.json();
			if (body.status === "success") {
				ok++;
				if (ok % 10 === 0) console.log(`  ${ok}/${COUNT}`);
			} else {
				fail++;
				console.error(`  [${i + 1}] failed:`, body.message);
			}
		} catch (e) {
			fail++;
			console.error(`  [${i + 1}] error:`, e.message);
		}
	}

	console.log(`\nDone: ${ok} ok, ${fail} failed`);
}

seed().catch(console.error);
