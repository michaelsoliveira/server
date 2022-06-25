FROM node:alpine

# Create app directory
# RUN mkdir /app
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# COPY prisma ./prisma
# COPY .env ./
# COPY tsconfig.json ./

# Bundle app source
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npx prisma generate

EXPOSE 3333
CMD [ "npm", "run", "dev"]