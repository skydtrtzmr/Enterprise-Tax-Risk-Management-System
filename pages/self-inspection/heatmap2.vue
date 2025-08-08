<template>
  <div class="heatmap-page">
    <h1>热力图2</h1>
    <HeatmapIframe src="/heatmap2.html" />
  </div>
</template>

<script setup>
import HeatmapIframe from '@/components/HeatmapIframe.vue'
</script>

<style scoped>
.heatmap-page {
  height: 100vh;
}
</style>