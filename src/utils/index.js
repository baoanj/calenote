export default {
  isFunction(func) {
    return ({}).toString.call(func) === '[object Function]';
  },
  isArray(arr) {
    return ({}).toString.call(arr) === '[object Array]';
  },
  isPureObject(obj) {
    return ({}).toString.call(obj) === '[object Object]';
  },
};
