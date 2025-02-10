# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files and install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source code and build the project
COPY client ./
RUN npm run build

# ------------------- #
# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy only the necessary build files
COPY --from=build /app/dist /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Keep Nginx running in the foreground
CMD ["nginx", "-g", "daemon off;"]
