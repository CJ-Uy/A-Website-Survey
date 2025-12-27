import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// Validation helper functions
function isValidRating(rating) {
	return typeof rating === "number" && rating >= 1 && rating <= 5 && Number.isInteger(rating);
}

function isValidRgb(color) {
	if (!color || typeof color !== "object") return false;
	const { r, g, b } = color;
	return [r, g, b].every((v) => typeof v === "number" && v >= 0 && v <= 255);
}

function isValidNumber(value, min, max) {
	return typeof value === "number" && !isNaN(value) && value >= min && value <= max;
}

function validateColors(colors) {
	if (!colors || typeof colors !== "object") {
		throw new Error("Invalid colors data");
	}

	// Validate bg type
	if (!["solid", "gradient"].includes(colors.bg?.type)) {
		throw new Error("Invalid background type");
	}

	// Validate gradient degrees if gradient
	if (colors.bg.type === "gradient") {
		if (!isValidNumber(colors.bg.gradient?.degrees, 0, 360)) {
			throw new Error("Invalid gradient angle");
		}
	}

	// Validate rating exists in parent
	return true;
}

function validateSizes(sizes) {
	if (!sizes || typeof sizes !== "object") {
		throw new Error("Invalid sizes data");
	}

	// Card dimensions
	if (!isValidNumber(sizes.card?.width, 100, 3000)) {
		throw new Error("Invalid card width");
	}
	if (!isValidNumber(sizes.card?.height, 100, 2000)) {
		throw new Error("Invalid card height");
	}

	return true;
}

function validateTypography(typography) {
	if (!typography || typeof typography !== "object") {
		throw new Error("Invalid typography data");
	}
	// Typography fields are optional, so we just validate types if present
	if (typography.fontWeight !== null && !isValidNumber(typography.fontWeight, 100, 900)) {
		throw new Error("Invalid font weight");
	}
	if (typography.lineHeight !== null && !isValidNumber(typography.lineHeight, 0.5, 5)) {
		throw new Error("Invalid line height");
	}
	if (typography.letterSpacing !== null && !isValidNumber(typography.letterSpacing, -10, 50)) {
		throw new Error("Invalid letter spacing");
	}
	return true;
}

function validateAnimations(animations) {
	if (!animations || typeof animations !== "object") {
		throw new Error("Invalid animations data");
	}
	// Animations fields are optional
	if (
		animations.transitionDuration !== null &&
		!isValidNumber(animations.transitionDuration, 0, 5000)
	) {
		throw new Error("Invalid transition duration");
	}
	if (
		animations.hoverEffects?.scale !== null &&
		!isValidNumber(animations.hoverEffects?.scale, 0.5, 2)
	) {
		throw new Error("Invalid hover scale");
	}
	return true;
}

function validateLayout(layout) {
	if (!layout || typeof layout !== "object") {
		throw new Error("Invalid layout data");
	}
	// Layout fields are optional
	if (layout.maxWidth !== null && !isValidNumber(layout.maxWidth, 200, 3000)) {
		throw new Error("Invalid max width");
	}
	if (layout.contentPadding !== null && !isValidNumber(layout.contentPadding, 0, 200)) {
		throw new Error("Invalid content padding");
	}
	if (layout.elementSpacing !== null && !isValidNumber(layout.elementSpacing, 0, 200)) {
		throw new Error("Invalid element spacing");
	}
	return true;
}

export async function POST({ request }) {
	try {
		const requestBody = await request.json();

		// Validate required fields
		if (!requestBody) {
			return json({ status: "error", message: "Request body is required" }, { status: 400 });
		}

		if (!isValidRating(requestBody.rating)) {
			return json(
				{ status: "error", message: "Rating must be an integer between 1 and 5" },
				{ status: 400 }
			);
		}

		try {
			validateColors(requestBody.colors);
			validateSizes(requestBody.sizes);
			validateTypography(requestBody.typography);
			validateAnimations(requestBody.animations);
			validateLayout(requestBody.layout);
		} catch (validationError) {
			return json({ status: "error", message: validationError.message }, { status: 400 });
		}

		// Save response into individual tables
		const responseId = await saveResponse(requestBody);
		await saveColors(responseId, requestBody.colors);
		await saveSizes(responseId, requestBody.sizes);
		await saveTypography(responseId, requestBody.typography);
		await saveAnimations(responseId, requestBody.animations);
		await saveLayout(responseId, requestBody.layout);

		// Update statistics properties
		await updateColorStatistics(requestBody.colors);
		await updateSizeStatistics(requestBody.sizes);
		await updateTypographyStatistics(requestBody.typography);
		await updateAnimationsStatistics(requestBody.animations);
		await updateLayoutStatistics(requestBody.layout);
		await upsertStatistic("rating", requestBody.rating, true, true);

		return json({ status: "success" });
	} catch (error) {
		console.error("Error saving submission:", error);
		return json(
			{ status: "error", message: "An error occurred while saving your response" },
			{ status: 500 }
		);
	}
}

