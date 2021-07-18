<template>
  <div class="comment">
    <div class="user-img">
      <img :src="comment.snippet.topLevelComment.snippet.authorProfileImageUrl" alt="" />
    </div>
    <div class="comment-info">
      <div class="comment-info-top">
        <div class="authorDisplayName">
          <span>{{ comment.snippet.topLevelComment.snippet.authorDisplayName }}</span>
        </div>
        <div class="publishedAt">
          <span>{{ sliceDate }}</span>
        </div>
      </div>
      <div class="comment-info-middle">
        <span class="textDisplay" v-html="comment.snippet.topLevelComment.snippet.textDisplay"></span>
      </div>
      <div class="comment-info-bottom">
        <div class="likeCount">
          <i class="fas fa-thumbs-up"></i>
          <span>{{ likeCount }}</span>
        </div>
        <div class="disLikeCount">
          <i class="fas fa-thumbs-down"></i>
        </div>
        <div class="reply">
          <span>답글</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
  },
  computed: {
    sliceDate() {
      return this.comment.snippet.topLevelComment.snippet.publishedAt.slice(0, 10);
    },
    likeCount() {
      return this.comment.snippet.topLevelComment.snippet.likeCount > 0
        ? this.comment.snippet.topLevelComment.snippet.likeCount
        : '';
    },
  },
};
</script>

<style scoped>
.comment {
  max-width: 1270px;
  display: flex;
}
.comment > .user-img {
  padding: 0px 15px 15px 0px;
}
.comment > .user-img > img {
  border-radius: 50%;
}
.comment-info {
  display: flex;
  flex-direction: column;
}
.comment-info > .comment-info-top {
  display: flex;
}
.comment-info > .comment-info-top > div {
  margin-right: 10px;
}
.comment-info > .comment-info-middle {
  margin: 10px 0px;
}
.comment-info > .comment-info-bottom {
  display: flex;
}
.comment-info > .comment-info-bottom > .likeCount > span {
  margin-left: 5px;
}
.comment-info > .comment-info-bottom > div {
  margin-right: 10px;
}
.comment-info > .comment-info-bottom > div > .fas {
  color: #909090;
}
</style>
