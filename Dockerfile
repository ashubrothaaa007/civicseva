# Setup the Node.js Express Server
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --production

# Copy pre-built assets from local dist folder
COPY dist ./dist
COPY server.js ./

# Use the PORT environment variable provided by Cloud Run
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
