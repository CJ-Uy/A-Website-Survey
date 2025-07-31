import { json } from "@sveltejs/kit";
import { db } from "$lib/server/db"; // Import your database connection
import * as schema from "$lib/server/db/schema"; // Import your schema

export async function GET() {
	try {
		const stats = await db.select().from(schema.statistics);

		// Transform the array into an object with parameterName as keys
		const transformedStats = stats.reduce((acc, stat) => {
			// Use the parameterName as the key
			const { parameterName, ...rest } = stat;
			acc[parameterName] = rest;
			return acc;
		}, {});

		// Fetch all ratings from responses table
		const allRatings = await db
			.select({
				rating: schema.responses.rating
			})
			.from(schema.responses);

		// Count the frequency manually
		const ratingFrequency = allRatings.reduce((acc, { rating }) => {
			if (rating !== null) {
				// Convert rating to string for key
				const ratingKey = rating.toString();
				// Initialize to 0 if not present, then increment
				acc[ratingKey] = (acc[ratingKey] || 0) + 1;
			}
			return acc;
		}, {});

		// Make sure all ratings 1-5 are represented, even if there are no responses
		for (let i = 1; i <= 5; i++) {
			if (!(i.toString() in ratingFrequency)) {
				ratingFrequency[i.toString()] = 0;
			}
		}

		return json({
			status: "success",
			data: {
				...transformedStats,
				ratingsCount: ratingFrequency
			}
		});
	} catch (error) {
		console.error("Error fetching data:", error);

		return json(
			{
				status: "error",
				message: "Failed to fetch data"
			},
			{ status: 500 }
		);
	}
}