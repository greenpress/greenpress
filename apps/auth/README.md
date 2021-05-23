# Greenpress Authentication service

An HTTP server (back end only) with DB support & auth features 

[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/greenpress/auth%2Fmaster?type=cf-1)]( https%3A%2F%2Fg.codefresh.io%2Fpublic%2Faccounts%2Fgreenpress%2Fpipelines%2Fnew%2F5e84c3803571713e653bb23d)
[![npm version](https://badge.fury.io/js/%40greenpress%2Fauth.svg)](https://badge.fury.io/js/%40greenpress%2Fauth)

## Usage
### As a Docker container
```
$ docker run -p 3001:3001 greenpress/auth
```
### As Node package
```
$ npm i @greenpress/auth
$ npx greenpress-auth
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

## Main Features
- es6
- express
- mongoose
- passport
- validator
- signin / signup
- token and refresh-tokens
- optional roles by environment variables
- email verification

## Dependencies
- Node.js
- npm OR yarn
- MongoDB


## Future development
- email verification (next phase, support of multiple email services APIs)
- reset password
