<template>
  <div class="video-item" @click="pushWatchPage(video)">
    <div class="video-img">
      <img :src="video.snippet.thumbnails.medium.url" width="200" height="120" alt="썸네일" />
    </div>
    <div class="video-info">
      <div class="video-title">
        {{ video.snippet.title }}
      </div>
      <div class="channel-title">
        {{ video.snippet.channelTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: Object,
  },
  methods: {
    pushWatchPage(video) {
      this.$store
        .dispatch('GET_SEARCH_LIST_IN_VIDEO', video.id)
        .then(({ items }) => {
          this.$router.push({ name: 'watch', query: { v: items[0].id } });
        })
        .catch(err => console.log(err));
    },
  },
};
</script>

<style scoped>
.video-item {
  display: flex;
  margin: 5px 20px;
  cursor: pointer;
}
.video-info {
  margin-left: 10px;
}
.video-info > .channel-title {
  margin: 10px 0px;
}
</style>
