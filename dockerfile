# Builder stage
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files (support both npm and pnpm lockfiles)
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install all dependencies for build
ENV NODE_ENV=development
RUN npm install

COPY . .

# Build the app (includes drizzle-kit generate)
RUN NODE_OPTIONS="--max-old-space-size=2048" npm run build

# Production stage
FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* ./

# Install production dependencies + drizzle-kit for migrations
ENV NODE_ENV=production
RUN npm install --omit=dev
RUN npm install -D drizzle-kit

# Copy built files and drizzle config
COPY --from=builder /app/build ./build
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.js ./drizzle.config.js
COPY --from=builder /app/src/lib/server/db ./src/lib/server/db

# Copy entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

# Use entrypoint to run migrations before starting
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "build"]
