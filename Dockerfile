FROM node:20

ARG VITE_BACKEND_URL=https://supreme-space-waddle-77vgp4r7wwfpq7x-3001.app.github.dev/api/v1

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
# Start the SSR server
CMD ["npm", "start"]