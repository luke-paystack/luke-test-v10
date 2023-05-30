FROM node:alpine as base

ENV APP_DIR /usr/src/app

# create work directory
WORKDIR $APP_DIR

# install yarn globally
RUN npm install --force yarn -g

# ------ Install dependencies stage --------
# Creating this as a separate stage, so that we can add all the credentials here
# IMPORTANT: we discard this stage and the secrets when building the release image
FROM base as dependencies

# Retrieve build arg
ARG PERSONAL_ACCESS_TOKEN

# Set github registry access
RUN npm config set //npm.pkg.github.com/:_authToken ${PERSONAL_ACCESS_TOKEN} && \
    npm config set @paystackhq:registry https://npm.pkg.github.com

# install dependencies
COPY package.json $APP_DIR
COPY yarn.lock $APP_DIR
RUN yarn install

# ---------- Release stage ------------
# Final release image, which only has the application and base
FROM base as release

# copy the source code
COPY . $APP_DIR
RUN rm -r ./test

# copy node_modules from "dependencies" stage
COPY --from=dependencies $APP_DIR/node_modules $APP_DIR/node_modules

# build the app
RUN apk --no-cache --virtual build-dependencies add \
  python3 \
  make \
  g++ \
  && yarn build \
  && npm i -g cross-env \
  && npm i -g nps \
  && apk del build-dependencies

# run the app
CMD ./start-service.sh
