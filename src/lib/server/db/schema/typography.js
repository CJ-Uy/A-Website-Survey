import { pgTable, uuid, integer, text, real } from "drizzle-orm/pg-core";
import { responses } from "./responses";

export const typography = pgTable("typography", {
	id: uuid("id").primaryKey().defaultRandom(),
	responseId: uuid("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	// Font settings
	fontFamily: text("font_family"), // e.g., "system-ui, -apple-system, sans-serif"
	headingFont: text("heading_font"), // Optional separate heading font
	bodyFont: text("body_font"), // Optional separate body font
	fontWeight: integer("font_weight"), // e.g., 400, 700

	// Spacing
	lineHeight: real("line_height"), // e.g., 1.5
	letterSpacing: real("letter_spacing") // e.g., 0 (in pixels)
});
