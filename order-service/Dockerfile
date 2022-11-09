FROM node:16-alpine as development

# Install required libraries
RUN apk --no-cache add curl bash py-pip g++ make

WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

EXPOSE 3001
EXPOSE 3100
# Run application on container
CMD ["yarn", "start:prod"]