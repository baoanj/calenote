<template>
  <span>{{num}}</span>
</template>

<script>
export default {
  name: 'AnimateInteger',
  props: {
    value: Number,
  },
  mounted() {
    this.tween(0, this.value);
  },
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    tween(startVal, endVal) {
      const vm = this;
      const step = Math.floor((endVal - startVal) / 60) || 1;
      let count = startVal;
      this.num = startVal;

      function animate() {
        if ((startVal < endVal && count < endVal)
        || (startVal > endVal && count > endVal)) {
          count += step;
          vm.num = count;
          requestAnimationFrame(animate); // 每秒60次
        } else {
          vm.num = endVal;
        }
      }

      animate();
    },
  },
  watch: {
    value(newVal, oldVal) {
      this.tween(oldVal, newVal);
    },
  },
};
</script>
