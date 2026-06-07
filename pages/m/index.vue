<template>
  <div class="m-page">
    <!-- 顶部标题栏 -->
    <div class="m-header">
      <div class="header-left">
        <el-icon :size="20" color="#fff"><Close /></el-icon>
      </div>
      <div class="header-title">任务四 涉税风险与管理</div>
      <div class="header-right">
        <el-icon :size="20" color="#fff"><MoreFilled /></el-icon>
      </div>
    </div>

    <!-- 热力图列表 -->
    <div class="m-content">
      <NuxtLink to="/m/heatmap/1" class="heatmap-card">
        <div class="card-icon">
          <el-icon :size="20" color="#fff"><Grid /></el-icon>
        </div>
        <span class="card-text">项目A-热力图VR模型</span>
      </NuxtLink>

      <NuxtLink to="/m/heatmap/2" class="heatmap-card">
        <div class="card-icon">
          <el-icon :size="20" color="#fff"><Grid /></el-icon>
        </div>
        <span class="card-text">项目B-热力图VR模型</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Close, MoreFilled, Grid } from '@element-plus/icons-vue'
definePageMeta({ layout: 'blank' })
</script>

<style scoped>
.m-page {
  min-height: 100vh;
  min-height: 100dvh;
  background: #f5f7fa;
}

/* 顶部标题栏 */
.m-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 0 16px;
  background: linear-gradient(90deg, #4a90d9 0%, #5a9de9 100%);
  color: #fff;
}

.header-left,
.header-right {
  width: 40px;
  display: flex;
  align-items: center;
}

.header-right {
  justify-content: flex-end;
}

.header-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #fff;
}

/* 内容区 */
.m-content {
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 热力图卡片 */
.heatmap-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  -webkit-tap-highlight-color: transparent;
}

.heatmap-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #4a90d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-text {
  flex: 1;
  font-size: 15px;
  color: #333;
}

/* 安全区域 */
@supports (padding-top: env(safe-area-inset-top)) {
  .m-header {
    height: calc(48px + env(safe-area-inset-top));
    padding-top: env(safe-area-inset-top);
  }
}
</style>
