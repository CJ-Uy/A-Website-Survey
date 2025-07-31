import { pgTable, text, integer, real, json, uuid } from "drizzle-orm/pg-core";

export const statistics = pgTable("statistics", {
	id: uuid("id").primaryKey().defaultRandom(),
	parameterName: text("parameter_name").notNull().unique(), // The parameter needed for the statistics page
	totalCount: integer("total_count").default(0), // Total count of values
	sum: real("sum").default(0), // Sum of all values
	values: json("values").default([]) // List of all values
});
