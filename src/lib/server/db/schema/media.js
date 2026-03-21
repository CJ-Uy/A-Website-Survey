import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const media = sqliteTable("media", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	imageBorderRadius: integer("image_border_radius"),
	imageAspectRatio: text("image_aspect_ratio"), // "1:1", "4:3", "16:9", "3:2"
	mediaStyle: text("media_style"), // "sharp", "rounded", "circular"
	showPlaceholders: integer("show_placeholders", { mode: "boolean" }).default(true)
});
