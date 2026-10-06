# syntax=docker/dockerfile:1

ARG NODE_VERSION=22-alpine

############################################################
# deps — installed from the lockfile alone, so this layer is
# reused on every build that does not change dependencies.
############################################################
FROM node:${NODE_VERSION} AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

############################################################
# builder — compiles the standalone server
############################################################
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Load-bearing: NEXT_PUBLIC_* is inlined at build time, and sitemap.xml,
# robots.txt and every canonical/OG URL are generated during `next build`.
# Changing the domain means rebuilding the image, not restarting it.
ARG NEXT_PUBLIC_SITE_URL=https://revosit.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

############################################################
# runner — minimal runtime, non-root
############################################################
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# The container always listens on 3000; the host port is chosen at `docker run`.
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

# public/ holds the case study screenshots. The logo, favicon, social card and
# the generated project covers are all drawn in code and need no files.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null 2>&1 || exit 1

CMD ["node", "server.js"]
