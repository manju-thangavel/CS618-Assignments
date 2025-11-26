FROM node:20 AS build
ARG VITE_BACKEND_URL=https://upgraded-guacamole-pjwwv5xwggp4f6qjw-3001.app.github.dev/api/v1
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# ---- Run Stage ----
FROM node:20 AS final

WORKDIR /app

COPY --from=build /build ./

EXPOSE 3000

# Start the SSR server
CMD ["npm", "start"]