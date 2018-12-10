<template>
  <transition
    :name="name"
    mode="out-in"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'PrimaryTransition',
  props: {
    name: {
      type: String,
      default: 'trans-opacity',
    },
  },
};
</script>

<style scoped>
/* name: trans-opacity */
.trans-opacity-enter {
  opacity: 0;
}

.trans-opacity-enter-active {
  transition: opacity 0.2s linear;
}

.trans-opacity-leave-active {
  transition: opacity 0.2s linear;
}

.trans-opacity-leave-to {
  opacity: 0;
}

/* name: trans-scale */
.trans-scale-enter-active {
  animation: scaleEnter 3s linear;
}

.trans-scale-leave-active {
  animation: scaleLeave 3s linear;
}

@keyframes scaleEnter {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(2);
  }
  50% {
    transform: scale(0.8);
  }
  75% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes scaleLeave {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(0.6);
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}
</style>
