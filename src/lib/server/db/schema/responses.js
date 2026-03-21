import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const responses = sqliteTable("responses", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	rating: integer("rating"), // Rating for the submission
	createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()) // Timestamp of submission
});
