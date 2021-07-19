<template>
  <div class="comment">
    <div class="user-img">
      <img :src="comment.snippet.topLevelComment.snippet.authorProfileImageUrl" alt="" />
    </div>
    <div class="comment-info">
      <div class="comment-info-top">
        <span class="authorDisplayName">{{ comment.snippet.topLevelComment.snippet.authorDisplayName }}</span>
        <span class="publishedAt">{{ sliceDate }}</span>
      </div>
      <div class="comment-info-middle">
        <span
          class="textDisplay"
          ref="checkheight"
          :class="height > 80 ? 'over' : ''"
          v-html="comment.snippet.topLevelComment.snippet.textDisplay"
        ></span>
        <span class="more-textDisplay" @click="moreTextDisplay" v-show="height > 80">{{ moreText }}</span>
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
      <div class="more-comment" v-show="this.comment.snippet.totalReplyCount > 0">
        <i class="fas fa-sort-down"></i>
        <span>답글 {{ this.comment.snippet.totalReplyCount }}개 보기</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: '',
      moreText: '자세히 보기',
    };
  },
  props: {
    comment: Object,
  },
  computed: {
    sliceDate() {
      return this.comment.snippet.topLevelComment.snippet.publishedAt.slice(0, 10);
    },
    likeCount() {
      const likeCount = this.comment.snippet.topLevelComment.snippet.likeCount;
      return likeCount > 0 ? likeCount : '';
    },
  },
  methods: {
    moreTextDisplay() {
      const height = this.$refs.checkheight;
      height.classList.toggle('active');
      if (height.classList.value.includes('active')) {
        this.moreText = '간략히';
      } else {
        this.moreText = '자세히 보기';
      }
    },
  },
  mounted() {
    const clientHeight = this.$refs.checkheight.clientHeight;
    this.height = clientHeight;
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
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
}
.comment-info > .comment-info-middle > .textDisplay {
  display: inline-block;
}
.comment-info > .comment-info-middle > .textDisplay.over {
  height: 80px;
  overflow: hidden;
}
.comment-info > .comment-info-middle > .textDisplay.active {
  height: 100%;
}
.comment-info > .comment-info-middle > .more-textDisplay {
  margin-top: 10px;
  cursor: pointer;
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
.comment-info > .more-comment {
  margin-top: 10px;
}
.comment-info > .more-comment > .fas {
  margin-right: 10px;
}
.comment-info > .more-comment {
  color: #065fd4;
}
.comment-info > .comment-info-bottom > div > .fas {
  color: #909090;
}
</style>
