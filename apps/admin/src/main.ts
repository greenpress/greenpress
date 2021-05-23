import { createApp } from 'vue'
import router from './router'
import './style/main.scss'
import editor from './plugins/editor'
import elements from './plugins/element'
import {i18n, translate} from './plugins/i18n'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(editor)

elements(app)
app.mount('#app')
