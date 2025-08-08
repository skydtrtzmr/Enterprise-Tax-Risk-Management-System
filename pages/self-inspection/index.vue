<template>
  <el-container class="full-height">
    <!-- 固定侧边栏（与risk-response结构一致） -->
    <el-aside width="240px" class="aside-menu">
      <div class="aside-header">
        <el-icon :size="20" color="#409eff"><Document /></el-icon>
        <span class="aside-title">风险自查</span>
      </div>
      <el-menu
        :default-active="currentHeatmap"
        class="el-menu-vertical-demo"
        @select="handleMenuSelect"
      >
        <el-menu-item index="heatmap1">热力图1</el-menu-item>
        <el-menu-item index="heatmap2">热力图2</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区域（动态渲染热力图） -->
    <el-main class="content-main">
      <HeatmapIframe :src="`/${currentHeatmap}.html`" />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HeatmapIframe from '@/components/HeatmapIframe.vue';
import { Document } from '@element-plus/icons-vue';

// 响应式变量：当前选中的热力图（初始为heatmap1）
const currentHeatmap = ref('heatmap1');

// 菜单点击事件处理
const handleMenuSelect = (index: string) => {
  currentHeatmap.value = index;
};
</script>

<style scoped>
/* 完全复用risk-response的侧边栏样式 */
.full-height {
  height: calc(100vh - 64px); /* 与risk-response保持一致的视口高度计算 */
}

.aside-menu {
  background-color: #ffffff;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
}

.aside-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
}

.aside-title {
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
  color: #303133;
}

.el-menu-vertical-demo {
  border-right: none;
}

.el-menu-item.is-active {
  background-color: #ecf5ff;
  color: #409eff;
}

.content-main {
  padding: 20px;
  background-color: #f0f2f5;
}
</style>
