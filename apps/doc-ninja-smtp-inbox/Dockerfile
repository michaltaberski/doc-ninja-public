# Step 1: Use an official Node.js runtime as the base image
FROM node:20-alpine
# Install pnpm globally
RUN npm install -g pnpm

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN pnpm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 7: Expose the port on which your app will run (adjust if necessary)
EXPOSE 2525

# Step 8: Define the command to run the app (adjust if necessary)
CMD ["pnpm", "dev"]
