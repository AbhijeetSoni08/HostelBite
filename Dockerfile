FROM node:18-slim AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Use Nginx to serve the build files
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
