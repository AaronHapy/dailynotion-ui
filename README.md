# Dailynotion-ui
This is a clone app of YouTube.



### Local development

There are two ways to run the app locally. The first one requires having Node.js installed on your machine. You can verify this by running the following command in the terminal: `node -v`

If your output looks like: `v18.19.1`, then you're all set! All you need to do is run the following command to execute the app: `npm start`

The other way to run the app is by building the image with Docker and then creating and running the container. The first step is to have Docker installed, and then execute this command to build the image: `docker build -t dailynotion:latest -f Dockerfile.dev .` Once the build finishes executing, the next step is to create and run the container.

`docker run -p 3000:3000 dailynotion`
