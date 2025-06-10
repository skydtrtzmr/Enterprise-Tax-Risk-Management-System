# 命令：docker build -t skydtrtzmr/tax-risk-system:1.0.0 ./

# Stage 1: Build aplication

FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm install --global corepack@latest

RUN corepack enable && corepack prepare pnpm@latest --activate

# Setup pnpm mirror
RUN pnpm config set registry https://registry.npmmirror.com

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm fetch
RUN pnpm install --frozen-lockfile --offline 


# Copy all files
COPY . .

# Build the application
RUN pnpm build


# Stage 2: Production image

FROM node:22-alpine AS runtime

ENV NODE_ENV=production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm config set registry https://registry.npmmirror.com

# Copy built app from the builder stage
COPY --from=builder /app/.output ./.output

COPY package.json ./

# Set runtime environment variables for Nuxt
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", ".output/server/index.mjs"] 