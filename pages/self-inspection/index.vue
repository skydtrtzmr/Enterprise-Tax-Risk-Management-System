<template>
  <div class="self-inspection-container">
    <h1>风险自查</h1>
    <div class="nav-links">
      <!-- 使用NuxtLink实现页面跳转 -->
      <NuxtLink to="/self-inspection/heatmap1" class="nav-link">热力图1</NuxtLink>
      <NuxtLink to="/self-inspection/heatmap2" class="nav-link">热力图2</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Nuxt自动注入NuxtLink组件，无需额外导入
</script>

<style scoped>
.nav-links {
  margin-top: 20px;
  display: flex;
  gap: 20px;
}

.nav-link {
  padding: 10px 20px;
  background: #2563eb;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s;
}

.nav-link:hover {
  background: #1d4ed8;
}
</style>


<style scoped>
.self-inspection-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 200px;
  background: #f5f7fa;
  padding: 20px;
  border-right: 1px solid #e5e7eb;
}

.menu-item {
  font-weight: bold;
  margin-bottom: 10px;
}

.sub-menu {
  margin-top: 8px;
  margin-left: 15px;
}

.sub-menu-item {
  padding: 8px 0;
  cursor: pointer;
  color: #4b5563;
  transition: color 0.2s;
}

.sub-menu-item:hover {
  color: #2563eb;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
