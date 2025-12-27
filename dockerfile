# Builder stage
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

# Ensure devDependencies are installed
ENV NODE_ENV=development

RUN pnpm install
RUN ls -l node_modules/vite/bin || echo "Vite not found"
RUN pnpm list

COPY . .

# Increase memory for build step
RUN NODE_OPTIONS="--max-old-space-size=2048" pnpm run build

# Production stage
FROM node:22-alpine
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

# Only install production dependencies
ENV NODE_ENV=production

RUN pnpm install --prod

COPY --from=builder /app/build ./build
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 65000
ENV NODE_ENV=production
ENV PORT=65000

CMD ["node", "build"]
