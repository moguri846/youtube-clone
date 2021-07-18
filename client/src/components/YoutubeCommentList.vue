<template>
  <div>
    <ul class="comment-list">
      <li v-for="(comment, index) in commentList" :key="index" class="comment-item">
        <YoutubeCommentItem :comment="comment"></YoutubeCommentItem>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import YoutubeCommentItem from './YoutubeCommentItem.vue';

export default {
  computed: {
    ...mapState(['commentList']),
  },
  components: {
    YoutubeCommentItem,
  },
};
</script>

<style scoped>
.comment-item {
  margin-bottom: 20px;
}
</style>
