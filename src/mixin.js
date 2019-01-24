export default {
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    placeholder: String,
    value: null,
    store: Object,
  },
  mounted() {
    this.currentValue = this.value;
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    emit(val) {
      this.$emit('change', val);
    },
    change(val) {
      this.currentValue = val;
    },
    getValue() {
      return this.currentValue;
    },
  },
  watch: {
    value() {
      this.currentValue = this.value;
      this.$emit('change', this.value);
    },
  },
};
