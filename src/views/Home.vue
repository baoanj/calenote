<template>
<div class="counter-container">
  <div class="grid-card">
    <div><v-btn :color="$root.mainColor" @click="changeFooBar">add</v-btn></div>
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
      @keyup.enter="addOneTodo"
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
    <div>
      <v-btn @click="focusCounterInput">REF-PARENT</v-btn>
      <PrimaryTransition>
        <!-- 相同标签名元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们 -->
        <span :key="status">{{status}}</span>
      </PrimaryTransition>
    </div>
    <div><v-btn @click="$root.xAction">ROOT</v-btn>{{$root.vuexx}}</div>
  </div>
  <div class="grid-card">
    <LayerStack :layers="5"></LayerStack><!-- 递归组件 -->
  </div>
  <div class="grid-card">
    <div class="tree-folder-container">
      <h3>NormalTreeFolder</h3>
      <NormalTreeFolder :folder="folder" /><!-- 循环引用 -->
    </div>
  </div>
  <div class="grid-card">
    <div class="tree-folder-container">
      <h3>NormalTreeFolder</h3>
      <NormalTreeFolder :folder="folder" :defaultExpand="false" /><!-- 循环引用 -->
    </div>
  </div>
  <div class="grid-card">
    <div class="tree-folder-container">
      <h3>TransitionTreeFolder</h3>
      <TransitionTreeFolder :folder="folder" /><!-- 循环引用 -->
    </div>
  </div>
  <div class="grid-card">
    <div class="tree-folder-container">
      <h3>TransitionTreeFolder</h3>
      <TransitionTreeFolder :folder="folder" :defaultExpand="false" /><!-- 循环引用 -->
    </div>
  </div>
  <div class="grid-card">
    <div class="tree-folder-container">
      <h3>inline-template</h3>
      <!-- inline-template -->
      <!-- 相当于用以下内容覆盖掉 NormalTreeFolder 中 <template> 的内容 -->
      <!-- 且以下内容的作用域在 NormalTreeFolder 中，不能访问本组件的作用域 -->
      <NormalTreeFolder inline-template :folder="folder">
        <div>
          <h4>inline-template</h4>
          <p class="folder-name" @click="expandFolder">
            <span :class="['folder-arrow', {'folder-arrow__expand': expand},
              {'folder-arrow__shrink': !expand}]">{{ folder.name }}</span>
          </p>
          <TreeFolderContent
            ref="tfc"
            :style="{height, display}"
            :children="folder.children"
            type="normal"
          />
        </div>
      </NormalTreeFolder>
    </div>
  </div>
  <div class="grid-card">
    <TransitionList></TransitionList>
  </div>
  <div class="grid-card">
    <div class="input-number">
      <v-text-field v-model.number="firstNumber" type="number" step="20"></v-text-field>
    </div> +
    <div class="input-number">
      <v-text-field v-model.number="secondNumber" type="number" step="20"></v-text-field>
    </div> = {{ sum }}
    <p>
      <AnimateInteger :value="firstNumberComputed"></AnimateInteger> +
      <AnimateInteger :value="secondNumberComputed"></AnimateInteger> =
      <AnimateInteger :value="sumComputed"></AnimateInteger>
    </p>
  </div>
  <div class="grid-card">
    <span>store reference: {{store.hello}}</span>
    <FormInput
      v-model="inputHints"
      :inputHistory="inputHistory"
      placeholder="输入并回车"
      :store="store"
    ></FormInput>
  </div>
  <div class="grid-card">
    <span v-popup:hover="content">Les Rois Du Monde</span>
    <input v-popup:focus="'你好，请输入'" class="normal-input">
    <br>
    <span v-popup:hover.right="'hello right'">Les Rois Du Monde</span>
    <textarea rows="3" v-popup:focus.left="'hello left'" class="normal-input"></textarea>
    <br>
    <input v-focus placeholder="auto focus" class="normal-input">
  </div>
  <div class="grid-card">
    <p
      :title="now | addTail('时间戳(点击刷新)')"
      @click="now = Date.now()"
    >现在：{{ now | timeFormat }}</p>
    <p>三天后：{{ now | daysLater(3) | timeFormat('YYYY/MM/DD hh:mm:ss 星期W') }}</p>
    <p>一周后：{{ now | daysLater(7) | timeFormat('M.D h:m') }}</p>
    <p>三十天后：{{ now | daysLater(30) | timeFormat('MM/DD/YYYY 周W DD-MM-YYYY') }}</p>
    <p>五百天后：{{ now | daysLater(500) | timeFormat('YYYY年M月D日 h点m分s秒 星期W') }}</p>
  </div>
  <PrimaryMessage ref="homeMessage"></PrimaryMessage>
