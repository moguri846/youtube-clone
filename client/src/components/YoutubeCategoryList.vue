<template>
  <div class="category-list">
    <ul>
      <li v-for="(video, index) in categoryList" :key="index">
        <YoutbueCategoryItem :video="video"></YoutbueCategoryItem>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import YoutbueCategoryItem from './YoutbueCategoryItem.vue';

export default {
  computed: {
    ...mapState(['categoryList']),
  },
  components: {
    YoutbueCategoryItem,
  },
};
</script>

<style scoped></style>
