<template>
<div>
  <p>
    <label>{{$attrs.label}}:</label>
    <span :class="$attrs.spanClass">{{myFoo}} | {{myBar.toString()}}</span>
  </p>
  <div>
    <div class="simple-keybord" @click="$emit('modify', content + $event.target.innerText)">
      <span>Q</span><span>W</span><span>E</span><span>R</span><span>T</span>
    </div>
    <div class="input-container">
      <input
        type="text"
        :class="['normal-input', $attrs.inputClass]"
        :style="{ width: `${$attrs.width || 300}px` }"
        :value="content"
        v-bind="$attrs"
        v-on="inputListeners"
      >
      <span class="clear" @click="$emit('modify', '')">×</span>
    </div>
  </div>
  <ul>
    <li
      v-for="(todo, index) in todos"
      :key="todo.id"
    >
      <!-- 我们为每个 todo 准备了一个插槽，-->
      <!-- 将 `todo` 对象作为一个插槽的 prop 传入。-->
      <slot :myTodo="todo" :myIndex="index">
        <!-- 回退的内容 -->
        {{ todo.text }}
      </slot>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Counter',
  inheritAttrs: false,
  model: {
    prop: 'content',
    event: 'modify',
  },
  props: {
    foo: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0;
      },
    },
    bar: {
      type: Array,
      default() {
        return [0];
      },
      validator(value) {
        return value.length > 0;
      },
    },
    content: String,
    todos: Array,
  },
  data() {
    return {
      myFoo: this.foo,
    };
  },
  computed: {
    myBar() {
      return this.bar.concat();
    },
    inputListeners() {
      const vm = this;
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input(event) {
            vm.$emit('modify', event.target.value);
          },
        },
      );
    },
  },
};
</script>

<style lang="postcss" scoped>
.input-container {
  display: inline-block;
  position: relative;

  & .normal-input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    outline: none;

    &:focus + .clear {
      opacity: 1;
    }
  }

  & .clear {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    height: 14px;
    width: 14px;
    line-height: 14px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
    opacity: 0;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);;
    }
  }

  &:hover .clear {
    opacity: 1;
  }
}

.simple-keybord {
  width: 300px;
  margin: 10px;
  overflow: auto;

  & > span {
    float: left;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
