export default {
  isFunction(func) {
    return {}.toString.call(func) === '[object Function]';
  },
  isArray(arr) {
    return {}.toString.call(arr) === '[object Array]';
  },
  isPureObject(obj) {
    return {}.toString.call(obj) === '[object Object]';
  },
  baseRandom(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  },
  shuffle(array) {
    const copyArr = array.slice();
    let index = 0;
    while (index < copyArr.length) {
      const rand = this.baseRandom(0, copyArr.length - 1);
      const value = copyArr[rand];
      copyArr[rand] = copyArr[index];
      copyArr[index] = value;
      index += 1;
    }
    return copyArr;
  },
};
