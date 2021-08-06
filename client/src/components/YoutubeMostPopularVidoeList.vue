<template>
  <div>
    <template v-if="loading">
      <ClipLoader :size="`150px`"></ClipLoader>
    </template>
    <template v-else>
      <div class="most-popular-list">
        <ul class="item-list">
          <li v-for="(mostPopular, index) in mostPopularList" :key="index" class="most-popular-video">
            <YoutubeMostPopularVidoeItem>
              <div slot="link" @click="pushWatchPage(mostPopular.video)" class="link">
                <div class="video-thumbnail" slot="video-thumbnail">
                  <img :src="mostPopular.video.snippet.thumbnails.medium.url" alt="썸네일" />
                </div>
                <div class="video-info" slot="video-info">
                  <div class="channel-img" slot="channel-img">
                    <a :href="`https://www.youtube.com/channel/${mostPopular.channel.id}`" target="blank">
                      <img
                        :src="mostPopular.channel.snippet.thumbnails.default.url"
                        :alt="mostPopular.channel.snippet.title"
                      />
                    </a>
                  </div>
                  <div class="video-desc" slot="video-desc">
                    <div class="video-title" slot="video-title">
                      <span>
                        {{ checkTitleLength(mostPopular.video.snippet.title) }}
                      </span>
                    </div>
                    <div class="channel-tiile" slot="channel-tiile">
                      <span>{{ mostPopular.video.snippet.channelTitle }}</span>
                    </div>
                    <div class="video-status" slot="video-status">
                      <span>조회수 {{ mostPopular.video.statistics.viewCount }}회</span>
                    </div>
                  </div>
                </div>
              </div>
            </YoutubeMostPopularVidoeItem>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ClipLoader from 'vue-spinner/src/ClipLoader.vue';
import YoutubeMostPopularVidoeItem from './YoutubeItem.vue';

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
    },
    checkTitleLength(title) {
      // 나중에는 height 기준으로 함
      return title.length > 48 ? title.slice(0, 48) + '...' : title;
    },
  },
  components: {
    ClipLoader,
    YoutubeMostPopularVidoeItem,
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
.link > .video-thumbnail > img {
  width: 100%;
}
.most-popular-video {
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
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 849px) {
  .most-popular-video {
    width: 330px;
    height: 330px;
  }
  .link > .video-thumbnail > img {
    width: 330px;
  }
}
@media screen and (max-width: 700px) {
  .most-popular-video {
    width: 270px;
    height: 270px;
  }
  .link > .video-thumbnail > img {
    width: 270px;
  }
}
@media screen and (max-width: 580px) {
  .most-popular-video {
    width: 240px;
  }
  .link > .video-thumbnail > img {
    width: 240px;
  }
}
@media screen and (max-width: 520px) {
  .most-popular-video {
    width: 200px;
  }
  .link > .video-thumbnail > img {
    width: 200px;
  }
}
@media screen and (max-width: 440px) {
  .most-popular-video {
    width: 100%;
    height: 300px;
    padding: 15px 0px;
  }
  .link > .video-thumbnail > img {
    width: 100%;
  }
}
</style>
