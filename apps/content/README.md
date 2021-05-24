# Greenpress Content service

A content service for greenpress platform 

[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/greenpress/content%2Fmaster?type=cf-1)]( https%3A%2F%2Fg.codefresh.io%2Fpublic%2Faccounts%2Fgreenpress%2Fpipelines%2Fnew%2F5e84c0a1b1f6cd03c8ce58e0)
[![npm version](https://badge.fury.io/js/%40greenpress%2Fcontent.svg)](https://badge.fury.io/js/%40greenpress%2Fcontent)

## Main Features
- manage menus
- manage categories
- manage posts
- manage comments
- manage website configurations
- multi tenancy
- search posts
- post tags 
- auto-migrations for updates

## Dependencies
- Node.js
- npm OR yarn
- MongoDB
- [Authentication-service](https://github.com/greenpress/authentication-service)


## Usage
### As a Docker container
```sh
$ docker run -p 3001:3001 greenpress/content
```
### As Node package
```sh
$ npm i @greenpress/content
$ npx greenpress-content
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
