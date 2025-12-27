import { pgTable, uuid, integer, text } from "drizzle-orm/pg-core";
import { responses } from "./responses";

export const layout = pgTable("layout", {
	id: uuid("id").primaryKey().defaultRandom(),
	responseId: uuid("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	// Layout settings
	maxWidth: integer("max_width"), // in pixels, e.g., 1200
	contentPadding: integer("content_padding"), // in pixels, e.g., 16
	elementSpacing: integer("element_spacing"), // in pixels, e.g., 16
	alignment: text("alignment") // e.g., "left", "center", "right"
});
