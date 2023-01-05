FROM node:lts-alpine

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

RUN ls -l dist/

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]