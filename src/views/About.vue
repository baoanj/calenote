<script>
import PrimaryTransition from '@/components/PrimaryTransition.vue';
import RenderFunction from './RenderFunction.vue';

export default {
  name: 'About',
  data() {
    return {
      toggle: '谢谢参与',
      value: '',
    };
  },
  props: {
    store: Object,
  },
  components: {
    RenderFunction,
  },
  methods: {
    toggleThat() {
      this.$refs.chelsea.click();
    },
    changeStoreRef(evt) {
      if (evt.target.nodeName.toUpperCase() === 'LI') {
        this.store.hello = evt.target.innerText;
      }
    },
  },
  computed: {
    items() {
      return this.value.split('');
    },
  },
  // 将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，
  // 实际上也是 JSX 所要求的，如果在作用域中 h 失去作用，在应用中会触发报错。
  render(h) { // eslint-disable-line
    const {
      toggle,
      items,
      toggleThat,
      changeStoreRef,
    } = this;
    const hints = this.$route.params.hints || [];

    return (
      <div class="about">
        <h1>This is an about page</h1>
        <ul on-click={ changeStoreRef }>
          {hints.map(item => (
            <li key={item.time}>{item.name}</li>
          ))}
        </ul>
        <RenderFunction items={items} v-model={ this.value }>60</RenderFunction>
        <div>
          <span class="text-btn" on-click={ toggleThat }>文本按钮</span>
        </div>
        <div>
          <input
            ref="chelsea"
            style="display: none;"
            type="checkbox"
            // https://www.npmjs.com/package/babel-plugin-jsx-v-model
            // 'this.' is required, because you should use MemberExpression with v-model
            v-model={ this.toggle }
            true-value="你中奖了"
            false-value="谢谢参与"
          />
          <PrimaryTransition name="trans-scale">
            <span key={toggle} class="result">{ toggle }</span>
          </PrimaryTransition>
        </div>
      </div>
    );
  },
};
</script>

<style lang="postcss" scoped>
.about {
  text-align: center;

  & .result {
    display: inline-block;
  }
}
</style>
