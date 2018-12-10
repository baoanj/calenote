<template>
<ul class="tree-folder__content">
  <li v-for="child in children" :key="child.name">
    <NormalTreeFolder
      v-if="type === 'normal' && child.children"
      :folder="child"
      :defaultExpand="defaultExpand"
    />
    <TransitionTreeFolder
      v-else-if="type === 'transition' && child.children"
      :folder="child"
      :defaultExpand="defaultExpand"
    />
    <p v-else><span>{{ child.name }}</span></p>
  </li>
</ul>
</template>

<script>
import NormalTreeFolder from './NormalTreeFolder.vue';
import TransitionTreeFolder from './TransitionTreeFolder.vue';

export default {
  name: 'TreeFolderContent',
  components: { NormalTreeFolder, TransitionTreeFolder },
  props: {
    children: Array,
    type: String,
    defaultExpand: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
p {
  margin: 0;
}

.tree-folder__content {
  list-style: none;
  transition: all 0.3s;
  overflow: hidden;
}
</style>
