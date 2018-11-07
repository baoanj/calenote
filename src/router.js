import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
// import Loading from '@/views/Loading.vue';
import ErrorPage from '@/views/ErrorPage.vue';

Vue.use(Router);

function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    // 需要加载的组件 (应该是一个 Promise 对象)
    // setTimeout 是为了模拟资源加载慢的情况，以便展示 Loading 效果，
    // 真实项目中使用方式：`component: AsyncView,`
    component: new Promise((resolve) => {
      setTimeout(() => {
        resolve(AsyncView);
      }, 0);
    }),
    // 异步组件加载时使用的组件
    // 顶部进度条在这做效果不好，还是应该在路由那做，可借鉴 iview-admin
    // loading: Loading,
    // 加载失败时使用的组件
    error: ErrorPage,
    // 展示加载时组件的延时时间。默认值是 200 (毫秒)
    delay: 200,
    // 如果提供了超时时间且组件加载也超时了，
    // 则使用加载失败时使用的组件。默认值是：`Infinity`
    timeout: 10000,
  });
  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children);
    },
  });
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => lazyLoadView(import(/* webpackChunkName: "about" */ '@/views/About.vue')),
    },
    {
      path: '/note',
      name: 'note',
      // 不能使用 lazyLoadView ，不然导致 beforeRouteLeave 不能用
      component: () => import(/* webpackChunkName: "note" */ '@/views/Note.vue'),
    },
    {
      path: '/vuetify',
      name: 'vuetify',
      component: () => lazyLoadView(import(/* webpackChunkName: "vuetify" */ '@/views/Vuetify.vue')),
    },
  ],
});
