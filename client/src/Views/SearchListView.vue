<template>
  <YoutubeSearchList :loading="loading"></YoutubeSearchList>
</template>

<script>
import { mapState } from "vuex";

import YoutubeSearchList from "../components/YoutubeSearchList.vue";

export default {
  props: {
    loading: Boolean,
  },
  computed: {
    ...mapState(["searchList"]),
  },
  components: {
    YoutubeSearchList,
  },
};
</script>

<style scoped></style>
