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
// 添加props接收动态src
const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const iframeSrc = ref(props.src) // 从props获取src

const onIframeLoad = () => {
  console.log('Heatmap iframe loaded successfully')
}

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
  min-height: 500px;
}
</style>