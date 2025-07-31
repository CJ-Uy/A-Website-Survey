import { pgTable, uuid, integer, timestamp } from "drizzle-orm/pg-core";

export const responses = pgTable("responses", {
	id: uuid("id").primaryKey().defaultRandom(),
	rating: integer("rating"), // Rating for the submission
	createdAt: timestamp("created_at").defaultNow() // Timestamp of submission
});
