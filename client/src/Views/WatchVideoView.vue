<template>
  <div class="watch-video">
    <div class="watch-watch">
      <YoutubeWatchVideo :video="searchListInVideo.video"></YoutubeWatchVideo>
      <YoutubeChannelInfo :channel="searchListInVideo.channel"></YoutubeChannelInfo>
      <YoutubeCommentList></YoutubeCommentList>
    </div>
    <YoutubeRecommendedList></YoutubeRecommendedList>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import YoutubeWatchVideo from '../components/YoutubeWatchVideo.vue';
import YoutubeChannelInfo from '../components/YoutubeChannelInfo.vue';
import YoutubeCommentList from '../components/YoutubeCommentList.vue';
import YoutubeRecommendedList from '../components/YoutubeRecommendedList.vue';

export default {
  async created() {
    try {
      // 쿼리에 v가 있으면 요청
      if (this.$route.query.v && this.$store.state.searchListInVideo.length <= 0) {
        await this.$store.dispatch('GET_SEARCH_LIST_IN_VIDEO', this.$route.query.v);
        // 추천 영상 요청
        await this.$store.dispatch('GET_RECOMMENDED_LIST', this.searchListInVideo.video.snippet.categoryId);

        await this.$store.dispatch('GET_COMMENT_LIST', this.searchListInVideo.video.id);
      } else {
        await this.$store.dispatch('GET_COMMENT_LIST', this.searchListInVideo.video.id);

        await this.$store.dispatch('GET_RECOMMENDED_LIST', this.searchListInVideo.video.snippet.categoryId);
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
    YoutubeCommentList,
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
.watch-video > .watch-watch {
  min-width: 1270px;
  max-width: 1270px;
}
</style>
