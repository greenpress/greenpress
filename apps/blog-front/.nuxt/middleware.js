const middleware = {}

middleware['layout-data'] = require('../middleware/layout-data.js')
middleware['layout-data'] = middleware['layout-data'].default || middleware['layout-data']

export default middleware
