<template>
  <div class="insert-comment">
    <span class="total-comment">댓글 {{ totalComment }}개</span>
    <div>
      <i class="fas fa-user"></i>
      <input type="text" placeholder="공개 댓글 추가..." />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  computed: {
    totalComment() {
      return this.data.length;
    },
  },
};
</script>

<style scoped>
.insert-comment {
  height: 88px;
}
.insert-comment > div {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.insert-comment > div > .fas {
  font-size: 55px;
  padding: 0px 15px 15px 0px;
}
.insert-comment > div > input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  border-bottom: 1px solid #909090;
  background-color: #f9f9f9;
}
</style>
