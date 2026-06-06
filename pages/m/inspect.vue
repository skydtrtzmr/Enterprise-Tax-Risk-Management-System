<template>
  <div class="m-inspect">
    <div class="m-header">
      <button class="header-back" @click="navigateTo('/m')">
        <el-icon :size="20" color="#fff"><ArrowLeft /></el-icon>
      </button>
      <span class="header-title">智能自查</span>
      <span class="header-placeholder"></span>
    </div>

    <div class="m-list">
      <NuxtLink to="/m/heatmap/1" class="list-item">
        <el-icon :size="20" color="#409eff"><Cpu /></el-icon>
        <span class="list-item-text">热力图1</span>
        <el-icon :size="16" color="#c0c4cc"><ArrowRight /></el-icon>
      </NuxtLink>

      <NuxtLink to="/m/heatmap/2" class="list-item">
        <el-icon :size="20" color="#409eff"><Cpu /></el-icon>
        <span class="list-item-text">热力图2</span>
        <el-icon :size="16" color="#c0c4cc"><ArrowRight /></el-icon>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
definePageMeta({ layout: 'blank' })
</script>

<style scoped>
.m-inspect {
  min-height: 100vh;
  min-height: 100dvh;
  background: #f5f7fa;
}

.m-header {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 12px;
  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
}

.header-back {
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

.header-back:active {
  background: rgba(255, 255, 255, 0.3);
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 600;
  color: #fff;
}

.header-placeholder {
  width: 36px;
  flex-shrink: 0;
}

.m-list {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
  text-decoration: none;
  color: inherit;
  -webkit-tap-highlight-color: transparent;
}

.list-item:active {
  background: #ecf5ff;
  border-color: #b3d8ff;
}

.list-item-text {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: #303133;
}

@supports (padding-top: env(safe-area-inset-top)) {
  .m-header {
    height: calc(48px + env(safe-area-inset-top));
    padding-top: env(safe-area-inset-top);
  }
}
</style>
