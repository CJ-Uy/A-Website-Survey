import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST({ request }) {
	try {
		// Parse the request body
		const requestBody = await request.json();

		// Save response into individual tables
		const responseId = await saveResponse(requestBody);
		await saveColors(responseId, requestBody.colors);
		await saveSizes(responseId, requestBody.sizes);

		// Update statistics properties
		updateColorStatistics(requestBody.colors);
		updateSizeStatistics(requestBody.sizes);

		// Respond with success
		return json({ status: "success" });
	} catch (error) {
		// Handle errors gracefully
		console.error("Error saving submission:", error);
		return json({ status: "error", message: error.message }, { status: 500 });
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
