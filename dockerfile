# 1. Use official Node.js image as the base
FROM node:18-alpine AS builder

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# 4. Copy the rest of your app and build it
COPY . .
RUN npm run build

# 5. Use a minimal image for the final output
FROM node:18-alpine AS runner

WORKDIR /app

# 6. Only copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 8. Expose the port Next.js will run on
EXPOSE 3000

# 9. Run the app
CMD ["npm", "start"]
