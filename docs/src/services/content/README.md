# Content service

WIP

## Configuration

| Prop Name | Set By Environment     | Prop Type | Default Value                        |
|-----------|------------------------|-----------|--------------------------------------|
| port      | CONTENT_PORT           | number    | 9001                                 |
| ip        | CONTENT_IP             | string    | localhost                            |
| cwd       | CONTENT_SERVICE_CWD    | string    | './node_modules/@greenpress/content' |
| script    | CONTENT_SERVICE_SCRIPT | string    | 'index.js'                           |

### Content Port

**Default: `9001`**

**Set by environment variable: `CONTENT_PORT`**

```js
module.exports = {
  services: {
    content: {
      port: 9080
    }
  }
}
```

### Content IP

**Default Value: localhost (`127.0.0.1`)**

**Set by environment variable: `CONTENT_IP`**

You can modify the content service IP if you want.

```js
module.exports = {
  services: {
    content: {
      ip: '[SOME_IP]'
    }
  }
}
```

### CWD and Script

**Default values: `path.join(appAbsolutePath, './node_modules/@greenpress/content')`, `index.js`**

**Set by environment variables: `CONTENT_SERVICE_CWD`, `CONTENT_SERVICE_SCRIPT`**

**NOTE: Those values are for development only. Do NOT modify in production**

```js
module.exports = {
  services: {
    content: {
      cwd: '[SOME_ABSOLUTE_PATH]',
      script: '[SOME_EXISTING_FILE_NAME]'
    }
  }
}
```