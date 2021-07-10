<template>
  <div class="search-input">
    <input type="text" v-model="searchValue" @keydown.enter="search" placeholder="검색" />
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

        // this.$store
        //   .dispatch('GET_CHANNEL_LIST', this.searchValue)
        //   .then(() => bus.$emit('end:spinner'))
        //   .catch(err => console.log(err));
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
.search-input {
  text-align: center;
}
.search-input > input {
  width: 650px;
  height: 25px;
  border: 1px solid #cccccc;
  padding-left: 10px;
  outline: none;
}
</style>
