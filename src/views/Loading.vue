<template>
<div class="loading" :style="{width: `${progress}%`}"></div>
</template>

<script>
export default {
  name: 'Loading',
  mounted() {
    this.progress = 10;
    this.loadingBar();
  },
  beforeDestroy() {
    this.progress = 100;
    this.loadingTimer = null;
  },
  data() {
    return {
      progress: 0,
      loadingTimer: null,
    };
  },
  methods: {
    loadingBar() {
      this.loadingTimer = setInterval(() => {
        if (this.progress < 50) {
          this.progress += 20;
        } else if (this.progress < 80) {
          this.progress += 15;
        } else if (this.progress < 90) {
          this.progress += 5;
        } else if (this.progress < 95) {
          this.progress += 2;
        } else if (this.progress < 99) {
          this.progress += 1;
        }
      }, 200);
    },
  },
};
</script>

<style lang="postcss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 4px;
  z-index: 3;
  background-color: var(--main-color);
  transition: all 0.2s;
}
</style>
