# Stage 1: Build Stage
FROM node:20-alpine AS build

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install all dependencies using pnpm
RUN pnpm install

# Copy the rest of the app source code
COPY . .

# Build the project (TypeScript to JavaScript)
RUN pnpm run build

# Stage 2: Production Stage
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory in the production image
WORKDIR /app

# Copy only the necessary files for the production stage
COPY package.json pnpm-lock.yaml ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN pnpm install --prod

# Expose port 2525 for the SMTP server
EXPOSE 2525

# Start the application using the compiled JavaScript files
CMD ["node", "dist/index.js"]
