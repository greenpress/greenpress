# Secrets service

An HTTP server to manage internal application secrets 


[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/greenpress/secrets%2Fmaster?type=cf-1)]( https%3A%2F%2Fg.codefresh.io%2Fpublic%2Faccounts%2Fgreenpress%2Fpipelines%2Fnew%2F5e84c29035717176303bb23c)
[![npm version](https://badge.fury.io/js/%40greenpress%2Fsecrets.svg)](https://badge.fury.io/js/%40greenpress%2Fsecrets)

## Dependencies
- Node.js
- npm OR yarn
- MongoDB

## Usage
### As a Docker container
```sh
$ docker run -p 3001:3001 greenpress/secrets
```
### As Node package
```sh
$ npm i @greenpress/secrets
$ npx greenpress-secrets
```

## Development and Independent Usage
In case you would like to run this project manually, for any reason, there are several commands you need to acknowledge:

## Install
```sh
$ npm install
```

## Launch
```sh
$ npm start
```
