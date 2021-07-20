<template>
  <div class="search">
    <input
      type="text"
      v-model="searchValue"
      @keydown.enter="search"
      placeholder="검색"
      @blur="closeHistory"
      @click="openHistory"
    />
    <button @click="search"><i class="fas fa-search"></i></button>
    <span><i class="fas fa-microphone"></i></span>
    <ul class="search-history-list" v-show="historyActive">
      <li v-for="(history, index) in searchHistoryList" :key="index" class="history" @click="historySearch">
        <span>{{ history }}</span>
        <span class="delete" @click="deleteHistory(history, index)">삭제</span>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from '../utils/bus.js';

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
      this.dispatchFunc('GET_SEARCH_LIST', this.searchValue, this.searchValue);
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
    search() {
      if (this.searchValue !== '') {
        this.addHistory();

        this.dispatchFunc('GET_SEARCH_LIST', this.searchValue, this.searchValue);
      }
    },
    historySearch(e) {
      console.log('historySearch');
      const {
        currentTarget: { innerText },
      } = e;

      const search = innerText.slice(0, innerText.length - 2);

      this.dispatchFunc('GET_SEARCH_LIST', search, search);
    },
    dispatchFunc(target, value, route) {
      // 라우터 이동
      this.$router.push(`/search_query=${route}`);

      bus.$emit('start:spinner');
      this.$store.dispatch(target, value).then(() => {
        bus.$emit('end:spinner');
      });
    },
    addHistory() {
      // this.searchHistoryList에 저장
      this.searchHistoryList.push(this.searchValue);

      // localStorage에 저장
      localStorage.setItem(this.searchValue, this.searchValue);
    },
    openHistory() {
      this.historyActive = true;
    },
    closeHistory() {
      setTimeout(() => {
        this.historyActive = false;
      }, 100);
    },
    deleteHistory(history, index) {
      // this.searchHistoryList에서 삭제
      this.searchHistoryList.splice(index, 1);

      // localStorage에서 삭제
      localStorage.removeItem(history);
    },
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
.search > .search-history-list {
  width: 563px;
  position: absolute;
  margin-top: 10px;
  background-color: #ffffff;
}
.search > .search-history-list > .history {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 10px;
  text-align: left;
  font-size: 18px;
}
.search > .search-history-list > .history:first-child {
  margin-top: 10px;
}
.search > .search-history-list > .history:hover {
  background-color: #ccc;
}
.search > .search-history-list > .history > .delete {
  position: absolute;
  right: 10px;
  font-size: 14px;
  color: #065fd4;
  cursor: pointer;
}
.search > .search-history-list > .history > .delete:hover {
  text-decoration: underline;
}
i {
  cursor: pointer;
}
</style>