// Save response to the main table
async function saveResponse(requestBody) {
	const response = await db
		.insert(schema.responses)
		.values({ rating: requestBody.rating })
		.returning({ id: schema.responses.id });

	return response[0].id;
}

// Save colors to the colors table
async function saveColors(responseId, colors) {
	await db.insert(schema.colors).values({
		responseId,
		bgType: colors.bg.type,
		solidColor: colors.bg.solidColor,
		gradientStartColor: colors.bg.gradient.startColor,
		gradientEndColor: colors.bg.gradient.endColor,
		gradientDegrees: colors.bg.gradient.degrees,
		headerOwnBg: colors.marginalia.header.ownBg,
		headerBg: colors.marginalia.header.ownBg ? colors.marginalia.header.bg : null,
		headerText: colors.marginalia.header.text,
		footerOwnBg: colors.marginalia.footer.ownBg,
		footerBg: colors.marginalia.footer.ownBg ? colors.marginalia.footer.bg : null,
		cardBg: colors.card.bg,
		cardText: colors.card.text,
		cardBorder: colors.card.border,
		buttonNextBg: colors.button.next.bg,
		buttonNextText: colors.button.next.text,
		buttonBackBg: colors.button.back.bg,
		buttonBackText: colors.button.back.text,
		buttonResetBg: colors.button.reset.bg,
		buttonResetText: colors.button.reset.text
	});
}

// Save sizes to the sizes table
async function saveSizes(responseId, sizes) {
	await db.insert(schema.sizes).values({
		responseId,
		cardWidth: sizes.card.width,
		cardHeight: sizes.card.height,
		cardBorderWidth: sizes.card.border.width,
		cardBorderRoundness: sizes.card.border.roundness,
		textSurveyTitle: sizes.text.surveyTitle,
		textCardTitles: sizes.text.cardTitles,
		textSubheadings: sizes.text.subheadings,
		textContent: sizes.text.content,
		buttonGap: sizes.button.gap,
		buttonPadding: sizes.button.padding,
		buttonText: sizes.button.text,
		formRangeSliderHeight: sizes.form.rangeSlider.height,
		formRangeSliderWidth: sizes.form.rangeSlider.width
	});
}

// Save typography to the typography table
async function saveTypography(responseId, typography) {
	await db.insert(schema.typography).values({
		responseId,
		fontFamily: typography.fontFamily,
		headingFont: typography.headingFont,
		bodyFont: typography.bodyFont,
		fontWeight: typography.fontWeight,
		lineHeight: typography.lineHeight,
		letterSpacing: typography.letterSpacing
	});
}

// Save animations to the animations table
async function saveAnimations(responseId, animations) {
	await db.insert(schema.animations).values({
		responseId,
		enabled: animations.enabled,
		transitionDuration: animations.transitionDuration,
		transitionTiming: animations.transitionTiming,
		hoverScale: animations.hoverEffects?.scale,
		hoverShadow: animations.hoverEffects?.shadow,
		hoverColorShift: animations.hoverEffects?.colorShift,
		pageTransitions: animations.pageTransitions
	});
}

// Save layout to the layout table
async function saveLayout(responseId, layout) {
	await db.insert(schema.layout).values({
		responseId,
		maxWidth: layout.maxWidth,
		contentPadding: layout.contentPadding,
		elementSpacing: layout.elementSpacing,
		alignment: layout.alignment
	});
}

// Update color-related statistics
function updateColorStatistics(colors) {
	if (colors.bg.type === "solid") {
		upsertStatistic("bgTypeSolid", 1, false, false);
		upsertStatistic("bgSolidColor", colors.bg.solidColor, false, true);
	} else if (colors.bg.type === "gradient") {
		upsertStatistic("bgTypeGradient", 1, false, false);
		upsertStatistic("bgGradientStartColor", colors.bg.gradient.startColor, false, true);
		upsertStatistic("bgGradientEndColor", colors.bg.gradient.endColor, false, true);
		upsertStatistic("bgGradientAngle", colors.bg.gradient.degrees, true, true);
	}

	if (colors.marginalia.header.ownBg) {
		upsertStatistic("headerOwnBg", colors.marginalia.header.ownBg, false, false);
		upsertStatistic("headerBg", colors.marginalia.header.bg, false, true);
	}
	upsertStatistic("headerTextColor", colors.marginalia.header.text, false, true);

	if (colors.marginalia.footer.ownBg) {
		upsertStatistic("footerOwnBg", colors.marginalia.footer.ownBg, false, false);
		upsertStatistic("footerBg", colors.marginalia.footer.bg, false, true);
	}

	upsertStatistic("cardBg", colors.card.bg, false, true);
	upsertStatistic("cardTextColor", colors.card.text, false, true);
	upsertStatistic("cardBorderColor", colors.card.border, false, true);

	upsertStatistic("buttonNextBg", colors.button.next.bg, false, true);
	upsertStatistic("buttonNextTextColor", colors.button.next.text, false, true);
	upsertStatistic("buttonBackBg", colors.button.back.bg, false, true);
	upsertStatistic("buttonBackTextColor", colors.button.back.text, false, true);
	upsertStatistic("buttonResetBg", colors.button.reset.bg, false, true);
	upsertStatistic("buttonResetTextColor", colors.button.reset.text, false, true);
}

