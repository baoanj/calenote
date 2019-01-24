import Vue from 'vue';

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Primary[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 命名, 剥去文件名开头的 `./` 和结尾的扩展名
  const componentName = fileName.replace(/^\.\/(Primary[A-Z]\w+)\.(vue|js)$/, '$1');

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig,
  );
});

// 谨慎使用全局混入对象，因为会影响到每个单独创建的 Vue 实例 (包括第三方模板)。
// 大多数情况下，只应当应用于自定义选项，就像下面示例一样。
// 为自定义的选项 'compTitle' 注入一个处理器。
Vue.mixin({
  created() {
    if (this.$options.compTitle) {
      document.title = this.$options.compTitle;
    }
  },
  destroyed() {
    if (this.$options.compTitle) {
      document.title = this.$route.meta.title || 'calenote';
    }
  },
});

function customDirectivePopup(el, binding) {
  const eel = el;
  const popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.top = 0;
  popup.style.left = 0;
  popup.style.backgroundColor = '#000';
  popup.style.color = '#fff';
  popup.style.padding = '0 5px';
  popup.style.whiteSpace = 'nowrap';
  popup.style.transform = 'translate(-50%, -100%)';
  popup.style.zIndex = 3333;
  popup.innerHTML = binding.value;
  const arrow = document.createElement('div');
  arrow.style.position = 'absolute';
  arrow.style.top = '100%';
  arrow.style.left = 'calc(50% - 5px)';
  arrow.style.border = '5px solid transparent';
  arrow.style.borderTop = '5px solid #000';
  popup.appendChild(arrow);

  if (binding.arg === 'hover') {
    if (getComputedStyle(eel).position.trim() === 'static') {
      eel.style.position = 'relative';
    }
    popup.style.position = 'absolute';
    // 如果使用 addEventListener('mouseenter')，
    // 那么需要先使用 removeEventListener('mouseenter')，
    // 因为 addEventListener 会重复添加回调
    eel.onmouseenter = () => {
      if (binding.modifiers.right) {
        popup.style.top = '50%';
        popup.style.left = 'calc(100% + 5px)';
        popup.style.transform = 'translateY(-50%)';
        arrow.style.top = 'calc(50% - 5px)';
        arrow.style.left = '-10px';
        arrow.style.border = '5px solid transparent';
        arrow.style.borderRight = '5px solid #000';
      } else {
        popup.style.top = '-5px';
        popup.style.left = '50%';
      }
      eel.appendChild(popup);
    };
    eel.onmouseleave = () => {
      eel.removeChild(popup);
    };
  }
  if (binding.arg === 'focus') {
    eel.onfocus = (evt) => {
      const pos = evt.target.getBoundingClientRect();
      const posTop = pos.top;
      const posLeft = pos.left;
      const elWidth = pos.width;
      const elHeight = pos.height;
      if (binding.modifiers.left) {
        popup.style.top = `${posTop + elHeight / 2}px`;
        popup.style.left = `${posLeft - 5}px`;
        popup.style.transform = 'translate(-100%, -50%)';
        arrow.style.top = 'calc(50% - 5px)';
        arrow.style.left = '100%';
        arrow.style.border = '5px solid transparent';
        arrow.style.borderLeft = '5px solid #000';
      } else {
        popup.style.top = `${posTop - 5}px`;
        popup.style.left = `${posLeft + elWidth / 2}px`;
      }
      document.body.appendChild(popup);
    };
    eel.onblur = () => {
      document.body.removeChild(popup);
    };
  }
}

// 注册一个全局自定义指令 `v-popup`
Vue.directive('popup', {
  // inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted(el, binding) {
    customDirectivePopup(el, binding);
  },
  // componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  componentUpdated(el, binding) {
    customDirectivePopup(el, binding);
  },
});

// 注册一个全局自定义指令 `v-permission`
Vue.directive('permission', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el, binding) { // eslint-disable-line
    // TODO
  },
});
