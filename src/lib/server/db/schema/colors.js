import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const colors = sqliteTable("colors", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}), // Foreign key

	// Background Colors
	bgType: text("bg_type").default("solid").notNull(), // e.g., "solid" or "gradient"
	solidColor: text("solid_color", { mode: "json" }), // e.g., { r: 128, g: 128, b: 128 }
	gradientStartColor: text("gradient_start_color", { mode: "json" }), // e.g., { r: 255, g: 255, b: 255 }
	gradientEndColor: text("gradient_end_color", { mode: "json" }), // e.g., { r: 17, g: 17, b: 17 }
	gradientDegrees: integer("gradient_degrees"), // e.g., 45

	// Header Colors
	headerOwnBg: integer("header_own_bg", { mode: "boolean" }), // e.g., true or false
	headerBg: text("header_bg", { mode: "json" }), // e.g., { r: 255, g: 255, b: 255 }
	headerText: text("header_text", { mode: "json" }), // e.g., { r: 17, g: 17, b: 17 }

	// Footer Colors
	footerOwnBg: integer("footer_own_bg", { mode: "boolean" }), // e.g., true or false
	footerBg: text("footer_bg", { mode: "json" }), // e.g., { r: 255, g: 255, b: 255 }

	// Card Colors
	cardBg: text("card_bg", { mode: "json" }), // e.g., { r: 255, g: 255, b: 255 }
	cardText: text("card_text", { mode: "json" }), // e.g., { r: 0, g: 0, b: 0 }
	cardBorder: text("card_border", { mode: "json" }), // e.g., { r: 0, g: 0, b: 0 }

	// Button Colors
	buttonNextBg: text("button_next_bg", { mode: "json" }), // e.g., { r: 229, g: 231, b: 235 }
	buttonNextText: text("button_next_text", { mode: "json" }), // e.g., { r: 0, g: 0, b: 0 }
	buttonBackBg: text("button_back_bg", { mode: "json" }), // e.g., { r: 229, g: 231, b: 235 }
	buttonBackText: text("button_back_text", { mode: "json" }), // e.g., { r: 0, g: 0, b: 0 }
	buttonResetBg: text("button_reset_bg", { mode: "json" }), // e.g., { r: 229, g: 231, b: 235 }
	buttonResetText: text("button_reset_text", { mode: "json" }) // e.g., { r: 0, g: 0, b: 0 }
});
