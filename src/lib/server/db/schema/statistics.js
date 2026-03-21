import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const statistics = sqliteTable("statistics", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	parameterName: text("parameter_name").notNull().unique(), // The parameter needed for the statistics page
	totalCount: integer("total_count").default(0), // Total count of values
	sum: real("sum").default(0), // Sum of all values
	values: text("values", { mode: "json" }).$type().default([]) // List of all values
});
