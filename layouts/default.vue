<template>
  <el-container class="layout-container">
    <el-header class="main-header">
      <div class="header-left">
        <div class="title">企业税收风险管理系统 F8</div>
        <div class="subtitle">由无锡博盾授权试用90天-剩余89天</div>
      </div>
      <div class="header-center">
        <NuxtLink to="/data-management" class="nav-item">
          <el-icon :size="24"><DataAnalysis /></el-icon>
          <div>数据管理</div>
        </NuxtLink>
        <NuxtLink to="/risk-assessment" class="nav-item">
          <el-icon :size="24"><Platform /></el-icon>
          <div>风险测评</div>
        </NuxtLink>
        <NuxtLink to="/risk-response" class="nav-item">
          <el-icon :size="24"><TakeawayBox /></el-icon>
          <div>风险应对</div>
        </NuxtLink>
        <NuxtLink to="/self-inspection" class="nav-item">
          <el-icon :size="24"><Finished /></el-icon>
          <div>风险自查</div>
        </NuxtLink>
        <NuxtLink to="/statistical-analysis" class="nav-item">
          <el-icon :size="24"><TrendCharts /></el-icon>
          <div>统计分析</div>
        </NuxtLink>
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
  border-bottom: 1px solid #1a4a8a;
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
  gap: 4px;
  height: 100%;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 20px;
  transition: all 0.3s ease;
  position: relative;
  text-decoration: none;
  color: white;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.router-link-exact-active {
  background-color: #409eff;
  color: white;
}

.nav-item.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent #f0f2f5 transparent;
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