# Greenpress plugins system service

An HTTP server to manage 3rd-party plugins for any system, combining frontend and backend plugins.

[![npm version](https://badge.fury.io/js/%40greenpress%2Fplugins.svg)](https://badge.fury.io/js/%40greenpress%2Fplugins)

## Dependencies
- Node.js
- npm OR yarn
- MongoDB
- [Authentication-service](https://github.com/greenpress/authentication-service)
- [Secrets-service](https://github.com/greenpress/secrets-service)

## Usage
### As a Docker container
```sh
$ docker run -p 3001:3001 greenpress/plugins
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
