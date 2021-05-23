# Greenpress Assets service

An HTTP server to manage static assets on several assets providers

[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/greenpress/assets%2Fmaster?type=cf-1)]( https%3A%2F%2Fg.codefresh.io%2Fpublic%2Faccounts%2Fgreenpress%2Fpipelines%2Fnew%2F5e5bf20c316fada35548c822)
[![npm version](https://badge.fury.io/js/%40greenpress%2Fassets.svg)](https://badge.fury.io/js/%40greenpress%2Fassets)

## Dependencies
- Node.js
- npm OR yarn
- MongoDB
- [Authentication-service](https://github.com/greenpress/authentication-service)
- [Secrets-service](https://github.com/greenpress/secrets-service)

## Usage
### As a Docker container
```sh
$ docker run -p 3001:3001 greenpress/assets
```
### As Node package
```sh
$ npm i @greenpress/assets
$ npx greenpress-assets
```

## Development and Independent Usage
In case you would like to run this project manually, for any reason, there are several commands you need to acknowledge:

### Install
```sh
$ npm install
```

### Launch
```sh
$ npm start
```
