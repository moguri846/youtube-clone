<template>
  <div class="channel-info">
    <div class="channel-img">
      <img :src="channel.snippet.thumbnails.default.url" :alt="channel.snippet.title" />
    </div>
    <div class="channel-status">
      <div class="channel-name">
        <span>{{ channel.snippet.title }}</span>
      </div>
      <div class="subscriber">
        <span>구독자 {{ channel.statistics.subscriberCount }}명</span>
      </div>
      <div class="video-desc">
        <span>{{ channel.snippet.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channel: Object,
  },
};
</script>

<style scoped>
.channel-info {
  display: flex;
}
.channel-info > .channel-img {
  padding: 5px 15px 15px 0px;
}
.channel-info > .channel-img > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.channel-status {
  margin-top: 10px;
}
.channel-status > .subscriber {
  margin-bottom: 15px;
}
</style>
