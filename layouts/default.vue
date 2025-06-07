<template>
  <el-container class="layout-container">
    <el-header class="main-header">
      <div class="header-left">
        <div class="title">企业税收风险管理系统 F8</div>
        <div class="subtitle">由无锡博盾授权试用90天-剩余89天</div>
      </div>
      <div class="header-center">
        <div class="nav-item">
          <el-icon :size="24"><DataAnalysis /></el-icon>
          <div>数据管理</div>
        </div>
        <div class="nav-item">
          <el-icon :size="24"><Platform /></el-icon>
          <div>风险测评</div>
        </div>
        <div class="nav-item">
          <el-icon :size="24"><TakeawayBox /></el-icon>
          <div>风险应对</div>
        </div>
        <div class="nav-item">
          <el-icon :size="24"><Finished /></el-icon>
          <div>风险自查</div>
        </div>
        <div class="nav-item">
          <el-icon :size="24"><TrendCharts /></el-icon>
          <div>统计分析</div>
        </div>
      </div>
      <div class="header-right">
        <el-icon><User /></el-icon>
        <span>您好, XXX有限公司</span>
      </div>
    </el-header>
    <el-main class="main-content">
      <slot />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import {
  DataAnalysis,
  Platform,
  TakeawayBox,
  Finished,
  TrendCharts,
  User
} from '@element-plus/icons-vue'
</script>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
.layout-container {
  height: 100vh;
}
.main-header {
  background: #1e529b;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.header-left .title {
  font-size: 22px;
  font-weight: bold;
}

.header-left .subtitle {
  font-size: 12px;
  color: #a0cfff;
}

.header-center {
  display: flex;
  gap: 20px;
  height: 100%;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 15px;
  transition: background-color 0.3s;
}

.nav-item:hover {
    background-color: #144281;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-right .el-icon {
  margin-right: 8px;
}

.main-content {
  padding: 0;
  background-color: #f0f2f5;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style> 