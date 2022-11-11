# Base image
FROM node:18

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/


# Bundle app source
COPY . .


# Install app dependencies
RUN npm install

# Initialize prizma for managing database
RUN npx prisma generate

# Expose port 3000
ENV PORT=3000
EXPOSE 3000

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
