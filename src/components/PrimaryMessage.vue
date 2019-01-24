<template>
<transition name="message">
  <div v-if="show" class="message">
    {{message}}
  </div>
</transition>
</template>

<script>
export default {
  name: 'PrimaryMessage',
  data() {
    return {
      show: false,
      message: '',
    };
  },
  methods: {
    msg(text, duration = 1000) {
      this.show = true;
      this.message = text;
      setTimeout(() => {
        this.show = false;
      }, duration);
    },
  },
};
</script>

<style lang="postcss" scoped>
.message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease-in-out;
}

.message-enter,
.message-leave-to {
  opacity: 0;
  top: 0;
}
</style>
