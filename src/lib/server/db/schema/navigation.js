import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { responses } from "./responses";

export const navigation = sqliteTable("navigation", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	responseId: text("response_id").references(() => responses.id, {
		onDelete: "cascade"
	}),

	position: text("position"), // "top", "sidebar"
	sticky: integer("sticky", { mode: "boolean" }),
	mobileStyle: text("mobile_style"), // "hamburger", "visible", "bottom-tab"
	transparency: integer("transparency") // 0-100
});
