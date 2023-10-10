FROM node:18-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

RUN yarn build

CMD [ "yarn", "start:prod" ]