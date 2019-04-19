# common base image for development and production
FROM node:10-alpine AS base
WORKDIR /usr/src/app


# dev image contains everything needed for testing, development and building
FROM base AS development
COPY package.json package-lock.json ./

# first set aside prod dependencies so we can copy in to the prod image
RUN npm install --only=prod
RUN cp -R node_modules /tmp/node_modules

# install all dependencies and add source code
RUN npm install
COPY . .


# builder runs unit tests and linter, then builds production code 
FROM development as builder
# RUN npm run lint
RUN npm test
RUN npm run-script build


# release includes bare minimum required to run the app, copied from builder
FROM base AS release
COPY --from=builder /tmp/node_modules ./node_modules
COPY --from=builder /usr/src/app/build ./build
COPY --from=builder /usr/src/app/package.json ./

# set application PORT and expose docker PORT
ENV PORT 3000
EXPOSE 3000

CMD [ "npm", "run", "server" ]