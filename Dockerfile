FROM node:10.11 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
COPY . .
RUN yarn
RUN yarn add serve
RUN yarn build 
CMD ["yarn", "serve", "-s", "build/"]
EXPOSE 5000
