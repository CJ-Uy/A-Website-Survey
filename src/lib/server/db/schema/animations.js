import { pgTable, uuid, integer, text, boolean, real } from "drizzle-orm/pg-core";
import { responses } from "./responses";

export const animations = pgTable("animations", {
	id: uuid("id").primaryKey().defaultRandom(),
	responseId: uuid("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	// General animation settings
	enabled: boolean("enabled").default(false),
	transitionDuration: integer("transition_duration"), // in milliseconds, e.g., 200
	transitionTiming: text("transition_timing"), // e.g., "ease", "linear", "ease-in-out"

	// Hover effects
	hoverScale: real("hover_scale"), // e.g., 1.05
	hoverShadow: boolean("hover_shadow").default(false),
	hoverColorShift: boolean("hover_color_shift").default(false),

	// Page transitions
	pageTransitions: text("page_transitions") // e.g., "none", "fade", "slide", "scale"
});
