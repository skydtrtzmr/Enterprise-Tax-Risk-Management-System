<template>
  <div class="test-report-container">
    <div class="toolbar">
        <el-button type="primary" :icon="Document">生成报告</el-button>
        <el-button :icon="Download">导出</el-button>
        <el-button :icon="Filter">选项</el-button>
    </div>
    <el-container class="content-container">
      <el-aside width="240px" class="content-aside">
        <div class="side-menu">
          <div class="menu-title">测评</div>
          <div class="menu-title">年度</div>
          <div class="menu-title">月度</div>
        </div>
        <div class="task-info-container">
          <div class="task-info-title">
            <span>任务信息</span>
          </div>
          <el-menu default-active="1" class="task-menu">
            <el-menu-item index="1">企业涉税风险一键测评</el-menu-item>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="content-main">
        <div class="result-panel" :class="{ 'high-risk': riskLevel === 'high', 'low-risk': riskLevel === 'low', 'initial-state': riskLevel === 'none' }">
          <template v-if="riskLevel === 'high'">
            <div style="font-size: 32px; font-weight: bold;">检测完成, 高风险！！</div>
          </template>
          <template v-else-if="riskLevel === 'low'">
            <div style="font-size: 32px; font-weight: bold; margin-bottom: 20px;">检测完成, 无风险或风险较低。</div>
            <div>请注意高新技术企业认定标准</div>
          </template>
          <template v-else>
            <div style="font-size: 28px; font-weight: bold;">请上传文件开始测评</div>
          </template>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { Document, Download, Filter } from '@element-plus/icons-vue'

defineProps({
  riskLevel: {
    type: String as () => 'low' | 'high' | 'none',
    default: 'none'
  }
})
</script>

<style scoped>
.test-report-container {
  padding: 20px;
}
.toolbar {
  margin-bottom: 20px;
  background-color: white;
  padding: 10px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.content-container {
  background-color: white;
  display: flex;
  min-height: 600px;
}
.content-aside {
  border-right: 1px solid #e0e0e0;
  display: flex;
}

.side-menu {
  width: 80px;
  background-color: #f4f6f8;
  padding: 20px 0;
  border-right: 1px solid #e0e0e0;
}

.menu-title {
  padding: 15px 0;
  text-align: center;
  cursor: pointer;
}

.menu-title:first-child {
  background-color: #fff;
  border-left: 3px solid #1890ff;
}

.task-info-container {
  flex: 1;
  padding: 20px;
}

.task-info-title {
  font-weight: bold;
  padding-left: 10px;
  border-left: 3px solid #1890ff;
  margin-bottom: 15px;
}
.task-menu {
    border-right: none;
}
.content-main {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  padding: 20px;
}
.result-panel {
  color: white;
  padding: 80px;
  font-size: 24px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.low-risk {
  background-color: #00c484;
}

.high-risk {
  background-color: red;
}

.initial-state {
  background-color: #e9eef3;
  color: #606266;
}
</style> 