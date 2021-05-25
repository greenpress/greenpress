# Getting started with Greenpress

Before you start to contribute to Greenpress, we think it's essential you will know what the purpose of this platform.

We truly believe that it's the best to be the client of your own product, in order to know what is the next important things to develop.

## Installation
The best way to create your own application is with the same ways the rest of the users and developers (that aren't contributors) will do - use the Greenpress CLI:

```
$ npm install -g @greenpress/cli
$ greenpress create my-app
$ cd my-app
$ greenpress start dev
$ greenpress populate
```

You can see more informational explanation on [this post](https://www.greenpress.info/get-started/cli-tool-v1)

##


## Production Deployment

Production environment can run with this simple command:

```
$ npm start
```

The main difference between `npm run dev` and `npm start` is:
- `dev` will also run a containerized mongodb on your local machine, in order to help you develop.
- `prod` will not, and is expecting an environment variable for Mongo URI.

### Mandatory variables for production
- `ASSETS_SECRETS_TOKEN`
- `JWT_SECRET`
- `REFRESH_TOKEN_SECRET`
- `SECRETS_SERVICE_SECRET`
- `MONGODB_URI`

### Recommended variables for production
- `REDIS_URL`

##
