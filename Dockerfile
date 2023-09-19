FROM node:18-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]