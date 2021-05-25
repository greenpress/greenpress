# Secrets service

WIP

## Configuration

| Prop Name | Set By Environment       | Prop Type | Default Value                        |
|-----------|--------------------------|-----------|--------------------------------------|
| secret    | SECRET_SERVICE_SECRET    | string    |                                      |
| port      | SECRETS_PORT             | number    | 9002                                 |
| ip        | SECRETS_IP               | string    | localhost                            |
| protocol  | SECRETS_SERVICE_PROTOCOL | string    | 'http'                               |
| cwd       | SECRETS_SERVICE_CWD      | string    | './node_modules/@greenpress/secrets' |
| script    | SECRETS_SERVICE_SCRIPT   | string    | 'index.js'                           |

### Secret

**Set by environment variable: `SECRETS_SERVICE_SECRET`**

Set the main secret of the secret service with this.

```js
module.exports = {
  services: {
    secrets: {
      secret: '[A_LONG_STRING]'
    }
  }
}
```

### Secrets Port

**Default: `9002`**

**Set by environment variable: `SECRETS_PORT`**

```js
module.exports = {
  services: {
    secrets: {
      port: 8999
    }
  }
}
```

### Secrets IP

**Default Value: localhost (`127.0.0.1`)**

**Set by environment variable: `SECRETS_IP`**

You can modify the secrets service IP if you want.

```js
module.exports = {
  services: {
    secrets: {
      ip: '[SOME_IP]'
    }
  }
}
```

### Secrets Protocol

**Default value: `http`**

**Set by environment variable: `SECRETS_SERVICE_PROTOCOL`**

You can set the secrets service protocol if you wish to:

```js
module.exports = {
  services: {
    secrets: {
        protocol: '[SOME_PROTOCOL]'
    }
  }
}
```

### CWD and Script

**Default values: `path.join(appAbsolutePath, './node_modules/@greenpress/secrets')`, `index.js`**

**Set by environment variables: `SECRETS_SERVICE_CWD`, `SECRETS_SERVICE_SCRIPT`**

**NOTE: Those values are for development only. Do NOT modify in production**

```js
module.exports = {
  services: {
    secrets: {
      cwd: '[SOME_ABSOLUTE_PATH]',
      script: '[SOME_EXISTING_FILE_NAME]'
    }
  }
}
```

