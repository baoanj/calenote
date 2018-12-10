<template>
<div class="layer-boder">
  <LayerStack v-if="layers > 1" :layers="layers - 1"></LayerStack>
</div>
</template>

<script>
export default {
  name: 'LayerStack',
  props: {
    layers: {
      type: Number,
      required: true,
      validator(value) {
        return value >= 1 && value <= 10;
      },
    },
  },
};
</script>

<style lang="postcss" scoped>
.layer-boder {
  border: 2px solid var(--main-color);
  padding: 20px;
}
</style>
