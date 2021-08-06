<template>
  <div class="display-list">
    <template v-if="loading">
      <PacmanLoader :size="`150px`"></PacmanLoader>
    </template>
    <template v-else>
      <ul class="item-list">
        <li v-for="(search, index) in searchList" :key="index" class="video">
          <YoutubeSearchItem>
            <template v-if="search.video.id.channelId">
              <a
                :href="`https://www.youtube.com/channel/${search.video.id.channelId}`"
                target="blank"
                slot="link"
                class="link channel"
              >
                <div class="channel-img" slot="channel-img">
                  <img :src="search.video.snippet.thumbnails.medium.url" alt="채널 이미지" />
                </div>
                <div class="channel-info" slot="channel-info">
                  <div class="channel-desc" slot="channel-desc">
                    <h2 class="channel-title">
                      <a :href="`https://www.youtube.com/channel/${search.video.snippet.channelId}`" target="blank">
                        {{ search.video.snippet.channelTitle }}
                      </a>
                    </h2>
                    <small class="channel-description">{{ search.video.snippet.description }}</small>
                  </div>
                </div>
              </a>
            </template>
            <template v-if="search.video.id.videoId">
              <div slot="link" @click="pushWatchPage(search.video)" class="link">
                <div class="video-thumbnail" slot="video-thumbnail">
                  <img :src="search.video.snippet.thumbnails.medium.url" alt="동영상 썸네일" />
                </div>
                <div class="video-info" slot="video-info">
                  <div class="video-desc" slot="video-desc">
                    <h3 class="video-title" slot="video-title" v-html="search.video.snippet.title"></h3>
                    <div class="channel-img-title">
                      <div class="channel-img">
                        <img :src="search.channel.snippet.thumbnails.default.url" alt="video.channel.snippet.title" />
                      </div>
                      <h5 class="channel-title" slot="channel-title">
                        <a :href="`https://www.youtube.com/channel/${search.video.snippet.channelId}`" target="blank">
                          {{ search.video.snippet.channelTitle }}
                        </a>
                      </h5>
                    </div>
                    <small class="video-description" slot="video-description">
                      {{ search.video.snippet.description }}
                    </small>
                  </div>
                </div>
              </div>
            </template>
          </YoutubeSearchItem>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PacmanLoader from 'vue-spinner/src/ClipLoader.vue';

import YoutubeSearchItem from './YoutubeItem.vue';

export default {
  props: {
    loading: Boolean,
  },
  computed: {
    ...mapState(['searchList']),
  },
  methods: {
    pushWatchPage(video) {
      this.$store
        .dispatch('GET_SEARCH_LIST_IN_VIDEO', video.id.videoId)
        .then(({ items }) => {
          this.$router.push({ name: 'watch', query: { v: items[0].id }, params: { channel: video.channel } });
        })
        .catch(err => console.log(err));
    },
  },
  components: {
    YoutubeSearchItem,
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
  /* width: 1096px; */
  width: 59.85%;
  /* height: 100vh; */
}
.item-list > .video {
  cursor: pointer;
}
.video {
  width: 100%;
  margin: 5px 0px;
}
.item > a,
.item > .link {
  display: flex;
}
.item > a > .channel-img {
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
.item > .link > .video-info > .video-desc > .channel-img-title {
  display: flex;
  align-items: center;
  margin: 10px 0px;
}
.item > .link > .video-info > .video-desc > .channel-img-title > .channel-img {
  height: 30px;
}
.item > .link > .video-info > .video-desc > .channel-img-title > .channel-img > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.item > .link > .video-info > .video-desc > .channel-img-title > .channel-title {
  margin-left: 10px;
  font-weight: lighter;
}
.channel-info {
  padding-top: 30px;
}
.v-spinner {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 1230px) {
  .display-list {
    display: inline-block;
  }
  .item-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .video {
    width: 100%;
  }
  .item > .link {
    display: flex;
  }
  .item > .link > .video-info > .video-desc {
    margin: 0px;
  }
  .item > .link > .video-info > .video-desc > .video-title {
    font-size: 18px;
    font-weight: lighter;
  }
  .item > .link > .video-info > .video-desc > .video-description {
    display: none;
  }
  .link.channel > .channel-img {
    min-width: 320px;
    margin: 0px;
  }
  .link.channel > * {
    margin: 0px;
    padding: 0px;
  }
  .channel-info {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .channel-info,
  .item > .link > .video-info {
    margin-left: 10px;
  }
}
@media screen and (max-width: 600px) {
  .display-list {
    display: block;
  }
  .item-list {
    width: 100%;
  }
  .video {
    width: 100%;
  }
  .item > .link {
    display: flex;
    flex-direction: column;
  }
  .item > .link > .channel-info > .channel-desc > h2 {
    text-align: center;
  }
  .item > .link > .video-thumbnail > img {
    width: 100%;
  }
  .item > .link > .video-info {
    padding-left: 5px;
  }
  .link.channel > .channel-img {
    min-width: 100%;
    text-align: center;
  }
}
</style>
