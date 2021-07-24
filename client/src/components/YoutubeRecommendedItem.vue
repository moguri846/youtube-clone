<template>
  <div class="video-item" @click="pushWatchPage(recommended.video)">
    <div class="video-img">
      <img :src="recommended.video.snippet.thumbnails.medium.url" width="200" height="120" alt="썸네일" />
    </div>
    <div class="video-info">
      <div class="video-title">
        {{ checkTitleLength }}
      </div>
      <div class="channel-title">
        {{ recommended.video.snippet.channelTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommended: Object,
  },
  computed: {
    checkTitleLength() {
      // 나중에는 height 기준으로 함
      const title = this.recommended.video.snippet.title;
      return title.length > 25 ? title.slice(0, 25) + '...' : title;
    },
  },
  methods: {
    async pushWatchPage(video) {
      try {
        const { items } = await this.$store.dispatch('GET_SEARCH_LIST_IN_VIDEO', video.id);

        this.$router.push({ name: 'watch', query: { v: items[0].id } });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.video-item {
  width: 420px;
  display: flex;
  margin-bottom: 5px;
  cursor: pointer;
}
.video-info {
  margin-left: 10px;
}
.video-info > .video-title {
  max-height: 40px;
}
.video-info > .channel-title {
  margin: 10px 0px;
}
</style>
