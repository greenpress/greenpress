const app = require('@greenpress/api-kit').app()

require('./configurations')(app);
require('./categories')(app);
require('./posts')(app);
require('./menus')(app);
require('./tags')(app);
require('./blocks')(app);
