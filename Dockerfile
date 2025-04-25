FROM node:20-bookworm AS base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
# Copy all necessary files for SvelteKit
COPY package.json pnpm-lock.yaml ./
COPY --from=build /app/build ./build/
COPY --from=build /app/.svelte-kit ./.svelte-kit/
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000

# Update the start command to use the appropriate node adapter
CMD ["node", "build/index.js"]