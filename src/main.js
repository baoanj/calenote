import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from '@/router';
import store from '@/store';
import '@/styles/variables.css';
import '@/styles/main.css';
// import './reuse';
import MyPlugin from './plugin';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(MyPlugin);

new Vue({
  router,
  store,
  data: { // this.$root - 访问根实例
    vuexx: 'store from root',
    mainColor: getComputedStyle(document.body).getPropertyValue('--main-color').trim(),
    eventHub: new Vue(),
  },
  methods: {
    xAction() {
      this.vuexx = 'change root store';
    },
  },
  render: h => h(App),
}).$mount('#app');
