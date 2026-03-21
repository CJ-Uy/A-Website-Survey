import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const spacing = sqliteTable("spacing", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	density: text("density"), // "compact", "comfortable", "spacious"
	paragraphGap: integer("paragraph_gap"),
	sectionSpacing: integer("section_spacing"),
	innerPadding: integer("inner_padding")
});
