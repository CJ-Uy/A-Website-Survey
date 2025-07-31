# A Website Survey

A reactive website survey that automatically updates its styling to match what the user inputs their website preferences

## Developing
1. Install [Node.js](https://nodejs.org/en)
2. Install `pnpm` by running `npm install -g pnpm`
3. Run `pnpm dev` to open the website in dev mode

To connect a database to the project (after doing the previous steps):
1. Add a database url in the `.env` file
2. Run `pnpm drizzle-kit generate` to initialize the database schema
3. Run `pnpm dev` to open the website in dev mode


## Building

Run `pnpm run build` to create a production version of your app.

Run `npm run preview` to preview the production build locally

> To deploy the app in different environments, install the corresponding [adapter](https://svelte.dev/docs/kit/adapters) for the target environment.
