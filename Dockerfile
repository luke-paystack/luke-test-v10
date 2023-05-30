FROM node:16.18 as base

ARG PERSONAL_ACCESS_TOKEN
ARG APP_VERSION

ENV APP_DIR /usr/local/reqaas

RUN npm config set //npm.pkg.github.com/:_authToken ${PERSONAL_ACCESS_TOKEN} && \
    npm config set @paystackhq:registry https://npm.pkg.github.com
COPY package*.json .
RUN yarn
COPY . .
RUN yarn build

FROM base AS release

COPY --from=base package*.json $APP_DIR/
COPY --from=base ./node_modules $APP_DIR/node_modules
COPY --from=base ./dist $APP_DIR/dist
COPY --from=base ./start-service.sh $APP_DIR/

WORKDIR $APP_DIR

ENV DD_VERSION ${APP_VERSION}

ENTRYPOINT ["./start-service.sh"]