// Update size-related statistics
function updateSizeStatistics(sizes) {
	upsertStatistic("cardWidth", sizes.card.width, true, true);
	upsertStatistic("cardHeight", sizes.card.height, true, true);
	upsertStatistic("cardBorderWidth", sizes.card.border.width, true, true);
	upsertStatistic("cardBorderRoundness", sizes.card.border.roundness, true, true);

	upsertStatistic("textSurveyTitle", sizes.text.surveyTitle, true, true);
	upsertStatistic("textCardTitle", sizes.text.cardTitles, true, true);
	upsertStatistic("textSubheadings", sizes.text.subheadings, true, true);
	upsertStatistic("textContent", sizes.text.content, true, true);

	upsertStatistic("buttonGap", sizes.button.gap, true, true);
	upsertStatistic("buttonPadding", sizes.button.padding, true, true);
	upsertStatistic("buttonTextSize", sizes.button.text, true, true);

	upsertStatistic("formRangeSliderHeight", sizes.form.rangeSlider.height, true, true);
	upsertStatistic("formRangeSliderWidth", sizes.form.rangeSlider.width, true, true);
}

// Update typography-related statistics
function updateTypographyStatistics(typography) {
	if (typography.fontFamily !== null) {
		upsertStatistic("fontFamily", typography.fontFamily, false, true);
	}
	if (typography.fontWeight !== null) {
		upsertStatistic("fontWeight", typography.fontWeight, true, true);
	}
	if (typography.lineHeight !== null) {
		upsertStatistic("lineHeight", typography.lineHeight, true, true);
	}
	if (typography.letterSpacing !== null) {
		upsertStatistic("letterSpacing", typography.letterSpacing, true, true);
	}
}

// Update animations-related statistics
function updateAnimationsStatistics(animations) {
	upsertStatistic("animationsEnabled", animations.enabled ? 1 : 0, false, false);

	if (animations.enabled) {
		if (animations.transitionDuration !== null) {
			upsertStatistic("transitionDuration", animations.transitionDuration, true, true);
		}
		if (animations.transitionTiming !== null) {
			upsertStatistic("transitionTiming", animations.transitionTiming, false, true);
		}
		if (animations.hoverEffects?.scale !== null) {
			upsertStatistic("hoverScale", animations.hoverEffects.scale, true, true);
		}
		if (animations.hoverEffects?.shadow) {
			upsertStatistic("hoverShadow", 1, false, false);
		}
		if (animations.hoverEffects?.colorShift) {
			upsertStatistic("hoverColorShift", 1, false, false);
		}
		if (animations.pageTransitions !== null) {
			upsertStatistic("pageTransitions", animations.pageTransitions, false, true);
		}
	}
}

// Update layout-related statistics
function updateLayoutStatistics(layout) {
	if (layout.maxWidth !== null) {
		upsertStatistic("layoutMaxWidth", layout.maxWidth, true, true);
	}
	if (layout.contentPadding !== null) {
		upsertStatistic("layoutContentPadding", layout.contentPadding, true, true);
	}
	if (layout.elementSpacing !== null) {
		upsertStatistic("layoutElementSpacing", layout.elementSpacing, true, true);
	}
	if (layout.alignment !== null) {
		upsertStatistic("layoutAlignment", layout.alignment, false, true);
	}
}

// Upsert a statistic
async function upsertStatistic(parameterName, newValue, isSummable, shouldListAllValues) {
	try {
		const existingStatistic = await db
			.select()
			.from(schema.statistics)
			.where(eq(schema.statistics.parameterName, parameterName))
			.limit(1);

		if (existingStatistic.length > 0) {
			const currentStatistic = existingStatistic[0];
			const updateData = {
				totalCount: currentStatistic.totalCount + 1
			};

			if (isSummable) {
				updateData.sum = (currentStatistic.sum || 0) + newValue;
			}

			if (shouldListAllValues) {
				updateData.values = [...(currentStatistic.values || []), newValue];
			}

			await db
				.update(schema.statistics)
				.set(updateData)
				.where(eq(schema.statistics.parameterName, parameterName));
		} else {
			await db.insert(schema.statistics).values({
				parameterName,
				totalCount: 1,
				sum: isSummable ? newValue : null,
				values: shouldListAllValues ? [newValue] : null
			});
		}
	} catch (error) {
		console.error(`Error upserting statistics for ${parameterName}:`, error);
		throw error;
	}
}
