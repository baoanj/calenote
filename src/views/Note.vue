<template>
<div>
  <!-- 动态指令参数：该语法一个方便的特性是如果表达式的值是 null 则绑定/侦听器会被移除。 -->
  <p class="page-name" :[attr]="title" @[event]="handleEvent">This is note page</p>
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
  mounted() {
    // 这里抛出的错误会被父组件的 errorCaptured 钩子或是 Vue.config.errorHandler 捕获到
    throw new Error('Error From Note');
  },
  destroyed() {
    console.log('destroyed');
  },
  data() {
    return {
      visible: false,
      nextFunc: null,
      title: 'This is note page',
      attr: null,
      event: 'click',
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
    // Vue 的内置错误处理机制（组件中的 errorCaptured 钩子和全局的 errorHandler 配置项）
    // 现在也会处理 v-on 侦听函数中抛出的错误了。
    handleEvent() {
      this.attr = 'title';
      this.event = null;
      throw new Error('Error From Note');
    },
  },
};
</script>

<style lang="postcss" scoped>
.page-name {
  text-align: center;
  font-size: 30px;
  margin: 20px;
}
.modal-cancle {
  margin-right: 10px;
}
</style>
