# Greeenpress configuration

When you create your own instance of Greenpress, you have several ways to pass variables for the applications.

We encourage the ability to manage variables through database, that can be modified from the admin panel, but there are many variables that should be set at environment variables, at the application's bootstrap.

## Choose your way to pass variables

You can pass every variable as an environment variables or as a config property inside a `greenpress.config.js` or `greenpress.loval.env` file.

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

| Prop Name             | Set By Environment                       | Prop Type | Default Value                            |
|-----------------------|------------------------------------------|-----------|------------------------------------------|
| port                  | PORT                                     | number    | 3000                                     |
| tenant                | TENANT                                   | string    | '0'                                      |
| excludedServices      | npm_config_x                             | string[]  | []                                       |
| roles                 | -                                        | object    | [see blow](#auth_roles)                  |
| noDocker              | npm_config_noDocker                      | boolean   | false                                    |
| memoryLimitation (MB) | MAX_MEMORY_USAGE                         | number    |                                          |
| mongoUri              | MONGODB_URI                              | string    | mongodb://localhost/greenpress           |
| redisUrl              | REDIS_URL                                | string    |                                          |
| applicationUrl        | APPLICATION_URL                          | string    | 'http://0.0.0.0:3000'                    |
| internalSecret        | INTERNAL_SECRET                          | string    |                                          |
| mailProvider          | [see below](#mail_provider)              | object    | [see below](#mail_provider)              |
| services              | [see below](#config_greenpress_services) | object    | [see below](#config_greenpress_services) |

### Port

**Default: `3000`**

**Set by environment variable: `PORT`**

You can set the main port of your Greenpress blog.

```js
module.exports = {
  port: '[SOME_PORT]'
}
```

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

### Auth Roles

You are able to modify the roles in your app.

**NOTE: This variable can only be set in `greenpress.config.js`**

| Prop Name   | Prop Type | Default Value       |
|-------------|-----------|---------------------|
| all         | string    | 'user,editor,admin' |
| default     | string    | 'user'              |
| priviledged | string    | 'admin'             |
| editors     | string    | 'editor,admin'      |

For details about user permissions, check out the [permissions page](https://docs.greenpress.info/guide/permissions.html).

```js
module.exports = {
  roles: {
    all: '[ALL_ROLES]',
    default: '[DEFAULT_USER_ROLE]',
    priviledged: '[PRIVILEDGED_ROLES]',
    editors: '[EDITOR_ROLES]'
  }
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


### MongoDB URI

**Default: `'mongodb://localhost/greenpress'`**

**Set by environment variable: `MONGODB_URI`**

You can set a different mongoDB URI, in case your database doesn't exist on the local machine, which is probably the case for every production solution.
In your development environment, you might want to set another URI if you want to manage you database instance separatly (and than it will be a good idea to [exclude db service](#excluded-services)

```js
module.exports = {
  mongoUri: '[YOUR_MONGODB_URL]'
}
```

### Redis URL

**Set by environment variable: `REDIS_URL`**

You can set a Redis URL for the app to use.

```js
module.exports = {
  redisUrl: '[YOUR_REDIS_URL]'
}
```

### Application URL

**Default: `http://0.0.0.0:3000`**

**Set by environment variable: `APPLICATION_URL`**

You can set a different application url, in case you want it to be served on a public url.

```js
module.exports = {
  applicationUrl: '[URL]'
}
```

### Internal Secret

**Default: automatically generated by a formula**

**Set by environment variable: `INTERNAL_SECRET`**

If you wish to, you can set the internal secret to your own string.

```js
module.exports = {
  internalSecret: '[SOME SUPER SECRET STRING]'
}
```

### Mail Provider 

The mail provider is an object which contains a few values.

| Prop Name | Set By Envirnment       | Prop Type | Default Value |
|-----------|-------------------------|-----------|---------------|
| service   | MAIL_PROVIDER_SERVICE   | string    | 'gmail'       |
| authType  | MAIL_PROVIDER_AUTH_TYPE | string    | 'basic'       |
| email     | MAIL_PROVIDER_EMAIL     | string    |               |
| password  | MAIL_PROVIDER_PW        | string    |               |

**Default Values: ```{ service: 'gmail', authType: 'basic', email: undefined, password: undefined }```**

- `mailProvider.service`
Set the service value to use the mailing service you need to use. such as 'yahoo', 'outlook' etc. <br />
Set the `service` by environment variable as **MAIL_PROVIDER_SERVICE**

- `mailProvider.authType`
You are able to set the authType to `'custom'` if you want to provide another email authentication method. **NOTE: Greenpress doesn't fully supports that yet.** <br />
Set the `authType` by environment variable as **MAIL_PROVIDER_AUTH_TYPE** 

- `mailProvider.email`, `mailProvider.password`
Set the credentials for your email service with this values. <br />
Set them by environment variables as **MAIL_PROVIDER_EMAIL** and **MAIL_PROVIDER_PW**

### Config Greenpress services

You can also add configurations to the greenpress services, as described in each page:

- [Blog Front](https://docs.greenpress.info/services/blog-front/#cofiguration)
- [Admin panel](https://docs.greenpress.info/services/admin-panel/#configuration)
- [Authentication service](https://docs.greenpress.info/services/auth/#configuration)
- [Content service](https://docs.greenpress.info/services/content/#configuarion)
- [Secrets service](https://docs.greenpress.info/services/secrets/#configuration)
- [Assets service](https://docs.greenpress.info/services/assets/#configuration)
- [Drafts service](https://docs.greenpress.info/services/drafts/#configuration)

<!-- TODO: when mailing & drafts services configurations will be merged to the base config, document them as well -->

To add the service configurations, use the `services` prop on the config file:

```js
module.exports = {
  services: {
    '[SERVICE_NAME]': {
      '[PROP]': '[VALUE]'
    }
  }
}
```