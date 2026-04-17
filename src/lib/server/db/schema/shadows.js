import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const shadows = sqliteTable("shadows", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	// Card shadow
	cardShadowEnabled: integer("card_shadow_enabled", { mode: "boolean" }).default(false),
	cardShadowX: integer("card_shadow_x"),
	cardShadowY: integer("card_shadow_y"),
	cardShadowBlur: integer("card_shadow_blur"),
	cardShadowSpread: integer("card_shadow_spread"),
	cardShadowColor: text("card_shadow_color", { mode: "json" }),

	// Button shadow
	buttonShadow: integer("button_shadow", { mode: "boolean" }).default(false),

	// Elevation
	elevationLevel: text("elevation_level") // "flat", "subtle", "moderate", "dramatic"
});
