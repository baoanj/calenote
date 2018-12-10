<template>
  <div>
    <div>
      <v-btn flat small color="primary" @click="insertItem">Insert</v-btn>
      <v-btn flat small color="primary" @click="removeItem">Remove</v-btn>
      <v-btn flat small color="primary" @click="shuffle">Shuffle</v-btn>
      <transition-group name="list-complete" tag="p">
        <span
          v-for="(item, index) in groupItems"
          :key="item"
          class="list-complete-item"
          @click="gotoFirst(index)"
        >
          {{ item }}
        </span>
      </transition-group>
    </div>
    <div style="overflow: hidden">
      <v-text-field label="查询" v-model="queryName"></v-text-field>
      <transition-group
        name="staggered-fade"
        tag="ul"
        @before-enter="beforeEnter"
      >
        <li
          v-for="(item, index) in queryNameList"
          :key="item.msg"
          :data-index="index"
          class="staggered-fade-item"
        >{{ item.msg }}</li>
      </transition-group>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';

export default {
  name: 'TransitionList',
  data() {
    return {
      groupItems: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextItem: 10,
      queryName: '',
      nameList: [
        { msg: 'Bruce Lee' },
        { msg: 'Jackie Chan' },
        { msg: 'Chuck Norris' },
        { msg: 'Jet Li' },
        { msg: 'Kung Fury' },
      ],
    };
  },
  computed: {
    queryNameList() {
      return this.nameList.filter(item => item.msg.toLowerCase()
        .indexOf(this.queryName.toLowerCase()) !== -1);
    },
  },
  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.groupItems.length);
    },
    insertItem() {
      this.groupItems.splice(this.randomIndex(), 0, this.nextItem);
      this.nextItem += 1;
    },
    removeItem() {
      this.groupItems.splice(this.randomIndex(), 1);
    },
    shuffle() {
      this.groupItems = utils.shuffle(this.groupItems);
    },
    gotoFirst(index) {
      const value = this.groupItems[index];
      const left = this.groupItems.slice(0, index);
      const right = this.groupItems.slice(index + 1);
      this.groupItems = [].concat(value, left, right);
    },
    beforeEnter(/* el */) {
      // console.log(el.dataset.index);
    },
  },
};
</script>

<style scoped>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.staggered-fade-item {
  height: 1.6em;
  transition: all 0.3s linear;
}

.staggered-fade-enter, .staggered-fade-leave-to {
  opacity: 0;
  height: 0;
}

.staggered-fade-enter-to, .staggered-fade-leave {
  opacity: 1;
  height: 1.6em;
}
</style>
