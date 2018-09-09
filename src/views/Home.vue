<template>
  <div class="home">
    <img src="@/assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src - https://webpack.js.org/configuration/resolve/#resolve-alias
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
};
</script>
