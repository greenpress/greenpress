# Greeenpress configuration

When you create your own instance of Greenpress, you have several ways to pass variables for thr applications.

We encourage the ability to manage variables through database, that can be modified from the admin panel, but there are many variables that should be set at environment variables, at the application's bootstrap.

## Choose your way to pass variables

You can pass every variable as an environment variables or as a config property inside a `greenpress.config.js` file.

## The config file

At the root directory of your Greenpress applicatoin, add a file named `greenpress.config.js`.
It can either export an object, or a function that will return an object. e.g.:

```js
module.exports = {
  // put config here
}
```

OR


```js
module.exports = function(baseConfig) {
  return {
    ...baseConfig,
    // extend the base config as you like
  }
}
```

<hr>

## Configuration variables

### Tenant

**Default: `'0'`**

**Set by environment variable: `BASIC_TENANT`**

This property define the your current tenant for the application.<br>
It will affect every read from the database, including authentication, content, assets, etc.

```js
module.exports = {
  tenant: '0' // default is zero
}
```



### Excluded Services

**Default: `[]`**

**Set by environment variable: `npm_config_x` or `--x` argument at `npm run` command (e.g. `npm run dev --x secrets,admin`)**

Services that will be defined here will be excluded from running

```js
module.exports = {
  excludedServices: ['secrets', 'admin']
}
```


### No Docker (For MongoDB & Dev)

**Default: `false`**

**Set by environment variable: `npm_config_noDocker` or `--noDocker` argument at `npm run` command (e.g. `npm run dev --noDocker`)**

For development environment only.<br>
By default, MongoDB is running inside a Docker container.<br>
Adding this flag will run MongoDB database from your local mongo application, installed on your machine.

```js
module.exports = {
  noDocker: true
}
```


### Memory Limitation

**Default: `(empty)`**

**Set by environment variable: `MAX_MEMORY_USAGE`**

If you are running on low memory machines, enter your maximum memory quota (in MB).<br>
This feature will make garbage collector work more often, to clear and reduce memory usage.

```js
module.exports = {
  memoryLimitation: 512
}
```

