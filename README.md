# Test

![test-build-code](https://github.com/PaystackHQ/luke-test-v10/workflows/test-build-code/badge.svg)



# Cloning the Repository
Open your Terminal, and type:
```
git clone https://github.com/PaystackHQ/luke-test-v10.git
```

# Commands
1. `yarn` - Installs all dependencies
2. `yarn test` - Run all tests currently available in the [test](test) folder
3. `yarn build` - Generates all JavaScript files from the TypeScript sources
4. `yarn serve` - run the application for development in the local development environment. It starts the application using Nodemon which restarts the  server each time a change is made to a file
5. `yarn nps lint` - Runs linting.
6. `yarn db.migrate` - Run migrations to setup the database.
7. `yarn db.revert` - Revert your latest migration run.
8. `yarn db.drop` - Drop the database schema.

# Functions
1. Administrate Merchant Risk Profiles
2. Assess Settlement transaction


# Environment Variables Required to bootstrap this project
| Key | Environment Variable | Default |
| ------------- | -------- | ------ |
| `APP_SCHEMA` | `env.app.schema` | ` `
| `APP_HOST` | `env.app.host` | ` `
| `PORT` | `env.app.port` | ` `
| `APP_EXPOSED_PORT` | `env.app.exposedPort` | ` `
| `LOG_LEVEL` | `env.log.level` | ` `
| `LOG_OUTPUT` | `env.log.output` | ` `
| `LOG_LOGGLY_TOKEN` | `env.log.logglyToken` | ` `
| `TYPEORM_CONNECTION` | `env.db.type` | ` `
| `TYPEORM_DATABASE` | `env.db.database` | ` `
| `TYPEORM_LOGGING` | `env.db.logging` | `false`
| `TYPEORM_LOGGER` | `env.db.logger` | ` `
| `TYPEORM_DISABLED` | `env.db.disabled` | `false`
| `TYPEORM_MIGRATIONS` | `env.app.dir.migrations` | `src/database/migrations/**/*.ts`
| `TYPEORM_MIGRATIONS_DIR` | `env.app.dir.migrationsDir` | `src/database/migrations`
| `TYPEORM_ENTITIES` | `env.app.dir.entities` | `src/modules/**/*.model.ts`
| `CONTROLLERS` | `env.app.dir.controllers` | `src/modules/**/*.controller.ts`
| `MIDDLEWARES` | `env.app.dir.middlewares` | `src/middlewares/**/*.middleware.ts`
| `SUBSCRIBERS` | `env.app.dir.subscribers` | `src/subscribers/**/*.subscriber.ts`
| `SWAGGER_ENABLED` | `env.swagger.enabled` | `false`
| `SWAGGER_ROUTE` | `env.swagger.route` | ` `
| `SWAGGER_FILE` | `env.swagger.file` | ` `
| `KAFKA_BROKER_URLS` | `env.kafka.brokers` | ` `
| `KAFKA_CLIENT_ID` | `env.kafka.clientId` | `Test`
| `KAFKA_CLIENT_SSL` | `env.kafka.ssl` | `false`
| `STATSD_PORT` | `env.metrics.statsd.port` | `8125`



# Running in Development
This project can be run in development [using Docker](#using-docker) or it can be [run on the system directly](#running-directly-on-system). For all the modes of running, the first step is to clone the repository.

## Running Directly on System
To run directly on your computer, you need to have the required Node version installed

### Dependencies
- Node >=14.11.0
- Mongo 4.4.0

### Installing Dependencies
1. Install [Node](https://nodejs.org/en/download)
  - on OSX use [homebrew](http://brew.sh) `brew install node`
2. Install and setup `Mongo` [homebrew](http://github.com/mongodb/homebrew-brew) `brew tap mongodb/brew` `brew install mongodb-community@4.4`
3. For e2e testing we use a in-memory MongoDB `yarn add mongodb-memory-server`
4. Install kafka.
    ```
    $ brew cask install java
    $ brew install kafka
    ```


### Running
- `cd` into your new `luke-test-v10` directory
- Run zookeper

  ```
  $ zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties
  ```

- Run kafka server

  ```
  $ kafka-server-start /usr/local/etc/kafka/server.properties
  ```

  **Troubleshooting**

  - InconsistentClusterIdException: Fatal error during KafkaServer startup.
    Delete the meta.properties with the following command:

    ```
    rm /usr/local/var/lib/kafka-logs/meta.properties
    ```

  - InvalidReceiveException: Invalid receive (size = x larger than 104857600)
    Less likely you are sending larger message than the default 100Mb or most likely your SSL configuration is inconsistent.
    Double-check the SSL configuration of the Kafka client in the KafkaService.
### Running
- `cd` into your new `luke-test-v10` directory
- Install the peer dependencies

    ```bash
    npm install yarn -g
    $ yarn
    ```
- Install dependencies

### Configuration

Copy and rename `env.example` to `.env` and `.env.test`. Configure the remainder of variables as required.

`KAFKA_SSL` is set by default to `true` **however** if an `.env` is created from the example, `KAFKA_SSL` is set to `false` for local environments. 

As a result of the above, when deploying to staging or production, `KAFKA_SSL` can be omitted.

### Usage/Development

To build the application:
```bash
$ yarn build
```

Or to enable hot module reloading, install nodemon:

```bash
$ yarn add -g nodemon
```

and run `yarn serve` to start the application

To run your tests, run the command:
```bash
$ yarn test
```


## Using Docker

### Dependencies
- Docker > 18.09.2

### Steps
- Adjust environment variables, if any, in the Dockerfile
- run `docker build -t luke-test-v10 .`
- run `docker run -i -p 3000:3000 -t luke-test-v10` where port 3000 is port forwarded to continer port 3000

#### Checking Running Containers
To check that the paystack-api container is running:

1. Open Terminal
2. Type `docker ps`. The output should be similar to the below
```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
c11f600f5bde        luke-test-v10       "docker-entrypoint.s…"   8 seconds ago       Up 7 seconds        0.0.0.0:3000->3000/tcp   kind_brahmagupta
```

### Using docker-compose.yml
- Specify additional environment variables, if any, in the .env
- run `docker-compose up -d`
- run `docker-compose logs -f` to see the output/logs of the container and the application

#### Using VsCode Debugger Client
The project comes preconfigured with the VsCode debug setting for tests. To start debugging tests with VsCode, take the following steps:
1. Click on the **Debug** tab at the left of the VSCode IDE
2. Click the dropdown, and select `Nodemon:attach` from the list of Debug configurations
3. Click on `Start Debugging`. That is the green play button beside the debug configurations dropdown

This will connect to the debugger running on your local environment, and you should see output in VSCode's integrated "Debug Console" tab at the bottom of the screen.


## Database Migration
- No database migrations as of yet

- ### See [here](README_LIBRARIES.md) for a list of important Libraries.
