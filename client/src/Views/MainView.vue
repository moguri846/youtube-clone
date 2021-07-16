<template>
  <YoutbueMostPopularVidoeList :loading="loading"></YoutbueMostPopularVidoeList>
</template>

<script>
import bus from '../utils/bus.js';

import YoutbueMostPopularVidoeList from '../components/YoutbueMostPopularVidoeList.vue';

export default {
  props: {
    loading: Boolean,
  },
  created() {
    if (this.$store.state.mostPopularList.length <= 0) {
      bus.$emit('start:spinner');
      this.$store
        .dispatch('GET_MOST_POPULAR_VIDEO_LIST')
        .then(() => bus.$emit('end:spinner'))
        .catch(err => console.log(err));
    }
  },
  components: {
    YoutbueMostPopularVidoeList,
  },
};
</script>

<style scoped></style>
