<template>
<v-app>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Vuetify</span>
      <span class="font-weight-light">MATERIAL DESIGN</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/note">Note</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/vuetify">Vuetify</router-link>
    </div>
    <v-btn
      flat
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
    >
      <span class="mr-2">Latest Release</span>
      <v-icon>open_in_new</v-icon>
    </v-btn>
  </v-toolbar>

  <v-content>
    <transition
      name="page"
      mode="out-in"
      :duration="{ enter: 1000, leave: 300 }"
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :store="store"></router-view>
      </keep-alive>
      <router-view v-else :store="store"></router-view>
    </transition>
  </v-content>
</v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      store: {}, // 引用同一个对象，父子组件、不同页面间传递数据的一种方式
    };
  },
  mounted() {
    document.title = this.$route.meta.title;
  },
  errorCaptured(err, vm, info) {
    console.error('App Error:', err.message, info);
  },
  watch: {
    '$route.meta.title': (val) => {
      document.title = val || 'calenote';
    },
  },
};
</script>

<!-- default PostCSS, add lang="postcss" just for highlight -->
<style lang="postcss" scoped>
@import './styles/animate.css'; /* postcss-import */

#app {
  font-family: consolas, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--main-text-tolor);
  font-size: var(--main-font-size);

  & #nav { /* nest: postcss-preset-env stage 0 */
    padding: 0 30px;
    text-align: center;

    & a {
      font-weight: bold;
      color: var(--main-text-color);

      &.router-link-exact-active {
        color: var(--main-color);
      }
    }
  }
}
</style>
