# Blog-Front

WIP

## Configuration

| Prop Name | Set By Environment   | Prop Type | Default Value                           |
|-----------|----------------------|-----------|-----------------------------------------|
| theme     | FRONT_THEME          | string    | 'default'                               |
| cwd       | FRONT_SERVICE_CWD    | string    | './node_modules/@greenpress/blog-front' |
| script    | FRONT_SERVICE_SCRIPT | string    | 'npm run dev' \| 'npm start'            |

### Blog Front Theme

**Default value: `default`**

You can pick the theme for your blog from those options. Note that all themes share a simiar color platte with shades of <span style="color: #42b983">green</span>.
- classic
- damal 
- default

You can also create your own theme. See [customization docs](https://docs.greenpress.info/guide/customize.html) to learn more.

You can set the path to your desired theme. It can be done by either using only the theme's name (checked by the blog front), or either by using the full path to the theme's folder (mostly used for external/customized themes).

**Set by environment variable: `FRONT_THEME`**

### Theme name
```js
module.exports = {
	services: {
		front: {
			theme: '[YOUR_DESIRED_THEME]'
		}
	}
} 
```

### Theme folder path
```js
const { join } = require('path')

module.exports = {
  services: {
    front: {
      theme: 'global:' + join(process.cwd(), 'themes', '[YOUR_DESIRED_THEME]')
    }
  }
}
```

### CWD and Script

**Default values: `path.join(appAbsolutePath, './node_modules/@greenpress/blog-front')`, `npm run build && npm run dev | npm run build && npm start`**

**Set by environment variables: `FRONT_SERVICE_CWD`, `FRONT_SERVICE_SCRIPT`**

**NOTE: Those values are for development only. Do NOT modify in production**

```js
module.exports = {
  services: {
    front: {
      cwd: '[SOME_ABSOLUTE_PATH]',
      script: '[SOME_EXISTING_FILE_NAME]'
    }
  }
}
```