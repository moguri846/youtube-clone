<template>
  <div class="item">
    <slot name="link">
      <!-- 채널 -->
      <slot name="channel-img"></slot>
      <slot name="channel-info">
        <slot name="channel-desc">
          <slot name="channel-title"></slot>
          <slot name="channel-description"></slot>
        </slot>
      </slot>

      <!-- 비디오 -->
      <slot name="video-thumbnail"></slot>
      <slot name="video-info">
        <slot name="channel-img"></slot>
        <slot name="video-desc">
          <slot name="video-title"></slot>
          <slot name="channel-title"></slot>
          <slot name="video-status"></slot>
          <slot name="video-description"></slot>
        </slot>
      </slot>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
