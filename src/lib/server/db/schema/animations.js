import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const animations = sqliteTable("animations", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	// General animation settings
	enabled: integer("enabled", { mode: "boolean" }).default(false),
	transitionDuration: integer("transition_duration"), // in milliseconds, e.g., 200
	transitionTiming: text("transition_timing"), // e.g., "ease", "linear", "ease-in-out"

	// Hover effects
	hoverScale: real("hover_scale"), // e.g., 1.05
	hoverShadow: integer("hover_shadow", { mode: "boolean" }).default(false),
	hoverColorShift: integer("hover_color_shift", { mode: "boolean" }).default(false),

	// Page transitions
	pageTransitions: text("page_transitions") // e.g., "none", "fade", "slide", "scale"
});
