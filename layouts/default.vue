<template>
    <el-container class="layout-container">
        <el-header class="main-header">
            <div class="header-left">
                <div class="title">企业税收风险管理系统 F8</div>
                <div class="subtitle">【已授权】</div>
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
                <span>您好, 中比新能源公司</span>
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
    User,
} from "@element-plus/icons-vue";
</script>

<style>
body {
    margin: 0;
    background-color: #f0f2f5; /* Match main content bg for seamless feel */
}
</style>

<style scoped>
@keyframes header-fade-in {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes nav-item-fade-in {
    from {
        transform: translateY(-10px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.layout-container {
    height: 100vh;
}
.main-header {
    /* 更具科技感的渐变背景 */
    background-color: #1e40af; /* 后备颜色 */
    background-image: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3); /* 与渐变色匹配的阴影 */
    position: relative;
    z-index: 100;
    padding: 0 24px;
    animation: header-fade-in 0.6s ease-out;
    overflow: hidden; /* 隐藏伪元素溢出的部分 */
}

/* 使用伪元素在头部右侧添加局部装饰性条纹 */
.main-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 25%; /* 条纹区域宽度 */
    height: 100%;
    background-image: repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 5px,
        rgba(255, 255, 255, 0.06) 5px,
        rgba(255, 255, 255, 0.06) 10px
      );
    pointer-events: none; /* 确保不影响鼠标交互 */
}

.header-left .title {
    font-size: 24px; /* Larger */
    font-weight: 600; /* semi-bold */
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
}

.header-left .subtitle {
    font-size: 12px;
    /* color: #a0cfff; */
    color: #4dc4ff; /* A more vibrant cyan/light blue */
    font-weight: bold;
}

.header-center {
    display: flex;
    gap: 8px; /* Slightly more gap */
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
    color: #c0d3f0; /* Softer white for inactive items */
    height: 100%;
    box-sizing: border-box;

    /* for animation */
    opacity: 0;
    animation: nav-item-fade-in 0.5s ease-out forwards;
}

.header-center .nav-item:nth-child(1) {
    animation-delay: 0.3s;
}
.header-center .nav-item:nth-child(2) {
    animation-delay: 0.4s;
}
.header-center .nav-item:nth-child(3) {
    animation-delay: 0.5s;
}
.header-center .nav-item:nth-child(4) {
    animation-delay: 0.6s;
}
.header-center .nav-item:nth-child(5) {
    animation-delay: 0.7s;
}

.nav-item:hover {
    /* background-color: rgba(255, 255, 255, 0.1); */
    color: white;
}

.nav-item::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: linear-gradient(90deg, #43aaff, #007bff);
    border-radius: 2px;
    transition: width 0.3s ease-in-out;
}

.nav-item:hover::after {
    width: 70%;
}

.nav-item.router-link-exact-active {
    /* background-color: #409eff; */
    color: white;
    font-weight: bold;
}

.nav-item.router-link-exact-active::after {
    width: 70%;
    box-shadow: 0 0 10px #007bff, 0 0 5px #43aaff;
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
    height: calc(100vh - 64px); /* Adjusted for new header height */
    overflow-y: auto;
}
</style>
