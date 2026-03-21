import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const layout = sqliteTable("layout", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	// Layout settings
	maxWidth: integer("max_width"), // in pixels, e.g., 1200
	contentPadding: integer("content_padding"), // in pixels, e.g., 16
	elementSpacing: integer("element_spacing"), // in pixels, e.g., 16
	alignment: text("alignment") // e.g., "left", "center", "right"
});
