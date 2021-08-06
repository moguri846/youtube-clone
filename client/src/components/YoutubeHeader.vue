<template>
  <div class="header">
    <div class="icon">
      <i class="fas fa-bars" @click="toogleNavbarBtn"></i>
      <i class="fab fa-youtube" @click="home"></i>
    </div>
    <YoutubeInput></YoutubeInput>
    <div class="options">
      <i class="fas fa-video"></i>
      <i class="fas fa-th"></i>
      <i class="fas fa-bell"></i>
      <i class="fas fa-user-circle"></i>
    </div>
  </div>
</template>

<script>
import bus from '../utils/bus.js';

import YoutubeInput from './YoutubeInput.vue';

export default {
  methods: {
    home() {
      this.$router.push('/');
    },
    toogleNavbarBtn() {
      bus.$emit('toogleNavbar');
    },
  },
  components: {
    YoutubeInput,
  },
};
</script>

<style scoped>
.header {
  height: 58px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0px;
  padding: 0px 15px;
  font-size: 25px;
  background-color: white;
  z-index: 1;
}
.header > .icon {
  display: flex;
  /* display: none; */
}
.header > .icon > * {
  padding: 10px;
  cursor: pointer;
}
.header > .icon > .fa-youtube {
  color: red;
}
.header > .icon > .fa-youtube::after {
  content: 'YouTube';
  color: black;
  margin-left: 5px;
}
.header > .options {
  min-width: 180px;
}
.header > .options > * {
  padding: 10px;
  cursor: pointer;
}
.header.mobile > .search {
  width: 100%;
}
.header.mobile > .icon,
.header.mobile > .options {
  display: none;
}
.search {
  width: 36.21%;
}
@media screen and (max-width: 465px) {
  .header > .icon > .fa-youtube::after {
    content: '';
  }
}
@media screen and (max-width: 365px) {
  .header {
    padding: 0px;
  }
}
@media screen and (max-width: 330px) {
  .header > .search {
    justify-content: flex-end;
  }
  .header > .options {
    min-width: 90px;
  }
  .header > .options > i {
    display: none;
  }
  .header > .options > .fa-bell,
  .header > .options > .fa-user-circle {
    display: inline-block;
  }
}
</style>
