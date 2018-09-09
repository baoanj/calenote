<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="postcss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--mainTextColor);

  & #nav {
    padding: 30px;

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
