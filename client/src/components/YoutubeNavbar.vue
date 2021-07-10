<template>
  <div class="navbar" :class="checkToogle">
    <div class="menu1">
      <ul>
        <li><i class="fas fa-home"></i><span>홈</span></li>
        <li><i class="fas fa-compass"></i><span>탐색</span></li>
        <li><i class="fas fa-list-alt"></i><span>구독</span></li>
      </ul>
    </div>
    <div class="menu2">
      <ul>
        <li><i class="fas fa-file-video"></i><span>보관함</span></li>
        <li><i class="fas fa-history"></i><span>시청 기록</span></li>
        <li><i class="fas fa-play-circle"></i><span>내 동영상</span></li>
        <li><i class="fas fa-film"></i><span>내 영화</span></li>
        <li><i class="fas fa-clock"></i><span>나중에 볼 영상</span></li>
      </ul>
    </div>
    <div class="subscribe-list">
      <h5>구독</h5>
      <ul>
        <li><i class="fas fa-user"></i><span>유튜버</span></li>
        <li><i class="fas fa-user"></i><span>유튜버</span></li>
        <li><i class="fas fa-user"></i><span>유튜버</span></li>
        <li><i class="fas fa-user"></i><span>유튜버</span></li>
        <li><i class="fas fa-user"></i><span>유튜버</span></li>
      </ul>
    </div>
    <div class="more-youtube">
      <h5>YOUTUBE 더보기</h5>
      <ul>
        <li><i class="fab fa-youtube"></i><span>Youtube Premium</span></li>
        <li><i class="fas fa-film"></i><span>영화</span></li>
        <li><i class="fas fa-gamepad"></i><span>게임</span></li>
        <li><i class="fas fa-satellite-dish"></i><span>실시간</span></li>
        <li><i class="fas fa-lightbulb"></i><span>학습</span></li>
        <li><i class="fas fa-trophy"></i><span>스포츠</span></li>
      </ul>
    </div>
    <div class="config">
      <ul>
        <li><i class="fas fa-cog"></i><span>설정</span></li>
        <li><i class="fas fa-flag"></i><span>신고 기록</span></li>
        <li><i class="fas fa-question"></i><span>고객센터</span></li>
        <li><i class="fas fa-comment-alt"></i><span>의견 보내기</span></li>
      </ul>
    </div>
    <div class="navbar-close">
      <ul>
        <li><i class="fas fa-home"></i><span>홈</span></li>
        <li><i class="fas fa-compass"></i><span>탐색</span></li>
        <li><i class="fas fa-list-alt"></i><span>구독</span></li>
        <li><i class="fas fa-file-video"></i><span>보관함</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toogle: Boolean,
  },
  computed: {
    checkToogle() {
      return this.toogle ? 'open' : 'close';
    },
  },
};
</script>

<style scoped>
.navbar {
  width: 244px;
  max-width: 244px;
  min-width: 72px;
  height: 881px;
  position: sticky;
  top: 58px;
  overflow: hidden;
  background-color: white;
  transition: width 0.5s;
}
.navbar.close > div {
  display: none;
}
.navbar.close > div:last-child {
  display: inline-block;
}
.navbar-close {
  display: none;
}
.navbar-close > ul > li {
  width: 72px !important;
  padding: 20px 0px !important;
  text-align: center !important;
  justify-content: center;
  flex-direction: column;
}
.navbar-close > ul > li > i {
  width: 100% !important;
  margin: 0px !important;
}
.navbar.open {
  width: 244px;
}
.navbar.close {
  width: 72px;
}
.navbar.close:hover {
  overflow-y: hidden;
}
.navbar > div::after {
  content: '';
  width: 190px;
  height: 1px;
  display: inline-block;
  margin-bottom: 30px;
  background-color: #ccc;
}
.navbar > .config::after,
.navbar > .navbar-close::after {
  width: 0px;
  height: 0px;
  margin-bottom: 0px;
}
.navbar:hover {
  overflow-y: scroll;
}
.navbar::webkit-scrollbar {
  width: 10px;
}
.navbar::webkit-scrollbar-thumb {
  background-color: #ccc;
}
.navbar::webkit-scrollbar-track {
  background-color: black;
}

.navbar > div > h5 {
  padding-left: 27px;
}
.navbar > div > ul > li {
  width: 192px;
  height: 40px;
  padding: 0px 21px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.navbar > div > ul > li:hover {
  background-color: #f5f5f5;
}
.navbar > div > ul > li > i {
  width: 30px;
  margin-right: 20px;
  font-size: 20px;
  text-align: center;
}
.navbar > div > ul > li > span {
  font-size: 14px;
}
</style>
