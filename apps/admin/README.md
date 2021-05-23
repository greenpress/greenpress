# Greenpress Admin Panel

Admin panel service for the greenpress open-source platform.<br>
Written in Vue.js.

[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/greenpress/admin-panel%2Fadmin-panel-main?type=cf-1)]( https://g.codefresh.io/public/accounts/greenpress/pipelines/new/5df22be825b910790c3882e6)
[![npm version](https://badge.fury.io/js/%40greenpress%2Fadmin.svg)](https://badge.fury.io/js/%40greenpress%2Fadmin)
## Usage
### As a Docker container
```
$ docker run -p 3001:3001 greenpress/admin-panel
```
### As Node package
```
$ npm i @greenpress/admin
$ npx greenpress-admin
```

## Development and Independent Usage
In case you would like to run this project manually, for any reason, there are several commands you need to acknowledge:

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

### Vue.js Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
