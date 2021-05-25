# Authentication service

WIP

## Configuration

| Prop Name          | Set By Environment   | Prop Type | Default Value                     |
|--------------------|----------------------|-----------|-----------------------------------|
| jwtSecret          | JWT_SECRET           | string    |                                   |
| refreshTokenSecret | REFRESH_TOKEN_SECRET | string    |                                   |
| port               | AUTH_PORT            | number    | 9000                              |
| ip                 | AUTH_IP              | string    | localhost                         |
| cwd                | AUTH_SERVICE_CWD     | string    | './node_modules/@greenpress/auth' |
| script             | AUTH_SERVICE_SCRIPT  | string    | 'index.js'                        |

### JWT Secret

**Set by environment variable: `JWT_SECRET`**

The JWT secret is a critical part of your app. Use a long string for this value.

```js
module.exports = {
  services: {
    auth: {
      jwtSecret: '[A_SECRET_STRING]'
    }
  }
}
```

### Refresh Token Secret

**NOTE: Greenpress Admin panel now uses cookie authentication**

**Set by environment variable: `REFRESH_TOKEN_SECRET`**

Just like the JWT Secret, set this secret to a long string.

```js
module.exports = {
  services: {
    auth: {
      refreshTokenSecret: '[A_SECRET_STRING]'
    }
  }
}
```

### Auth Port

**Default value: `9000`**

**Set by environment variable: `AUTH_PORT`**

If you wish to serve the authentication service on a different port, use this environment variable.


```js
module.exports = {
  services: {
    auth: {
      port: 8000
    }
  }
}
```

### Auth IP

**Default Value: localhost (`127.0.0.1`)**

**Set by environment variable: `AUTH_IP`**

You can modify the auth service IP if you want.

```js
module.exports = {
  services: {
    auth: {
      ip: '[IP]'
    }
  }
}
```

### CWD and Script

**Default values: `path.join(appAbsolutePath, './node_modules/@greenpress/auth')`, `index.js`**

**Set by environment variables: `AUTH_SERVICE_CWD`, `AUTH_SERVICE_SCRIPT`**

**NOTE: Those values are for development only. Do NOT modify in production**

```js
module.exports = {
  services: {
    auth: {
      cwd: '[SOME_ABSOLUTE_PATH]',
      script: '[SOME_EXISTING_FILE_NAME]'
    }
  }
}
```
