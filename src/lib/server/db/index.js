import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import { env } from "$env/dynamic/private";

let _db;

/** @returns {import("drizzle-orm/libsql").LibSQLDatabase} */
export function getDb() {
	if (!_db) {
		const client = createClient({
			url: env.TURSO_DATABASE_URL,
			authToken: env.TURSO_AUTH_TOKEN
		});
		_db = drizzle(client, { schema });
	}
	return _db;
}

// For backwards compatibility — lazy getter
export const db = new Proxy(
	{},
	{
		get(_, prop) {
			return getDb()[prop];
		}
	}
);
