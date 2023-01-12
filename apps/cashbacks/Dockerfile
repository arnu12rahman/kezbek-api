FROM node:alpine As development

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

EXPOSE 3001
RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm install --only=production

COPY . /usr/src/app/
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/apps/cashbacks/main"]