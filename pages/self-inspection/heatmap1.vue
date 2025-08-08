<template>
  <div class="heatmap-page">
    <h1>热力图1</h1>
    <HeatmapIframe src="/heatmap1.html" />
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