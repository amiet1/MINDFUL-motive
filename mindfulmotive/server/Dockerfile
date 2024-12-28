# Step 1: Use Node.js base image
FROM node:18

# Step 2: Set working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

COPY prisma ./prisma
# Step 5: Generate Prisma client (make sure prisma is installed)
RUN npx prisma generate

# Step 6: Copy the rest of the backend code
COPY . .

RUN npm run build
# Step 7: Expose the port your backend is running on (5000)
EXPOSE 3000

# Step 8: Run the backend (replace with your actual server start command)
CMD ["npm", "start"]