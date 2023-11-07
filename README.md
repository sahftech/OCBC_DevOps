# OCBC_DevOps

docker build -t ocbc-docker-img . this is to load into the docker desktop
Need to create a Dockerfile in the root folder of the project and then insert the code

Use an official Node.js runtime as a parent image
FROM node:20
Set the working directory in the container
WORKDIR /usr/src/app
Copy package.json and package-lock.json to the working directory
COPY package*.json ./
Install app dependencies
RUN npm install
Bundle app source
COPY . .
Expose the port your app runs on
EXPOSE 5050
Define the command to run your app
CMD [ "npm", "start" ]

docker run -p 8000:5050 ocbc-docker-img this is the run the website in docker
setTimeout(() => { server.destroy(); }, 5000);