<template>
<div class="about">
  <h1>This is an about page</h1>
  <div>
    <span class="text-btn" @click="toggleThat">文本按钮</span>
  </div>
  <div>
    <input
      ref="chelsea"
      style="display: none;"
      type="checkbox"
      v-model="toggle"
      true-value="你中奖了"
      false-value="谢谢参与"
    >
    <span>{{toggle}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      toggle: '',
    };
  },
  methods: {
    toggleThat() {
      this.$refs.chelsea.click();
    },
  },
};
</script>

<style lang="postcss" scoped>
.about {
  text-align: center;
}
</style>
