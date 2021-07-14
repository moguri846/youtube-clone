<template>
  <div class="search">
    <input type="text" v-model="searchValue" @keydown.enter="search" placeholder="검색" />
    <button @click="search"><i class="fas fa-search"></i></button>
    <span><i class="fas fa-microphone"></i></span>
  </div>
</template>

<script>
import bus from '../utils/bus.js';

export default {
  data() {
    return {
      searchValue: '',
    };
  },
  created() {
    // params에 value가 있으면 dispatch
    if (this.$route.params.value) {
      // input에 value 넣기
      this.searchValue = this.$route.params.value;
      this.dispatchFunc('GET_SEARCH_LIST', this.searchValue);
    }
  },
  methods: {
    search() {
      if (this.searchValue !== '') {
        // 라우터 이동
        this.$router.push(`/search_query=${this.searchValue}`);

        this.dispatchFunc('GET_SEARCH_LIST', this.searchValue);
      }
    },
    dispatchFunc(target, value) {
      bus.$emit('start:spinner');
      this.$store
        .dispatch(target, value)
        .then(() => bus.$emit('end:spinner'))
        .catch(err => console.log(err));
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
