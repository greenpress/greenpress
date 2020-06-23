# GreenPress

Open-source blogs and content websites platform, made for the 21st century.

## Dependencies
- Node.js
- NPM
- Docker / MongoDB
- (Optional: Redis)

## Getting started
### Install
```sh
$ npm install
```

### Run production
```sh
$ npm start
```

### Run development
```sh
$ npm run dev
```

## Set custom configurations
There are 2 ways to extend the default Greenpress configurations.
Basic way is by environment variables, and the second part is to add a `greenpress.config.js` file to your project's root folder.

The `greenpress.config.js` can either export the configuration object, or export a function that will get the base configuration object, and expected to return a new configuration object.
Note that the base configuration object passed to the function will include data that calculated by environment variables before.
