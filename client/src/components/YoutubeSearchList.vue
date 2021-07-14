<template>
  <div class="display-list">
    <template v-if="loading">
      <PacmanLoader :size="`150px`"></PacmanLoader>
    </template>
    <template v-else>
      <ul class="item-list">
        <li v-for="(video, index) in searchList" :key="index" class="video">
          <YoutubeItem>
            <template v-if="video.id.channelId">
              <a :href="`https://www.youtube.com/channel/${video.id.channelId}`" target="blank" slot="link">
                <div class="channel-img" slot="channel-img">
                  <img :src="video.snippet.thumbnails.medium.url" alt="채널 이미지" />
                </div>
                <div class="channel-info" slot="channel-info">
                  <div class="channel-desc" slot="channel-desc">
                    <h2 class="channel-title">
                      <a :href="`https://www.youtube.com/channel/${video.snippet.channelId}`" target="blank">
                        {{ video.snippet.channelTitle }}
                      </a>
                    </h2>
                    <small class="channel-description">{{ video.snippet.description }}</small>
                  </div>
                </div>
              </a>
            </template>
            <template v-if="video.id.videoId">
              <div slot="link" @click="pushWatchPage(video)" class="link">
                <div class="video-thumbnail" slot="video-thumbnail">
                  <img :src="video.snippet.thumbnails.medium.url" alt="동영상 썸네일" />
                </div>
                <div class="video-info" slot="video-info">
                  <div class="video-desc" slot="video-desc">
                    <h2 class="video-title" slot="video-title">
                      {{ video.snippet.title }}
                    </h2>
                    <h3 class="channel-title" slot="channel-title">
                      <a :href="`https://www.youtube.com/channel/${video.snippet.channelId}`" target="blank">
                        {{ video.snippet.channelTitle }}
                      </a>
                    </h3>
                    <small class="video-description" slot="video-description">
                      {{ video.snippet.description }}
                    </small>
                  </div>
                </div>
              </div>
            </template>
          </YoutubeItem>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PacmanLoader from 'vue-spinner/src/ClipLoader.vue';

import YoutubeItem from './YoutubeItem.vue';

export default {
  props: {
    loading: Boolean,
  },
  computed: {
    ...mapState(['searchList']),
  },
  methods: {
    pushWatchPage(video) {
      console.log('psuh');
      console.log('video', video);
      this.$store
        .dispatch('GET_SEARCH_LIST_IN_VIDEO', video.id.videoId)
        .then(({ items }) =>
          this.$router.push({ name: 'watch', query: { v: items[0].id }, params: { video: items[0] } }),
        )
        .catch(err => console.log(err));
    },
  },
  components: {
    YoutubeItem,
    PacmanLoader,
  },
};
</script>

<style scoped>
.display-list {
  width: 100%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
.item-list {
  width: 1096px;
}
.item-list > .video {
  cursor: pointer;
}
.video {
  margin: 5px 0px;
}
.item > a,
.item > .link {
  display: flex;
}
.item > a > .channel-img {
  width: 320px;
  text-align: center;
  margin-right: 20px;
}
.item > a > .channel-img > img {
  border-radius: 50%;
}
.item > .link > .video-info > .video-desc {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.item > .link > .video-info > .video-desc > .channel-title {
  margin: 10px 0px;
}
.v-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
