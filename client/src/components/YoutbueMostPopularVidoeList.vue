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
                    <i class="fas fa-user"></i>
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
          this.$router.push({ name: 'watch', query: { v: items[0].id } });
        })
        .catch(err => console.log(err));
      // this.$router.push({ name: 'watch', query: { v: video.id }, params: { video } });
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
}
.video-info > .channel-img {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
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
