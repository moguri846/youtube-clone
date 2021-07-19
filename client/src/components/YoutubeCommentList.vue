<template>
  <div>
    <YoutubeInsertComment :data="commentList"></YoutubeInsertComment>
    <ul class="comment-list">
      <li v-for="(comment, index) in commentList" :key="index" class="comment-item">
        <YoutubeCommentItem :comment="comment"></YoutubeCommentItem>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import YoutubeInsertComment from './YoutubeInsertComment.vue';
import YoutubeCommentItem from './YoutubeCommentItem.vue';

export default {
  computed: {
    ...mapState(['commentList']),
  },

  components: {
    YoutubeInsertComment,
    YoutubeCommentItem,
  },
};
</script>

<style scoped>
.comment-list {
  margin-top: 30px;
}
.comment-item {
  margin-bottom: 20px;
}
</style>
