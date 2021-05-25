# Greenpress Drafts Service

This service is used to auto-save edited posts, menus and storages, without affecting the actual blog.
**NOTE: It is not recommended to call this service every keyborard change. Greenpress' official recommendation is to use `loadash.debounce` for every API call to this service**

## Configuration

| Prop Name | Set By Environment    | Prop Type | Default Value                       |
|-----------|-----------------------|-----------|-------------------------------------|
| port      | DRAFTS_PORT           | number    | 9005                                |
| ip        | DRAFTS_IP             | string    | localhost                           |
| cwd       | DRAFTS_SERVICE_CWD    | string    | './node_modules/@greenpress/drafts' |
| script    | DRAFTS_SERVICE_SCRIPT | string    | 'dist/index.js'                     |


### Drafts Port

**Default value: `9005`**

**Set by environment variable: `DRAFTS_PORT`**

```js
module.exports = {
  services: {
    drafts: {
      port: 8083
    }
  }
}
```

### Drafts IP

**Default value: localhost (`127.0.0.1`)**

**Set by environment variable: `DRAFTS_IP`**

```js
module.exports = {
  services: {
    drafts: {
      ip: '[SOME_IP]'
    }
  }
}
```


### CWD and Script

**Default values: `path.join(appAbsolutePath, './node_modules/@greenpress/drafts')`, `dist/index.js`**

**Set by environment variables: `DRAFTS_SERVICE_CWD`, `DRAFTS_SERVICE_SCRIPT`**

**NOTE: Those values are for development only. Do NOT modify in production**

```js
module.exports = {
  services: {
    drafts: {
      cwd: '[SOME_ABSOLUTE_PATH]',
      script: '[SOME_EXISTING_FILE_NAME]'
    }
  }
}
```