FROM node:18-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 4000

# Start server
CMD ["node", "index.js"]
