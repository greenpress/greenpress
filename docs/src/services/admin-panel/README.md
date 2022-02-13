# Admin Panel

## About
The admin panel is a frontend application written in Vue.js to manage all website's operations, such as:<br>
Users, layouts, content, drafts, menus, blocks, site configurations, storage, plugins, email providers, etc.

## Configuration

| Prop Name | Set By Environment   | Prop Type | Default Value                      |
|-----------|----------------------|-----------|------------------------------------|
| port      | ADMIN_PORT           | number    | 3001                               |
| ip        | ADMIN_IP             | string    | localhost                          |
| cwd       | ADMIN_SERVICE_CWD    | string    | './node_modules/@greenpress/admin' |
| script    | ADMIN_SERVICE_SCRIPT | string    | 'npm run serve' \| 'server.js'       |

### Admin Panel Port

**Default value: `3001`**

**Set by environment variable: `ADMIN_PORT`**

```js
module.exports = {
  services: {
    admin: {
      port: 3003
    }
  }
}
```

### Admin Panel IP

**Default value: localhost (`127.0.0.1`)**

**Set by environment variable: `ADMIN_IP`**

```js
module.exports = {
  services: {
    admin: {
      ip: '[SOME_IP]'
    }
  }
}
```

### CWD and Script

**Default values: `path.join(appAbsolutePath, './node_modules/@greenpress/admin')`, `npm run serve | server.js`**

**Set by environment variables: `ADMIN_SERVICE_CWD`, `ADMIN_SERVICE_SCRIPT`**

**NOTE: Those values are for development only. Do NOT modify in production**

```js
module.exports = {
  services: {
    admin: {
      cwd: '[SOME_ABSOLUTE_PATH]',
      script: '[SOME_EXISTING_FILE_NAME]'
    }
  }
}
```
