# ===== Stage 1: Build =====
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build-time env for NEXT_PUBLIC_* (passed via Coolify Build Args)
ARG NEXT_PUBLIC_GTM
ENV NEXT_PUBLIC_GTM=$NEXT_PUBLIC_GTM

RUN pnpm build

# ===== Stage 2: Production =====
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone output + static + public
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Runtime env vars (TELEGRAM_*, EMAIL_*, GMAIL_*) are injected by Coolify
# at container start — no need to bake into image

EXPOSE 3000

CMD ["node", "server.js"]
