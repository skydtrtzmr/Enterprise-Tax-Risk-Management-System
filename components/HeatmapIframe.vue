<template>
  <div class="heatmap-iframe-container">
    <iframe 
      :src="iframeSrc" 
      class="heatmap-iframe"
      frameborder="0"
      scrolling="auto"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// iframe的src路径，指向public目录下的HTML文件
const iframeSrc = ref('/heatmap.html1')

// iframe加载完成后的回调
const onIframeLoad = () => {
  console.log('Heatmap iframe loaded successfully')
}

// 组件挂载时的逻辑
onMounted(() => {
  console.log('HeatmapIframe component mounted')
})
</script>

<style scoped>
.heatmap-iframe-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.heatmap-iframe {
  width: 100%;
  height: 100%;
  border: none;
  min-height: 500px; /* 设置最小高度 */
}
</style>