<template>
  <div class="search">
    <input
      type="text"
      v-model="searchValue"
      @keydown.enter="search"
      placeholder="검색"
      @click="openHistory"
      @blur="closeHistory"
    />
    <button @click="search"><i class="fas fa-search"></i></button>
    <span><i class="fas fa-microphone"></i></span>
    <YoutubeSearchHistoryList
      :historyList="searchHistoryList"
      :historyActive="historyActive"
      v-on:historySearch="historySearch"
      v-on:deleteHistory="deleteHistory"
    ></YoutubeSearchHistoryList>
  </div>
</template>

<script>
import bus from '../utils/bus.js';

import YoutubeSearchHistoryList from './YoutubeSearchHistoryList.vue';

export default {
  data() {
    return {
      searchValue: '',
      searchHistoryList: [],
      historyActive: false,
    };
  },
  async created() {
    // params에 value가 있으면 dispatch
    if (this.$route.params.value) {
      // input에 value 넣기
      this.dispatchFunc('GET_SEARCH_LIST', this.searchValue);
    }
    // localStorage에서 데이터 가져오기
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.searchHistoryList.push(localStorage.getItem(localStorage.key(i)));
        }
      }
    }
  },
  methods: {
    openHistory() {
      this.historyActive = true;
    },
    closeHistory() {
      setTimeout(() => {
        this.historyActive = false;
      }, 100);
    },
    search() {
      if (this.searchValue !== '') {
        this.addHistory();

        this.dispatchFunc('GET_SEARCH_LIST', this.searchValue);
      }
    },
    historySearch(innerText) {
      this.dispatchFunc('GET_SEARCH_LIST', innerText);
    },
    addHistory() {
      // this.searchHistoryList에 저장
      this.searchHistoryList.push(this.searchValue);

      // localStorage에 저장
      localStorage.setItem(this.searchValue, this.searchValue);
    },
    deleteHistory({ history, index }) {
      // this.searchHistoryList에서 삭제
      this.searchHistoryList.splice(index, 1);

      // // localStorage에서 삭제
      localStorage.removeItem(history);
    },
    dispatchFunc(target, value) {
      // 라우터 이동
      this.$router.push(`/search_query=${value}`);

      bus.$emit('start:spinner');
      this.$store.dispatch(target, value).then(() => {
        bus.$emit('end:spinner');
      });
    },
  },
  components: {
    YoutubeSearchHistoryList,
  },
};
</script>

<style scoped>
.search {
  text-align: center;
}
.search > input {
  width: 550px;
  height: 25px;
  position: relative;
  top: 0px;
  line-height: 25px;
  border: 1px solid #cccccc;
  padding-left: 10px;
  outline: none;
}
.search > button {
  width: 65px;
  height: 29px;
  border: 1px solid #cccccc;
  cursor: pointer;
}
.search > span {
  display: inline-block;
  vertical-align: middle;
  margin-left: 10px;
  margin-bottom: 1px;
}
.search > span > .fa-microphone {
  font-size: 23px;
}
i {
  cursor: pointer;
}
</style>
