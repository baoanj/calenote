<script>
import LayerStack from './LayerStack.vue';

export default {
  name: 'RenderFunction',
  components: {
    LayerStack,
    TestScopedSlots: {
      props: ['items'],
      render(h) {
        if (this.items.length) {
          return h('p', this.items.map(
            item => this.$scopedSlots.default({
              text: item,
            }),
          ));
        }
        return h('p', 'No items found.');
      },
    },
    FunctionalComp: {
      functional: true,
      // 为了弥补缺少的实例，提供第二个参数作为上下文
      render(h, context) {
        return (
          <p>{context.props.msg}</p>
        );
      },
    },
  },
  props: ['items', 'value'],
  data() {
    let slotCount = Number.parseInt(this.$slots.default[0].text, 10);
    if (Number.isNaN(slotCount)) {
      slotCount = 45;
    }
    return {
      count: slotCount,
      show: true,
    };
  },
  render(h) {
    const vm = this;
    const TestScopedSlots = {
      props: ['items'],
      render(hh) {
        if (this.items.length) {
          return hh('p', this.items.map(
            item => this.$scopedSlots.default({
              text: item,
            }),
          ));
        }
        return hh('p', 'No items found.');
      },
    };
    const FunctionalComp = {
      functional: true,
      // 为了弥补缺少的实例，提供第二个参数作为上下文
      render(hh, context) {
        // 完全透明的传入任何特性、事件监听器、子结点等。
        return hh(context.props.mode ? TestScopedSlots : 'TestScopedSlots',
          context.data, context.children);
      },
    };

    return h('div', [
      h('LayerStack', {
        props: {
          layers: 1,
        },
        // 事件监听器基于 `on`
        on: {
          click() { // 永远不会执行，因为 LayerStack 内部不会触发这个事件
            vm.count += 10;
          },
        },
        // 仅用于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
        // 类似于 @click.native
        nativeOn: {
          click() {
            vm.count += 1;
          },
        },
      }),
      h('v-slider', {
        props: {
          value: vm.count,
        },
        on: {
          input(val) {
            vm.count = val;
          },
        },
      }),
      h('v-badge', {
        props: {
          right: true,
          color: 'red',
          overlap: true,
          value: vm.show,
        },
        attrs: {
          'shopping-cart-count': vm.count,
          title: `shopping cart count: ${vm.count}`,
        },
      }, [
        h('span', {
          slot: 'badge',
          directives: [
            {
              name: 'popup',
              value: vm.count,
              arg: 'hover',
              modifiers: {
                right: true,
              },
            },
          ],
        }, vm.count),
        h('v-icon', {
          props: {
            large: true,
            color: 'grey',
          },
          style: {
            cursor: 'pointer',
          },
          on: {
            click() {
              vm.show = !vm.show;
            },
          },
        }, 'shopping_cart'),
      ]),
      h('div', [
        h('TestScopedSlots', {
          props: {
            items: this.items,
          },
          // 在数据对象中传递 `scopedSlots`
          // 格式：{ name: props => VNode | Array<VNode> }
          scopedSlots: {
            default(props) {
              return h('span', {
                style: 'margin-right: 5px',
              }, props.text);
            },
          },
        }),
        h(FunctionalComp, {
          props: {
            items: this.items,
            mode: false,
          },
          // 在数据对象中传递 `scopedSlots`
          // 格式：{ name: props => VNode | Array<VNode> }
          scopedSlots: {
            default(props) {
              return h('span', {
                style: 'margin-right: 5px',
              }, props.text);
            },
          },
        }),
        h(TestScopedSlots, {
          props: {
            items: this.items,
          },
          // 在数据对象中传递 `scopedSlots`
          // 格式：{ name: props => VNode | Array<VNode> }
          scopedSlots: {
            default(props) {
              return h('span', {
                style: {
                  marginRight: '5px',
                  border: '1px solid var(--main-color)',
                  borderRadius: '50%',
                },
              }, props.text);
            },
          },
        }),
        h(FunctionalComp, {
          props: {
            items: this.items,
            mode: true,
          },
          // 在数据对象中传递 `scopedSlots`
          // 格式：{ name: props => VNode | Array<VNode> }
          scopedSlots: {
            default(props) {
              return h('span', {
                style: {
                  marginRight: '5px',
                  border: '1px solid var(--main-color)',
                  borderRadius: '50%',
                },
              }, props.text);
            },
          },
        }),
        h('input', {
          class: 'normal-input',
          domProps: {
            value: this.value,
          },
          on: {
            '~focus': () => {
              window.alert('请仔细阅读注意事项!'); // eslint-disable-line
            },
            keyup: (event) => {
              event.stopPropagation(); // .stop
              event.preventDefault(); // .prevent
              if (event.target === event.currentTarget
              && event.ctrlKey && event.keyCode === 13) { // .self .ctrl .enter
                this.$emit('input', event.target.value);
              }
            },
          },
        }),
      ]),
      h('FunctionalComp', {
        props: {
          msg: 'functional component',
        },
      }),
    ]);
  },
};
</script>

<style lang="postcss" scoped>
.normal-input {
  border: 1px solid #ccc;
}
</style>
