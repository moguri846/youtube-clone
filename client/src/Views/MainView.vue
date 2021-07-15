<template>
  <YoutbueMostPopularVidoeList :loading="loading"></YoutbueMostPopularVidoeList>
</template>

<script>
import axios from 'axios';

import bus from '../utils/bus.js';

import YoutbueMostPopularVidoeList from '../components/YoutbueMostPopularVidoeList.vue';

export default {
  props: {
    loading: Boolean,
  },
  async created() {
    try {
      const arr = [];
      if (this.$store.state.mostPopularList.length <= 0) {
        bus.$emit('start:spinner');
        await this.$store.dispatch('GET_MOST_POPULAR_VIDEO_LIST');

        await Promise.all(
          this.$store.state.mostPopularList.map(async item => {
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

        this.$store.commit('SET_MOST_POPULAR_VIDEO_LIST', arr);

        console.log('end:spinner');
        bus.$emit('end:spinner');
      }
    } catch (err) {
      console.log(err);
    }
  },
  components: {
    YoutbueMostPopularVidoeList,
  },
};
</script>

<style scoped></style>
