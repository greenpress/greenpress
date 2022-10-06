import ElementPlus from 'element-plus';
import * as icons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';

export default function (app) {
  app.use(ElementPlus);

  Object.keys(icons).forEach((name) => {
    app.component('Icon' + name, icons[name]);
  });
}
