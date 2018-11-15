<template>
<div class="counter-container">
  <div>
    <v-btn :color="$root.mainColor" @click="changeFooBar">add</v-btn>
  </div>
  <Counter
    ref="counter"
    label="结果"
    placeholder="请输入"
    id="id-for-input"
    class="class-for-root"
    spanClass="class-for-span"
    inputClass="class-for-input"
    v-bind="counts"
    v-model="content"
    @focus="status = '正在输入'"
    @blur="status = '没在输入'"
  >
    <!-- 将 `slotProps` 定义为插槽作用域的名字，此处使用了ES2015解构语法 -->
    <template slot-scope="{ myTodo, myIndex }">
      <!-- 为待办项自定义一个模板，通过 `slotProps` 定制每个待办项。-->
      <span>{{ myIndex }} - </span>
      <span :class="{'todo-complete': myTodo.isComplete}">
        {{ myTodo.text }}
      </span>
    </template>
  </Counter>
  <p><v-btn @click="focusCounterInput">REF-PARENT</v-btn>{{status}}</p>
  <p><v-btn @click="$root.xAction">ROOT</v-btn>{{$root.vuexx}}</p>
  <LayerStack :layers="5"></LayerStack><!-- 递归组件 -->
  <div class="tree-folder-container">
    <TreeFolder :folder="folder"></TreeFolder><!-- 循环引用 -->
  </div>
  <div class="tree-folder-container">
    <!-- inline-template -->
    <!-- 相当于用以下内容覆盖掉 TreeFolder 中 <template> 的内容 -->
    <!-- 且以下内容的作用域在 TreeFolder 中，不能访问本组件的作用域 -->
    <TreeFolder inline-template :folder="folder">
      <div>
        <h4>inline-template</h4>
        <p class="folder-name" @click="expandFolder">
          <span :class="['folder-arrow', {'folder-arrow-expand': expand},
            {'folder-arrow-shrink': !expand}]">{{ folder.name }}</span>
        </p>
        <TreeFolderContent
          ref="tfc"
          :style="{height, display}"
          :children="folder.children"
        />
      </div>
    </TreeFolder>
  </div>
</div>
</template>

<script>
import Counter from './Counter.vue';
import LayerStack from './LayerStack.vue';
import TreeFolder from './TreeFolder.vue';

export default {
  name: 'Home',
  components: {
    Counter,
    LayerStack,
    TreeFolder,
  },
  mounted() {
    // $on,$once,$off - 程序化的事件侦听器
    this.$on('counterWidthPlus', (val) => {
      this.counts.width += val;
      if (this.counts.width > 300) {
        this.$off('counterWidthPlus');
      }
    });
    this.$once('counterWidthMinus', (val) => {
      this.counts.width -= val;
    });
  },
  data() {
    return {
      counts: {
        foo: 0,
        bar: [0],
        width: 250,
        todos: [
          {
            id: 1,
            text: 'aaa',
            isComplete: true,
          }, {
            id: 2,
            text: 'bbb',
            isComplete: false,
          }, {
            id: 3,
            text: 'ccc',
            isComplete: false,
          },
        ],
      },
      content: '',
      status: '没在输入',
      folder: {
        name: '1',
        children: [
          {
            name: '1.1',
          }, {
            name: '1.2',
            children: [
              {
                name: '1.2.1',
              }, {
                name: '1.2.2',
              }, {
                name: '1.2.3',
              },
            ],
          }, {
            name: '1.3',
          },
        ],
      },
    };
  },
  methods: {
    changeFooBar() {
      this.counts.foo += 1;
      this.counts.bar.push(this.counts.foo);
      this.$emit('counterWidthPlus', 10);
    },
    focusCounterInput() {
      this.$refs.counter.parentFocus();
      this.$emit('counterWidthMinus', 10);
    },
  },
};
</script>

<style lang="postcss" scoped>
.counter-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.todo-complete {
  text-decoration: line-through;
}

.tree-folder-container {
  width: 300px;
  border: 1px solid var(--main-text-color);
  padding: 20px;
  margin-top: 20px;
}
</style>

<style lang="postcss">
.class-for-span {
  color: blueviolet;
}

#id-for-input.class-for-input {
  transition: all 0.3s;

  &:hover, &:focus {
    border: 1px solid var(--main-color);
  }
}
</style>

