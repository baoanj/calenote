<template>
<div>
  <p class="folder-name" @click="expandFolder">
    <span :class="['folder-arrow', {'folder-arrow__expand': expand},
      {'folder-arrow__shrink': !expand}]">{{ folder.name }}</span>
  </p>
  <TreeFolderContent
    ref="tfc"
    :style="{height, display}"
    class="tree-folder-content"
    :children="folder.children"
    type="normal"
    :defaultExpand="defaultExpand"
  />
</div>
</template>

<script>
export default {
  name: 'NormalTreeFolder',
  components: {
    TreeFolderContent: () => import('./TreeFolderContent.vue'),
  },
  props: {
    folder: Object,
    defaultExpand: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      expand: this.defaultExpand,
      height: '',
      display: this.defaultExpand ? '' : 'none',
      elementHeight: '',
      expandTimer: null,
      shrinkTimer: null,
    };
  },
  methods: {
    expandFolder() {
      if (this.expand) {
        if (this.shrinkTimer) {
          clearTimeout(this.shrinkTimer);
          this.shrinkTimer = null;
        } else {
          // this.elementHeight = getComputedStyle(this.$refs.tfc.$el).height; // 1
          this.elementHeight = `${this.$refs.tfc.$el.clientHeight}px`; // 2
          this.height = this.elementHeight;
        }
        setTimeout(() => {
          this.height = 0;
          this.expand = false;
          this.expandTimer = setTimeout(() => {
            this.display = 'none';
            this.height = '';
            this.expandTimer = null;
          }, 300);
        }, 0);
      } else {
        if (this.expandTimer) {
          clearTimeout(this.expandTimer);
          this.expandTimer = null;
        }
        this.display = '';
        this.$nextTick(() => {
          if (!this.elementHeight) {
            this.elementHeight = `${this.$refs.tfc.$el.clientHeight}px`;
          }
          this.height = 0;
          setTimeout(() => {
            this.height = this.elementHeight;
            this.expand = true;
            this.shrinkTimer = setTimeout(() => {
              this.height = '';
              this.shrinkTimer = null;
            }, 300);
          }, 0);
        });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
p {
  margin: 0;
}

.folder-name {
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background-color: #f1f1f1;
  }
}

.folder-arrow {
  position: relative;
}

.folder-arrow::before {
  content: '';
  position: absolute;
  top: 2px;
  left: -15px;
  width: 8px;
  height: 8px;
  display: inline-block;
  border-right: 2px solid var(--main-color);
  border-bottom: 2px solid var(--main-color);
  margin-right: 5px;
  transition: all 0.3s;
}

.folder-arrow__expand::before {
  transform: rotate(45deg);
}

.folder-arrow__shrink::before {
  transform: rotate(-45deg);
  top: 5px;
}
</style>
