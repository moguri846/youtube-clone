<template>
  <ul class="search-history-list" v-show="historyActive">
    <li v-for="(history, index) in historyList" :key="index" class="history">
      <div @click="historySearch" class="history-text">
        <span>{{ history }}</span>
      </div>
      <span class="delete" @click="deleteHistory(history, index)">삭제</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    historyList: Array,
    historyActive: Boolean,
  },
  methods: {
    historySearch(e) {
      const {
        currentTarget: { innerText },
      } = e;

      this.$emit('historySearch', innerText);
    },
    deleteHistory(history, index) {
      this.$emit('deleteHistory', { history, index });
    },
  },
};
</script>

<style scoped>
.search-history-list {
  width: 100%;
  position: absolute;
  margin-top: 10px;
  background-color: #ffffff;
}
.search-history-list > .history {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
  text-align: left;
  font-size: 18px;
}
.search > .search-history-list > .history > .history-text {
  min-width: 510px;
  max-width: 510px;
}
.search-history-list > .history:first-child {
  margin-top: 10px;
}
.search-history-list > .history:hover {
  background-color: #ccc;
}
.search-history-list > .history > .delete {
  position: absolute;
  right: 10px;
  font-size: 14px;
  color: #065fd4;
  cursor: pointer;
}
.search-history-list > .history > .delete:hover {
  text-decoration: underline;
}
</style>