</div>
</template>

<script>
import Counter from './Counter.vue';
import LayerStack from './LayerStack.vue';
import NormalTreeFolder from './NormalTreeFolder.vue';
import TransitionTreeFolder from './TransitionTreeFolder.vue';
import TransitionList from './TransitionList.vue';
import AnimateInteger from './AnimateInteger.vue';
import FormInput from './FormInput.vue';

export default {
  name: 'Home',
  components: {
    Counter,
    LayerStack,
    NormalTreeFolder,
    TransitionTreeFolder,
    TransitionList,
    AnimateInteger,
    FormInput,
  },
  props: {
    store: Object,
  },
  mounted() {
    console.log('Home: mounted');

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
  destroyed() {
    console.log('Home: destroyed');
  },
  activated() {
    console.log('Home: activated');
  },
  deactivated() {
    console.log('Home: deactivated');
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
          { name: '1.1' },
          {
            name: '1.2',
            children: [
              { name: '1.2.1' },
              { name: '1.2.2' },
              {
                name: '1.2.3',
                children: [{ name: '1.2.3.1' }, { name: '1.2.3.2' }, { name: '1.2.3.3' }],
              },
            ],
          },
          { name: '1.3' },
        ],
      },
      firstNumber: 20,
      secondNumber: 40,
      inputHints: [],
      inputHistory: ['123', '456', 'abc'],
      now: Date.now(),
    };
  },
  methods: {
    changeFooBar() {
      this.counts.foo += 1;
      this.counts.bar.push(this.counts.foo);
      this.$emit('counterWidthPlus', 10);
      this.$message(this.counts.bar);
    },
    focusCounterInput() {
      this.$refs.counter.parentFocus();
      this.$emit('counterWidthMinus', 10);
      this.$refs.homeMessage.msg(this.status);
    },
    addOneTodo() {
      const num = this.counts.todos.length + 1;
      this.counts.todos.push({
        id: num,
        text: String.fromCharCode(97 + num).repeat(3),
        isComplete: Math.random() < 0.5,
      });
    },
  },
  computed: {
    sum() {
      return this.firstNumber + this.secondNumber;
    },
    firstNumberComputed() {
      const num = Number.parseInt(this.firstNumber, 10);
      return Number.isNaN(num) ? 0 : num;
    },
    secondNumberComputed() {
      const num = Number.parseInt(this.secondNumber, 10);
      return Number.isNaN(num) ? 0 : num;
    },
    sumComputed() {
      let num1 = Number.parseInt(this.firstNumber, 10);
      num1 = Number.isNaN(num1) ? 0 : num1;
      let num2 = Number.parseInt(this.secondNumber, 10);
      num2 = Number.isNaN(num2) ? 0 : num2;
      return num1 + num2;
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  filters: {
    daysLater(now, num) {
      return now + num * 24 * 60 * 60 * 1000;
    },
    addTail(val, tail) {
      return `${val}\n${tail}\ngithub@baoanj`;
    },
  },
};
</script>

<style lang="postcss" scoped>
.counter-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: auto;
}

.grid-card {
  padding: 10px;
}

.todo-complete {
  text-decoration: line-through;
}

.tree-folder-container {
  border: 1px solid var(--main-text-color);
  padding: 20px;
}

.input-number {
  display: inline-block;
  width: 35%;
}

.normal-input {
  border: 1px solid #ccc;
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
