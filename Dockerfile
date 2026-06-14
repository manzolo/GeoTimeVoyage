# syntax=docker/dockerfile:1

# ─────────────────────────────────────────────────────────────
# Stage base: dipendenze
# ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# ─────────────────────────────────────────────────────────────
# Stage dev: hot-reload con Vite (usato da docker compose / make up)
# ─────────────────────────────────────────────────────────────
FROM base AS dev
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# ─────────────────────────────────────────────────────────────
# Stage build: genera i file statici in /app/dist
# ─────────────────────────────────────────────────────────────
FROM base AS build
ARG VITE_BASE=/
ENV VITE_BASE=${VITE_BASE}
ENV NODE_ENV=production
COPY . .
RUN npm run build

# ─────────────────────────────────────────────────────────────
# Stage prod: serve i file statici con nginx
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
