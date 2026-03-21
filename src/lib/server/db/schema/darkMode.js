import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const darkMode = sqliteTable("dark_mode", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	preference: text("preference"), // "light", "dark", "system"
	darkShade: text("dark_shade"), // "pure-black", "dark-gray", "dark-blue", "dark-green"
	darkAccentColor: text("dark_accent_color") // hex color
});
