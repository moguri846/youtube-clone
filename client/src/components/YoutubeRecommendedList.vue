<template>
  <div class="recommended-list">
    <ul>
      <li v-for="(video, index) in recommendedList" :key="index">
        <YoutubeRecommendedItem :recommended="video"></YoutubeRecommendedItem>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import YoutubeRecommendedItem from './YoutubeRecommendedItem.vue';

export default {
  computed: {
    ...mapState(['recommendedList']),
  },
  components: {
    YoutubeRecommendedItem,
  },
};
</script>

<style scoped>
.recommended-list {
  width: 420px;
  margin-left: 20px;
}
</style>
