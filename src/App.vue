<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<!-- default PostCSS, add lang="postcss" just for highlight -->
<style lang="postcss">
#app {
  font-family: consolas, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--mainTextColor);
  font-size: var(--mainFontSize);

  & #nav {
    padding: 30px;
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
