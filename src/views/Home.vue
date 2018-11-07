<template>
  <div class="counter-container">
    <div>
      <v-btn @click="changeFooBar">add</v-btn>
    </div>
    <Counter
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
    <p>{{status}}</p>
  </div>
</template>

<script>
import Counter from './Counter.vue';

export default {
  name: 'Home',
  components: { Counter },
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
    };
  },
  methods: {
    changeFooBar() {
      this.counts.foo += 1;
      this.counts.bar.push(this.counts.foo);
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
</style>

<style lang="postcss">
.class-for-span {
  color: blueviolet;
}

#id-for-input.class-for-input {
  transition: all 0.3s;

  &:hover,
  &:focus {
    border: 1px solid var(--mainColor);
  }
}
</style>

