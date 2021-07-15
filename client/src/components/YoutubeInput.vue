<template>
  <div class="search">
    <input type="text" v-model="searchValue" @keydown.enter="search" placeholder="검색" />
    <button @click="search"><i class="fas fa-search"></i></button>
    <span><i class="fas fa-microphone"></i></span>
  </div>
</template>

<script>
import axios from 'axios';

import bus from '../utils/bus.js';

export default {
  data() {
    return {
      searchValue: '',
    };
  },
  async created() {
    // params에 value가 있으면 dispatch
    if (this.$route.params.value) {
      // input에 value 넣기
      this.searchValue = this.$route.params.value;
      this.dispatchFunc('GET_SEARCH_LIST', this.searchValue);

      // const arr = [];

      // await Promise.all(
      //   this.$store.state.searchList.map(async item => {
      //     const {
      //       data: {
      //         data: { items },
      //       },
      //     } = await axios.post('/api/youtube/channelInfo', { id: item.snippet.channelId });

      //     arr.push({
      //       ...item,
      //       channel: items[0],
      //     });
      //   }),
      // );

      // this.$store.commit('SET_SEARCH_LIST', arr);
    }
  },
  methods: {
    async search() {
      if (this.searchValue !== '') {
        // 라우터 이동
        this.$router.push(`/search_query=${this.searchValue}`);

        this.dispatchFunc('GET_SEARCH_LIST', this.searchValue);

        // const arr = [];

        // await Promise.all(
        //   this.$store.state.searchList.map(async item => {
        //     const {
        //       data: {
        //         data: { items },
        //       },
        //     } = await axios.post('/api/youtube/channelInfo', { id: item.snippet.channelId });
        //     arr.push({
        //       ...item,
        //       channel: items[0],
        //     });
        //   }),
        // );
        // // console.log(arr);

        // this.$store.commit('SET_SEARCH_LIST', arr);
      }
    },
    async dispatchFunc(target, value) {
      try {
        bus.$emit('start:spinner');
        await this.$store.dispatch(target, value);

        const arr = [];
        await Promise.all(
          this.$store.state.searchList.map(async item => {
            const {
              data: {
                data: { items },
              },
            } = await axios.post('/api/youtube/channelInfo', { id: item.snippet.channelId });
            arr.push({
              ...item,
              channel: items[0],
            });
          }),
        );
        this.$store.commit('SET_SEARCH_LIST', arr);
        bus.$emit('end:spinner');
      } catch (err) {
        console.log(err);
      }
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
