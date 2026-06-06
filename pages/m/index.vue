<template>
  <div class="m-home">
    <!-- 头部 -->
    <div class="m-header">
      <h1 class="header-title">企业税收风险管理系统</h1>
      <p class="header-desc">Enterprise Tax Risk Management</p>
    </div>

    <!-- 菜单 -->
    <div class="m-menu">
      <NuxtLink to="/m/inspect" class="menu-item">
        <el-icon :size="20" color="#409eff"><Cpu /></el-icon>
        <span class="menu-item-text">智能自查</span>
        <el-icon :size="16" color="#c0c4cc"><ArrowRight /></el-icon>
      </NuxtLink>

      <div class="menu-item menu-item--disabled">
        <el-icon :size="20" color="#909399"><Reading /></el-icon>
        <span class="menu-item-text">自由阅账</span>
      </div>

      <div class="menu-item menu-item--disabled">
        <el-icon :size="20" color="#909399"><List /></el-icon>
        <span class="menu-item-text">税种检查</span>
      </div>

      <div class="menu-item menu-item--disabled">
        <el-icon :size="20" color="#909399"><EditPen /></el-icon>
        <span class="menu-item-text">查结处理</span>
      </div>

      <div class="menu-item menu-item--disabled">
        <el-icon :size="20" color="#909399"><Guide /></el-icon>
        <span class="menu-item-text">自查报告</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cpu, Reading, List, EditPen, Guide, ArrowRight } from '@element-plus/icons-vue'
definePageMeta({ layout: 'blank' })
</script>

<style scoped>
.m-home {
  min-height: 100vh;
  min-height: 100dvh;
  background: #f5f7fa;
}

.m-header {
  background: linear-gradient(135deg, #0f2557 0%, #1e40af 40%, #2563eb 100%);
  padding: 56px 24px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* 复用原系统头部的斜纹装饰 */
.m-header::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 30%;
  height: 100%;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 5px,
    rgba(255, 255, 255, 0.06) 5px,
    rgba(255, 255, 255, 0.06) 10px
  );
  pointer-events: none;
}

.header-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  letter-spacing: 3px;
  text-shadow: 0 2px 8px rgba(0,0,0,0.2);
  position: relative;
}

.header-desc {
  margin: 10px 0 0;
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  letter-spacing: 2px;
  font-weight: 400;
  position: relative;
}

.m-menu {
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.menu-item {
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

.menu-item:active {
  background: #ecf5ff;
  border-color: #b3d8ff;
}

.menu-item--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}

.menu-item-text {
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  color: #303133;
}

@supports (padding-top: env(safe-area-inset-top)) {
  .m-header {
    padding-top: calc(48px + env(safe-area-inset-top));
  }
}
</style>
