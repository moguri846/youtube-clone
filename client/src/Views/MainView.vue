<template>
  <YoutbueMostPopularVidoeList :loading="loading"></YoutbueMostPopularVidoeList>
</template>

<script>
import YoutbueMostPopularVidoeList from '../components/YoutbueMostPopularVidoeList.vue';

import bus from '../utils/bus.js';

export default {
  props: {
    loading: Boolean,
  },
  created() {
    if (this.$store.state.mostPopularList.length <= 0) {
      bus.$emit('start:spinner');
      this.$store
        .dispatch('GET_MOST_POPULAR_VIDEO_LIST')
        .then(() => {
          bus.$emit('end:spinner');
        })
        .catch(err => console.log(err));
    }
  },
  components: {
    YoutbueMostPopularVidoeList,
  },
};
</script>

<style scoped></style>
