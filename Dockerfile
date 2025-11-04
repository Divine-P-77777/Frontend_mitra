# ---- Stage 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for caching
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY tailwind.config.* ./
COPY postcss.config.* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app for production
RUN npm run build

# ---- Stage 2: Run ----
FROM nginx:1.27-alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
