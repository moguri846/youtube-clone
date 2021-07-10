<template>
  <div class="wrap">
    <YoutbueHeader></YoutbueHeader>
    <div class="container">
      <YoutubeNavbar :toogle="navbar" :style="displayNavbar"></YoutubeNavbar>
      <router-view :loading="loading"></router-view>
    </div>
  </div>
</template>

<script>
import bus from './utils/bus.js';

import YoutbueHeader from './components/YoutubeHeader.vue';
import YoutubeNavbar from './components/YoutubeNavbar.vue';

export default {
  data() {
    return {
      loading: false,
      navbar: true,
    };
  },
  computed: {
    displayNavbar() {
      return this.$route.name !== 'watch' ? '' : 'display: none';
    },
  },
  created() {
    bus.$on('start:spinner', this.startSpinner);
    bus.$on('end:spinner', this.endSpinner);
    bus.$on('toogleNavbar', this.toogleNavbar);
  },
  beforeCreate() {
    bus.$off('start:spinner');
    bus.$off('end:spinner');
    bus.$off('toogleNavbar');
  },
  methods: {
    startSpinner() {
      this.loading = true;
    },
    endSpinner() {
      this.loading = false;
    },
    toogleNavbar() {
      this.navbar = !this.navbar;
    },
  },
  components: {
    YoutbueHeader,
    YoutubeNavbar,
  },
};
</script>

<style>
body {
  margin: 0px;
}
.container {
  display: flex;
  background-color: #f9f9f9;
}
ul,
li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
a {
  color: black;
  text-decoration: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0px;
  margin: 0px;
}
</style>
