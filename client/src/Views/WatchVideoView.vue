<template>
  <div class="watch-video">
    <div class="watch-watch">
      <YoutubeWatchVideo></YoutubeWatchVideo>
      <YoutubeChannelInfo></YoutubeChannelInfo>
    </div>
    <YoutubeRecommendedList></YoutubeRecommendedList>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import YoutubeWatchVideo from '../components/YoutubeWatchVideo.vue';
import YoutubeChannelInfo from '../components/YoutubeChannelInfo.vue';
import YoutubeRecommendedList from '../components/YoutubeRecommendedList.vue';

export default {
  async created() {
    // 쿼리에 v가 있으면 요청
    try {
      if (this.$route.query.v) {
        await this.$store.dispatch('GET_SEARCH_LIST_IN_VIDEO', this.$route.query.v);
        // 추천 영상 요청
        await this.$store.dispatch('GET_RECOMMENDED_LIST', this.searchListInVideo.snippet.categoryId);
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    ...mapState(['searchListInVideo']),
  },
  components: {
    YoutubeWatchVideo,
    YoutubeChannelInfo,
    YoutubeRecommendedList,
  },
};
</script>

<style scoped>
.watch-video {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
