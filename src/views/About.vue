<script>
export default {
  name: 'About',
  data() {
    return {
      toggle: '',
    };
  },
  methods: {
    toggleThat() {
      this.$refs.chelsea.click();
    },
  },
  render() {
    const {
      toggle,
      toggleThat,
    } = this;

    return (
      <div class="about">
        <h1>This is an about page</h1>
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
          <span>{ toggle }</span>
        </div>
      </div>
    );
  },
};
</script>

<style lang="postcss" scoped>
.about {
  text-align: center;
}
</style>
