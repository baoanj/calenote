<template>
<div>
  <p class="folder-name" @click="expandFolder">
    <span :class="['folder-arrow', {'folder-arrow__expand': expand},
      {'folder-arrow__shrink': !expand}]">{{ folder.name }}</span>
  </p>
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <TreeFolderContent
      v-show="expand"
      ref="tfc"
      :children="folder.children"
      type="transition"
      :defaultExpand="defaultExpand"
    />
  </transition>
</div>
</template>

<script>
export default {
  name: 'TransitionTreeFolder',
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
      elementHeight: '',
      flag: true,
    };
  },
  methods: {
    expandFolder() {
      this.expand = !this.expand;
    },
    beforeEnter(el) {
      const elc = el;
      if (!this.elementHeight) {
        elc.style.display = '';
        this.elementHeight = `${elc.clientHeight}px`;
      }
      elc.style.height = 0;
      this.flag = true;
    },
    enter(el, done) {
      const elc = el;
      setTimeout(() => {
        elc.style.height = this.elementHeight;
        setTimeout(() => { done(); }, 300);
      }, 0);
    },
    afterEnter(el) {
      const elc = el;
      elc.style.height = '';
    },
    enterCancelled() {
      this.flag = false;
    },
    beforeLeave(el) {
      const elc = el;
      if (this.flag) this.elementHeight = `${elc.clientHeight}px`;
      elc.style.height = this.elementHeight;
    },
    leave(el, done) {
      const elc = el;
      setTimeout(() => {
        elc.style.height = 0;
        setTimeout(() => { done(); }, 300);
      }, 0);
    },
    afterLeave(el) {
      const elc = el;
      elc.style.height = '';
    },
    leaveCancelled() {
      //
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
