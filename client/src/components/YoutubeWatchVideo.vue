<template>
  <div class="video-info">
    <div class="video">
      <iframe
        width="1270"
        height="720"
        :src="`//www.youtube.com/embed/${video.id}`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      >
      </iframe>
    </div>
    <div class="video-desc">
      <div class="video-tag">
        <ul class="tags">
          <li v-for="(tag, index) in video.snippet.tags" :key="index" class="tag">#{{ tag }}</li>
        </ul>
      </div>
      <div class="video-title">
        <h2>{{ video.snippet.title }}</h2>
      </div>
      <div class="video-status">
        <div>
          <span>조회수 {{ video.statistics.viewCount }}회</span>
          <span>날짜 {{ video.snippet.publishedAt }} </span>
        </div>
        <div>
          <div class="like">
            <i class="fas fa-thumbs-up"></i>
            {{ video.statistics.likeCount }}
          </div>
          <div class="dislike">
            <i class="fas fa-thumbs-down"></i>
            {{ video.statistics.dislikeCount }}
          </div>
          <div class="share">공유</div>
          <div class="save">저장</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: Object,
  },
};
</script>

<style scoped>
.video-info > .video-desc > .video-title > h2 {
  font-weight: 300;
}
.video-info > .video-desc > .video-tag {
  max-width: 1270px;
  display: flex;
}
.video-info > .video-desc > .video-tag > .tags {
  width: max-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: #065fd4;
}
.video-info > .video-desc > .video-tag > .tags > .tag {
  padding-right: 5px;
}
.video-desc > .video-status {
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
}
.video-desc > .video-status > div:nth-of-type(2) {
  display: flex;
  font-size: 18px;
}
.video-desc > .video-status > div:nth-of-type(1) > span {
  padding-right: 10px;
}
.video-desc > .video-status > div:nth-of-type(2) > div {
  padding-left: 15px;
}
</style>
