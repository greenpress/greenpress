# Assets service

WIP

## Configuration

| Prop Name | Set By Environment    | Prop Type | Default Value                       |
|-----------|-----------------------|-----------|-------------------------------------|
| secret    | ASSETS_SECRETS_TOKEN  | string    |                                     |
| port      | ASSETS_PORT           | number    | 9003                                |
| ip        | ASSETS_IP             | string    | localhost                           |
| cwd       | ASSETS_SERVICE_CWD    | string    | './node_modules/@greenpress/assets' |
| script    | ASSETS_SERVICE_SCRIPT | string    | 'index.js'                          |

### Assets Secret

**Set by environment variable: `ASSETS_SECRETS_TOKEN`**

Set the secret of the assets service to a long string.

```js
module.exports = {
  services: {
    assets: {
      secret: '[A_SECRET_STRING]'
    }
  }
}
```

### Assets Port

**Default value: `9003`**

**Set by environment variable: `ASSETS_PORT`**

```js
module.exports = {
  services: {
    assets: {
      port: 8080
    }
  }
}
```

### Assets IP

**Default value: localhost (`127.0.0.1`)**

**Set by environment variable: `ASSETS_IP`**

```js
module.exports = {
  services: {
    assets: {
      ip: '[SOME_IP]'
    }
  }
}
```

### CWD and Script

**Default values: `path.join(appAbsolutePath, './node_modules/@greenpress/assets')`, `index.js`**

**Set by environment variables: `ASSETS_SERVICE_CWD`, `ASSETS_SERVICE_SCRIPT`**

**NOTE: Those values are for development only. Do NOT modify in production**

```js
module.exports = {
  services: {
    assets: {
      cwd: '[SOME_ABSOLUTE_PATH]',
      script: '[SOME_EXISTING_FILE_NAME]'
    }
  }
}
```