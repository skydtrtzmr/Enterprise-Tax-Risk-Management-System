<template>
  <div class="logisticmap-iframe-container">
    <iframe 
      :src="iframeSrc" 
      class="logisticmap-iframe"
      frameborder="0"
      scrolling="auto"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// iframe的src路径，指向public目录下的HTML文件
const iframeSrc = ref('/logisticmap2.html')

// iframe加载完成后的回调
const onIframeLoad = () => {
  console.log('Logisticmap iframe loaded successfully')
}

// 组件挂载时的逻辑
onMounted(() => {
  console.log('LogisticmapIframe component mounted')
})
</script>

<style scoped>
.logisticmap-iframe-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.logisticmap-iframe {
  width: 100%;
  height: 100%;
  border: none;
  min-height: 500px; /* 设置最小高度 */
}
</style>