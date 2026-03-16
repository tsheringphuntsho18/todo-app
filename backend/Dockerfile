# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy only package.json & package-lock.json first (faster caching)
COPY package*.json ./

RUN npm install

# Copy the rest of the code
COPY . .

# Expose the backend port
EXPOSE 5000

# Command to run backend
CMD ["node", "server.js"]