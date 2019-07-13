import Vue from 'vue';
import MyPlugin from './my-plugin';

Vue.use(MyPlugin, {
  date: '2019-04-23',
});

export default {
  user: 'baoanj',
};
