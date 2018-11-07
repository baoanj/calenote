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
    <keep-alive>
      <router-view/>
    </keep-alive>
  </v-content>
</v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<!-- default PostCSS, add lang="postcss" just for highlight -->
<style lang="postcss">
#app {
  font-family: consolas, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--mainTextColor);
  font-size: var(--mainFontSize);

  & #nav {
    padding: 0 30px;
    text-align: center;

    & a {
      font-weight: bold;
      color: var(--mainTextColor);

      &.router-link-exact-active {
        color: var(--mainColor);
      }
    }
  }
}
</style>
