<template>
  <div class="m-heatmap-detail">
    <div class="detail-header">
      <button class="close-btn" @click="navigateTo('/m/inspect')">
        <el-icon :size="20" color="#fff"><ArrowLeft /></el-icon>
      </button>
      <span class="header-label">{{ currentTitle }}</span>
      <span class="header-placeholder"></span>
    </div>
    <div class="iframe-wrapper">
      <iframe
        :key="id"
        :src="iframeSrc"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
definePageMeta({ layout: 'blank' })

const route = useRoute()
const id = computed(() => route.params.id as string)

const heatmapMap: Record<string, { title: string; file: string }> = {
  '1': { title: '研发用车使用情况', file: '/heatmap1.html' },
  '2': { title: '物流信息热力分析', file: '/heatmap2.html' },
}

const current = computed(() => heatmapMap[id.value] || heatmapMap['1'])
const currentTitle = computed(() => current.value.title)
const iframeSrc = computed(() => current.value.file)
</script>

<style scoped>
.m-heatmap-detail {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.detail-header {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  color: #fff;
  flex-shrink: 0;
  z-index: 10;
}

.header-label {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-placeholder {
  width: 36px;
  flex-shrink: 0;
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}

.close-btn:active {
  background: rgba(255, 255, 255, 0.3);
}

.iframe-wrapper {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
