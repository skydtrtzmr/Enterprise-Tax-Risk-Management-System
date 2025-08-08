<template>
  <el-container class="full-height">
    <!-- 侧边栏菜单 -->
    <el-aside width="240px" class="aside-menu">
      <div class="aside-header">
        <el-icon :size="20" color="#409eff"><Document /></el-icon>
        <span class="aside-title">统计分析</span>
      </div>
      <el-menu
        default-active="logisticmap"
        class="el-menu-vertical-demo"
      >
        <el-sub-menu index="statistical-functions">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>统计功能</span>
          </template>
          <el-menu-item index="logisticmap">物流图分析</el-menu-item>
          <!-- 可扩展其他二级菜单 -->
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <!-- 主内容区域 -->
    <el-main class="content-main">
      <el-button type="primary" @click="handleViewLogisticMap">查看物流图</el-button>

      <!-- 物流图弹窗 -->
      <el-dialog
        title="物流图分析"
        :visible.sync="isDialogVisible"
        width="90%"
        :before-close="handleClose"
      >
        <LogisticmapIframe />
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LogisticmapIframe from '@/components/LogisticmapIframe.vue';
import { Document, Setting } from '@element-plus/icons-vue';

// 控制弹窗显示的响应式变量
const isDialogVisible = ref(false);

// 点击查看物流图处理函数
const handleViewLogisticMap = () => {
  console.log('点击查看物流图'); // 添加控制台日志
  isDialogVisible.value = true;
};

// 弹窗关闭回调
const handleClose = () => {
  isDialogVisible.value = false;
};
</script>

<style scoped>
/* 复用风险自查侧边栏样式 */
.full-height {
  height: calc(100vh - 64px);
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

.content-main {
  padding: 20px;
  background-color: #f0f2f5;
}
</style>
