<template>
<ul class="tree-folder-content">
  <li v-for="child in children" :key="child.name">
    <TreeFolder v-if="child.children" :folder="child" />
    <p v-else><span>{{ child.name }}</span></p>
  </li>
</ul>
</template>

<script>
import TreeFolder from './TreeFolder.vue';

export default {
  name: 'TreeFolderContent',
  components: { TreeFolder },
  props: {
    children: Array,
  },
};
</script>

<style lang="postcss" scoped>
p {
  margin: 0;
}

.tree-folder-content {
  transition: all 0.3s;
  overflow: hidden;
  list-style: none;
}
</style>

