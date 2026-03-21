import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const formStyling = sqliteTable("form_styling", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	inputBorderStyle: text("input_border_style"), // "solid", "dashed", "none", "underline"
	focusRingColor: text("focus_ring_color"), // hex color
	placeholderColor: text("placeholder_color"), // hex color
	inputBorderRadius: integer("input_border_radius"),
	checkboxStyle: text("checkbox_style") // "square", "rounded", "circular"
});
