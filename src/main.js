import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from '@/router';
import store from '@/store';
import '@/styles/variables.css';
import '@/styles/main.css';
import App from './App.vue';

Vue.config.productionTip = false;

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Primary[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 命名, 剥去文件名开头的 `./` 和结尾的扩展名
  const componentName = fileName.replace(/^\.\/(Primary[A-Z]\w+)\.(vue|js)$/, '$1');

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig,
  );
});

Vue.use(Vuetify);

new Vue({
  router,
  store,
  // this.$root - 访问根实例
  data: {
    vuexx: 'store from root',
    mainColor: getComputedStyle(document.body).getPropertyValue('--main-color').trim(),
  },
  methods: {
    xAction() {
      this.vuexx = 'change root store';
    },
  },
  render: h => h(App),
}).$mount('#app');
