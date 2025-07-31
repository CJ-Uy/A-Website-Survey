import { pgTable, uuid, integer } from "drizzle-orm/pg-core";
import { responses } from "./responses";

export const sizes = pgTable("sizes", {
	id: uuid("id").primaryKey().defaultRandom(),
	responseId: uuid("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}), // Foreign key

	// Card Sizing
	cardWidth: integer("card_width"), // e.g., 1200
	cardHeight: integer("card_height"), // e.g., 600
	cardBorderWidth: integer("card_border_width"), // e.g., 2
	cardBorderRoundness: integer("card_border_roundness"), // e.g., 0

	// Text Sizing
	textSurveyTitle: integer("text_survey_title"), // e.g., 48
	textCardTitles: integer("text_card_titles"), // e.g., 30
	textSubheadings: integer("text_subheadings"), // e.g., 18
	textContent: integer("text_content"), // e.g., 16

	// Button Sizing
	buttonGap: integer("button_gap"), // e.g., 16
	buttonPadding: integer("button_padding"), // e.g., 8
	buttonText: integer("button_text"), // e.g., 20

	// Form Range Slider Sizing
	formRangeSliderHeight: integer("form_range_slider_height"), // e.g., 15
	formRangeSliderWidth: integer("form_range_slider_width") // e.g., 300
});
