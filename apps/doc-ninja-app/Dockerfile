# Stage 1: Build the SvelteKit app
FROM node:20 AS builder

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app
RUN pnpm run build

# Stage 2: Serve the SvelteKit app using Node.js
FROM node:20 AS runner

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy built files from the previous stage
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN pnpm install --production

# Expose the port that the SvelteKit app will run on
EXPOSE 3000

# Start the application
CMD ["node", "build"]
