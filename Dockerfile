#syntax=docker/dockerfile:1.4


# Versions
FROM node:20-alpine AS node_upstream


# Base stage for dev and build
FROM node_upstream AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# hadolint ignore=DL3018
RUN apk add --no-cache libc6-compat

WORKDIR /srv/app


# Development image
FROM base as dev

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME localhost

CMD ["sh", "-c", "npm install; npm start"]


FROM base AS builder

RUN	npm install --production && \
	npm run build

# Production image, copy all the files and run next
FROM node_upstream AS prod

WORKDIR /srv/app

ENV NODE_ENV production

COPY --from=builder --link /srv/app/public ./public

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
