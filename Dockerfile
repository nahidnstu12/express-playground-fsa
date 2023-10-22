FROM node:19-alpine as development

# Create app directory
WORKDIR /app
COPY ./ /app
COPY env.local /app
COPY package.json /app
RUN yarn install

COPY . .
#CMD ['node', 'server.js']
CMD ["yarn", "dev"]
#RUN yarn build

#FROM node:19-alpine as production
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /app
#COPY package.json yarn.lock ./
#RUN yarn install --only=production
#COPY . .
##COPY --from=development /app/build ./build
#CMD yarn prod