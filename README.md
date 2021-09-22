[![CircleCI](https://circleci.com/gh/greenpress/greenpress/tree/main.svg?style=shield)](https://circleci.com/gh/greenpress/greenpress/tree/main)

# GreenPress
Open-source blogs and content websites platform, made for the 21st century.
![Greenpress](https://cdn1.greenpress.info/Logo-v2-TRNSP-405gzo1nki369py7.png)

## Dependencies
#### Direct usage
- Node.js
- NPM
- Docker / MongoDB
- (Optional: Redis)

#### Dockerized usage
- Docker
- Docker Compose

## Getting started
#### Install
```sh
$ npm install
$ npm run build
```

#### Run production
```sh
$ npm start
```

#### Run development
```sh
# In case you have separated MongoDB instance on your local machine:
$ npm run dev

# In case you don't (will run MongoDB using Docker):
$ npm run dev --x=all
```

## Dockerized Usage

### Pre-running
Before running a docker-compose environment, you'll need an `.env` file and the `compose` library.

You can just copy the `.env.example` and call it `.env` (manually), but you can also do it on command line:
```sh
$ cd compose

# for linux or mac:
$ cp .env.example .env

# for all operation systems (including windows):
$ npm run create-env
```

Running Greenpress via Docker-Compose is a very simple task.
You might need to pre-install Docker and Docker Compose, and then run these commands:
```sh
$ cd compose
$ docker-compose up
```

#### Scaling dockerized application
When using dockerized solution, you can choose to run each service separately, and scale each service according to your needs.
To run a composition that is more suitable to those cases, use the "scaled" yaml:
```sh
$ cd compose
$ docker-compose -f docker-compose.scaled.yml up
```
If you're using a small machine, such as shared hosting packages, or low cpu or memory cloud services, you should probably use the basic environment, such as the regular compose file, or directly using Node.js.

## Set custom configurations
There are 2 ways to extend the default Greenpress configurations.
Basic way is by environment variables, and the second part is to add a `greenpress.config.js` file to your project's root folder.

The `greenpress.config.js` can either export the configuration object, or export a function that will get the base configuration object, and expected to return a new configuration object.
Note that the base configuration object passed to the function will include data that calculated by environment variables before.
