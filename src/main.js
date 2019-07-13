import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from '@/router';
import store from '@/store';
import '@/styles/variables.css';
import '@/styles/main.css';
// import './reuse';
import honor from './use-plugin';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.config.errorHandler = (err, vm, info) => {
  console.error('Main Error:', err.message, info);
};

Vue.use(Vuetify);

// this.$root - 访问根实例
new Vue({
  router,
  store,
  honor,
  data: {
    vuexx: 'store from root', // this.$root.vuexx
    mainColor: getComputedStyle(document.body).getPropertyValue('--main-color').trim(),
    eventHub: new Vue(),
  },
  methods: {
    xAction() { // this.$root.xAction
      this.vuexx = 'change root store';
    },
  },
  render: h => h(App),
}).$mount('#app');
