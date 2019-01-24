<template>
  <div>
    <v-btn @click="goToAbout" color="info">Go To About With Hints</v-btn>
    <div class="text-field-container">
      <v-text-field
        v-model="text"
        :label="placeholder"
        ref="inputText"
        @keyup.enter="addHint"
        @blur="inputBlur"
        @click="visible = true"
      ></v-text-field>
      <transition name="hint-area">
        <div
          v-if="visible && hintList.length"
          class="hint-container"
          @click="hintSelect"
          @mouseenter="atHintArea = true"
          @mouseleave="atHintArea = false"
        >
          <transition-group
            name="list-filter"
            class="hint-list"
            tag="ul"
          >
            <li
              v-for="hint in hintList"
              :key="hint.time"
              class="list-filter-item"
            >{{hint.name}}</li>
          </transition-group>
        </div>
      </transition>
    </div>
    <div class="text-field-container">
      <v-text-field
        v-model="text2"
        label="普通输入框"
        ref="inputText2"
        @keyup.enter="selectValue"
        @keyup.up="selectUpItem"
        @keyup.down="selectDownItem"
        @blur="inputBlur2"
        @click="visible2 = true"
      ></v-text-field>
      <transition name="hint-area">
        <div
          v-if="visible2 && historyList.length"
          class="hint-container"
          @click="hintSelect2"
          @mouseenter="atHintArea2 = true"
          @mouseleave="atHintArea2 = false"
          @mousemove="hoverHistoryArea"
          @mouseout="mouseoutHistoryArea"
        >
          <transition-group
            name="list-filter"
            class="hint-list"
            tag="ul"
          >
            <!-- Do not use v-for index as key on <transition-group> children,
            this is the same as not using keys. -->
            <li
              v-for="(history, index) in historyList"
              :key="history"
              :data-index="index"
              :class="['list-filter-item', {'select-item': index === selectIndex}]"
            >{{history}}</li>
          </transition-group>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixin';

export default {
  name: 'FormInput',
  mixins: [mixin],
  props: {
    inputHistory: Array,
  },
  data() {
    return {
      text: '',
      visible: false,
      atHintArea: false,
      text2: '',
      visible2: false,
      atHintArea2: false,
      selectIndex: -1,
    };
  },
  computed: {
    hintList() {
      if (this.text === '') {
        return this.currentValue;
      }
      return this.currentValue.filter(item => item.name.includes(this.text));
    },
    historyList() {
      if (this.text2 === '') {
        return this.inputHistory;
      }
      return this.inputHistory.filter(item => item.indexOf(this.text2) === 0);
    },
  },
  methods: {
    addHint() {
      this.store.hello = this.text; // store reference
      this.currentValue.push({ time: Date.now(), name: this.text });
    },
    selectValue() {
      if (this.selectIndex >= 0) {
        this.text2 = this.historyList[this.selectIndex];
        this.atHintArea2 = false;
        this.$nextTick(() => {
          this.visible2 = false;
        });
      }
    },
    hintSelect(event) {
      if (event.target.nodeName.toUpperCase() === 'LI') {
        this.text = event.target.innerText;
        this.atHintArea = false;
        this.$nextTick(() => { // because of watching text
          this.visible = false;
        });
      }
    },
    hintSelect2(event) {
      if (event.target.nodeName.toUpperCase() === 'LI') {
        this.text2 = event.target.innerText;
        this.atHintArea2 = false;
        this.$nextTick(() => {
          this.visible2 = false;
        });
      }
    },
    inputBlur() {
      if (this.visible && this.atHintArea) {
        this.$refs.inputText.focus();
      } else {
        this.visible = false;
      }
    },
    inputBlur2() {
      if (this.visible2 && this.atHintArea2) {
        this.$refs.inputText2.focus();
      } else {
        this.visible2 = false;
      }
    },
    selectUpItem() {
      if (this.selectIndex <= 0) {
        this.selectIndex = this.historyList.length - 1;
      } else {
        this.selectIndex -= 1;
      }
    },
    selectDownItem() {
      if (this.selectIndex >= this.historyList.length - 1) {
        this.selectIndex = 0;
      } else {
        this.selectIndex += 1;
      }
    },
    hoverHistoryArea(event) {
      if (event.target.nodeName.toUpperCase() === 'LI') {
        this.selectIndex = +event.target.dataset.index;
      }
    },
    mouseoutHistoryArea() {
      this.selectIndex = -1;
    },
    goToAbout() {
      this.$router.push({
        name: 'about',
        params: {
          hints: this.currentValue,
          store: this.store,
        },
      });
    },
  },
  watch: {
    text() {
      this.visible = true;
    },
    text2() {
      this.visible2 = true;
    },
    visible2() {
      this.selectIndex = -1;
    },
    historyList(val, oldVal) {
      if (val.length !== oldVal.length || val.some(
        (item, index) => item !== oldVal[index],
      )) this.selectIndex = -1;
    },
  },
};
</script>

<style lang="postcss" scoped>
.text-field-container {
  position: relative;
}

.hint-container {
  border-radius: 2px;
  box-shadow: 0px 2px 10px 2px #ddd;
  padding: 5px 0;
  max-height: 200px;
  overflow: auto;
  width: 100%;
  position: absolute;
  left: 0;
  top: 47px;
  background-color: #fff;
  z-index: 3000;
  transition: all 0.2s linear;
  transform-origin: top;
}

.hint-list {
  list-style: none;
  padding-left: 0;
  overflow: hidden;

  & li {
    transition: all 0.3s;
    padding: 0 10px;
    cursor: default;
  }
}

.select-item {
  background-color: #ccc;
}

.hint-area-enter-active {
  transform: scaleY(0);
}

.hint-area-enter-to {
  transform: scaleY(1);
}

.hint-area-leave-to {
  transform: scaleY(0);
}

.list-filter-item {
  height: 1.5em;
  transition: all 0.2s;
}

.list-filter-enter, .list-filter-leave-to {
  height: 0;
  opacity: 0;
}

.list-filter-enter-to, .list-filter-leave {
  height: 1.5em;
  opacity: 1;
}
</style>
