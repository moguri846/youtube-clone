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
  mounted() {
    const {
      $el: { clientWidth },
    } = this;
    if (clientWidth < 808) {
      this.navbar = false;
    }
  },
  components: {
    YoutbueHeader,
    YoutubeNavbar,
  },
};
</script>

<style>
body {
  width: 100%;
  height: 100vh;
  margin: 0px;
  padding: 0px;
}
.container {
  width: 100%;
  height: 100%;
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
@media screen and (max-width: 380px) {
  body {
    overflow-x: hidden;
  }
}
</style>
