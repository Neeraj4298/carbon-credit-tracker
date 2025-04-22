FROM node:18

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server source code
COPY . .

# Create client/build directory and add a basic index.html
RUN mkdir -p client/build && \
    echo '<!DOCTYPE html><html><body><h1>Carbon Credit Tracker API</h1></body></html>' > client/build/index.html

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
