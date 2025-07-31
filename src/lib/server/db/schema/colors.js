import { pgTable, uuid, integer, text, boolean, jsonb } from "drizzle-orm/pg-core";
import { responses } from "./responses";

export const colors = pgTable("colors", {
	id: uuid("id").primaryKey().defaultRandom(),
	responseId: uuid("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}), // Foreign key

	// Background Colors
	bgType: text("bg_type").default("solid").notNull(), // e.g., "solid" or "gradient"
	solidColor: jsonb("solid_color"), // e.g., { r: 128, g: 128, b: 128 } (gray)
	gradientStartColor: jsonb("gradient_start_color"), // e.g., { r: 255, g: 255, b: 255 } (white)
	gradientEndColor: jsonb("gradient_end_color"), // e.g., { r: 17, g: 17, b: 17 } (black)
	gradientDegrees: integer("gradient_degrees"), // e.g., 45

	// Header Colors
	headerOwnBg: boolean("header_own_bg"), // e.g., true or false
	headerBg: jsonb("header_bg"), // e.g., { r: 255, g: 255, b: 255 } (white)
	headerText: jsonb("header_text"), // e.g., { r: 17, g: 17, b: 17 } (black)

	// Footer Colors
	footerOwnBg: boolean("footer_own_bg"), // e.g., true or false
	footerBg: jsonb("footer_bg"), // e.g., { r: 255, g: 255, b: 255 } (white)

	// Card Colors
	cardBg: jsonb("card_bg"), // e.g., { r: 255, g: 255, b: 255 } (white)
	cardText: jsonb("card_text"), // e.g., { r: 0, g: 0, b: 0 } (black)
	cardBorder: jsonb("card_border"), // e.g., { r: 0, g: 0, b: 0 } (black)

	// Button Colors
	buttonNextBg: jsonb("button_next_bg"), // e.g., { r: 229, g: 231, b: 235 } (light gray)
	buttonNextText: jsonb("button_next_text"), // e.g., { r: 0, g: 0, b: 0 } (black)
	buttonBackBg: jsonb("button_back_bg"), // e.g., { r: 229, g: 231, b: 235 } (light gray)
	buttonBackText: jsonb("button_back_text"), // e.g., { r: 0, g: 0, b: 0 } (black)
	buttonResetBg: jsonb("button_reset_bg"), // e.g., { r: 229, g: 231, b: 235 } (light gray)
	buttonResetText: jsonb("button_reset_text") // e.g., { r: 0, g: 0, b: 0 } (black)
});
