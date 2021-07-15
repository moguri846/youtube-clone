<template>
  <div>
    <template v-if="loading">
      <ClipLoader :size="`150px`"></ClipLoader>
    </template>
    <template v-else>
      <div class="most-popular-list">
        <ul class="item-list">
          <li v-for="(video, index) in mostPopularList" :key="index" class="video">
            <YoutubeItem>
              <div slot="link" @click="pushWatchPage(video)" class="link">
                <div class="video-thumbnail" slot="video-thumbnail">
                  <img :src="video.snippet.thumbnails.medium.url" alt="썸네일" width="360" />
                </div>

                <div class="video-info" slot="video-info">
                  <div class="channel-img" slot="channel-img">
                    <a :href="`https://www.youtube.com/channel/${video.channel.id}`" target="blank">
                      <img :src="video.channel.snippet.thumbnails.default.url" :alt="video.channel.snippet.title" />
                    </a>
                  </div>
                  <div class="video-desc" slot="video-desc">
                    <div class="video-title" slot="video-title">
                      <span>{{ video.snippet.title }}</span>
                    </div>
                    <div class="channel-tiile" slot="channel-tiile">
                      <span>{{ video.snippet.channelTitle }}</span>
                    </div>
                    <div class="video-status" slot="video-status">
                      <span>조회수 {{ video.statistics.viewCount }}회</span>
                    </div>
                  </div>
                </div>
              </div>
            </YoutubeItem>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import YoutubeItem from './YoutubeItem.vue';

export default {
  props: {
    loading: Boolean,
  },
  computed: {
    ...mapState(['mostPopularList']),
  },
  methods: {
    pushWatchPage(video) {
      this.$store
        .dispatch('GET_SEARCH_LIST_IN_VIDEO', video.id)
        .then(({ items }) => {
          console.log('MOST GET_SEARCH_LIST_IN_VIDEO 요청');
          this.$router.push({ name: 'watch', query: { v: items[0].id }, params: { channel: video.channel } });
        })
        .catch(err => console.log(err));
    },
  },
  components: {
    ClipLoader,
    YoutubeItem,
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
.most-popular-list > .item-list {
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}
.link {
  cursor: pointer;
}
.video {
  width: 360px;
  height: 330px;
  padding: 20px 10px 10px 10px;
}
.video-info {
  display: flex;
  margin-top: 10px;
}
.video-info > .channel-img {
  width: 50px;
  padding: 5px 10px 0px 0px;
  line-height: 36px;
  text-align: center;
}
.video-info > .channel-img > a > img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.video-info > .video-desc {
  height: 124px;
  display: flex;
  flex-direction: column;
}
.video-info > .video-desc > .video-title {
  max-width: 300px;
}
.video-info > .video-desc > .channel-tiile {
  margin-top: 5px;
}
.video-info > .video-desc > .channel-tiile,
.video-info > .video-desc > .video-status {
  color: #848484;
}
.v-spinner {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
