import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleProxy } from "drizzle-orm/sqlite-proxy";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";
import * as schema from "./schema";

// Cached per isolate — safe to reuse across requests in the same Worker instance
const globalForDb = /** @type {{ db: unknown }} */ (globalThis);

async function d1Fetch(accountId, databaseId, token, sql, params, method) {
	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ sql, params })
		}
	);

	if (!response.ok) {
		throw new Error(`D1 HTTP ${response.status}: ${await response.text()}`);
	}

	const data = await response.json();

	if (!data.success) {
		throw new Error(`D1 query failed: ${data.errors?.[0]?.message ?? "unknown"}`);
	}

	if (method === "run") return { rows: [] };

	const result = data.result?.[0];
	if (!result?.results?.length) return { rows: [] };

	const cols = Object.keys(result.results[0]);
	const rows = result.results.map((row) => cols.map((col) => row[col]));

	return { rows: method === "get" ? rows[0] : rows };
}

function createHttpClient() {
	const accountId = env.CLOUDFLARE_ACCOUNT_ID;
	const databaseId = env.CLOUDFLARE_D1_DATABASE_ID;
	const token = env.CLOUDFLARE_D1_TOKEN;

	if (!accountId || !databaseId || !token) {
		throw new Error(
			"Missing env vars: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_D1_DATABASE_ID, CLOUDFLARE_D1_TOKEN"
		);
	}

	return drizzleProxy(
		async (sql, params, method) => d1Fetch(accountId, databaseId, token, sql, params, method),
		{ schema }
	);
}

/**
 * Call at the top of each request handler.
 * Dev  → always HTTP client → remote D1 via REST API (vars in .env)
 * Prod → native D1 binding from SvelteKit's platform.env
 * @param {App.Platform | undefined} platform
 */
export function initDb(platform) {
	if (globalForDb.db) return;

	if (dev) {
		globalForDb.db = createHttpClient();
	} else if (platform?.env?.DB) {
		globalForDb.db = drizzleD1(platform.env.DB, { schema });
	} else {
		globalForDb.db = createHttpClient();
	}
}

export const db = new Proxy(
	{},
	{
		get(_, prop) {
			if (!globalForDb.db) {
				globalForDb.db = createHttpClient();
			}
			return /** @type {any} */ (globalForDb.db)[prop];
		}
	}
);
