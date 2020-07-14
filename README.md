# GreenPress

Open-source blogs and content websites platform, made for the 21st century.

[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/greenpress/greenpress%2Fgreenpress?type=cf-1)]( https://g.codefresh.io/public/accounts/greenpress/pipelines/new/5f0c0847cbfcb738508361c0)

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
```

#### Run production
```sh
$ npm start
```

#### Run development
```sh
$ npm run dev
```

## Dockerized Usage

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
