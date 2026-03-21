import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const borders = sqliteTable("borders", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	dividerStyle: text("divider_style"), // "none", "solid", "dashed", "dotted", "double"
	dividerColor: text("divider_color"), // hex color
	dividerThickness: integer("divider_thickness"),
	sectionGap: integer("section_gap")
});
