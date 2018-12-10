<template>
<div>
  <p>This is note page</p>
  <PrimaryModal v-if="visible">
    <p slot="header">确认离开当前页面？</p>
    <p slot="content">当前修改未保存，确认离开？</p>
    <div slot="footer">
      <span class="text-btn modal-cancle" @click="cancelLeave">取消</span>
      <span class="text-btn" @click="confirmLeave">确定</span>
    </div>
  </PrimaryModal>
</div>
</template>

<script>
// @ is an alias to /src - https://webpack.js.org/configuration/resolve/#resolve-alias
import util from '@/utils';

export default {
  name: 'Note',
  beforeRouteLeave(to, from, next) {
    this.visible = true;
    this.nextFunc = next;
  },
  destroyed() {
    console.log('destroyed'); // eslint-disable-line
  },
  data() {
    return {
      visible: false,
      nextFunc: null,
    };
  },
  methods: {
    cancelLeave() {
      this.visible = false;
      if (util.isFunction(this.nextFunc)) {
        this.nextFunc(false);
      }
    },
    confirmLeave() {
      this.visible = false;
      if (util.isFunction(this.nextFunc)) {
        this.$nextTick(() => {
          this.nextFunc();
        });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.modal-cancle {
  margin-right: 10px;
}
</style>
